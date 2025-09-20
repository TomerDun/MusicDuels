import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { User } from "../db/models";
import { UnauthorizedError, ValidationError } from "../utils/client-errors";
import authUtils from "../utils/authUtils";


export async function loginUser(req: Request, res: Response) {
    const user = await User.findOne({
        where: { email: req.body.email }
    });


    if (!user) { // User not found
        console.error('⛔ Login rejected (email not found): ', req.body.email)
        throw new UnauthorizedError('Wrong email or password')
    }

    const passwordVerified = await authUtils.verifyHash(req.body.password, user.password);
    if (!passwordVerified) {
        console.error('⛔ Login rejected (incorrect password): ', req.body.email)
        throw new UnauthorizedError('Wrong email or password')
    }

    const tokenPayload = { id: user.id, username: user.username, email: user.email }
    const token = authUtils.generateToken(tokenPayload);

    user.password = undefined; // remove password from the response output
    res.status(StatusCode.OK).json({ user, token });
}


export async function registerUser(req: Request, res: Response) {
    const hashedPass = authUtils.hashPassword(req.body.password);

    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,

        })

        const tokenPayload = { id: newUser.id, username: newUser.username, email: newUser.email }
        const token = authUtils.generateToken(tokenPayload);

    
        newUser.password = undefined // remove password from the output
        res.status(201).json({user: newUser, token});
    } catch (err) {
        console.log('Error creating new user: ', err);
        throw new ValidationError(err);
        
    }
}