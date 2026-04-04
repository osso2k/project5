import express from 'express';
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from "./routes/authRoutes";
import wsServer from "./ws/wsServer";
import { connectDB, createFavouritesTable, createUserTable, messagesTable, uuidGen } from './config/db';
import { apiServer } from './ws/api';
import { protectedRoute } from './middleware/authMiddleware';
import appRouter from './routes/appRoutes';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

await connectDB()
await uuidGen()
await createUserTable()
await createFavouritesTable()
await messagesTable()


const server = http.createServer(app)
wsServer(server)
apiServer()
app.use('/api/auth',authRouter)
app.use('/api/app',protectedRoute,appRouter)
server.listen(PORT, ()=>{
    console.log(`Server is Live on port: ${PORT}`);
})