import React, {createContext, useContext, useEffect, useState} from 'react';
import * as signalR from '@microsoft/signalr';

const SignalRContext = createContext<signalR.HubConnection | null>(null);

export const useSignalRConnection = () => useContext(SignalRContext);

export const SignalRProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7035/matchHub")
        .withAutomaticReconnect()
        .build();

        hubConnection
        .start()
        .then(() => console.log("SignalR connection established"))
        .catch(err => console.log("SignalR connection error:", err))

        setConnection(hubConnection);

        return () => {
            hubConnection.stop();
        };
    }, []);

    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    )
}