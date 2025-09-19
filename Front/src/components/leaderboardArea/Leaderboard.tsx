import LeaderboardItem from "./LeaderboardItem"
import type { LeaderboardItemType } from "../../types/LeaderboardTypes"
import AnimatedList from "../MiscArea/AnimatedList"

const leads: LeaderboardItemType[] = [
    {
        player: {username: 'tomer', score: 500, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 50, leaderboardPosition: 1, winRate: 100, score:1670, streak:15}
    },
    {
        player: {username: 'yoniMusic', score: 450, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 20, leaderboardPosition: 3, winRate: 50, score:1200, streak:5}
    },
    {
        player: {username: 'itaitheKing', score: 20, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 70, leaderboardPosition: 2, winRate: 0, score:300, streak:0}
    },
    {
        player: {username: 'musicLover', score: 300, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 40, leaderboardPosition: 4, winRate: 75, score:900, streak:10}
    },
    {
        player: {username: 'beatMaster', score: 150, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 30, leaderboardPosition: 5, winRate: 60, score:600, streak:7}
    },
    {
        player: {username: 'rhythmQueen', score: 400, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 60, leaderboardPosition: 7, winRate: 80, score:1500, streak:12}
    },
    {
        player: {username: 'melodyMaker', score: 250, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 35, leaderboardPosition: 6, winRate: 70, score:750, streak:8}
    }
]

export default function Leaderboard() {
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
            <AnimatedList displayScrollbar={true} showGradients={false} items={leads.map((item, i) => <LeaderboardItem item={item} key={i}/>)} />
        </div>
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