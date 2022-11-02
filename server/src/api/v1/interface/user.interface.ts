import {Document} from 'mongoose';

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    fullname: string;
    address: string;
    gender: string;
    dob: string;
    createdAt: Date;
    updatedAt: Date;
}
