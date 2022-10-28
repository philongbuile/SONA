import {model, Document, Schema} from 'mongoose';
import {IDoctor} from '../interface/doctor.interface';

const DoctorSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
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
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    specialization: {
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

export default model<IDoctor>('Doctor', DoctorSchema);