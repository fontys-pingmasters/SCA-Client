import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from 'react-icons/fa';

const UpdateScorePage: React.FC = () => {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  const [scorePlayer1, setScorePlayer1] = useState(0); //interface
  const [scorePlayer2, setScorePlayer2] = useState(0); //interface
  const [matchTitle, setMatchTitle] = useState(''); //interface
  const [creatorId, setCreatorId] = useState(0); //interface

  const [setMatchDetails] = useState<any>(null); //<<interface here

  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

  useEffect(() => {
    fetchMatchDetails();
  }, [matchId]);

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/Match/${matchId}`);
      if (!response.ok) throw new Error('Failed to fetch match details.'); //catch

      const data = await response.json();
      setMatchDetails(data);

      setScorePlayer1(data.playerScore);
      setScorePlayer2(data.opponentScore);
      setMatchTitle(data.title);
      setCreatorId(data.creatorId);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const incrementScorePlayer1 = () => setScorePlayer1(scorePlayer1 + 1); // what is this?
  const incrementScorePlayer2 = () => setScorePlayer2(scorePlayer2 + 1); // what is this?
  const decrementScorePlayer1 = () => setScorePlayer1(Math.max(scorePlayer1 - 1, 0)); // what is this?
  const decrementScorePlayer2 = () => setScorePlayer2(Math.max(scorePlayer2 - 1, 0)); // what is this?

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/Match`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          MatchId: parseInt(matchId || '0'), // Ensure matchId is a number
          CreatorId: creatorId, //use interface
          PlayerScore: scorePlayer1, //use interface
          OpponentScore: scorePlayer2, //use interface
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update match.");
      }

      toast.success("Match updated successfully!");
      navigate('/live-matches');
    } catch (error) {
      console.error('Error updating match:', error);
      toast.error("Failed to update match. Please try again.");
    }
  };

  return (
    <div className="update-score-page flex flex-col items-center justify-center h-screen p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-t">
            {matchTitle || 'Match Details'}
          </h2>
          <button
            onClick={() => navigate('/live-matches')}
            className="text-red-500 hover:text-red-700"
          >
            <FaTimes /> 
          </button>
        </div>

        <div className="text-4xl font-bold text-center text-white mb-6">
          {scorePlayer1} - {scorePlayer2}
        </div>

        <div className="flex justify-around mb-4">
          <div className="text-center">
            <button
              onClick={incrementScorePlayer1} // see function
              className="bg-green-500 text-white px-4 py-2 rounded mb-2"
            >
              +1
            </button>
            <button
              onClick={decrementScorePlayer1} // see function
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              -1
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={incrementScorePlayer2} // see function
              className="bg-green-500 text-white px-4 py-2 rounded mb-2"
            >
              +1
            </button>
            <button
              onClick={decrementScorePlayer2} // see function
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              -1
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Update Match
        </button>
      </div>
    </div>
  );
};

export default UpdateScorePage;
