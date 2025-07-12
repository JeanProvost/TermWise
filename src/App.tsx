import { useState, useEffect } from 'react'

interface SummaryData {
  summary: string;
  documentType: string;
  wordCount: number;
  url: string;
  timestamp: number;
}

interface StorageData {
  status: 'loading' | 'success' | 'error' | 'no-document';
  data?: SummaryData;
  error?: string;
}

function App() {
  const [state, setState] = useState<StorageData>({ status: 'loading' });

  useEffect(() => {
    // Get the current tab and fetch its summary data
    const fetchSummaryData = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.id) {
          setState({ status: 'error', error: 'Unable to get current tab' });
          return;
        }

        // Fetch data from chrome.storage.local using tab ID as key
        const storageKey = `summary_${tab.id}`;
        const result = await chrome.storage.local.get(storageKey);
        
        if (result[storageKey]) {
          setState(result[storageKey]);
        } else {
          setState({ status: 'no-document' });
        }
      } catch (error) {
        setState({ 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error occurred' 
        });
      }
    };

    fetchSummaryData();

    // Listen for storage changes
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab?.id) {
          const storageKey = `summary_${tab.id}`;
          if (changes[storageKey]) {
            setState(changes[storageKey].newValue);
          }
        }
      });
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  return (
    <div className="w-96 min-h-[400px] bg-primary p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-tertiary">Document Summarizer</h1>
      </header>

      {/* Loading State */}
      {state.status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-tertiary">Analyzing document...</p>
        </div>
      )}

      {/* Summary View */}
      {state.status === 'success' && state.data && (
        <div className="space-y-4">
          <div className="bg-white/50 rounded-lg p-4 border border-secondary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-secondary">
                {state.data.documentType}
              </span>
              <span className="text-xs text-tertiary/70">
                {state.data.wordCount} words
              </span>
            </div>
            <h2 className="text-lg font-semibold text-tertiary mb-3">Summary</h2>
            <p className="text-tertiary/90 leading-relaxed whitespace-pre-wrap">
              {state.data.summary}
            </p>
          </div>
          
          <div className="text-xs text-tertiary/60 text-center">
            Generated {new Date(state.data.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* No Document Found */}
      {state.status === 'no-document' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-tertiary mb-2">No Document Found</h2>
          <p className="text-tertiary/70 text-sm">
            No summarizable document detected on this page. Try visiting a Terms of Service, Privacy Policy, or EULA page.
          </p>
        </div>
      )}

      {/* Error State */}
      {state.status === 'error' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-tertiary mb-2">Error</h2>
          <p className="text-tertiary/70 text-sm">
            {state.error || 'Unable to process the document. Please try again.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
