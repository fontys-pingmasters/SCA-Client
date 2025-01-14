import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpectateMatches: React.FC = () => {
  const navigate = useNavigate();

  const handleViewLiveMatches = () => {
    navigate('/live-matches');
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleViewLiveMatches}
        className="drop-shadow-lg bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg w-full items-center hover:opacity-80"
      >
        View All Live Matches
      </button>
    </div>
  );
};

export default SpectateMatches;