import { Request, Response } from "express";
import StatusCode from "../utils/status-code";

export function startPractice(req:Request,res:Response){
    const gameType = req.params.gameType;
    res.status(StatusCode.OK);
    res.send(`Practice started for ${gameType} game type`);
} 

export async function createSession(req:Request,res:Response){
    const gameType = req.params.gameType;
    res.status(StatusCode.Created);
    res.send(`Session created for ${gameType} game type`);
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

