import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../utils/client-errors";

// verify access for logged users only by token verification
export function verifyToken(request: Request, response: Response, next: NextFunction) {
    const token = request.header('authorization')?.replace('Bearer ', '');
    if (!token)
        throw new UnauthorizedError("You're not authorized!");
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET) as any;
        console.log('verifyToken userId:', user.id);
        request.user = { id: user.id, email: user.email};
        next();
    } catch (err) {
        console.log('verifyToken error:', err);
        if (err === "jwt missing" || err.name === "TokenExpiredError")
            throw new UnauthorizedError("You're not authorized!");
        throw new UnauthorizedError(err.message);
    }
}