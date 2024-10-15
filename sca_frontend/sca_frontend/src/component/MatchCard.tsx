import React from 'react';

interface MatchCardProps {
  details: string;
  result: 'Win' | 'Loss';
  points: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ details, result, points }) => (
  <div
    className={`flex justify-between items-center bg-gray-700 p-3 mb-2 rounded border-l-4 ${
      result === 'Win' ? 'border-green-500' : 'border-red-500'
    }`}
  >
    <span>{details}</span>
    <span>{result}</span>
    <span className={`font-bold ${points >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {points >= 0 ? `+${points}` : points}
    </span>
  </div>
);

export default MatchCard;
