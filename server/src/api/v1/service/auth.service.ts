import {Auth, TokenPayload} from '../interface/auth.interface';
import {IUser} from '../interface/user.interface';
import {hash, compare} from 'bcrypt';
import User from '../models/user.model';
import { CreateUserParams } from './params/params';
import { isEmpty } from '../../../utils/validate';
import { generateToken } from '../../../utils/jwt';
import { generateCookie } from '../../../utils/cookie';

export default class AuthService {
    public async signup(params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({username: params.username});
        if (user) {
            throw new Error('User already exists');
        }

        const hased = await hash(params.password, 10);
        const newUser = new User({
            email: params.email,
            username: params.username,
            password: hased,
            fullname: params.fullname,
            dob: params.dob,
        });

        // can use token with email here, but too lazy to implement LOL

        return newUser.save();
    }

    public async login(auth: Auth): Promise<{cookie: string; oneUser: IUser}> {
        if (isEmpty(auth)) {
            throw new Error('Missing params');
        }
        try {
            const user = await User.findOne({username: auth.username});
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await compare(auth.password, user.password);
            if (!isMatch) {
                throw new Error('Password incorrect');
            } else {
                const payload: TokenPayload = {
                    id: user._id,
                    username: user.username,
                    iat: new Date().toISOString(),
                    exp: Date.now() + 3600000
                };
                const token = generateToken(payload);
                const cookie = generateCookie(token);

                return {cookie, oneUser: user};
            }
        } catch (error) {
            throw error;
        }
    }

    public async logout(params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({username: params.username});
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // just make a temporary version first
    public async changePassword(auth: Auth): Promise<IUser> {
        if (isEmpty(auth)) {
            throw new Error('Missing params');
        }
        try {
            const user = await User.findOne({username: auth.username});
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await compare(auth.password, user.password);
            if (!isMatch) {
                throw new Error('Password incorrect');
            } else {
                const hased = await hash(auth.password, 10);
                user.password = hased;
                return user.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

