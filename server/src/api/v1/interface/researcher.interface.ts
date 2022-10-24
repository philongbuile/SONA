import {Document} from 'mongoose';

export interface IResearcher extends Document {
    id: string;
    username: string;
    password: string;
    fullname: string;
    createAt: string;
    updatedAt: string;
}
