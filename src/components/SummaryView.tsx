import React from 'react';

export interface SummaryData {
  summary: string;
  keyPoints: string[];
  documentType: string;
  wordCount: number;
  url: string;
  timestamp: number;
}

interface SummaryViewProps {
  data: SummaryData;
}

const SummaryView: React.FC<SummaryViewProps> = ({ data }) => (
  <div className="space-y-4 h-full flex flex-col">
    <div className="rounded-2xl bg-secondary p-4 flex-grow overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-primary">
          {data.documentType}
        </span>
        <span className="text-xs text-primary/70">
          {data.wordCount} words
        </span>
      </div>
      <h2 className="text-lg font-semibold text-primary mb-3">Summary</h2>
      <p className="text-primary/90 leading-relaxed whitespace-pre-wrap">
        {data.summary}
      </p>
      
      <h2 className="text-lg font-semibold text-primary mt-4 mb-3">Key Points</h2>
      <ul className="list-disc list-inside space-y-2">
        {data.keyPoints.map((point, index) => (
          <li key={index} className="text-primary/90">
            {point}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="text-xs text-primary/60 text-center flex-shrink-0">
      Generated {new Date(data.timestamp).toLocaleTimeString()}
    </div>
  </div>
);

export default SummaryView; 