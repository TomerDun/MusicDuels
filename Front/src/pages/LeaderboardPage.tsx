import Leaderboard from "../components/leaderboardArea/Leaderboard";

export default function LeaderboardPage() {
    return (
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 h-full" id="leaderboard-page">
            <div className="inner-container">
                <h1>Leaderboard Page</h1>

                <Leaderboard />
            </div>
        </div>
    )
}