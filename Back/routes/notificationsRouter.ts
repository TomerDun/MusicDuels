import express, { NextFunction } from "express";
import { Request, Response } from "express";
import {createNotification, deleteNotification, getActiveUserNotifications} from "../controllers/notificationsController";
import { notificationValidationSchema } from "../utils/validationSchemas/notificationSchema";
import { validationHandler } from "../middlewares/validationHandler";
import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/',(req:Request,res:Response,next:NextFunction) => {req.user = {id:"1",email:"2",username:"3"}; next()}, notificationValidationSchema, validationHandler, createNotification); //middleware for testing
router.get('/active', protectedRoute, getActiveUserNotifications)
router.delete('/:id', deleteNotification)

export default router;