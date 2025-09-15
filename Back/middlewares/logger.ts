import { NextFunction, Request, Response } from "express";

// log request time and method
function logger(request: Request, response: Response, next: NextFunction): void {

    const time = new Date();
    const method = request.method;
    // console.log(`[${time}] : ${method}`);

    next();
}

export default logger;