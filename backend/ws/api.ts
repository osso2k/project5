import { WebSocket, WebSocketServer } from "ws";


export const apiServer = async (wss:WebSocketServer) =>{
    const COINS = ["btcusdt","ethusdt","bnbusdt","solusdt","xrpusdt","dogeusdt","adausdt","avaxusdt","linkusdt","dotusdt"]
    const prices: Record<string , string> = {}

    const streams = COINS.map(c => `${c}@trade`).join("/")
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)
    ws.on("open", ()=>{
        console.log("binance is connected!")
    })

    ws.on("message",(msg:Buffer | string)=>{
        const parsed = JSON.parse(msg.toString())
        prices[`${parsed.data.s}`] = parsed.data.p
    })
    setInterval(()=>{
        if (Object.keys(prices).length === 0) return
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({ type :"prices", data:prices}))
            }
        })
    },2000)
    ws.on("error", (err:Error)=>{
        console.log("Sorry something went wrong...",err);
    })
    ws.on("close",()=>{
        console.log("Connection lost...");
    })
    
}