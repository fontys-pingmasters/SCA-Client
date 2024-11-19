import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateScorePage: React.FC = () => {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>(); // Retrieve matchId from URL parameters
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [matchTitle, setMatchTitle] = useState('');
  const [creatorId, setCreatorId] = useState(0);

  const [matchDetails, setMatchDetails] = useState<any>(null);

  // Fetch match details on component mount
  useEffect(() => {
    fetchMatchDetails();
  }, [matchId]);

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7035/Match/${matchId}`);
      if (!response.ok) throw new Error('Failed to fetch match details.');

      const data = await response.json();
      setMatchDetails(data);

      // Initialize scores and other details from the fetched match details
      setScorePlayer1(data.playerScore);
      setScorePlayer2(data.opponentScore);
      setMatchTitle(data.title); // Assuming `title` is a field in your API response
      setCreatorId(data.creatorId); // Assuming `creatorId` is a field in your API response
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const incrementScorePlayer1 = () => setScorePlayer1(scorePlayer1 + 1);
  const incrementScorePlayer2 = () => setScorePlayer2(scorePlayer2 + 1);
  const decrementScorePlayer1 = () => setScorePlayer1(Math.max(scorePlayer1 - 1, 0));
  const decrementScorePlayer2 = () => setScorePlayer2(Math.max(scorePlayer2 - 1, 0));

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://localhost:7035/UpdateMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MatchId: parseInt(matchId || '0'), // Ensure matchId is a number
          CreatorId: creatorId,
          PlayerScore: scorePlayer1,
          OpponentScore: scorePlayer2,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update match.");
      }

      alert("Match updated successfully!");
      navigate('/live-matches'); // Navigate back to the live matches page after successful update
    } catch (error) {
      alert("Failed to update match. Please try again.");
      console.error('Error updating match:', error);
    }
  };

  return (
    <div className="update-score-page flex flex-col items-center justify-center h-screen p-4">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-t">
            {matchTitle || 'Match Details'}
          </h2>
          <button
            onClick={() => navigate('/live-matches')}
            className="text-red-500 hover:text-red-700"
          >
            ❌
          </button>
        </div>

        <div className="text-4xl font-bold text-center text-white mb-6">
          {scorePlayer1} - {scorePlayer2}
        </div>

        <div className="flex justify-around mb-4">
          <div className="text-center">
            <button
              onClick={incrementScorePlayer1}
              className="bg-green-500 text-white px-4 py-2 rounded mb-2"
            >
              +1
            </button>
            <button
              onClick={decrementScorePlayer1}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              -1
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={incrementScorePlayer2}
              className="bg-green-500 text-white px-4 py-2 rounded mb-2"
            >
              +1
            </button>
            <button
              onClick={decrementScorePlayer2}
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
