// src/components/InvitePlayer.tsx
import React, { useState } from 'react';

interface InvitePlayerProps {
  onInvite: (opponent: string) => void;
}

const InvitePlayer: React.FC<InvitePlayerProps> = ({ onInvite }) => {
  const [opponent, setOpponent] = useState('');

  const handleInvite = () => {
    onInvite(opponent); // Call the function passed via props
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Opponent username"
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
        className="flex-1 p-2 rounded border border-gray-300 text-black"
      />
      <button
        onClick={handleInvite}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 transition"
      >
        Invite
      </button>
    </div>
  );
};

export default InvitePlayer;
