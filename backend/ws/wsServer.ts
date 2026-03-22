import type { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

const wsServer = (server: Server) => {
    const wss = new WebSocketServer({server})

    wss.on("connection", (socket)=>{
        socket.on("message",(data)=>{
            const message = data.toString()
            console.log({message});

            wss.clients.forEach((client)=>{
                if (client.readyState == WebSocket.OPEN){
                    client.send(`Server Broadcast: ${message}`)
                }
            })
        })
        socket.on("error",(err)=>{
            console.log(`Err: `,err.message);
        })
        socket.on("close",()=>{
            console.log(`Server Disconnected...`);
        })
    })
}

export default wsServer