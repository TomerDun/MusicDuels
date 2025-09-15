import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../utils/client-errors";

function routeNotFound(request: Request, response: Response, next: NextFunction) {
    // Handles 404 - route not found
    console.error(`Error: route ${request.originalUrl} not found, method: ${request.method}`);
    throw new RouteNotFoundError(request.originalUrl)
}

export default routeNotFound;
