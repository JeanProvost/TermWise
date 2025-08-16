const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface SummarizationRequest {
  text: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface SectionalSummary {
  section_title: string;
  detailed_summary: string;
}

export interface SummarizationResponse {
  document_type: string;
  overall_summary: string;
  key_terms: KeyTerm[];
  sectional_summaries: SectionalSummary[];
}

// --- API Service Functions ---

/**
 * Sends text to the backend for summarization.
 * @param text The text to be summarized.
 * @returns A promise that resolves to the summarization response.
 */
export async function summarizeText(text: string): Promise<SummarizationResponse> {
  const response = await fetch(`${API_BASE_URL}/summarize/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text } as SummarizationRequest),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json() as SummarizationResponse;
}

 