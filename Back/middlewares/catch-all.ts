import { NextFunction, Request, Response } from "express";

// Error Handling Middleware (always in the END)
function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    console.error(err);
    response.status(err.status || 500).json({
        message: err.message || "Server Error",
    });
}

export default catchAll;
