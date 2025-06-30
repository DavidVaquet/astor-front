import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from '../assets/astor-logo-removebg-preview.png'
export const Header = () => {

  const [nombre, setNombre] = useState('');

  useEffect(() => {

    const nombre = localStorage.getItem('usuarioNombre');
    
    if (nombre) setNombre(nombre);

  },[])

  return (
    <header className=' h-[7vh] md:h-[10vh] bg-blanco text-black dark:bg-secondary-100 dark:text-white border-b border-secondary-100 p-8 flex items-center justify-end'>

    <nav className='flex items-center gap-x-4'>
      <ThemeToggle/>
      <button className='flex items-center gap-x-2'>
      <img 
      src={logo} alt="hombre" className='w-7 h-7 object-cover rounded-full' />
      <span className='font-medium'>{nombre || 'Usuario'}</span>

      </button>
    </nav>

    </header>
  )
}
