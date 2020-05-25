import mongoose, { mongo } from 'mongoose'

mongoose
    .connect(process.env.MONGODB_URL ?? 'mongodb://localhost:27017/taskManagementSystem', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

export default mongoose.connection