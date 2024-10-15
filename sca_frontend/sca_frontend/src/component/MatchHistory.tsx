import React from 'react';
import MatchCard from './MatchCard';

interface MatchHistoryProps {
  matches: { details: string; result: 'Win' | 'Loss'; points: number }[];
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ matches }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">Match History</h3>
    {matches.map((match, index) => (
      <MatchCard key={index} details={match.details} result={match.result} points={match.points} />
    ))}
  </div>
);

export default MatchHistory;
