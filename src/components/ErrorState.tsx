import React from 'react';

interface ErrorStateProps {
  error?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-tertiary mb-2">Error</h2>
    <p className="text-tertiary/70 text-sm">
      {error || 'Unable to process the document. Please try again.'}
    </p>
  </div>
);

export default ErrorState; 