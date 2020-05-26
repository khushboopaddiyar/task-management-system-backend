import { Schema, model, Document } from 'mongoose'

interface ITask extends Document {
    user: String,
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

export default model<ITask>('Task', TaskSchema)