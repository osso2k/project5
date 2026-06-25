import { usePricesStore } from "../stores/usePricesStore"


const DisplayTop7 = () => {
  const { prices } = usePricesStore()
  return (
    <div>
      {Object.entries(prices).map(([symbol , price ]) =>(
        <div key={symbol}>
          <span>{symbol}</span>
          <span>{price}</span>
        </div>
      ))}
    </div>
    
  )
}

export default DisplayTop7