import { callApi } from "../utils/serverUtils";


export async function getActiveUserCompletedGameHistory(){
    try{
        const history = await callApi(`/games/session/active`);
        return history;
    } catch (err) {
        console.error(err);
    }
}   