import { Router, Request, Response, json } from 'express'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authUserToken from '../helper/authUserToken'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, message: "/users route" })
})

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password)
            return res.status(400).json({ success: false, message: `'name', 'email' & 'password' is required!` })
        const user = await User.create({
            name, email, password: await hash(password, 10)
        })
        const token = sign({
            data: {
                _id: user._id
            }
        }, process.env.JWT_SECRET ?? 'secret')
        res.status(201).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            token
        })
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({ success: false, message: 'User already exists!' })
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ success: false, message: `'email' & 'password' is required!` })
        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ success: false, message: `Email or Password is incorrect!` })
        if (!(await compare(password, user.password)))
            return res.status(400).json({ success: false, message: `Email or Password is incorrect!` })
        const token = sign({
            data: user._id
        }, process.env.JWT_SECRET ?? 'secret')
        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.get('/profile', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found!' })
        res.json({
            success: true,
            data: {
                profile: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.patch('/profile', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    const { name, email } = req.body
    if (!name || !email)
        return res.status(400).json({ success: false, message: `'name' & 'email' is required!` })
    try {
        await User.updateOne({
            _id: userId
        }, {
            $set: {
                name,
                email
            }
        })
        res.json({ success: true, message: 'Profile updated successfully!' })
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({ success: false, message: 'Email already exists!' })
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

router.patch('/password', async (req: Request, res: Response) => {
    const userId = authUserToken(req.headers.authorization)
    if (!userId)
        return res.status(401).json({ success: false, message: 'Invalid Authorization Token!' })
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword)
        return res.status(400).json({ success: false, message: `'oldPassword' & 'newPassword' is required!` })
    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found!' })
        if (!(await compare(oldPassword, user.password)))
            return res.status(400).json({ success: false, message: 'Old Password is incorrect!' })
        user.password = await hash(newPassword, 10)
        user.save()
        res.json({ success: true, message: 'Password changed successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Something Went Wrong!' })
    }
})

export default router