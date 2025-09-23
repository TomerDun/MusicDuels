import { makeAutoObservable, runInAction } from "mobx";
import type { User, UserStats } from "../types/UserTypes";
import { fetchUser, fetchUserStats } from "../services/userService";

class UserStore{
    activeUser:User | null | undefined = undefined
    activeUserStats:UserStats | null | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    async getActiveUser(){
        if(!this.activeUser){
            const userId = localStorage.getItem('userId') as string;
            const user = await fetchUser(userId)
    
            runInAction(() => {
                this.activeUser = user;
            })
        }
        return this.activeUser;
    }

    async getActiveUserStats(){
        if(!this.activeUserStats){
            const userId = localStorage.getItem('userId') as string;
            const userStats = await fetchUserStats(userId);
    
            runInAction(() => {
                this.activeUserStats = userStats;
            })
        }
        return this.activeUserStats;
    }

}

export const userStore = new UserStore()