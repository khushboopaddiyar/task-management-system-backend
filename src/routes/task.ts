import { Router, Request, Response } from 'express'

import Task from '../models/Task'
import authUserToken from '../helper/authUserToken'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    try {
        const tasks = await Task.find({ user: userId }).sort({ dueDate: 1 })
        res.json({
            success: true,
            data: {
                tasks
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    try {
        const task = await Task.findOne({ _id: req.params.id, user: userId })
        if (!task)
            return res.status(404).json({ success: false, message: 'Task not found!' })
        res.json({
            success: true,
            data: {
                task
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.post('/', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    const { description, label, dueDate } = req.body
    if (!description || !dueDate)
        return res.status(400).json({ success: false, message: `Task Description and Due Date is required!` })
    try {
        const task = await Task.create({
            user: userId,
            description,
            label: label ? label : 'Unlabelled',
            dueDate
        })
        res.status(201).json({
            success: true,
            data: {
                task
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.patch('/:id', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    try {
        const task = await Task.findOne({ _id: req.params.id, user: userId })
        if (!task)
            return res.status(404).json({ success: false, message: 'Task not found!' })
        if (task.status === 2)
            return res.status(400).json({ success: false, message: 'Task already completed!' })
        task.status++
        await task.save()
        res.json({
            success: true,
            data: {
                task
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    try {
        const task = await Task.findOne({ _id: req.params.id, user: userId })
        if (!task)
            return res.status(404).json({ success: false, message: 'Task not found!' })
        await task.remove()
        res.json({ success: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

export default router