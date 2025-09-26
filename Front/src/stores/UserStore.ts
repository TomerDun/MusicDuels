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
        try {
            const user = await fetchActiveUser()
            console.log('this.loadActiveUser user', user);
            runInAction(() => {
                this.activeUser = user;
            })
        }
        catch (err) {
            console.log('tried to load user into activeUserStore but failed');
            throw err
        }
    }

    async loadActiveUserStats() {
        if (this.activeUser) {
            const userStats = await fetchUserStats(this.activeUser.id);

            runInAction(() => {
                this.activeUserStats = userStats;
            })
        }
        else {
                throw new Error('tried to load active user stats but no active user loaded');
            }        
    }

    logoutUser() {
        this.activeUser = null;
    }
}

export const userStore = new UserStore()