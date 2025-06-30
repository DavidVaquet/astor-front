import React, { useState } from 'react';
import { enviarEmailRecuperacion } from '../../controllers/authController';
import { Link } from 'react-router-dom';
import { RiMailFill} from "react-icons/ri";
import { toast } from 'react-toastify';
import logo from '../../assets/astor-logo-removebg-preview.png';


export const RecoveryPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    await enviarEmailRecuperacion({email, setError, toast})
  }

  return (

      <div className='min-h-screen flex dark:bg-secondary-900 bg-bclaro p-4 items-center justify-center'>

    <div className='dark:bg-secondary-100 bg-blanco shadow-lg border-2 border-primary dark:border-none p-12 rounded-xl w-auto lg:w-[500px]'>
      <img src={logo} alt="Logo-Astor" className='w-36 h-36 mx-auto mb-2' />
      <h1 className='text-2xl text-center mb-8 font-bold tracking-[2px] dark:text-white text-black uppercase'>RECUPERAR <span className='text-primary'>CONTRASEñA</span></h1>
      <form
      onSubmit={handleSubmit} 
      className='mb-6'
      >
        <div className='relative mb-4'>
          <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='py-3 pl-8 pr-4 bg-bclaro border-2 border-primary dark:border-none w-full outline-none rounded-lg dark:focus:border-2 dark:focus:border-primary'
          placeholder='Correo electronico'/>
        </div>
        
        <div>
          <button 
          type='submit'
          className='bg-primary w-full py-3 px-4 rounded-xl text-sm font-bold uppercase'>
          Enviar instrucciones
          </button>
        </div>
      </form>
      <div className='flex flex-col items-center gap-4'>
          <span className='dark:text-white text-black'><Link to='/login'>¿Ya tienes una cuenta? <span className='text-primary'>Ingresa</span></Link></span>
      </div>
    </div>
      </div>
  )
}
