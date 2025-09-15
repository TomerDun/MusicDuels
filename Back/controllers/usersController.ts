import { Request, Response } from "express";
import StatusCode from "../utils/status-code";

export async function getUserProfile(req:Request, res:Response){
    res.status(StatusCode.OK);
    res.send("User Profile Retrieved Successfully");
}

export async function updateUserProfile(req:Request, res:Response){
    res.status(StatusCode.OK);
    res.send("User Profile Updated Successfully");
}
