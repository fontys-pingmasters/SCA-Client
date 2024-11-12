import React from 'react';

interface SpectateMatchesProps {
  className?: string;
}

const SpectateMatches: React.FC<SpectateMatchesProps> = ({ className }) => (
  <div className={`flex flex-col ${className}`}>
    <h3 className="text-lg font-bold mb-2 text-black">Spectate Matches</h3>
    <button className="drop-shadow-lg bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg w-full  items-center">
      View Live Matches
    </button>
  </div>
);

export default SpectateMatches;
