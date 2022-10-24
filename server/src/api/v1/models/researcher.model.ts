import {model, Schema, Document} from 'mongoose'
import {IResearcher} from '../interface/researcher.interface'

const ResearcherSchema: Schema = new Schema({
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
    createAt: {
        type: String,
        default: Date.now
    },
    updatedAt: {
        type: String,
    }
});

export default model<IResearcher>('Researcher', ResearcherSchema);
