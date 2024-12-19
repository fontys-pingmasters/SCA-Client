import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const ScoreboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchTitle, score } = location.state || { matchTitle: '', score: '' };

  return (
    <div className="scoreboard-page flex flex-col items-center justify-center h-screen p-4">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md"> {/* Why nest divs here? not bad perse, check reasoning though */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-t">
            {matchTitle}
          </h2>
          <button
            onClick={() => navigate('/live-matches')}
            className="text-red-500 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="text-4xl font-bold text-center black">{score}</div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
