import { Schema, model, Document } from 'mongoose'

interface ITask extends Document {
    description: string,
    dueDate: Date,
    label: String,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: null
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const UserSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
}, {
    timestamps: true
})

export default model<IUser>('User', UserSchema)