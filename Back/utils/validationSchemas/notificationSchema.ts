import {body} from 'express-validator';
import { NotificationStatus } from '../types';

export const notificationValidationSchema = [
    body('senderId')
    .trim()
    .exists({checkFalsy:true}).withMessage('Sender id is required')
    .isString().withMessage('Sender id must be a string'),
    body('recieverId')
    .trim()
    .exists({checkFalsy:true}).withMessage('Reciever id is required')
    .isString().withMessage('Reciever id must be a string'),
    body('gameSessionId')
    .trim()
    .exists({checkFalsy:true}).withMessage('Game session id is required')
    .isString().withMessage('Game session id must be a string'),
    body('content')
    .optional()
    .isString().withMessage('Notification content must be a string')
    .isLength({min:1, max:300}).withMessage('Notification content must contain between 1 and 300 characters'),
    body('status')
    .exists({checkFalsy:true})
    .isIn(Object.values(NotificationStatus)).withMessage('Notification status must be pending,accepted,declined or completed')
]