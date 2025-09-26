import { callApi } from "../utils/serverUtils";

export async function fetchUser(userId: string) {
    try {
        return await callApi(`/users/profiles/${userId}`);
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchActiveUser() {
    return await callApi('/users/active');

}

// TODO: change to patch totalScore
export async function updateUser(userId: string, userData: any) {
    const updatedUser = await callApi(`/users/profiles/${userId}`, 'PUT', userData);
    return updatedUser;
}

export async function fetchUserStats(userId: string) {
    const stats = await callApi(`/users/stats/${userId}`);
    return stats;
}