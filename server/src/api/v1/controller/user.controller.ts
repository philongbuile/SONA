import {NextFunction, Request, Response} from 'express';
import {IUser} from '../interface/user.interface';
import UserService from '../service/user.service';
import { CreateUserParams } from '../service/params/params';

export default class UserController {
    public userService = new UserService();
    
    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params: CreateUserParams = req.body;
            const user: IUser = await this.userService.createUser(params);
            res.status(201).json({User: user, message: 'User created successfully'});
        } catch (error) {
            next(error);
        }
    }

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const user: IUser = await this.userService.getUserById(id);
            res.status(200).json({data: user, message: 'User retrieved successfully'});
        } catch (error) {
            next(error);
        }
    }

    public getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const user: IUser = await this.userService.getUserByUsername(username);
            res.status(200).json({data: user, message: 'User retrieved by username successfully'});
        } catch (error) {
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const params: CreateUserParams = req.body;
            const user: IUser = await this.userService.updateUser(id, params);
            res.status(200).json({user});
        } catch (error) {
            next(error);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const user: IUser = await this.userService.deleteUser(id);
            res.status(200).json({data: user, message: 'User deleted successfully'});
        } catch (error) {
            next(error);
        }
    }
}