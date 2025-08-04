import React from 'react';

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface SectionalSummary {
  section_title: string;
  detailed_summary: string;
}

export interface SummaryData {
  summary: string;
  keyTerms: KeyTerm[];
  sectionalSummaries: SectionalSummary[];
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
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-primary">
          {data.documentType}
        </span>
        <span className="text-xs text-primary/70">
          {data.wordCount} words
        </span>
      </div>
      
      <h2 className="text-lg font-semibold text-primary mb-3">Overview</h2>
      <p className="text-primary/90 leading-relaxed mb-6">
        {data.summary}
      </p>
      
      {data.keyTerms && data.keyTerms.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-primary mb-3">Key Terms</h2>
          <div className="space-y-3 mb-6">
            {data.keyTerms.map((term, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-3">
                <h3 className="font-semibold text-primary text-sm">{term.term}</h3>
                <p className="text-primary/80 text-sm">{term.definition}</p>
              </div>
            ))}
          </div>
        </>
      )}
      
      {data.sectionalSummaries && data.sectionalSummaries.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-primary mb-3">Section Details</h2>
          <div className="space-y-4">
            {data.sectionalSummaries.map((section, index) => (
              <div key={index} className="bg-background/50 rounded-lg p-3">
                <h3 className="font-semibold text-primary text-sm mb-2">{section.section_title}</h3>
                <p className="text-primary/80 text-sm leading-relaxed">{section.detailed_summary}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    
    <div className="text-xs text-primary/60 text-center flex-shrink-0">
      Generated {new Date(data.timestamp).toLocaleTimeString()}
    </div>
  </div>
);

export default SummaryView; 