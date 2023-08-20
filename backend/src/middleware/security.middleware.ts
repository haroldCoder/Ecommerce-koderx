import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express'

class AuthMiddleware {
    private secretKey: string

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    authenticate(req: Request, res: Response, next: NextFunction) {
        const { username } = req.query;

        if (!username) {
            return res.status(401).json({ message: 'Token of authentication not provided' });
        }
        else if(username !== process.env.SECRET_KEY){
            return res.status(500).json({message: 'Token invalid'})
        }
        jwt.sign({username}, this.secretKey, {expiresIn: '1h'})
        next();
    }
}

export default AuthMiddleware;