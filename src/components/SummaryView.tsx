import React from 'react';

export interface SummaryData {
  summary: string;
  documentType: string;
  wordCount: number;
  url: string;
  timestamp: number;
}

interface SummaryViewProps {
  data: SummaryData;
}

const SummaryView: React.FC<SummaryViewProps> = ({ data }) => (
  <div className="space-y-4">
    <div className="bg-white/50 rounded-lg p-4 border border-secondary/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-secondary">
          {data.documentType}
        </span>
        <span className="text-xs text-tertiary/70">
          {data.wordCount} words
        </span>
      </div>
      <h2 className="text-lg font-semibold text-tertiary mb-3">Summary</h2>
      <p className="text-tertiary/90 leading-relaxed whitespace-pre-wrap">
        {data.summary}
      </p>
    </div>
    
    <div className="text-xs text-tertiary/60 text-center">
      Generated {new Date(data.timestamp).toLocaleTimeString()}
    </div>
  </div>
);

export default SummaryView; 