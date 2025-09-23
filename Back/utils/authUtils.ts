import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from './client-errors';
import { TokenUser } from './types';

function hashPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

function generateToken(payload: TokenUser):string {    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

async function verifyHash(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword)        
}

export default {
    hashPassword, generateToken, verifyHash
}