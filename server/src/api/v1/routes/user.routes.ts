import {Router} from 'express';
import UserController from '../controller/user.controller';
import { CreateUserParams } from '../service/params/params';
import { Route } from './app.routes';

export default class UserRoutes implements Route {
    public userController = new UserController();
    public router = Router();
    public path = '/user';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.userController.createUser);
        this.router.get(`${this.path}/:id`, this.userController.getUser);
        this.router.get(`${this.path}/username/:username`, this.userController.getUserByUsername);
        this.router.patch(`${this.path}/:id`, this.userController.updateUser);
        this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
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
