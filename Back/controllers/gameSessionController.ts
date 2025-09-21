import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { GameSession, Notification, User } from "../db/models";
import { CustomError, ResourceNotFoundError } from "../utils/client-errors";
import { NotificationStatus } from "../db/models/notification";
import { notificationValidationSchema } from "../utils/validationSchemas/notificationSchema";

export function startPractice(req: Request, res: Response) {
    const gameType = req.params.gameType;
    res.status(StatusCode.OK);
    res.send(`Practice started for ${gameType} game type`);
}

export async function createGameSession(req: Request, res: Response) {
    // Validate player2 exists in DB
    const player2 = await User.findByPk(req.body.player2Id);
    if (!player2) throw new CustomError(404, 'Player 2 not found with id ' + req.body.player2Id);

    // Extract only the parts you want from the body to create the session
    const { player2Id, player1Score } = req.body;
    const gameType = req.params.gameType;
    const player1Id = req.user.id;

    const newGameSesssion = await GameSession.create({ player1Id, player2Id, player1Score, gameType });


    const newNotification = await Notification.create({
        gameSessionId: newGameSesssion.id,
        senderId: player1Id,
        receiverId: player2Id,
        status: NotificationStatus.PENDING
    })

    console.log('🔔 Created notification');

    // TODO: Add game content injection

    res.status(StatusCode.Created).json({ gameSession: newGameSesssion, notification: newNotification });
}

export async function getSession(req: Request, res: Response) {
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    res.status(StatusCode.OK).json(gameSession);
}

// Call this after player 2 accepts the game invitation
export async function acceptGameSession(req: Request, res: Response) {    
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);

    // Verify
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    if (gameSession.player2Id != req.user.id) throw new CustomError(400, 'player2 ID does not match the user ID');

    const notification = await Notification.findOne({where: {gameSessionId: req.params.gameSessionId}});
    notification.status = NotificationStatus.ACCEPTED;
    await notification.save()
    res.status(StatusCode.Created).send('Notification status updated');
}

// Call this when player 2 finishes his game
export async function finishGameSession(req:Request, res:Response) { 
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);

    // Verify
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    if (gameSession.player2Id != req.user.id) throw new CustomError(400, 'player2 ID does not match the user ID')

        // Update the score and winner
        gameSession.player2Score = req.body.score;
        const winnerIsPlayer1 = gameSession.player1Score > gameSession.player2Score;
        gameSession.winnerId = winnerIsPlayer1 ? gameSession.player1Id : gameSession.player2Id;
        // TODO: Decide what to do if there is a draw
        await gameSession.save();

        // Remove old notification and create a new one
        await Notification.destroy({where: {gameSessionId: gameSession.id}});
        const newNotification = Notification.create({
            senderId: gameSession.player2Id,
            recieverId: gameSession.player1Id,
            status: NotificationStatus.COMPLETED
        })

        console.log('🔔 Replaced notification');
        res.status(StatusCode.Created).send('Updated game session to finished')    
}

