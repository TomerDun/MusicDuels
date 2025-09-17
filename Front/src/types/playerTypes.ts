export type Player = {
    username: string,
    imgUrl: string,
    score: number
}

export type PlayerStats = {
    leaderboardPosition?: number,
    winRate?: number,
    duels?: number    
}