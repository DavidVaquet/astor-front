import React from 'react';
import { Link } from 'react-router-dom';
import { RiMailFill} from "react-icons/ri";

import logo from '../../assets/astor-logo-removebg-preview.png';


export const RecoveryPassword = () => {


  return (

      <div className='min-h-screen flex bg-secondary-900 p-4 items-center justify-center'>

    <div className='bg-secondary-100 p-12 rounded-xl w-auto lg:w-[500px]'>
      <img src={logo} alt="Logo-Astor" className='w-36 h-36 mx-auto mb-2' />
      <h1 className='text-2xl text-center mb-8 font-bold tracking-[2px] text-white uppercase'>RECUPERAR <span className='text-yellow-400'>CONTRASEñA</span></h1>
      <form className='mb-6'>
        <div className='relative mb-4'>
          <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="email"
          className='py-3 pl-8 pr-4 bg-white w-full outline-none rounded-lg focus:border-2 focus:border-yellow-400'
          placeholder='Correo electronico'/>
        </div>
        
        <div>
          <button 
          type='submit'
          className='bg-yellow-400 w-full py-3 px-4 rounded-xl text-sm font-bold uppercase'>
          Enviar instrucciones
          </button>
        </div>
      </form>
      <div className='flex flex-col items-center gap-4'>
          <span className='text-white'><Link to='/login'>¿Ya tienes una cuenta? <span className='text-yellow-400'>Ingresa</span></Link></span>
      </div>
    </div>
      </div>
  )
}
