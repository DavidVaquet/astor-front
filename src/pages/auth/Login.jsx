// Importaciones de React
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { manejarLogin } from '../../controllers/authController';
// Logos
import { RiMailFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import logo from '../../assets/astor-logo-removebg-preview.png';


export const Login = () => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    await manejarLogin({
      email,
      password,
      setUser: null,
      setError,
      navigate
    })
  }

  return (
    <div className='min-h-screen flex dark:bg-secondary-900 bg-bclaro p-4 items-center justify-center'>

    <div className='dark:bg-secondary-100 bg-blanco shadow-2xl border-2 border-primary dark:border-none dark:shadow-none p-12 rounded-xl w-auto lg:w-[500px]'>
      <img src={logo} alt="Logo-Astor" className='w-36 h-36 mx-auto mb-2' />
      <h1 className='text-2xl text-center mb-8 font-bold tracking-[2px] dark:text-white text-black'>INICIAR <span className='text-primary'>SESIÓN</span></h1>
      
    {error && (
    <div className="bg-red-500 text-white text-sm font-semibold px-4 py-2 mb-4 rounded-md text-center">
    {error}
    </div>
    )}

      <form onSubmit={handleSubmit} className='mb-6'>
        <div className='relative mb-4'>
          <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='py-3 pl-8 pr-4 bg-bclaro border-2 border-primary dark:border-none  w-full outline-none rounded-lg dark:focus:border-2 dark:focus:border-primary'
          placeholder='Correo electronico'
          required/>
        </div>
        <div className='relative mb-4'>
          <FaLock className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='py-3 pl-8 pr-4 bg-bclaro border-2 border-primary dark:border-none w-full outline-none rounded-lg dark:focus:border-2 dark:focus:border-primary'
          placeholder='Contraseña'
          required/>
          {
            showPassword ? (

              <RiEyeOffFill onClick={ () => setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer'/>
            ) : (
              <RiEyeFill onClick={ () => setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer'/>
            )
          }
        </div>
        <div>
          <button 
          type='submit'
          className='bg-primary w-full py-3 px-4 rounded-xl text-sm font-bold uppercase'>
          Ingresar
          </button>
        </div>
      </form>
      <div className='flex flex-col items-center gap-4'>
          <span className='dark:text-white text-black font-semibold hover:text-primary'><Link to='/recuperar-contraseña'>¿Olvidaste tu contraseña?</Link></span>
      </div>
    </div>

    </div>
  )
}
