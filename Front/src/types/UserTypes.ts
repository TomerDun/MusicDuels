export type User = {
    id:string,
    username: string,
    profileImageUrl?: string,
    totalScore: number
}

export type UserStats = {
    rank?: number,
    winRate?: number,
    completedDuels?: number,
    streak?: number
}