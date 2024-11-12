import React from 'react';
import {useNavigate } from 'react-router-dom'

interface SpectateMatchesProps {
  className?: string;
}

const handleViewLiveMatches = () => {
  const navigate = useNavigate();
  navigate('/live-matches'); // Navigates to the Live Matches page
};

const SpectateMatches: React.FC<SpectateMatchesProps> = ({ className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <h3 className="text-lg font-semibold mb-2">Spectate Matches</h3>
    <button onClick={handleViewLiveMatches} className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
      View Live Matches
    </button>
  </div>
);

export default SpectateMatches;
