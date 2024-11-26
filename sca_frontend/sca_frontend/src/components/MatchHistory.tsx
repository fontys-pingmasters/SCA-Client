import React from 'react';
import MatchCard from './MatchCard';

interface MatchHistoryProps {
  matches: { details: string; result: "Win" | "Loss"; points: number }[];
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches }) => (
  <div className="flex flex-col rounded-lg p-4 bg-gray-100 shadow-lg">
    <h3 className="text-lg font-bold text-black mb-2">Match History</h3>
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
