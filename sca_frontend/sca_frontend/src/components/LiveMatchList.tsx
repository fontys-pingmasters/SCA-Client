import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from "react-icons/bs";
import { HubConnectionBuilder } from '@microsoft/signalr';

interface match{
  playerFirstName:string,
  opponentFirstName:string,
  playerScore:number,
  opponentScore:number,
}

const LiveMatchesList: React.FC = () => {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<match[]>([]);

  const openScoreboard = (match: { title: string; score: string }) => {
    navigate('/scoreboard', { state: { matchTitle: match.title, score: match.score } });
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5008/matchHub')
        .withAutomaticReconnect()
        .build();

        connection.start()
        .then(() => {
            console.log("connected to websocket");
            connection.on('ReceiveMessage', (matches: match[]) => {
                console.info(matches);
                setMatches(matches);
            })
        })
        .catch(err => console.error(err));

        return () => {
            if(connection) {
                connection.stop();
            }
        }
  }, [])

  return (
    <div className="live-matches-page p-4">
      <h1 className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
        Live Matches
      </h1>
      {matches.map((match, index) => (
        <div
          key={index}
          className="bg-black text-white rounded-lg p-4 mb-2 cursor-pointer"
          onClick={() => openScoreboard(match)}
        >
          <BsFillCircleFill
            className="text-red-500 inline-block mr-2"
            size={14}
          />
          {match.title}
        </div>
      ))}
    </div>
  );
};

export default LiveMatchesList;