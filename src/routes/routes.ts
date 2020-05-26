import { Router, Request, Response } from 'express'

import userRouter from './user'
import taskRouter from './task'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, message: 'Server Up and Running...' })
})

router.get('/api', (req: Request, res: Response) => {
    res.json({ success: true, message: 'API Server Up and Running...' })
})

router.use('/api/users', userRouter)
router.use('/api/tasks', taskRouter)

router.use('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Not Found' })
})

export default router