import LeaderboardItem from "./LeaderboardItem"
import type { LeaderboardItemType } from "./LeaderboardTypes"

const leads: LeaderboardItemType[] = [
    {
        player: {username: 'tomer', score: 500, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 50, leaderboardPosition: 1, winRate: 100}
    },
    {
        player: {username: 'yoniMusic', score: 450, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 20, leaderboardPosition: 3, winRate: 50}
    },
    {
        player: {username: 'itaitheKing', score: 20, imgUrl: 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='},
        stats: {duels: 70, leaderboardPosition: 3, winRate: 0}
    },
]

export default function Leaderboard() {
    return (
        <div className="glass-container flex flex-col gap-4 flex-1 outline-1" id="leaderboard-container">
            {leads.map((item, i) => <LeaderboardItem item={item} key={i}/>)}
        </div>
    )
}