export type User = {
    id:string,
    username: string,
    profileImageUrl?: string,
    totalScore: number
}

export type UserStats = {
    leaderboardPosition?: number,
    winRate?: number,
    duels?: number,   
    streak?: number 
}