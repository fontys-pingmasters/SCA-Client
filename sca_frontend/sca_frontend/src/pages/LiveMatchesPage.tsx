// LiveMatchesPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LiveMatchesPage: React.FC = () => {
  const navigate = useNavigate();

  const matches = [
    { title: 'Erdem - Thomas', score: '0 - 0' },
    { title: 'Ties - Sjors', score: '4 - 6' },
    { title: 'Cliff - Thijs', score: '9 - 7' },
  ];

  const openScoreboard = (match: { title: string; score: string }) => {
    navigate('/scoreboard', { state: { matchTitle: match.title, score: match.score } });
  };

  return (
    <div className="live-matches-page p-4">
      <h1 className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">Live Matches</h1>
      {matches.map((match, index) => (
        <div
          key={index}
          className="bg-black text-white rounded-lg p-4 mb-2 cursor-pointer"
          onClick={() => openScoreboard(match)}
        >
          <span className="mr-2 text-red-500">🔴</span>
          {match.title}
        </div>
      ))}
    </div>
  );
};

export default LiveMatchesPage;