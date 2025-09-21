import { API_URL } from "../utils/serverUtils";

export async function getGlobalLeaderboard(){
    const res = await fetch(`${API_URL}/leaderboard`);
    if(!res.ok){
        throw new Error('error fetching leaderboard');
    }
    const items = res.json();
    return items;
}