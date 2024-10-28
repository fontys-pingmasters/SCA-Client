import React from 'react';
import MatchCard from './MatchCard';

interface MatchHistoryProps {
  matches: { details: string; result: 'Win' | 'Loss'; points: number }[];
  className?: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches, className }) => (
  <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
    <div className="flex flex-col w-full h-24">
      <h3 className="text-lg font-semibold mb-4 text-white">Match History</h3> 
    </div>
    <div className="flex flex-col space-y-2">
      {matches.map((match, index) => (
        <MatchCard
          key={index}
          details={match.details}
          result={match.result}
          points={match.points}
        />
      ))}
    </div>
  </div>
);

export default MatchHistory;
