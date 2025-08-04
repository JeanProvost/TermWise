const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface SummarizationRequest {
  text: string;
}

export interface SummarizationResponse {
  summary: string;
  key_points: string[];
}

export interface ClassificationRequest {
  text: string;
}

export interface ClassificationResponse {
  document_type: string;
  confidence: number;
}

// --- API Service Functions ---

/**
 * Sends text to the backend for summarization.
 * @param text The text to be summarized.
 * @returns A promise that resolves to the summarization response.
 */
export async function summarizeText(text: string): Promise<SummarizationResponse> {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
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

/**
 * Sends text to the backend for classification.
 * @param text The text to be classified.
 * @returns A promise that resolves to the classification response.
 */
export async function classifyText(text: string): Promise<ClassificationResponse> {
  const response = await fetch(`${API_BASE_URL}/classify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text } as ClassificationRequest),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json() as ClassificationResponse;
} 