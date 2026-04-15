import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Form {
    username:string;
    password:string;
}

const Signup = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(false);
    const [form,setForm] = useState<Form>({username:"" , password:""})
  return (
    <div className="flex w-full h-full mt-40">
        <div className="flex flex-col flex-wrap mx-auto h-[500px] w-[40%] shadow shadow-zinc-800 rounded-lg ">
            <div className="flex justify-between">
                <h1 className="font-minecraft text-2xl pt-12 pl-10">Forkymarket</h1>
                <p className="font-mono text-lg my-auto pt-7 pr-10  text-zinc-600">Sign up</p>
            </div>
                <button onClick={()=>{navigate("/")}}>home</button>
                  <button onClick={()=>{navigate("/signup")}}>signup</button>
                  <button onClick={()=>{navigate("/login")}}>login</button>
        <div className="pt-24 flex flex-col flex-wrap">
            <form action="">
                <div className="flex pl-[20%] p-1">  
                    <label className="font-minecraft my-auto pr-3" >username: </label>
                    <input className="text-black text-lg pl-2 h-10 border border-black w-[50%] bg-white rounded-lg" type="text" />
                </div>
                <div className="flex pl-[20%] p-1">  
                    <label className="font-minecraft my-auto pr-3" >password: </label>
                    <input className="text-black text-lg pl-2 h-10 border border-black w-[50%] bg-white rounded-lg" type="text" />
                </div>
                <button className="flex mx-auto mt-2 mr-60 pt-2 text-xl rounded-2xl px-6 cursor-pointer my-auto py-1 text-center font-minecraft border" type="submit">signup</button>
            </form>
            <div className="text-white text-lg text-center">
            <p className=" pt-10 ">Already have an account?</p>
            <span className="font-minecraft font-semibold cursor-pointer"> Log in.</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Signup