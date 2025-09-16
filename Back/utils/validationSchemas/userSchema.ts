import {body} from 'express-validator';

export const userValidationSchema = [
    body('username')
    .trim()
    .exists({checkFalsy:true}).withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({min:2, max:15}).withMessage('Username must be between 2 and 15'),
    body('email')
    .trim()
    .exists({checkFalsy:true}).withMessage('Email is required')
    .isEmail()
    .withMessage('Must be valid email'),
    body('password')
    .exists({checkFalsy:true}).withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({min:4}).withMessage('Password must be at least 4 characters long')
];

