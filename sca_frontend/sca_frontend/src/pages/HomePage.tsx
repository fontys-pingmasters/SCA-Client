import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import InvitePlayer from '../components/InvitePlayer';
import MatchHistory from '../components/MatchHistory';
import SpectateMatches from '../components/SpectateMatches';
import Footer from '../components/Footer';
import LiveMatchesList from '../components/LiveMatchList';
import WebSocketInviteManager from '../components/WebSocketInviteManager';

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

const Homepage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState<{ firstName: string, elo: number } | null>(null);
  const { matchId } = useParams<{ matchId: string }>();

  console.log(users);

  useEffect(() => {
    fetchUsers();
    fetchUserMatches();
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/User/Id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch matches.");
      }

      const data = await response.json();
      setLoggedInUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/User`);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserMatches = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/api/EloHistory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch matches.");
      }

      const data = await response.json();
      setUserMatches(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInvite = async (opponentId: number) => {
    try {
      const response = await fetch(
        `${backendUrl}/Match`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: `{"opponent1Id" : ${opponentId}}`,
        }
      );

      if (!response.ok) throw new Error("Failed to send invite.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-5/6 w-5/6 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
        <div className="w-full -mt-10 mb-4">
          <ProfileHeader className="drop-shadow-lg w-full max-w-sm" username={loggedInUser?.firstName} elo={loggedInUser?.elo} />
        </div>
        <div className="lg:flex lg:justify-around lg:items-start lg:w-full lg:space-x-4">
          <div className="lg:w-1/3 lg:mx-auto">
            <h3 className="text-lg font-bold mb-2 mt-4 text-black">Spectate Matches</h3>
            <div className="mb-2">
              <LiveMatchesList />
            </div>
            <div className="">
              <SpectateMatches />
            </div>
        <WebSocketInviteManager/>
          </div>
          <div className='lg:w-1/3 lg:mx-auto'>
            <h3 className="text-lg font-bold mb-2 mt-4 text-black">Invite Player</h3>
            <InvitePlayer onInvite={handleInvite} />
          </div>
          <div className='lg:w-1/3 lg:mx-auto'>
            <h3 className="text-lg font-bold text-black mt-4 mb-2">Match History</h3>
            <MatchHistory eloHistories={userMatches} />
          </div>
        </div>
        <div className="w-full lg:w-1/4 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;