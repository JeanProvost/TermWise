import { useState } from 'react';
import LoadingState from './components/LoadingState';
import SummaryView, { type SummaryData } from './components/SummaryView';
import NoDocumentState from './components/NoDocumentState';
import ErrorState from './components/ErrorState';

interface StorageData {
  status: 'loading' | 'success' | 'error' | 'no-document';
  data?: SummaryData;
  error?: string;
}

const MOCK_SUMMARY_DATA: SummaryData = {
    summary: `This is a placeholder summary of a Terms of Service document.

1.  **Acceptance of Terms**: By using our services, you agree to these terms.
2.  **User Conduct**: You agree not to misuse the services or help anyone else to do so.
3.  **Intellectual Property**: You acknowledge that the service and its original content are protected by copyright.
4.  **Termination**: We may terminate or suspend your access to our service at any time, without prior notice or liability.
5.  **Disclaimer of Warranties**: The service is provided "as is".
6.  **Limitation of Liability**: In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages.`,
    documentType: 'Terms of Service',
    wordCount: 128,
    url: 'https://example.com/terms',
    timestamp: Date.now(),
};


function App() {
  const [state] = useState<StorageData>({ status: 'success', data: MOCK_SUMMARY_DATA });
  //const [state, setState] = useState<StorageData>({ status: 'loading' });

  /* useEffect(() => {
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
  }, []); */

  return (
    <div className="w-96 h-[600px] bg-background p-6 flex flex-col">
      <header className="mb-6 rounded-2xl bg-secondary p-4 flex-shrink-0">
        <h1 className="text-xl font-bold text-primary text-center">Document Summarizer</h1>
      </header>
      <main className="flex-grow overflow-y-auto">
        {state.status === 'loading' && <LoadingState />}
        {state.status === 'success' && state.data && <SummaryView data={state.data} />}
        {state.status === 'no-document' && <NoDocumentState />}
        {state.status === 'error' && <ErrorState error={state.error} />}
      </main>
    </div>
  );
}

export default App;
