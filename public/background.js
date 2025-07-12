// Background script for Document Summarizer extension

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'documentFound') {
    const tabId = sender.tab.id;
    const storageKey = `summary_${tabId}`;
    
    // Store loading state
    chrome.storage.local.set({
      [storageKey]: {
        status: 'loading',
        timestamp: Date.now()
      }
    });
    
    // Update extension icon badge
    chrome.action.setBadgeText({ text: '...', tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#A997DF', tabId });
    
    // Make API call to summarize document
    summarizeDocument(message.documentText, message.documentType, message.url)
      .then(summary => {
        // Store success state with summary
        chrome.storage.local.set({
          [storageKey]: {
            status: 'success',
            data: {
              summary: summary.text,
              documentType: message.documentType,
              wordCount: message.wordCount,
              url: message.url,
              timestamp: Date.now()
            }
          }
        });
        
        // Update badge to show completion
        chrome.action.setBadgeText({ text: '✓', tabId });
        chrome.action.setBadgeBackgroundColor({ color: '#4ade80', tabId });
      })
      .catch(error => {
        // Store error state
        chrome.storage.local.set({
          [storageKey]: {
            status: 'error',
            error: error.message,
            timestamp: Date.now()
          }
        });
        
        // Update badge to show error
        chrome.action.setBadgeText({ text: '!', tabId });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444', tabId });
      });
  }
});

// Clean up old data when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`summary_${tabId}`);
});

// API call to backend
async function summarizeDocument(text, documentType, url) {
  try {
    // TODO: Replace with your actual API endpoint
    const response = await fetch('http://localhost:8000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.substring(0, 50000), // Limit text size to 50KB
        document_type: documentType,
        url: url
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
} 