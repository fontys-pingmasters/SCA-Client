import React from "react";
import { FaChartBar, FaHome, FaUser } from "react-icons/fa";

const LeaderboardPage = () => {
    const topThree = [
        { name: "Erdem", score: 1300 },
        { name: "Thomas", score: 1000 },
        { name: "Sjors", score: 900 },
    ];

    const leaderboard = [
        { rank: 4, name: "Ties", score: 800 },
        { rank: 5, name: "Allert", score: 750 },
        { rank: 6, name: "Mika", score: 700 },
        { rank: 7, name: "Cliff", score: 660 },
        { rank: 8, name: "Thijs", score: 600 },
        { rank: 9, name: "Frank", score: 580 },
        { rank: 10, name: "John", score: 550 },
        { rank: 11, name: "Bas", score: 500 },
    ];

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
                <div className="w-full -mt-10 mb-4">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl font-light text-red-600">Live</h2>
                        <h1 className="text-2xl text-black font-bold">Leaderboard</h1>
                    </div>
                </div>
                
                {/* Top 3 Section */}
                <div className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg p-4 my-4 flex justify-around">
                    {topThree.map((player, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center ${index === 0 ? "text-xl" : "text-lg"}`}>
                            <div className="text-2xl font-bold">{index + 1}</div>
                            <div className="w-12 h-12 bg-gray-300 rounded-full my-2"></div>
                            <div className="font-bold">{player.name}</div>
                            <div className="text-sm">{player.score}</div>
                        </div>
                    ))}
                </div>

                {/* Top 3 Section */}
                <div className="w-full flex flex-col divide-y divide-gray-300 text-black">
                    {leaderboard.map((player) => (
                        <div
                            key={player.rank}
                            className="py-2">
                            <div className="flex items-start">
                                <div className="grid-cols-1">
                                    <div className="text-lg font-bold">{player.rank}</div>
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                                    <div>{player.name}</div>
                                    <div className="font-bold">{player.score}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="w-full bottom-0 flex justify-between pt-5">
                    <div className="text-orange-500 text-4xl">
                        <FaChartBar />
                    </div>
                    <div className="text-gray-700 text-4xl">
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

export default LeaderboardPage;