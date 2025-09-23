import type { User, UserStats } from "./UserTypes"

export type LeaderboardItemType = {
    id: string,
    username:string,
    totalScore:number,
    completedDuels:number,
    rank:number,
    winRate:number,
    imgUrl:string,
    streak:number
}