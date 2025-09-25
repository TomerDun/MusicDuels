import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
const { User } = require('../db/models/user');
const { getUserDuels, getUserWinStreak } = require('../utils/statsUtils');

export async function getGlobalLeaderboard(req:Request, res:Response){
    // Get limit and offset from query, default to limit=10, offset=0
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;

    // Get paginated users by totalScore
    const users = await User.findAll({
        order: [['totalScore', 'DESC']],
        limit,
        offset
    });

    // For each user, get stats using getUserDuels
    const leaderboard = await Promise.all(users.map(async (user: any, i: number) => {
        const duels = await getUserDuels(user.id);
        const completedDuels = duels.filter((d: any) => d.finishedAt).length;
        const winCount = duels.filter((d: any) => d.winnerId === user.id).length;
        const winRate = completedDuels > 0 ? Math.round((winCount / completedDuels) * 100) : 0;
        const streak = await getUserWinStreak(user.id);
        return {
            rank: offset + i + 1,
            id: user.id,
            username: user.username,
            totalScore: user.totalScore,
            profileImageUrl: user.profileImageUrl,
            completedDuels,
            winRate,
            streak
        };
    }));

    res.status(StatusCode.OK).json(leaderboard);
}

export async function getLeaderboard(req:Request, res:Response){
    const gameType = req.query.gameType ? req.query.gameType : "general";
    res.status(StatusCode.OK);
    res.send(`Retrived ${gameType} leaderboard`)
}