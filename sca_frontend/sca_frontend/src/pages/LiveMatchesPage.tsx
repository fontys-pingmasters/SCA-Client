import React from 'react';
import LiveMatchCard from '../component/LiveMatchCard';

const LiveMatches: React.FC = () => {
  const matches = [
    { player1: 'Erdem', score1: 0, player2: 'Thomas', score2: 0 },
    { player1: 'Ties', score1: 4, player2: 'Sjors', score2: 6 },
    { player1: 'Cliff', score1: 9, player2: 'Thijs', score2: 7 },
  ];

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
        Live Matches
      </div>
      {matches.map((match, index) => (
        <LiveMatchCard
          key={index}
          player1={match.player1}
          score1={match.score1}
          player2={match.player2}
          score2={match.score2}
        />
      ))}
    </div>
  );
};

export default LiveMatches;

