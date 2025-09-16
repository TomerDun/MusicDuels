import { NextFunction, Request, Response } from 'express';
import {validationResult, Result, ValidationError} from 'express-validator';
import { ValidationError as ValidationErrorClient } from '../utils/client-errors';

function parseErrors(errors: Result<ValidationError>){
    const msgSet = new Set();
    const errObj = errors.mapped(); // get an object of each prop errors
    for (const prop in errObj) { // get first error of each prop
        msgSet.add(errObj[prop].msg);
    }
    const msg = [...msgSet].join(', ');
    return msg;
}

export function validationHandler(req:Request, res:Response, next:NextFunction){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = parseErrors(errors)
        throw new ValidationErrorClient(err)
    }
    next();
}