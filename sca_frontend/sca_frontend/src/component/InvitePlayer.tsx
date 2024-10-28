import React, { useState } from 'react';

interface InvitePlayerProps {
  onInvite: (opponent: string) => void;
  className?: string;
}

const InvitePlayer: React.FC<InvitePlayerProps> = ({ onInvite, className }) => {
  const [opponent, setOpponent] = useState('');

  const handleInvite = () => {
    onInvite(opponent);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Invite Player</h3>
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Opponent username"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          className="flex-1 p-2 rounded-l-lg border border-gray-300"
        />
        <button
          onClick={handleInvite}
          className="bg-orange-500 text-white p-2 rounded-r-lg"
        >
          📧
        </button>
      </div>
    </div>
  );
};

export default InvitePlayer;
