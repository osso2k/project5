import { Router } from "express"
import { generalNews } from "../controllers/newsController"

const newsRouter = Router()

newsRouter.get("/general", generalNews)

export default newsRouter