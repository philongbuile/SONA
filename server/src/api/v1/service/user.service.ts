import User from '../models/user.model';
import {hash} from 'bcrypt';
import { CreateUserParams } from './params/params';
import {IUser} from '../interface/user.interface';
import {isEmpty, isEmail, isStrongPassword, isPhone} from '../../../utils/validate';

class UserService {    
    public async createUser(params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        if (!isEmail(params.email)) {
            throw new Error('Invalid email');
        }

        if (!isPhone(params.phone)) {
            throw new Error('Invalid phone');
        }

        if (!isStrongPassword(params.password)) {
            throw new Error('Invalid password');
        }

        const user = await User.findOne({email: params.email});
        if (!user) {
            throw new Error('User already exists');
        }

        const newUser = new User({
            email: params.email,
            username: params.username,
            password: params.password,
            fullname: params.fullname,
            dob: params.dob,
        });
        return newUser.save();
    }

    public async getUserById(id: string): Promise<IUser> {
        if (isEmpty(id)) {
            throw new Error('Missing params');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async getUserByEmail(email: string): Promise<IUser> {
        if (isEmpty(email)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async getUserByUsername(username: string): Promise<IUser> {
        if (isEmpty(username)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({username: username});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async getUserByPhone(phone: string): Promise<IUser> {
        if (isEmpty(phone)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({phone: phone});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async getAllUsers(): Promise<IUser[]> {
        const users = await User.find();
        return users;
    }

    public async updateUser(id: string, params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        if (!isEmail(params.email)) {
            throw new Error('Invalid email');
        }

        if (!isStrongPassword(params.password)) {
            throw new Error('Invalid password');
        }

        if (!isPhone(params.phone)) {
            throw new Error('Invalid phone');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const hashPassword = await hash(params.password, 10);
        params.password = hashPassword;

        const newUser = await User.findByIdAndUpdate(id, params)
        
        if (!newUser) {
            throw new Error('User not found');
        }

        return newUser.save();
    }

    public async deleteUser(id: string): Promise<IUser> {
        if (isEmpty(id)) {
            throw new Error('Missing params');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const newUser = await User.findByIdAndDelete(id);
        if (!newUser) {
            throw new Error('User not found');
        }

        return newUser;
    }
}

export default UserService;


