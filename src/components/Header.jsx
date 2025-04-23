import { useEffect, useState } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import logo from '../assets/astor-logo-removebg-preview.png'
export const Header = () => {

  const [nombre, setNombre] = useState('');

  useEffect(() => {

    const nombre = localStorage.getItem('usuarioNombre');
    
    if (nombre) setNombre(nombre);

  },[])

  return (
    <header className=' h-[7vh] md:h-[10vh] bg-secondary-100 border-b border-secondary-100 p-8 flex items-center justify-end'>

    <nav className='flex items-center gap-x-4'>
      <button>
        <RiNotification2Fill/>
      </button>
      <button className='flex items-center gap-x-2'>
      <img 
      src={logo} alt="hombre" className='w-7 h-7 object-cover rounded-full' />
      <span className='font-medium'>{nombre || 'Usuario'}</span>

      </button>
    </nav>

    </header>
  )
}
