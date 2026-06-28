import { WebSocket, WebSocketServer } from "ws";


export const apiServer = async (wss:WebSocketServer) =>{
    // const COINS = ["btcusdt","ethusdt","bnbusdt","solusdt","xrpusdt","dogeusdt","adausdt"]
    const prices: Record<string , {price:string; changePct: string}> = {}

    // const streams = COINS.map(c => `${c}@trade`).join("/")
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/!ticker@arr`)
    ws.on("open", ()=>{
        console.log("binance is connected!")
    })

    ws.on("message",(msg:Buffer | string)=>{
        const tickers = JSON.parse(msg.toString())
        tickers.forEach((t: any)=>{
            prices[t.s] = {price: t.c, changePct: t.P }
        })
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