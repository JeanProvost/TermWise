import React from 'react';

interface StateViewProps {
  children: React.ReactNode;
}

const StateView: React.FC<StateViewProps> = ({ children }) => (
  <div className="rounded-lg bg-primary p-[5px]">
    <div className="flex flex-col items-center justify-center rounded-lg border border-primary py-12">
      {children}
    </div>
  </div>
);

export default StateView;