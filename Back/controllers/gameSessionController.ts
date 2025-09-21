import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { GameSession, Notification, User } from "../db/models";
import { CustomError, ResourceNotFoundError } from "../utils/client-errors";
import { NotificationStatus } from "../db/models/notification";
import { notificationValidationSchema } from "../utils/validationSchemas/notificationSchema";

export function startPractice(req:Request,res:Response){
    const gameType = req.params.gameType;
    res.status(StatusCode.OK);
    res.send(`Practice started for ${gameType} game type`);
} 

export async function createGameSession(req:Request,res:Response){
    // Validate player2 exists in DB
    const player2 = await User.findByPk(req.body.player2Id);
    if (!player2) throw new CustomError(404, 'Player 2 not found with id ' + req.body.player2Id);

    // Extract only the parts you want from the body to create the session
    const {player2Id, player1Score} = req.body;
    const gameType = req.params.gameType;
    const player1Id = req.user.id;
    
    const newGameSesssion = await GameSession.create({player1Id, player2Id, player1Score, gameType});
    
    // TODO: Add creation of notification
    const newNotification = await Notification.create({
        gameSessionId: newGameSesssion.id,
        senderId: player1Id,
        receiverId: player2Id,
        status: NotificationStatus.PENDING        
    })
    
    console.log('🔔 Created notification');
    
    res.status(StatusCode.Created).json({gameSession: newGameSesssion, notification: newNotification});
}

export async function getSession(req:Request,res:Response){
    const gameType = req.params.gameType;
    const sessionId = req.params.sessionId;
    res.status(StatusCode.OK);
    res.send(`Retrived Session for ${gameType} game type with id ${sessionId}`)
}

export async function updateSession(req:Request,res:Response){
    const gameType = req.params.gameType;
    const sessionId = req.params.sessionId;
    res.status(StatusCode.OK);
    res.send(`Updated Session for ${gameType} game type with id ${sessionId}`)
}

