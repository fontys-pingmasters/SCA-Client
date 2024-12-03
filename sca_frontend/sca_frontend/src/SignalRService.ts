import * as signalR from "@microsoft/signalr";
import { Match } from "./Types";

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  onMatchesUpdate: (matches: Match[]) => void
): Promise<void> => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://your-backend-url/hub/matchHub") // Replace backend hub URL!!!!!!!!!!
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ReceiveMessage", (matches: Match[]) => {
    console.log("Live updates received:", matches);
    onMatchesUpdate(matches); // Notify subscribers of the update
  });

  try {
    await connection.start();
    console.log("SignalR connected");
  } catch (err) {
    console.error("Error connecting to SignalR:", err);
  }
};

export const stopSignalRConnection = async (): Promise<void> => {
  if (connection) {
    try {
      await connection.stop();
      console.log("SignalR disconnected");
    } catch (err) {
      console.error("Error disconnecting SignalR:", err);
    }
  }
};
