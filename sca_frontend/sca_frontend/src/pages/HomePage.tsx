import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChartBar, FaHome, FaUser } from 'react-icons/fa';
import ProfileHeader from '../components/ProfileHeader';
import InvitePlayer from '../components/InvitePlayer';
import MatchHistory from '../components/MatchHistory';
import SpectateMatches from '../components/SpectateMatches';

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

const Homepage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState<{ firstName: string } | null>(null);
  const { matchId } = useParams<{ matchId: string }>();

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
      const response = await fetch(`${backendUrl}/Match/user/${matchId}`, {
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
      <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
        <div className="w-full -mt-10 mb-4">
          <ProfileHeader className="drop-shadow-lg w-full max-w-sm" username={loggedInUser?.firstName} elo={1300} /> {/* Mijn naam moet geen hardcode zijn :( */}
        </div>

        <InvitePlayer
          onInvite={handleInvite}
        />
        <SpectateMatches/>
        <MatchHistory matches={userMatches} />

        <div className="w-full bottom-0 flex justify-between pt-5">
          <div className="text-gray-700 text-4xl">
            <FaChartBar />
          </div>
          <div className="text-orange-500 text-4xl">
            <FaHome />
          </div>
          <div className="text-gray-700 text-4xl">
            <FaUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;