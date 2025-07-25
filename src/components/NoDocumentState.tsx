import React from 'react';
import StateView from './StateView';

const NoDocumentState: React.FC = () => (
  <StateView>
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-primary mb-2">No Document Found</h2>
    <p className="text-primary/70 text-sm text-center">
      No summarizable document detected on this page. Try visiting a Terms of Service, Privacy Policy, or EULA page.
    </p>
  </StateView>
);


export default NoDocumentState;