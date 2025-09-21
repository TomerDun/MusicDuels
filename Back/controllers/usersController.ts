import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { User } from "../db/models/user";
import { ResourceNotFoundError } from "../utils/client-errors";

export async function getUser(req:Request, res:Response){
    const userId = req.params.id;
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
    res.status(StatusCode.OK);
    res.send(`User Stats with id: ${userId} Retrieved Seccessfully`)
}