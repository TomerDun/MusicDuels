import LeaderboardItem from "./LeaderboardItem"
import type { LeaderboardItemType } from "../../types/LeaderboardTypes"
import AnimatedList from "../MiscArea/AnimatedList"
import { observer } from "mobx-react-lite"
import { userStore } from "../../stores/UserStore"

function Leaderboard({items}:{items:LeaderboardItemType[]}) {
    const activeUser = userStore?.activeUser;
    const activeUserStats = userStore?.activeUserStats;
    const activeItem = {
        username:activeUser?.username,
        profileImageUrl:activeUser?.profileImageUrl,
        totalScore: activeUser?.totalScore,
        streak: activeUserStats?.streak,
        completedDuels: activeUserStats?.duels,
        winRate: activeUserStats?.winRate,
        rank: activeUserStats?.leaderboardPosition
    } as LeaderboardItemType

    return (
        <section id="full-leaderboard" className="glass-container !p-0 overflow-hidden box-border ">
        <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Full Rankings</h2>
        </div>
        <div id="leaderboard-headers" className="flex items-center justify-between gap-5 p-4 px-6 border-b bg-black/40 border-white/10 text-white/70 font-bold text-sm">
            <div className="w-[50%] flex items-center gap-12">
                <h3 className="w-10 text-center">Rank</h3>
                <h3 className="w-32">Player</h3>
            </div>
            <div className="w-[50%] flex justify-around gap-12 items-center">
                <h3 className="w-12 text-center">Score</h3>
                <h3 className="w-12 text-center">Win %</h3>
                <h3 className="w-12 text-center">Duels</h3>
                <h3 className="w-12 text-center">Streak</h3>
            </div>

        </div>
        <div className="overflow-x-auto">
            <AnimatedList displayScrollbar={true} showGradients={false} items={items.map((item, i) => <LeaderboardItem item={item} key={i}/>)} />
        </div>
        {activeUser && <LeaderboardItem item={activeItem}/>}
        {/* <div className="p-6 border-t border-white/10 flex items-center justify-between">
            <p className="text-white/60">Showing 1-50 of 10,247 players</p>
            <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">Previous</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">2</button>
                <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">3</button>
                <span className="text-white/60">...</span>
                <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">205</button>
                <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">Next</button>
            </div>
        </div> */}
    </section>
    )
}

export default observer(Leaderboard);