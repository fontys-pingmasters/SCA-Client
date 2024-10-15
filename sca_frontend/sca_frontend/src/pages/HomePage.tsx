import React from 'react';
import ProfileHeader from '../component/ProfileHeader';
import InvitePlayer from '../component/InvitePlayer';
import MatchHistory from '../component/MatchHistory';
import SpectateMatches from '../component/SpectateMatches';

const Homepage: React.FC = () => {
  const matches = [
    { details: 'You 11 - 5 Thomas', result: 'Win' as 'Win', points: 100 },
    { details: 'You 11 - 4 Sjors', result: 'Win' as 'Win', points: 50 },
    { details: 'You 11 - 3 Mika', result: 'Win' as 'Win', points: 30 },
    { details: 'You 11 - 1 Allert', result: 'Win' as 'Win', points: 50 },
    { details: 'You 13 - 11 Cliff', result: 'Win' as 'Win', points: 20 },
  ];

  const handleInvite = (opponent: string) => {
    console.log(`Invited ${opponent}`);
  };

  return (
    <div className="home-page">
      <ProfileHeader username="Erdem" elo={1300} />
      <InvitePlayer onInvite={handleInvite} />
      <SpectateMatches />
      <MatchHistory matches={matches} />
    </div>
  );
};

export default Homepage;