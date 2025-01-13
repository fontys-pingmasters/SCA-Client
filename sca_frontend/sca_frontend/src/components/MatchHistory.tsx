import React from 'react';
import MatchCard from './MatchCard';

interface Player {
  firstName: string;
}

interface Match {
  id: number;
  player1: Player | null;
  player2: Player | null;
  opponent1: Player | null;
  opponent2: Player | null;
  playerScore: number;
  opponentScore: number;
}

type MatchesListProps = {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => (
  <div className="flex flex-col rounded-lg p-4 bg-gray-100 shadow-lg">
    <div className="flex flex-col space-y-2">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          playerName={match.player1?.firstName || "Not found"}
          playerScore={match.playerScore}
          opponentScore={match.opponentScore}
          opponentName={match.opponent1?.firstName || "Not found"}
        />
      ))}
    </div>
  </div>
);

export default MatchesList;
