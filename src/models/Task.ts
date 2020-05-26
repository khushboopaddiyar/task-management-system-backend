import { Schema, model, Document } from 'mongoose'

// STATUS FLAGS
// 0 - New
// 1 - Doing
// 2 - Completed

interface ITask extends Document {
    user: any,
    description: string,
    label: String,
    dueDate: Date,
    status: number,
    createdAt: Date,
    updatedAt: Date
}

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
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

export default model<ITask>('Task', TaskSchema)