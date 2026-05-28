import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import { Toaster } from 'react-hot-toast'
import { Protected, ProtectedAuth } from './components/Protected.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='flex min-h-screen w-full bg-[hsl(280,26%,9%)] text-white'>
  <StrictMode>
    <BrowserRouter >
    <Toaster />
      <Routes>
        <Route path='/' element={<Protected><App /></Protected>} />
        <Route path='/signup' element={<ProtectedAuth><Signup /></ProtectedAuth>} />
        <Route path='/login' element={<ProtectedAuth><Login /></ProtectedAuth>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  </div>
)
