import {NextFunction, Request, Response} from 'express';
import {Auth} from '../interface/auth.interface';
import AuthService from '../service/auth.service';
import { CreateUserParams } from '../service/params/params';

export default class AuthController {
    public authService = new AuthService();

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params: CreateUserParams = req.body;
            const user = await this.authService.signup(params);
            res.status(201).json({data: user, message: 'Register successfully'});
        } catch (error) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auth: Auth = req.body;
            const {cookie, oneUser} = await this.authService.login(auth);
            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({data: oneUser, message: 'Login successfully'});
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params: CreateUserParams = req.body;
            const user = await this.authService.logout(params);
            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(200).json({data: user, message: 'Logout successfully'});
        } catch (error) {
            next(error);
        }
    }
}
