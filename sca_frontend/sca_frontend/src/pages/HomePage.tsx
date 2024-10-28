  import React, { useEffect, useState } from 'react';
  import ProfileHeader from '../component/ProfileHeader';
  import InvitePlayer from '../component/InvitePlayer';
  import MatchHistory from '../component/MatchHistory';
  import SpectateMatches from '../component/SpectateMatches';
  
  const Homepage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Check on component mount
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
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
      <div className={`homepage-container ${isMobile ? 'flex-col items-center' : 'flex-row'} p-4`}>
        <ProfileHeader className="w-full max-w-sm mb-4" username="Erdem" elo={1300} />
        <InvitePlayer className="w-full max-w-sm mb-4" onInvite={handleInvite} />
        <SpectateMatches className="w-full max-w-sm mb-4" />
        <MatchHistory className="w-full max-w-sm" matches={matches} />
      </div>

    );
  };
  
  export default Homepage;
  