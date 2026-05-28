import Header from "./components/Header"
import OpeningCard from "./components/OpeningCard"


const App = () => {
  return(
    <div className="flex flex-col h-screen w-full">
      <Header /> 
      <OpeningCard />
    </div>
  )
}

export default App