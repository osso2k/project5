import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='flex min-h-screen w-full bg-[hsl(280,26%,9%)] text-white'>
  <StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  </div>
)
