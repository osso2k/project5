import{ useEffect, useRef, useState } from "react";


const Starter = () => {
    const [status,setStatus] = useState<string | null>("Not Connected");
    const [msg,setMsg] = useState<string>("")
    const [msgs,setMsgs] = useState<string[]>([])
    const socketRef = useRef<WebSocket | null>(null)    
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        socketRef.current = socket
    
        socket.addEventListener("open",()=>{
        setStatus("Connection Established!")
        })
        socket.addEventListener("close",()=>{
        setStatus("Connection Lost...")
        })
        const handleMessages = async (message:MessageEvent)=>{
        setMsgs(prev => [...prev, message.data] )
        }
        socket.addEventListener("message", handleMessages)
        },[])

        const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if (!socketRef.current ||socketRef.current.readyState !== WebSocket.OPEN){
                setStatus("Cannot send when Web socket not connected")
            }
            else{
                socketRef.current.send(msg.trim())
                setMsg("")
            }
        }
        const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            setMsg(e.target.value)
        }
    return (
      <div className="flex flex-col h-full w-full mt-20">
        <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
            <input onChange={handleChange} value={msg} className=" bg-white p-2 w-40 h-9 rounded-2xl" type="text"  />
            <button type="submit">Send</button>
        </form>
        <div className="flex flex-col w-[50%] h-80 mt-6 mx-auto border shadow-2xs shadow-white ">
        <p className="flex text-2xl text-white mt-2 ml-4">Current Status: {status}</p>
        {msgs.map(( msg, i)=>(
          <li className="text-md text-white mt-2 ml-5" key={i}>{ Date().toLocaleString()} - {msg}</li>
        ))}
        </div>
      </div>
      )
}

export default Starter