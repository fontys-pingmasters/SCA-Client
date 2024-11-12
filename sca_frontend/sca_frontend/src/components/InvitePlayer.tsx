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
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-lg font-bold mb-2 text-black">Invite Player</h3>
      <div className="flex items-center w-full drop-shadow-lg">
        <input
          type="text"
          placeholder="Opponent's name"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          className="flex-1 p-2 rounded-l-lg"
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
