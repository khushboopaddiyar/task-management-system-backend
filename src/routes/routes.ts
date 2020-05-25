import { Router, Request, Response } from 'express'

import userRouter from './user'
import todoRouter from './todo'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, message: 'Server Up and Running...' })
})

router.get('/api', (req: Request, res: Response) => {
    res.json({ success: true, message: 'API Server Up and Running...' })
})

router.use('/api/users', userRouter)
router.use('/api/todos', todoRouter)

router.use('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Not Found' })
})

export default router