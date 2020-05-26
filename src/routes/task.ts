import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, message: '/tasks route' })
})

export default router