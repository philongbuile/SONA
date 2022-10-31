import {Router} from 'express';
import AuthController from '../controller/auth.controller';
import { Route } from './app.routes';

export default class AuthRoutes implements Route {
    public authController = new AuthController();
    public router = Router();
    public path = '/auth';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.authController.signup);
        this.router.post(`${this.path}/login`, this.authController.login);
        this.router.post(`${this.path}/logout`, this.authController.logout);
    }

    public getRoutes(): Route[] {
        return [
            {
                path: `${this.path}`,
                router: this.router
            }
        ];
    }
}
