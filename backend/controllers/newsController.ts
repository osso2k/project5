import { Request, Response } from "express"
import finnhub from "finnhub"

const { DefaultApi } = finnhub
const finnhubClient = new DefaultApi(process.env.FINNHUB_API_KEY!)

export const generalNews = async (_req: Request, res: Response) => {
    try {
        finnhubClient.marketNews("crypto", {}, (error: unknown, data: unknown) => {
            if (error) {
                return res.status(502).json({ message: "Failed to fetch news", err: error })
            }
            return res.json(data)
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong fetching news...", err: (error as Error).message })
    }
}
