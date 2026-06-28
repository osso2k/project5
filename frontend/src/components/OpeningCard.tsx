import CryptoNews from "./CryptoNews"
import DisplayTop7 from "./DisplayTop7"
import Gainers from "./Gainers"


const OpeningCard = () => {
  return (
    <div className="w-[65%] h-[45%] shadow-sm shadow-mauve-700  rounded-2xl mt-10 mx-auto">
      <div className="grid grid-cols-2 min-h-96 w-full gap-2 px-2 py-4">
        <div className="h-full w-full order-1 flex justify-center my-1">{<DisplayTop7 />}</div>
        <div className="order-2 flex justify-center my-auto h-full ">
          <div className="grid grid-rows-2 max-h-96 w-full justify-center">
            <div className="order-1 max-h-full w-full ">{<Gainers />}</div>
            <div className="order-2 max-h-full">{<CryptoNews />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningCard