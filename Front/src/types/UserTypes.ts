export type User = {
    username: string,
    imgUrl?: string,
    score: number
}

export type UserStats = {
    leaderboardPosition?: number,
    winRate?: number,
    duels?: number,   
    streak?: number 
}