import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { GameSession, Notification, User } from "../db/models";
import { CustomError, ResourceNotFoundError, UnauthorizedError } from "../utils/client-errors";
import { NotificationStatus } from "../db/models/notification";
import { notificationValidationSchema } from "../utils/validationSchemas/notificationSchema";
import { generateGameContent } from "../utils/gameContentGenerator";
import { GameTypes } from "../types/gameContentTypes";
import { updateUserTotalScore } from "../utils/UserUtils";

// Const variables
const WINNING_MODIFIER = 100;
const LOSING_MODIFIER = 50;

export function startPractice(req: Request, res: Response) {
    const gameType = req.params.gameType;
    res.status(StatusCode.OK);
    res.send(`Practice started for ${gameType} game type`);
}

export async function startGameSession(req: Request, res: Response) {

    // Validate player2 exists in DB
    const player2 = await User.findByPk(req.body.player2Id);
    if (!player2) throw new CustomError(404, 'Player 2 not found with id ' + req.body.player2Id);

    // Extract data from the request
    const player2Id = req.body.player2Id;
    const gameType = req.params.gameType;
    const player1Id = req.user.id;

    const content = generateGameContent(GameTypes.SIGHT_READ);

    const newGameSesssion = await GameSession.create({ player1Id, player2Id, gameType, content });


    const newNotification = await Notification.create({
        gameSessionId: newGameSesssion.id,
        senderId: player1Id,
        receiverId: player2Id,
        status: NotificationStatus.PENDING
    })

    console.log('🔔 Created notification');

    // TODO: Add game content injection

    res.status(StatusCode.Created).json({ id: newGameSesssion.id });
}

export async function getGameSession(req: Request, res: Response) {
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    res.status(StatusCode.OK).json(gameSession);
}

// Call this after player 2 accepts the game invitation
export async function acceptGameSession(req: Request, res: Response) {
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);

    // Verification
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    if (gameSession.player2Id != req.user.id) throw new CustomError(400, 'player2 ID does not match the user ID');

    const notification = await Notification.findOne({ where: { gameSessionId: req.params.gameSessionId } });
    notification.status = NotificationStatus.ACCEPTED;
    notification.content = null;
    await notification.save()
    res.status(StatusCode.Created).send('Notification status updated');
}

// Call this when player 2 finishes his game
export async function finishGameSession(req: Request, res: Response) {
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);
    
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    
    let playerNumber = -1; // player 1 or 2 (-1 means no player found)
    if (gameSession.player1Id == req.user.id) { playerNumber = 1; }
    else if (gameSession.player2Id == req.user.id) { playerNumber = 2 };

    // Verify player is part of the session
    if (playerNumber === -1) throw new CustomError(400, 'player ID not found in the game session does not match the user ID');

    if (playerNumber === 1) {
        gameSession.player1Score = req.body.score;        
        await gameSession.save();
        console.log('--player1 finish game session--');
        
        res.status(StatusCode.OK).json({message: 'player 1 finished game'})
    }
    else { // user is player 2
        gameSession.player2Score = req.body.score;
        // -- Finish the game--
        if (gameSession.player1Score !== null && gameSession.player2Score !== null) {
            // TODO: Add specific logic for a draw
            let loserId = ''
            let winnerId = ''
            if (gameSession.player1Score > gameSession.player2Score) {
                winnerId = gameSession.player1Id;
                loserId = gameSession.player2Id;
            }
            else {
                winnerId = gameSession.player2Id;
                loserId = gameSession.player1Id;
            }

            gameSession.winnerId = winnerId;

            await updateUserTotalScore(winnerId, WINNING_MODIFIER);
            await updateUserTotalScore(loserId, LOSING_MODIFIER);

            await gameSession.save();
            console.log('🎵 Finished game session ' + gameSession.id);
            

            // Update notification
            await Notification.update({status: NotificationStatus.COMPLETED}, {where: {gameSessionId: gameSession.id}});
            console.log('🔔 Updated notification');

            res.status(StatusCode.OK).json({message: 'game finished'});                        
        }        
        else {
            throw new CustomError(500, 'Player 2 finished but player 1 has no score...')
        }
    }
}


export async function declineGameSession(req:Request, res:Response) {
    // Validation
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    if (gameSession.player2Id != req.user.id) throw new UnauthorizedError('User is not authorized to decline this game session');



    gameSession.player1Score = null;    
    console.log('🎶 Updated game session');

    Notification.update({status: NotificationStatus.DECLINED}, {where: {gameSessionId: gameSession.id}});
    console.log('🔔 Updated notification');

    res.status(StatusCode.OK).json({message: 'Declined'})        
}

// Call this when dismissing a notificaiton over a declined game
export async function deleteGameSession(req:Request, res:Response) {
    // Validation
    const gameSession = await GameSession.findByPk(req.params.gameSessionId);
    if (!gameSession) throw new ResourceNotFoundError(req.params.id);
    if (gameSession.player2Id != req.user.id && gameSession.player1Id != req.user.id) throw new UnauthorizedError('User is not authorized to dismiss this game session');

    await Notification.destroy({where: {gameSessionId: gameSession.id} });
    console.log('🔔 Removed notification');

    await gameSession.destroy();
    console.log('🎶 Deleted game session');

    res.status(StatusCode.NoContent).send();    
}


