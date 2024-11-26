import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface LiveMatchCardProps {
  player1: string;
  score1: number;
  player2: string;
  score2: number;
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ player1, score1, player2, score2 }) => {
  return (
    <div className="flex items-center bg-black text-white rounded-md p-3 mb-2">
            <span className="text-red-500 mr-3">
        <FaCircle />
      </span>
      <span>{`${player1} ${score1} - ${score2} ${player2}`}</span>
    </div>
  );
};

export default LiveMatchCard;
