import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from "react-icons/bs";
import { HubConnectionBuilder } from '@microsoft/signalr';

interface Match {
  playerFirstName: string;
  opponentFirstName: string;
  playerScore: number;
  opponentScore: number;
}

const LiveMatchesList: React.FC = () => {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Match[]>([]);

  const openScoreboard = (match: Match) => {
    const matchTitle = `${match.playerFirstName} - ${match.opponentFirstName}`;
    const score = `${match.playerScore} - ${match.opponentScore}`;
    navigate('/scoreboard', { state: { matchTitle, score } });
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5008/matchHub')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to websocket");
        connection.on('ReceiveMessage', (receivedMatches: Match[]) => {
          console.info("Received matches:", receivedMatches);
          setMatches(receivedMatches);
        });
      })
      .catch(err => console.error("WebSocket connection error:", err));

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    <div className="live-matches-page p-4">
      <h1 className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
        Live Matches
      </h1>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div
            key={index}
            className="bg-black text-white rounded-lg p-4 mb-2 cursor-pointer"
            onClick={() => openScoreboard(match)}
          >
            <BsFillCircleFill
              className="text-red-500 inline-block mr-2"
              size={14}
            />
            {`${match.playerFirstName} - ${match.opponentFirstName}`}
            <span className="block text-gray-400">{`${match.playerScore} - ${match.opponentScore}`}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No live matches available</p>
      )}
    </div>
  );
};

export default LiveMatchesList;