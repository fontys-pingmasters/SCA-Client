import React from "react";
import { FaChartBar, FaHome, FaUser } from "react-icons/fa";

const LeaderboardPage = () => {
    interface Player {name:String, score:Number}


    //! order list by ELO before hand via function or passing it correctly
    const topPlayersTemp = [
        { name: "Erdem", score: 1300 },
        { name: "Thomas", score: 1000 },
        { name: "Sjors", score: 900 },
        { name: "Ties", score: 800 },
        { name: "Allert", score: 750 },
        { name: "Mika", score: 700 },
        { name: "Cliff", score: 660 },
        { name: "Thijs", score: 600 },
        { name: "Frank", score: 580 },
        { name: "John", score: 550 },
        { name: "Bas", score: 500 },
    ]

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
        <div className="w-full flex justify-center items-center h-screen">
            <div className="w-5/6 h-5/6 bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative">
                <div className="w-full -mt-10 mb-4">
                    <div className="bg-white h-1/6 p-4 rounded-lg">
                        <h2 className="text-xl font-light text-red-600">Live</h2>
                        <h1 className="text-2xl text-black font-bold">Leaderboard</h1>
                    </div>
                </div>
                {/* Top 3 Section */}
                {/* <div className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg p-4 my-4 flex justify-around">
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
                </div> */}

                        {/* <div className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg p-4 my-4 grid grid-cols-3 gap-4 justify-around">
                          {topThree.map((player, index) => {
                            return (
                              <div key={index} className="text-center">
                                {index === 0 && (
                                    <div className="pt-3 pb-3 bg-white rounded-lg text-slate-600"><span id="second-name">a</span> <span id="second-score">a</span></div>
                                )}
                                {index === 1 && (
                                  <div className="pt-2 pb-4 bg-white rounded-lg text-yellow-600"><span id="first-name">a</span> <span id="first-score">a</span></div>
                                )}
                                {index === 2 && (
                                  <div className="pt-4 pb-2 bg-white rounded-lg text-orange-800"><span id="third-name">a</span> <span id="third-score">a</span></div>
                                )}
                                {index > 2 && (
                                  <div>an error has occurred placeholder</div>
                                )}
                              </div>
                            );
                          })}
                        </div>


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
                </div> */}

                {/* revised leaderboard code */}
{/* 
                <div className="text-lg font-bold">{player.rank}</div>
                <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                <div>{player.name}</div>
                <div className="font-bold">{player.score}</div> */}

            <div className="h-2/3 w-full flex flex-col">
                <div className="w-full lg:h-1/3 md:h-2/3 sm:h-5/6 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg p-2 my-4 grid grid-cols-3 grid-rows-1 gap-y-6 gap-4">
                    
                    <div className="w-full h-3/4 bg-white rounded-lg text-slate-900 self-end" id="second">
                        <div className="w-full h-full">
                          <div className="w-full h-15 grid grid-cols-1 grid-rows-3 gap-1 border-2 rounded-lg shadow-md text-slate-900">
                            <div className="w-full h-full text-xl font-bold"><div className="bg-gradient-to-tr from-slate-600 to-white from-30% text-transparent bg-clip-text">2</div></div>
                            <div className="w-full h-1/3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                            </div>
                            <div className="h-1 flex md:flex-row flex-col">
                                  <div className="lg:w-2/5 w-full h-3 self-end">{topPlayersTemp[1].name}</div>
                                  <div className="lg:w-1/5 w-0 h-3 self-end"></div>
                                  <div className="lg:w-2/5 w-full font-bold h-3 self-end">{topPlayersTemp[1].score}</div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="w-full h-5/6 bg-white rounded-lg text-slate-900 self-end" id="first">
                        <div className="w-full h-full">
                              <div className="w-full h-15 grid grid-cols-1 grid-rows-3 gap-1 border-2 rounded-lg shadow-md text-slate-900">
                                <div className="w-full h-full text-xl font-bold"><div className="bg-gradient-to-tr from-yellow-600 to-white from-30% text-transparent bg-clip-text">1</div></div>
                                <div className="w-full h-1/3">
                                  <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                                </div>
                                <div className="h-1 flex md:flex-row flex-col">
                                  <div className="lg:w-2/5 w-full h-3 self-end">{topPlayersTemp[0].name}</div>
                                  <div className="lg:w-1/5 w-0 h-3 self-end"></div>
                                  <div className="lg:w-2/5 w-full font-bold h-3 self-end">{topPlayersTemp[0].score}</div>
                                </div>
                              </div>
                            </div>
                        </div>

                    <div className="w-full h-2/3 bg-white rounded-lg text-slate-900 self-end" id="third">
                        <div className="w-full h-full">
                          <div className="w-full h-15 grid grid-cols-1 grid-rows-3 gap-1 border-2 rounded-lg shadow-md text-slate-900">
                            <div className="w-full h-full text-xl font-bold"><div className="bg-gradient-to-tr from-orange-800 to-white from-30% text-transparent bg-clip-text">3</div></div>
                            <div className="w-full h-1/3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                            </div>
                            <div className="h-1 flex md:flex-row flex-col">
                                  <div className="lg:w-2/5 w-full h-3 self-end">{topPlayersTemp[2].name}</div>
                                  <div className="lg:w-1/5 w-0 h-3 self-end"></div>
                                  <div className="lg:w-2/5 w-full font-bold h-3 self-end">{topPlayersTemp[2].score}</div>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full h-2/3 px-2 gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-scroll">
                  {topPlayersTemp.map((player, index) => (
                    <div key={index} className="w-full">
                      <div className="w-full h-15 grid grid-cols-1 grid-rows-3 gap-1 border-2 rounded-lg shadow-md text-slate-900">
                        <div className="w-full h-full text-lg font-bold">{index + 1}</div>
                        <div className="w-full h-1/3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full mx-3"></div>
                        </div>
                        <div className="h-1/3">
                          <div className="w-2/5">{player.name}</div>
                          <div className="w-1/5"></div>
                          <div className="w-2/5 font-bold">elo: {player.score}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

            </div>

                <div className="w-full h-1/6 bottom-0 flex justify-between pt-5">
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