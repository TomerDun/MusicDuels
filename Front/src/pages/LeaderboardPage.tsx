import { useEffect, useState } from "react";
import Leaderboard from "../components/leaderboardArea/Leaderboard";
import LeaderboardFilter from "../components/leaderboardArea/LeaderboardFilter";
import TopPlayerList from "../components/leaderboardArea/TopPlayerList";
import { getGlobalLeaderboard } from "../services/leaderboardService";
import type { LeaderboardItemType } from "../types/LeaderboardTypes";

export default function LeaderboardPage() {
    const [items, setItems] = useState<LeaderboardItemType[]>([]);

    async function updateLeaderboard() {
        const res = await getGlobalLeaderboard();
        setItems(res);
    }

    useEffect(() => {
        updateLeaderboard();
    }, []);

    const topThree = items.slice(0, 3);

    return (
        <div className="background-gradient h-full" id="leaderboard-page">
            <div className="inner-container pb-10">
                <div id="header-container" className="flex flex-col items-center w-full p-5">
                    <h1 className="font-bold text-white text-4xl">Global Leaderboard</h1>
                    <h2 className="text-gray-300">See how you stack up against the world's best music duelists</h2>
                </div>
                <LeaderboardFilter />
                <TopPlayerList items={topThree} />
                <Leaderboard items={items} />
            </div>
        </div>
    );
}