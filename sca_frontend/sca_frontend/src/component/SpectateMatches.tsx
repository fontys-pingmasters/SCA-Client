import React from 'react';

interface SpectateMatchesProps {
  className?: string;
}

const SpectateMatches: React.FC<SpectateMatchesProps> = ({ className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <h3 className="text-lg font-semibold mb-2">Spectate Matches</h3>
    <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
      View Live Matches
    </button>
  </div>
);

export default SpectateMatches;
