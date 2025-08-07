// Content script for Document Summarizer extension

// Keywords to detect legal documents
const DOCUMENT_KEYWORDS = {
  'terms of service': 'Terms of Service',
  'terms and conditions': 'Terms & Conditions',
  'privacy policy': 'Privacy Policy',
  'end user license agreement': 'EULA',
  'eula': 'EULA',
  'terms of use': 'Terms of Use',
  'cookie policy': 'Cookie Policy',
  'disclaimer': 'Disclaimer'
};

// Check if page contains a legal document
function detectLegalDocument() {
  const pageText = document.body.innerText.toLowerCase();
  const pageTitle = document.title.toLowerCase();
  const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText.toLowerCase());
  
  // Check for keywords in title, headings, and content
  for (const [keyword, docType] of Object.entries(DOCUMENT_KEYWORDS)) {
    if (pageTitle.includes(keyword) || 
        headings.some(h => h.includes(keyword)) ||
        (pageText.includes(keyword) && pageText.length > 1000)) {
      return docType;
    }
  }
  
  return null;
}

// Extract document text
function extractDocumentText() {
  // Try to find main content area
  const contentSelectors = [
    'article', 
    'main', 
    '[role="main"]', 
    '.content', 
    '.terms-content',
    '.policy-content',
    '#content'
  ];
  
  let contentElement = null;
  for (const selector of contentSelectors) {
    contentElement = document.querySelector(selector);
    if (contentElement && contentElement.innerText.length > 500) {
      break;
    }
  }
  
  // Fall back to body if no specific content area found
  if (!contentElement) {
    contentElement = document.body;
  }
  
  return contentElement.innerText;
}

// Initialize document detection
function init() {
  // Wait for page to fully load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }
  
  // Detect document type
  const documentType = detectLegalDocument();
  console.log('TermWise: Document detection result:', documentType);
  
  if (documentType) {
    const documentText = extractDocumentText();
    const wordCount = documentText.split(/\s+/).length;
    
    console.log('TermWise: Sending document for processing', {
      type: documentType,
      wordCount: wordCount,
      url: window.location.href
    });
    
    // Send message to background script
    chrome.runtime.sendMessage({
      action: 'documentFound',
      documentType: documentType,
      documentText: documentText,
      wordCount: wordCount,
      url: window.location.href
    });
  } else {
    console.log('TermWise: No legal document detected on this page');
  }
}

// Run detection
init(); 