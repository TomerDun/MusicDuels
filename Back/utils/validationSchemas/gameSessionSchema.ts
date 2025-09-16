import {body} from 'express-validator';

export const gameSessionValidationSchema = [
    body('player1Id')
    .trim()
    .exists({checkFalsy:true}).withMessage('Session must contain player1 id')
    .isString().withMessage('player1 id must be a string'),
    body('player2Id')
    .trim()
    .exists({checkFalsy:true}).withMessage('Session must contain player2 id')
    .isString().withMessage('player2 id must be a string'),
    body('player1Score')
    .optional()
    .isNumeric().withMessage('player1 Score must be a number'),
    body('player2Score')
    .optional()
    .isNumeric().withMessage('player2 Score must be a number'),
    body('gameType')
    .exists({checkFalsy:true})
    .trim()
    .isString().withMessage('game type must be a string')
    .isIn(['sightRead']).withMessage('game type must be one of the expected game types'),
    body('finishedAt')
    .optional()
    .isISO8601().withMessage('finish time must be a valid ISO 8601 format'), //may not work properly for stamps with timezone
    body('createdAt')
    .optional()
    .isISO8601().withMessage('created time must be a valid ISO 8601 format'), //may not work properly for stamps with timezone
    body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('imageUrl must be a valid URL ') //might change to isString()
]