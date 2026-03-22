import {Router} from 'express'

const authRouter = Router()
authRouter.get('/user')
authRouter.post('/signup')
authRouter.post('/login')

export default authRouter