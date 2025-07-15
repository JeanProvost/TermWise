import React from 'react';
import StateView from './StateView';

const LoadingState: React.FC = () => (
  <StateView>
    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-tertiary">Analyzing document...</p>
  </StateView>
);

export default LoadingState;