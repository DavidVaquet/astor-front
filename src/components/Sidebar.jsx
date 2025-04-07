import { useState } from 'react';
import { FaReceipt, FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineClose } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { logout } from '../services/authServices';
import logo from '../assets/astor-logo-removebg-preview.png';

export const Sidebar = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
    <div className={`xl:h-[100vh] overscroll-y-auto xl:static fixed w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full -left-full top-0 bg-secondary-100 flex flex-col justify-between z-50 ${showMenu ? 'left-0' : '-left-full'} transition-all`}>
      <div className='py-3 p-2'>
        <img src={logo} alt="ASTOR-LOGO" className='w-40 h-40 mx-auto' />
        <nav className='mt-2'>
          <Link to='/home' className='flex items-center font-medium gap-4 py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <SiGoogleanalytics className='text-yellow-400'/>Estadisticas Generales
          </Link>
          <Link to='/home/astorfray' className='flex items-center font-medium gap-4 py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <FaReceipt className='text-yellow-400'/>Facturación Fray
          </Link>
          <Link to='/home/astorgalindez' className='flex items-center gap-4  font-medium py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <FaReceipt className='text-yellow-400'/>Facturación Galindez
          </Link>
          <Link to='/home/inmobiliaria' className='flex items-center font-medium gap-4 py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <FaReceipt className='text-yellow-400'/>Facturación Inmobiliaria
          </Link>
          <Link to='/home/crear-usuario' className='flex items-center font-medium gap-4 py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <FaUser className='text-yellow-400'/>Crear Usuario
          </Link>
          <Link to='/home/usuarios' className='flex items-center font-medium gap-4 py-3 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <FaUser className='text-yellow-400'/>Gestion de Usuarios
          </Link>
          
        </nav>
      </div>
      <nav>
      <button onClick={logout} className='flex items-center  font-medium gap-4 py-3 mb-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors'>
          <IoLogOut className='text-yellow-400'/>Cerrar sesion
          </button>
      </nav>
    </div>
    <button onClick={() => setShowMenu(!showMenu)} className='xl:hidden rounded-full bg-yellow-400 fixed bottom-4 right-4 text-black p-3 z-50'> 
      {showMenu ? <MdOutlineClose/> : <IoMenu/>}
     </button>
    </>
  )
}
