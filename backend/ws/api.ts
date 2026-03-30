import { WebSocket } from "ws";
import dotenv from 'dotenv'

dotenv.config()

export const apiServer = async () =>{
    const api = new WebSocket(`${process.env.FINNHUB_API_KEY}`)

    api.on("open", ()=>{
        console.log("Finnhub is connected!")
        
    })
}