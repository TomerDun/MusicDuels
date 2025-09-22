import type { LeaderboardItemType } from "../../types/LeaderboardTypes"
import TopPlayerCard from "./TopPlayerCard"



function TopPlayerList({items}: {items: LeaderboardItemType[]}) {
    if (!items || items.length < 3) return null;
    return (
        <div id="list-container" className="flex flex-row mb-12 justify-center gap-8">
            <TopPlayerCard player={items[1]} />
            <TopPlayerCard player={items[0]} />
            <TopPlayerCard player={items[2]} />
        </div>
    );
}

export default TopPlayerList