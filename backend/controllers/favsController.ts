import { pool } from "../config/db"
import { Request, Response } from "express"

export const getFavs = async (req: Request,res: Response)=>{
    const userId = req.user
    const favs = await pool.query(`SELECT * FROM favs WHERE user_id = $1 RETURNING symbol`, [userId])
    res.json({favs: favs, })
}
export const addFav = async ()=>{
    
}
export const removeFav = async ()=>{
    
}