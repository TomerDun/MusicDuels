import { NextFunction, Request, Response } from 'express';
import {body, validationResult, Result, ValidationError} from 'express-validator';
import { ValidationError as ValidationErrorClient } from '../utils/client-errors';

export const userValidationSchema = [
    body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({min:2, max:15}).withMessage('Username must be between 2 and 15'),
    body('email')
    .trim()
    .isEmail()
    .withMessage('Must be valid email'),
    body('password')
    .isString().withMessage('Password must be a string')
    .isLength({min:4}).withMessage('Password must be atleast 4 characters long')
];

function handleUserValidationErrors(errors: Result<ValidationError>){
    const msgSet = new Set();
    const errObj = errors.mapped(); // get an object of each prop errors
    for (const prop in errObj) { // get first error of each prop
        msgSet.add(errObj[prop].msg);
    }
    const msg = [...msgSet].join(', ');
    console.log('user validation errors: ', msgSet);
    throw new ValidationErrorClient(msg);
}

export function userValidationHandler(req:Request, res:Response, next:NextFunction){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            handleUserValidationErrors(errors);
        }
        next();
    } catch (error) {
        next(error);
    }
}