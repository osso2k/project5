import { useEffect, useState } from "react"
import api from "../api"
import {motion , AnimatePresence } from "motion/react"

interface News {
  id: number;
  headline: string;
  datetime: number;
  summary: string;
  url: string

}
const CryptoNews = () => {
  const [news, setNews] = useState<News[]>([])
  const [startIndex, setStartIndex] = useState(0)
  useEffect(()=>{
    const getNews = async () =>{
        try {
          const response = await api.get("/api/news/general")
          setNews(response.data)
        } catch (error) {
          console.log("Error in getting news...", (error as Error).message);
        }
      }
      getNews()
  },[])
  useEffect(()=>{
    if (news.length <= 2){
      return 
    }
    const inteval = setInterval(()=>{
      setStartIndex(prev => (prev + 2) % news.length)
    }, 5000)

    return () => clearInterval(inteval)
  },[news])
  const visibleNews = [news[startIndex], news[(startIndex + 1) % news.length],].filter(Boolean)
  return (
    <div>
      {news ? <><div className="overflow-hidden h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={startIndex}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {visibleNews.map((item) => (
            <div
              key={item.id}
              className="mb-3 rounded-lg border p-3"
            >
              <h3 className="font-semibold">{item.headline}</h3>
              <p>{item.summary}</p>
              <p>{item.datetime}</p>
              <p>{item.url}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div></> : <> <p>No news yet...</p></>}
    </div>
  )
}

export default CryptoNews