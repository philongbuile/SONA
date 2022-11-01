import { NextFunction, Request, Response } from 'express';
import { decode, JwtPayload} from 'jsonwebtoken';
import { verifyToken } from '../../../utils/jwt';

interface UserRequest extends Request {
    token: string | JwtPayload;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        (req as UserRequest).token = decoded;
        next();
    } catch (err) {
        res.status(401).send({ message: 'Unauthorized' });
    }
}