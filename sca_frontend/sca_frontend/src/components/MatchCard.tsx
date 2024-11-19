import React from 'react';

interface MatchCardProps {
  details: string;
  result: 'Win' | 'Loss';
  points: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ details, result, points }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-black rounded">
      <span className="text-white">{details}</span>
      <span className={points > 0 ? 'text-green-500' : 'text-red-500'}>
        {result} {points > 0 ? `+${points}` : points}
      </span>
    </div>
  );
};

export default MatchCard;
