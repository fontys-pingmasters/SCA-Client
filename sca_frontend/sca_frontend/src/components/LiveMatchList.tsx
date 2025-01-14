import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from "react-icons/bs";
import { HubConnectionBuilder } from '@microsoft/signalr';

interface Match {
    player1: Player,
    player2: Player,
    opponent1: Player,
    opponent2: Player,
    playerScore: number,
    opponentScore: number,
}

interface Player {
    firstName: string
}

const LiveMatchesList: React.FC = () => {
    const navigate = useNavigate();

    const [matches, setMatches] = useState<Match[]>([]);

    const openScoreboard = (match: Match) => {
        const matchTitle = `${match.player1.firstName} - ${match.opponent1.firstName}`;
        const score = `${match.playerScore} - ${match.opponentScore}`;
        navigate('/scoreboard', { state: { matchTitle, score } });
    };

    useEffect(() => {
        fetch('http://localhost:5008/match')
            .then(response => response.json())
            .then(result => {
                console.log('Fetched matches:', result);
                setMatches(result);
            })
            .catch(err => {
                console.error('Error fetching matches:', err);
            });
            
        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:5008/matchHub')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("Connected to Websocket");
                connection.on('ReceiveMessage', (matches: Match[]) => {
                    console.info('Received live matches:', matches);
                    setMatches(matches);
                });
            })
            .catch(err => console.error('Error with Websocket connection:', err));

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
                    {`${match.player1.firstName} - ${match.opponent1.firstName}`}
                    <span className="block text-gray-400">{`${match.playerScore} - ${match.opponentScore}`}</span>
                </div>
            ))}
        </div>
    );
};

export default LiveMatchesList;