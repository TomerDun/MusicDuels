import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { Notification } from "../db/models";
import { Op } from "sequelize";

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

export async function getActiveUserNotifications(req:Request, res:Response){
    const activeUser = req.user;
    const activeUserId = activeUser.id;
    try {
        const notifications = await Notification.findAll({
            where: {
                [Op.or]: [
                    { senderId: activeUserId },
                    { receiverId: activeUserId }
                ]
            },
            include: [
                {
                    model: require('../db/models/user').User,
                    as: 'sender',
                    attributes: ['id', 'username']
                },
                {
                    model: require('../db/models/user').User,
                    as: 'receiver',
                    attributes: ['id', 'username']
                },
                {
                    model: require('../db/models/gameSession').GameSession,
                    as: 'gameSession',
                    attributes: ['gameType']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Map to NotificationType shape
        const formatted = notifications.map((n: any) => ({
            id: n.id,
            senderId: n.senderId,
            senderUsername: n.sender?.username,
            recieverId: n.receiverId,
            recieverUsername: n.receiver?.username,
            gameSessionId: n.gameSessionId,
            gameType: n.gameSession?.gameType,
            content: n.content,
            status: n.status
        }));
        res.status(StatusCode.OK).json(formatted);
    } catch (error) {
        res.status(StatusCode.InternalServerError).json({ error: 'Failed to fetch notifications' });
    }
}