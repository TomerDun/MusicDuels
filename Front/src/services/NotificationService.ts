import { callApi } from "../utils/serverUtils";

export async function getActiveUserNotifications(){
    try{
        const notifications = await callApi('/notifications/active');
        return notifications;
    } catch (err) {
        console.error(err);
    }
}