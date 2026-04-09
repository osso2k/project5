import { Router } from "express"
import { addFav, getFavs, removeFav } from "../controllers/favsController"

const favsRouter = Router()

favsRouter.get("/favs", getFavs)
favsRouter.post("/favs/add", addFav)
favsRouter.delete("/favs/remove", removeFav)

export default favsRouter