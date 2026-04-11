import profile from '../assets/profile.png'

const Header = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 w-full h-[12%] mt-2  px-6">
        <div className='mx-auto my-auto'>
            <h1 className="font-minecraft text-3xl pl-20 pt-6  " >Forkymarket</h1>
        </div>
        <div className="flex text-xl mx-auto my-auto">
            <ul className="flex border-b border-zinc-800 font-minecraft text-xl list-none gap-6 pt-8 pb-2">
            <li className="cursor-pointer hover:text-zinc-700 transition-all ">markets</li>
            <li className="cursor-pointer hover:text-zinc-700 transition-all ">favs</li>
            <li className="cursor-pointer hover:text-zinc-700 transition-all ">analysis</li>
            </ul>
        </div>
        <div className='pt-4 mx-auto my-auto'>
            <img className='cursor-pointer h-12 w-12' src={profile} alt="pic" />
        </div>

    </div>
  )
}

export default Header