import { NextFunction, Request, Response } from "express";
import StatusCode from "../01-utils/status-code";


export async function get___(request: Request, response: Response, next: NextFunction) {
    
    response.status(StatusCode.Created).json();
}