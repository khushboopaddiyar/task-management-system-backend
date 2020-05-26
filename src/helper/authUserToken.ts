import { verify } from 'jsonwebtoken'

export default (token: any) => {
    if (!token)
        return
    try {
        const data: any = verify(token, process.env.JWT_SECRET ?? 'secret')
        const userId = data.data
        return userId
    } catch (err) {
        return
    }
}