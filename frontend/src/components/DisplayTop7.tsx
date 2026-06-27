import { usePricesStore } from "../stores/usePricesStore"


const DisplayTop7 = () => {
  const prices = usePricesStore()
  const sortedPrices = Object.entries(prices).sort(([,a],[,b]) => Number(b) - Number(a))
  return (
    <div className="flex w-[70%] flex-col flex-wrap font-serif">
      {sortedPrices ? sortedPrices.map(([symbol , price ]) =>(
        <div className="flex w-full justify-between my-auto" key={symbol}>
          <span className="text-2xl">{symbol.slice(0,3)}</span>
          <span className="flex min-w-[50%] font-sans text-xl">${Number(price)}</span>
        </div>
      )) : <><div>Hey</div></>}
    </div>
    
  )
}

export default DisplayTop7