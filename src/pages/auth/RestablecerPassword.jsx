import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import logo from '../../assets/astor-logo-removebg-preview.png';
import { manejarRestablecerPassword } from '../../controllers/authController';


export const RestablecerPassword = () => {
  
  const { token } = useParams();
  const navigate = useNavigate();

  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (nuevoPassword !== confirmarPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

    await manejarRestablecerPassword({
        token,
        nuevoPassword,
        toast,
        setError,
        navigate
    })
  };

  return (

      <div className='min-h-screen flex bg-secondary-900 p-4 items-center justify-center'>

    <div className='bg-secondary-100 p-12 rounded-xl w-auto lg:w-[500px]'>
      <img src={logo} alt="Logo-Astor" className='w-36 h-36 mx-auto mb-2' />
      <h1 className='text-2xl text-center mb-8 font-bold tracking-[2px] text-white uppercase'>RESTABLECER <span className='text-yellow-400'>CONTRASEñA</span></h1>
                {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
      <form
      onSubmit={handleSubmit} 
      className='mb-6'
      >
        <div className='relative mb-4'>
          <RiLockPasswordFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="password"
          value={nuevoPassword}
          onChange={(e) => setNuevoPassword(e.target.value)}
          className='py-3 pl-8 pr-4 bg-white w-full outline-none rounded-lg focus:border-2 focus:border-yellow-400'
          placeholder='Nueva contraseña'/>
        </div>
        <div className='relative mb-4'>
          <RiLockPasswordFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="password"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className='py-3 pl-8 pr-4 bg-white w-full outline-none rounded-lg focus:border-2 focus:border-yellow-400'
          placeholder='Confirmar contraseña'/>
          
        </div>
        <p className="text-sm text-white mb-4">Debe tener al menos 6 caracteres</p>
        <div>
          <button 
          type='submit'
          className='bg-yellow-400 w-full py-3 px-4 rounded-xl text-sm font-bold uppercase'>
          Confirmar
          </button>
        </div>
      </form>
      {/* <div className='flex flex-col items-center gap-4'>
          <span className='text-white'><Link to='/login'>¿Ya tienes una cuenta? <span className='text-yellow-400'>Ingresa</span></Link></span>
      </div> */}
    </div>
      </div>
  )
}
