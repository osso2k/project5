import CryptoNews from "./CryptoNews"
import DisplayTop7 from "./DisplayTop7"


const OpeningCard = () => {
  return (
    <div className="w-[65%] h-[30%] shadow-sm shadow-mauve-700  rounded-2xl mt-10 mx-auto">
      <div className="grid grid-cols-2 h-full w-full gap-2 px-2 py-4">
        <div className="h-[90%] w-full order-1 flex justify-center my-1">{<DisplayTop7 />}</div>
        <div className="order-2 flex justify-center my-auto h-full ">
          <div className="grid grid-rows-2 w-full justify-center">
            <div className="order-1 h-[95%] w-full ">top</div>
            <div className="order-2 h-[50%]">{<CryptoNews />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningCard