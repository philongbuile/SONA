import {Document} from 'mongoose';

export interface IDoctor extends Document {
    id: string;
    username: string;
    password: string;
    fullname: string;
    gender: string;
    specialization: string;
    createdAt: Date;
    updatedAt: Date;
}
