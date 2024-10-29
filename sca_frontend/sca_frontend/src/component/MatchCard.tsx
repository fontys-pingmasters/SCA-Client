import React from 'react';

interface MatchCardProps {
  details: string;
  result: 'Win' | 'Loss';
  points: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ details, result, points }) => {
  return (
    <div className="flex justify-between items-center w-full p-2 bg-black rounded text-white">
      <span>{details}</span>
      <span className={`text-${points >= 0 ? 'green-500' : 'red-500'}`}>
        {result} {points > 0 ? `+${points}` : points}
      </span>
    </div>
  );
};

export default MatchCard;
