import React from 'react';

interface MatchCardProps {
  playerName: string;
  opponentName: string;
  playerScore: number;
  opponentScore: number;
  eloChange: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ playerName, opponentName, playerScore, opponentScore, eloChange }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-black rounded">
      <span className="text-white mx-2">{playerName}</span>
      <span className="text-white mx-2">{playerScore}</span>
      <span className="text-white">-</span>
      <span className="text-white mx-2">{opponentScore}</span>
      <span className="text-white mx-2">{opponentName}</span>
      <span className={eloChange > 0 ? 'text-green-500' : 'text-red-500'}>
        {eloChange > 0 ? `+${eloChange}` : eloChange}
      </span>
    </div>
  );
};

export default MatchCard;
