import { Request, Response } from "express";
import StatusCode from "../utils/status-code";

export async function getUserProfile(req:Request, res:Response){
    const userId = req.params.id;
    res.status(StatusCode.OK);
    res.send(`User Profile with id: ${userId} Retrieved Successfully`);
}

export async function updateUserProfile(req:Request, res:Response){
    const userId = req.params.id;
    res.status(StatusCode.OK);
    res.send(`User Profile with id: ${userId} Updated Successfully`);
}

export async function getUserStats(req:Request, res:Response){
    const userId = req.params.id;
    res.status(StatusCode.OK);
    res.send(`User Stats with id: ${userId} Retrieved Seccessfully`)
}