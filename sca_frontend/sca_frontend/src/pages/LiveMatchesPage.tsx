import React from 'react';
import LiveMatchesList from '../components/LiveMatchList';

const LiveMatchesPage: React.FC = () => {
  return (
    <div className="p-4">
      <LiveMatchesList />
    </div>
  );
};

export default LiveMatchesPage;