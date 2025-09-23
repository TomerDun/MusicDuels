import { Request, Response } from "express";
import StatusCode from "../utils/status-code";

export async function createNotification(req:Request, res:Response){
    const userId = req.user.id;
    res.status(StatusCode.Created);
    res.send(`notification created by user with id: ${userId}`);
}

export async function deleteNotification(req:Request, res:Response){
    const notificationId = req.params.id;
    res.status(StatusCode.NoContent);
    res.send(`notification with id: ${notificationId} deleted successfully`);
}