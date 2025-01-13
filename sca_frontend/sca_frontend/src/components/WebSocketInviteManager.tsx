import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import { useSignalRConnection } from "../SignalRContext";

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

interface Invite {
    sender?: {
        name: string;
    };
    matchId: string;
}

const WebSocketInviteManager: React.FC = () => {
    const connection = useSignalRConnection();
    const [invite, setInvite] = useState<Invite | null>(null);
    // const [connection, setConnection] = useState<HubConnection | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        connection?.on("ReceiveMessage", (invitations: Invite[]) => {
            if (invitations && invitations.length > 0) {
                    setInvite(invitations[0]); // Set the latest invite
                }
        })
        // const connection = new HubConnectionBuilder()
        //     .withUrl(`${backendUrl}/matchHub`)
        //     .withAutomaticReconnect()
        //     .build();

        // connection
        //     .start()
        //     .then(() => {
        //         console.log("Connected to WebSocket for invitations");

        //         connection.on("ReceiveMessage", (invitations: Invite[]) => {
        //             if (invitations && invitations.length > 0) {
        //                 setInvite(invitations[0]); // Set the latest invite
        //             }
        //         });

        //         setConnection(connection);
        //     })
        //     .catch((err) => console.error("Error with WebSocket connection:", err));

        return () => {
            if (connection) {
                connection.stop();
                console.log("WebSocket connection stopped");
            }
        };
    }, [backendUrl]);

    const handleAccept = () => {
        console.log("Invite accepted:", invite);
        if (invite && invite.matchId) {
            navigate(`/update-score/${invite.matchId}`);
        }
    };

    const handleReject = () => {
        console.log("Invite rejected:", invite);
        setInvite(null);
    };

    return (
        <div>
            {invite && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 z-50 max-w-sm text-center">
                    <p className="font-semibold mb-2">
                        <span className="text-blue-500">{invite.sender?.name}</span> has invited you to Match ID{" "}
                        <span className="text-gray-700">{invite.matchId}</span>.
                    </p>
                    <div className="flex justify-center space-x-4 mt-3">
                        <button
                            onClick={handleAccept}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleReject}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebSocketInviteManager;