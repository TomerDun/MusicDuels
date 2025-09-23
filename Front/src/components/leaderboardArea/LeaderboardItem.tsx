import type { LeaderboardItemType } from "../../types/LeaderboardTypes";


type props = {
    item: LeaderboardItemType,
    onClick: Function
}

export default function LeaderboardItem({item, onClick}: props) {
    return (
        <div onClick={() => onClick(item.id)} className="flex items-center justify-between gap-5 flex-1 outline-1 p-2 px-6 outline-indigo-500 hover:bg-white/10" id="leaderboard-item">
            <div id="player-info" className="flex items-center gap-14 w-[50%]">
                <div className="rounded-md p-4 w-3 h-3 bg-amber-600 text-white flex justify-center items-center" id="rankCube">{item.rank}</div>
                <div id="player-details" className="flex items-center gap-4">
                    <div id="img-container" className="w-12 h-12 rounded-full shadow-md">
                        <img src={'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='}
                         alt="Player Avatar" className="w-full rounded-full" />
                    </div>

                    <div id="name-container" className="text-white pt-1 pl-1">
                        <h3>{item.username}</h3>
                    </div>
                </div>
            </div>

            <div id="stats-container" className="flex  justify-around gap-12 w-[50%] text-white/70">
                    <div className="font-bold text-white w-6">{item.totalScore}</div>
                    <div className="font-bold text-emerald-700 w-6">{item.winRate}%</div>
                    <div className="font-bold text-white w-6">{item.completedDuels}</div>
                    <div className="font-bold text-yellow-300 w-6">{item.streak}</div>
            </div>

                
            {/* </div> */}
        </div>
    )
}