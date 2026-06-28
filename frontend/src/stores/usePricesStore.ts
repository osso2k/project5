import { useEffect, useState } from "react"
import { socket } from "../socket"

export const usePricesStore = ()=>{
    const [prices, setPrices] = useState<Record<string, {price: string, changePct: string}>>({})
    useEffect(()=>{
        const handleMessages = (msg: MessageEvent)=>{
            const parsed = JSON.parse(msg.data)
            if(parsed.type ===  "prices"){
                setPrices(parsed.data)
            }
        }
        socket.addEventListener("message", handleMessages)
        return ()=>{
            socket.removeEventListener("message", handleMessages)
        }
    },[])
    return prices
}