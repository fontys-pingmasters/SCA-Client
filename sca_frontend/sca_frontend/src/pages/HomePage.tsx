import React, { useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import InvitePlayer from '../components/InvitePlayer';
import MatchHistory from '../components/MatchHistory';
import SpectateMatches from '../components/SpectateMatches';

const Homepage: React.FC = () => {
  const [users, setUsers] = useState([]);

  const matches = [
    { details: 'You 11 - 5 Thomas', result: 'Win' as 'Win', points: 100 },
    { details: 'You 11 - 4 Sjors', result: 'Win' as 'Win', points: 50 },
    { details: 'You 11 - 3 Mika', result: 'Win' as 'Win', points: 30 },
    { details: 'You 1 - 11 Allert', result: 'Loss' as 'Loss', points: -50 },
    { details: 'You 13 - 11 Cliff', result: 'Win' as 'Win', points: 20 },
  ];

  const sampleUsers = [
    { firstName: 'John', lastName: 'Smith', id: 1 },
    { firstName: 'Jane', lastName: 'Doe', id: 2 },
    { firstName: 'Sam', lastName: 'Johnson', id: 3 },
    { firstName: 'Chris', lastName: 'Lee', id: 4 },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7035/User");

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = async (opponentId: number) => {

    try {
      const response = await fetch(
        "https://localhost:7035/Match",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(opponentId), //< error here, JSON object not satisfied json object looks like {opponentId} instead of { "opponent1Id": opponentId }
        }
      );

      if (!response.ok) throw new Error("Failed to send invite.");
    } catch (error) {

    }

    const invitedUser = sampleUsers.find(user => user.id === opponentId);
    if (invitedUser) {
      console.log(`Invited ${invitedUser.firstName} ${invitedUser.lastName}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
        <div className="w-full -mt-10 mb-4">
          <ProfileHeader className="drop-shadow-lg w-full max-w-sm" username="Erdem" elo={1300} />
        </div>

        <InvitePlayer
          className="w-full max-w-sm mb-4"
          onInvite={handleInvite}
          users={users} 
        />
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
