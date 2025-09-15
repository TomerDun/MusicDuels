import { Request, Response } from "express";
import StatusCode from "../utils/status-code";


export async function loginUser(req: Request, res: Response) {
    res.status(StatusCode.Created);
    res.send("User Logged-in Successfully");
}

export async function registerUser(req: Request, res:Response){
    res.status(StatusCode.Created);
    res.send("User Registered Successfully");
}