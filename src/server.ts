import { config } from 'dotenv'
import express, { Application } from 'express'

config()

import './db/MongoDB'
import router from './routes/routes'
const port: number = parseInt(process.env.PORT ?? '5000')

const app: Application = express()

app.use(express.json())

app.use('/', router)

app.listen(port, () => console.log(`${process.env.NODE_ENV !== 'production' ? 'Development' : 'Production'} Server Started on Port ${port}...`))