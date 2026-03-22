import express from 'express';
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from "./routes/authRoutes";
import wsServer from "./ws/wsServer";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

const server = http.createServer(app)
wsServer(server)
app.use('/api/auth',authRouter)

server.listen(PORT, ()=>{
    console.log(`Server is Live on port: ${PORT}`);
})