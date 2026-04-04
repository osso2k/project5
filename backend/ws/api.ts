import { WebSocket } from "ws";


export const apiServer = async () =>{
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")
    
    ws.on("open", ()=>{
        console.log("binance is connected!")
    })
    ws.on("message",(msg:Buffer | string)=>{
        const data = JSON.parse(msg.toString())
        const price  = data.p
        console.log("BTC: ",price);
    })
    ws.on("error", (err:Error)=>{
        console.log("Sorry something went wrong...",err);
    })
    ws.on("close",()=>{
        console.log("Connection lost...");
    })
    
}