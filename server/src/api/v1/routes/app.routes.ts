import {Router} from 'express';
import AppController from '../controller/app.controller';

export interface Route {
    path?: string;
    router: Router;
}

export default class AppRoutes implements Route {
    public appController = new AppController();
    public router = Router();
    public path = '/';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.appController.index);
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