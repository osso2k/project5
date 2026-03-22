import {Router} from 'express'

const authRouter = Router()
authRouter.get('/user', (_req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})
authRouter.post('/signup', (_req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})
authRouter.post('/login', (_req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default authRouter