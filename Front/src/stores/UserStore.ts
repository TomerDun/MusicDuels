import { makeAutoObservable, runInAction } from "mobx";
import type { User, UserStats } from "../types/UserTypes";
import { fetchUser, fetchUserStats } from "../services/userService";

class UserStore{
    activeUser:User | null | undefined
    activeUserStats:UserStats | null | undefined

    constructor() {
        makeAutoObservable(this)
    }

    async getActiveUser(){
        const userId = localStorage.getItem('userId') as string;
        const user = await fetchUser(userId)

        runInAction(() => {
            this.activeUser = user;
        })
    }

    async getActiveUserStats(){
        const userId = localStorage.getItem('userId') as string;
        const userStats = await fetchUserStats(userId);

        runInAction(() => {
            this.activeUserStats = userStats;
        })
    }

}

export const userStore = new UserStore()