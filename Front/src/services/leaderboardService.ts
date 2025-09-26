import { callApi } from "../utils/serverUtils";

export async function getGlobalLeaderboard() {
    try {
        const items = await callApi(`/leaderboard`);
        return items;
    } catch (error) {
        console.log('error fetching leaderboard');
        throw error;
    }
}