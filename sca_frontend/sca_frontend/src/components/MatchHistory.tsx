import React from 'react';
import MatchCard from './MatchCard';

interface Player {
  firstName: string;
}

interface Match {
  id: number;
  player1: Player | null;
  opponent1: Player | null;
  playerScore: number;
  opponentScore: number;
}

interface EloHistory {
  id: number;
  elo: number;
  eloChange: number;
  match: Match;
}

type MatchesListProps = {
  eloHistories: EloHistory[];
};

const MatchesList: React.FC<MatchesListProps> = ({ eloHistories }) => (
  <div className="flex flex-col rounded-lg p-4 bg-gray-100 shadow-lg">
    <div className="flex flex-col space-y-2">
      {eloHistories.map((eloHistory) => (
        <MatchCard
          key={eloHistory.id}
          playerName={eloHistory.match.player1?.firstName || 'Not found'}
          opponentName={eloHistory.match.opponent1?.firstName || 'Not found'}
          playerScore={eloHistory.match.playerScore}
          opponentScore={eloHistory.match.opponentScore}
          eloChange={eloHistory.eloChange}
        />
      ))}
    </div>
  </div>
);

export default MatchesList;
