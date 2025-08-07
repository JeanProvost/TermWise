const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Sends text to the backend for summarization.
 * @param {string} text The text to be summarized.
 * @returns {Promise<object>} A promise that resolves to the summarization response.
 */
async function summarizeText(text) {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}




// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'documentFound') {
    console.log('TermWise: Document found, processing...', message.documentType);
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

    // Process the document
    handleDocumentProcessing(message.documentText, message.url, tabId)
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

async function handleDocumentProcessing(documentText, url, tabId) {
    const storageKey = `summary_${tabId}`;
    try {
      console.log('TermWise: Calling API to summarize document...');
      // Summarize the document (classification is now included in the response)
      const summaryData = await summarizeText(documentText);
      console.log('TermWise: API response received:', summaryData);

      // Store success state with summary
      chrome.storage.local.set({
        [storageKey]: {
          status: 'success',
          data: {
            summary: summaryData.overall_summary,
            keyTerms: summaryData.key_terms,
            sectionalSummaries: summaryData.sectional_summaries,
            documentType: summaryData.document_type,
            wordCount: documentText.split(/\s+/).length,
            url: url,
            timestamp: Date.now()
          }
        }
      });

      // Update badge to show completion
      chrome.action.setBadgeText({ text: '✓', tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#4ade80', tabId });

    } catch (error) {
      console.error('Failed to process document:', error);
      throw error;
    }
}


// Clean up old data when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`summary_${tabId}`);
}); 