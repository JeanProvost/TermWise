import React from 'react';

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-tertiary">Analyzing document...</p>
  </div>
);

export default LoadingState; 