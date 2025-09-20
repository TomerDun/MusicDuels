import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../utils/client-errors";
import { TokenUser } from "../utils/types";

// verify access for logged users only by token verification
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token)
        throw new UnauthorizedError("You're not authorized!");
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET) as TokenUser;
        console.log('verifyToken userId:', user.id);
        req.user = { id: user.id, email: user.email, username: user.username};
        next();
    } catch (err) {
        console.log('verifyToken error:', err);
        if (err === "jwt missing" || err.name === "TokenExpiredError")
            throw new UnauthorizedError("You're not authorized!");
        throw new UnauthorizedError(err.message);
    }
}