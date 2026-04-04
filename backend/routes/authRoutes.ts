import {Router} from 'express'
import { getuser, login, signup } from '../controllers/authController'

const authRouter = Router()
authRouter.get('/user',getuser)
authRouter.post('/signup',signup)
authRouter.post('/login', login)

export default authRouter