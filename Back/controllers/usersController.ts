import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { User } from "../db/models/user";
import { ResourceNotFoundError } from "../utils/client-errors";
import { GameSession } from "../db/models";
import { Op } from "sequelize";

export async function getUser(req:Request, res:Response){
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
        throw new ResourceNotFoundError(`User with id: ${userId} not found`);
    }
    
    res.status(StatusCode.OK).json(user);
}

async function getUserDuels(userId){
    const duels = await GameSession.findAll({
        where:{
            [Op.or]:[
                {player1Id:userId},
                {player2Id:userId}
            ]
        }
    })
    return duels
}

async function getUserRank(userId){
    // Efficient leaderboard position calculation
    const user = await User.findByPk(userId);
    if (!user) {
        throw new ResourceNotFoundError(`User with id: ${userId} not found`);
    }
    const higherScoreCount = await User.count({
        where: {
            totalScore: { [Op.gt]: user.totalScore }
        }
    });
    return higherScoreCount + 1;
}

export async function updateUser(req:Request, res:Response){
    const userId = req.params.id;
    res.status(StatusCode.OK);
    res.send(`User with id: ${userId} Updated Successfully`);
}

export async function getUserStats(req:Request, res:Response){
    const userId = req.params.id;
    const leaderboardPosition = await getUserRank(userId);
    const duels = await getUserDuels(userId);
    const completedDuels = duels.filter(d => d.finishedAt).length;
    const winCount = duels.filter(d => d.winnerId === userId).length;
    const winRate = completedDuels > 0 ? Math.round((winCount / completedDuels) * 100) : 0;


    res.status(StatusCode.OK).json({
        completedDuels,
        winRate,
        leaderboardPosition
    });
}