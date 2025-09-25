import type { Notification } from "../types/NotificationTypes";
import { callApi } from "../utils/serverUtils";

export async function getActiveUserNotifications(){
    try{
        const notifications = await callApi('/notifications/active');
        return notifications;
    } catch (err) {
        console.error(err);
    }
}

export async function dismissDeclinedNotification(notification:Notification){
    try{
        await callApi(`/games/session/${notification.gameSessionId}`, 'DELETE');
    } catch (err) {
        console.error(err);
    }
}

export async function dismissCompletedNotification(notification:Notification){
    try{
        await callApi(`/notifications/${notification.id}`, 'DELETE');
    } catch (err) {
        console.error(err);
    }
}

export async function acceptInviteNotification(notification:Notification){
    const body = {status:'accepted'};
    try{
        await callApi(`games/session/${notification.gameSessionId}/accept`,'PATCH', body)
    } catch (err) {
        console.error(err);
    }
}

export async function declineNotification(notification:Notification){
    const body = {status:'declined'};
    try{
        await callApi(`/games/session/${notification.gameSessionId}/accept`,'PATCH', body);
    } catch (err) {
        console.error(err);
    }
}

export async function getSessionResults(notification:Notification){
    try{
        const res = await callApi(`/games/session/${notification.gameSessionId}`)
        return {senderScore:res.player1Score, recieverScore:res.player2Score}
    } catch (err:any) {
        console.error(err.message);
    }
}