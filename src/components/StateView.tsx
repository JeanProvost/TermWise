import React from 'react';

interface StateViewProps {
  children: React.ReactNode;
}

const StateView: React.FC<StateViewProps> = ({ children }) => (
  <div className="flex flex-col items-center justify-center py-12">
    {children}
  </div>
);

export default StateView; 