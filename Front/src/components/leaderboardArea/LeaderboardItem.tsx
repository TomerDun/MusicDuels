import type { LeaderboardItemType } from "./LeaderboardTypes";



export default function LeaderboardItem({item}: {item: LeaderboardItemType}) {
    return (
        <div className="flex items-center gap-5 flex-1 outline-1 p-3 outline-indigo-500" id="leaderboard-item">
            <div className="rounded-md p-4 w-3 h-3 bg-amber-600 text-white flex justify-center items-center" id="rankCube">{item.stats.leaderboardPosition}</div>
            <div className="flex gap-2" id="player-info-container">

                <div id="img-container" className="w-16 h-16 rounded-full shadow-md">
                    <img src={item.player.imgUrl} alt="Player Avatar" className="w-full rounded-full" />
                </div>

                <div id="name-container" className="text-white pt-1 pl-1">
                    <h3>{item.player.username}</h3>
                </div>

                
            </div>
        </div>
    )
}