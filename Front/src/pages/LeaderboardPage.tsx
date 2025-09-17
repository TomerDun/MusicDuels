import Leaderboard from "../components/leaderboardArea/Leaderboard";
import LeaderboardFilter from "../components/leaderboardArea/LeaderboardFilter";
import TopPlayerList from "../components/leaderboardArea/TopPlayerList";

export default function LeaderboardPage() {
    return (
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 h-full" id="leaderboard-page">
            <div className="inner-container">
                <div id="header-container" className="flex flex-col items-center w-full p-5">
                    <h1 className="font-bold text-white text-4xl">Global Leaderboard</h1>
                    <h2 className="text-gray-300">See how you stack up against the world's best music duelists</h2>
                </div>
                <LeaderboardFilter/>
                <TopPlayerList/>
                <Leaderboard />
            </div>
        </div>
    )
}