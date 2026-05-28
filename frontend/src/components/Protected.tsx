import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"


export const Protected = ({children}:PropsWithChildren) => {
    const token = localStorage.getItem("token")
    if (!token){
        return <Navigate to={"/login"} replace/>
    }
    return children;
}
export const ProtectedAuth = ({children}:PropsWithChildren)=>{
    const token = localStorage.getItem("token")
    if(token){
        return <Navigate to={"/"} replace/>
    }
    return children;
}