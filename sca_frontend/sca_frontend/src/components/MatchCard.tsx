import React from 'react';

interface MatchCardProps {
  playerName: string;
  opponentName: string;
  playerScore: number;
  opponentScore: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ playerName, opponentName, playerScore, opponentScore }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-black rounded">
      <span className="text-white">{playerName}</span>
      <span className='text-white'>{playerScore}</span>
      <span className='text-white'>{opponentScore}</span>
      <span className='text-white'>{opponentName}</span>
      {/* <span className={points > 0 ? 'text-green-500' : 'text-red-500'}>
        {result} {points > 0 ? `+${points}` : points}
      </span> */}
    </div>
  );
};

export default MatchCard;
