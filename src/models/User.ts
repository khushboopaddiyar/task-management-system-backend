import { Schema, model } from 'mongoose'

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

export default model('User', UserSchema)