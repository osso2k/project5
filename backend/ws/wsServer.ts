import type { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

const HEARTBEAT_INTERVAL = 1000 * 10
const HEARTBEAT_VALUE = 67


// const ping = async (ws: WebSocket) => {
//     ws.send(HEARTBEAT_VALUE, {binary:true})
// }
const wsServer = (server: Server) => {
    const wss = new WebSocketServer({server, maxPayload: 1024 * 1024})

    wss.on("connection", (socket)=>{
        socket.isAlive = true
        socket.on("message",(data /*, isBinary*/)=>{
            // if (isBinary && (data as any)[0] === HEARTBEAT_VALUE ){
            //     console.log('pong');
            //     socket.isAlive = true
                 
            // }else{
                const message = data.toString()
                console.log({message});
    
                wss.clients.forEach((client)=>{
                    if (client.readyState == WebSocket.OPEN){
                        client.send(JSON.stringify({type:"broadcast" ,message:`Server Broadcast: ${message}`}))
                    }
                })
            // }
        })
        socket.on("error",(err)=>{
            console.log(`Err: `,err.message);
        })
        socket.on("close",()=>{
            console.log(`Server Disconnected...`);
        })
    })
    // const Interval = setInterval(()=>{
    //     console.log('ping');
    //     wss.clients.forEach((client)=>{
    //         if (!client.isAlive){
    //             client.terminate()
    //             return
    //         }else{
    //             client.isAlive = false
    //             ping(client)
    //         }
    //     })
    // }, HEARTBEAT_INTERVAL)
    return wss
}

export default wsServer