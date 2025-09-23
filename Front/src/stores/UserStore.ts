import { makeAutoObservable, runInAction } from "mobx";
import type { User, UserStats } from "../types/UserTypes";
import { fetchUser, fetchUserStats } from "../services/userService";

class UserStore {
    // undefined: not loaded yet | null: user is not logged in | Profile: user is logged in
    activeUser: User | null | undefined = undefined
    activeUserStats: UserStats | null | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    setActiveUser(user: User) {
        this.activeUser = user;
        console.log('setActiveUser activeUser', this.activeUser);
    }

    async getActiveUser() {
        if (!this.activeUser) {
            const userId = localStorage.getItem('userId') as string;
            const user = await fetchUser(userId)

            runInAction(() => {
                this.activeUser = user;
            })
        }
        return this.activeUser;
    }

    async getActiveUserStats() {
        if (!this.activeUserStats) {
            const userId = localStorage.getItem('userId') as string;
            const userStats = await fetchUserStats(userId);

            runInAction(() => {
                this.activeUserStats = userStats;
            })
        }
        return this.activeUserStats;
    }

    logoutUser() {
        this.activeUser = null;
    }

}

export const userStore = new UserStore()