import React from 'react';

interface StateViewProps {
  children: React.ReactNode;
}

const StateView: React.FC<StateViewProps> = ({ children }) => (
  <div className="rounded-2xl bg-secondary p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
    {children}
  </div>
);

export default StateView;