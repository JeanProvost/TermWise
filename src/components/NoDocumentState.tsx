import React from 'react';

const NoDocumentState: React.FC = () => (
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
);

export default NoDocumentState; 