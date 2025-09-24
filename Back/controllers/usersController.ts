import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { User } from "../db/models/user";
import { ResourceNotFoundError } from "../utils/client-errors";
import { getUserDuels, getUserRank, getUserWinStreak } from "../utils/statsUtils";

export async function getUser(req:Request, res:Response){
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
        throw new ResourceNotFoundError(`User with id: ${userId} not found`);
    }
    
    res.status(StatusCode.OK).json(user);
}

export async function getActiveUser(req:Request, res:Response){
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
        throw new ResourceNotFoundError(`User with id: ${userId} not found`);
    }
    
    res.status(StatusCode.OK).json(user);
}

export async function updateUser(req:Request, res:Response){
    const userId = req.params.id;
    res.status(StatusCode.OK);
    res.send(`User with id: ${userId} Updated Successfully`);
}

export async function getUserStats(req:Request, res:Response){
    const userId = req.params.id;
    const rank = await getUserRank(userId);
    const duels = await getUserDuels(userId);
    const completedDuels = duels.filter(d => d.finishedAt).length;
    const winCount = duels.filter(d => d.winnerId === userId).length;
    const winRate = completedDuels > 0 ? Math.round((winCount / completedDuels) * 100) : 0;
    const streak = await getUserWinStreak(userId);


    res.status(StatusCode.OK).json({
        completedDuels,
        winRate,
        rank,
        streak
    });
}