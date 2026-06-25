import { pool } from "../config/db"
import { Request, Response } from "express"

export const getFavs = async (req: Request,res: Response)=>{
    const userId = req.user?.id
    const favs = await pool.query(`SELECT * FROM favs WHERE user_id = $1 RETURNING symbol`, [userId])
    res.status(200).json({favs})
}
export const addFav = async (req: Request,res: Response)=>{
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ error: "Not authenticated" })
            
        }
        const {symbol} = req.body
        if (!symbol || typeof symbol !== "string") {
            return res.status(400).json({ error: "symbol is required" })
        }
        await pool.query(`INSERT INTO favs (user_id, symbol) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, symbol])
        res.status(201).json({message: "Favs Added!", symbol})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: (error as Error).message})
    }
}
export const removeFav = async (req: Request,res: Response)=>{
    try {
        const userId = req.user?.id
        const {symbol} = req.body
        if (!userId) {
            return res.status(401).json({ error: "Not authenticated" })   
        }
        if (!symbol || typeof symbol !== "string") {
            return res.status(400).json({ error: "symbol is required" })
        }
        const result = await pool.query(`DELETE FROM favs WHERE user_id = $1 AND symbol = $2`,[userId, symbol] )        
        if (result.rowCount === 0){
            return res.status(404).json({message: "Not Found in Favs", symbol})
        }
        res.status(200).json({message: " Favs Removed!", symbol})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error", err: (error as Error).message})
    }
}
// export const showFavsPrices = async (req:Request, res: Response) =>{
    
// }