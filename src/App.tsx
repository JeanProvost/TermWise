import { useState, useEffect } from 'react';
import LoadingState from './components/LoadingState';
import SummaryView, { type SummaryData } from './components/SummaryView';
import NoDocumentState from './components/NoDocumentState';
import ErrorState from './components/ErrorState';

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
    <div className="w-96 min-h-[500px] bg-primary p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-tertiary">Document Summarizer</h1>
      </header>

      {state.status === 'loading' && <LoadingState />}
      {state.status === 'success' && state.data && <SummaryView data={state.data} />}
      {state.status === 'no-document' && <NoDocumentState />}
      {state.status === 'error' && <ErrorState error={state.error} />}
    </div>
  );
}

export default App;
