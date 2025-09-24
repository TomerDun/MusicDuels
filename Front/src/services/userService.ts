import { API_URL, callApi } from "../utils/serverUtils";

export async function fetchUser(userId:string){
    try {
        return await callApi(`/users/profiles/${userId}`);        
    }
    catch (err) {
        console.log(err);        
    }        
}

export async function fetchActiveUser(){
    try{
        return await callApi('/users/active');
    } catch (err) {
        console.log(err);
    }
}

// TODO: change to patch totalScore
export async function updateUser(userId: string, userData: any) {
    const response = await fetch(`${API_URL}/users/profiles/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('error updating user');
    }
    const updatedUser = await response.json();
    return updatedUser;
}

export async function fetchUserStats(userId:string){
    const response = await fetch(`${API_URL}/users/stats/${userId}`);
    if(!response.ok){
        throw new Error('error fetching user stats');
    }
    const stats = await response.json()
    console.log("fetching user stats: ",stats)
    return stats;
}