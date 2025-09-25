import { makeAutoObservable, runInAction } from "mobx";
import type { User, UserStats } from "../types/UserTypes";
import { fetchActiveUser, fetchUserStats } from "../services/userService";

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

    async loadActiveUser() {
        const user = await fetchActiveUser()
        console.log('this.loadActiveUser user', user);
        runInAction(() => {
            this.activeUser = user;
        })
    }

    async loadActiveUserStats() {
        const userId = localStorage.getItem('userId') as string;
        const userStats = await fetchUserStats(userId);

        runInAction(() => {
            this.activeUserStats = userStats;
        })

    }

    logoutUser() {
        this.activeUser = null;
    }
}

export const userStore = new UserStore()