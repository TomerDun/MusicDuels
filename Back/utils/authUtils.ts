import bcrypt from 'bcrypt'
import { DbUser, User } from './types';
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from './client-errors';

function hashPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

function createToken(user: User):string {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

async function comparePass(pass: string, encryptPass: string) {
    if (!await bcrypt.compare(pass, encryptPass))
        throw new UnauthorizedError('Incorrect credentials')
}

export default {
    hashPassword, createToken, comparePass
}