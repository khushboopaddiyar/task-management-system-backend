import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, message: '/todos route' })
})

export default router