import {model, Schema, Document} from 'mongoose';
import {IUser} from '../interface/user.interface';

const UserSchema: Schema = new Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true, 
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true   
    },
    dob: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

export default model<IUser>('User', UserSchema);
