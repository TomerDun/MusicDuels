export type Notification = {
    id:string,
    senderId:string,
    senderUsername?:string,
    recieverId:string,
    recieverUsername?:string,
    gameSessionId:string,
    gameType?:string,
    content:string,
    status:string,
}