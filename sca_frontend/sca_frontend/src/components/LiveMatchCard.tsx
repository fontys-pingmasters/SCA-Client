import React from 'react';

interface LiveMatchCardProps {
  player1: string; // for interface comments, see this as example, I suggest making player and score into one object if that is feasible, might be more neat
  score1: number;
  player2: string;
  score2: number;
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ player1, score1, player2, score2 }) => {
  return (
    <div className="flex items-center bg-black text-white rounded-md p-3 mb-2">
      <span className="text-red-500 mr-3">● {/* use icons instead of unicode symbol */}</span>
      <span>{`${player1} ${score1} - ${score2} ${player2}`}</span>
    </div>
  );
};

export default LiveMatchCard;
