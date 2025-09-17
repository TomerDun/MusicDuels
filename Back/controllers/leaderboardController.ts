import { Request, Response } from "express";
import StatusCode from "../utils/status-code";

export async function getLeaderboard(req:Request, res:Response){
    const gameType = req.query.gameType ? req.query.gameType : "general";
    res.status(StatusCode.OK);
    res.send(`Retrived ${gameType} leaderboard`)
}