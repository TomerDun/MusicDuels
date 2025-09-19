export type Player = {
    username: string,
    imgUrl: string,
    score: number
}

export type PlayerStats = {
    leaderboardPosition?: number,
    score?: number,
    winRate?: number,
    duels?: number,   
    streak?: number 
}