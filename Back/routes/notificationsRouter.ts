import express, { NextFunction } from "express";
import { Request, Response } from "express";
import {createNotification, deleteNotification} from "../controllers/notificationsController";

const router = express.Router();

router.post('/',(req:Request,res:Response,next:NextFunction) => {req.user = {id:"1",email:"2",username:"3"}; next()}  ,createNotification); //middlware for testing
router.delete('/:id', deleteNotification)

export default router;