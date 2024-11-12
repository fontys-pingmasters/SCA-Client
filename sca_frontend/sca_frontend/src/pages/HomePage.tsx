import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import InvitePlayer from '../components/InvitePlayer';
import MatchHistory from '../components/MatchHistory';
import SpectateMatches from '../components/SpectateMatches';

const Homepage: React.FC = () => {
  const matches = [
    { details: 'You 11 - 5 Thomas', result: 'Win' as 'Win', points: 100 },
    { details: 'You 11 - 4 Sjors', result: 'Win' as 'Win', points: 50 },
    { details: 'You 11 - 3 Mika', result: 'Win' as 'Win', points: 30 },
    { details: 'You 1 - 11 Allert', result: 'Loss' as 'Loss', points: -50 },
    { details: 'You 13 - 11 Cliff', result: 'Win' as 'Win', points: 20 },
  ];

  const handleInvite = (opponent: string) => {
    console.log(`Invited ${opponent}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
        <div className="w-full -mt-10 mb-4">
          <ProfileHeader className="drop-shadow-lg w-full max-w-sm" username="Erdem" elo={1300} />
        </div>

        <InvitePlayer className="w-full max-w-sm mb-4" onInvite={handleInvite} />
        <SpectateMatches className="w-full max-w-sm mb-4" />
        <MatchHistory className="w-full max-w-sm" matches={matches} />

        <div className="w-full bottom-0 flex justify-between pt-5">
          <div className="text-gray-700 text-4xl">📊</div>
          <div className="text-orange-500 text-4xl">🏠</div>
          <div className="text-gray-700 text-4xl">👤</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
