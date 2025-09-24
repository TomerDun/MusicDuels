import jwt from 'jsonwebtoken'
import { UnauthorizedError } from "../utils/client-errors";
import { NextFunction, Request, Response } from 'express';
import { TokenUser } from '../utils/types';

export function protectedRoute(req:Request, res:Response, next:NextFunction) {

    if (!req.header('Authorization')) {
        console.log('⛔ No auth headers')
        throw new UnauthorizedError("You're not authorized!");
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {                
        console.log('⛔ Invliad Token (missing)')
        throw new UnauthorizedError("Invalid or missing Token");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenUser;
        req.user = payload;
        console.log(`👤 Token validated (${payload.username})`);
        
        next();
    } catch (error) {
        console.error('JWT Error: ', error);
        
        if (error.name === "TokenExpiredError") {
            console.log('⛔ Invliad Token (expired)')
            throw new UnauthorizedError("Token Expired");
        }
        console.log('⛔ Invliad Token (invalid)')
        throw new UnauthorizedError("Invalid or missing Token");
    }
};

