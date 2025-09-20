import { Request, Response } from "express";
import StatusCode from "../utils/status-code";
import { User } from "../db/models";
import { UnauthorizedError } from "../utils/client-errors";
import authUtils from "../utils/authUtils";


export async function loginUser(req: Request, res: Response) {
    const user = await User.findOne({
        where: {email: req.body.email}
    });

    
    if (!user) { // User not found
        console.error('⛔ Login rejected (email not found): ', req.body.email)
        throw new UnauthorizedError('Wrong email or password')
    }

    // User found
    const passwordVerified = await authUtils.verifyHash(req.body.password, user.password);
    if (!passwordVerified) {
        console.error('⛔ Login rejected (incorrect password): ', req.body.email)
        throw new UnauthorizedError('Wrong email or password')
    } 

    res.status(StatusCode.OK).send("User Logged in Successfully");
}

export async function registerUser(req: Request, res:Response){
    const hashedPass = authUtils.hashPassword(req.body.password);    

    try {
        const newUser = User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,

        })
    }
    res.status(StatusCode.Created).send("User Registered Successfully");
}