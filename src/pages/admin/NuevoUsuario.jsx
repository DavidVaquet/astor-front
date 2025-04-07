import { useState, useEffect } from "react";
import { manejarRegistro } from "../../controllers/authController";
import { RiMailFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import logo from '../../assets/astor-logo-removebg-preview.png';

const NuevoUsuario = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
   
    useEffect(() => {
      if (success || error) {
        const timer = setTimeout(() => {
          setSuccess("");
          setError("");
        }, 3000);
    
        return () => clearTimeout(timer);
      }
    }, [success, error]);

  
  const resetFields = () => {

    setNombre('');
    setEmail('');
    setPassword('');
    setRoles([]);
  }

  const handleRoleChange = (e) => {
    const value = e.target.value;
  
    if (e.target.checked) {
      
      setRoles((prev) => prev.includes(value) ? prev : [...prev, value]);
    } else {
      setRoles((prev) => prev.filter((r) => r !== value));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await manejarRegistro({
      nombre,
      password,
      email,
      roles,
      setError,
      setUser: null,
      setSuccess,
      resetFields
    })

  }

  return (
    <div className='flex bg-secondary-900 p-4 items-center justify-center'>

    <div className='bg-secondary-100 p-12 rounded-xl w-auto lg:w-[500px]'>
      <img src={logo} alt="Logo-Astor" className='w-36 h-36 mx-auto mb-2' />
      <h1 className='text-2xl text-center mb-8 font-bold tracking-[2px] text-white'>CREAR <span className='text-yellow-400'>USUARIO</span></h1>
      
      <form onSubmit={handleSubmit} className='mb-6'>
      <div className='relative mb-4'>
          <MdDriveFileRenameOutline className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='py-3 pl-8 pr-4 bg-white w-full text-black outline-none rounded-lg focus:border-2 focus:border-yellow-400'
          placeholder='Nombre'
          required/>
        </div>
        <div className='relative mb-4'>
          <FaLock className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='py-3 pl-8 pr-4 bg-white w-full text-black outline-none rounded-lg focus:border-2 focus:border-yellow-400'
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
        <div className='relative mb-4'>
          <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-600'/>
          <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='py-3 pl-8 pr-4 bg-white w-full text-black outline-none rounded-lg focus:border-2 focus:border-yellow-400'
          placeholder='Correo electronico'
          required/>
        </div>
        <div className="mb-4 text-white">
  <label className="block mb-2">Seleccionar Roles:</label>

  <label className="flex items-center gap-2 mb-1">
    <input
      type="checkbox"
      value="USER_ROLE"
      checked={roles.includes("USER_ROLE")}
      onChange={(e) => handleRoleChange(e)}
    />
    Usuario
  </label>

  <label className="flex items-center gap-2 mb-1">
    <input
      type="checkbox"
      value="ADMIN_ROLE"
      checked={roles.includes("ADMIN_ROLE")}
      onChange={(e) => handleRoleChange(e)}
    />
    Administrador
  </label>

  <label className="flex items-center gap-2 mb-1">
    <input
      type="checkbox"
      value="ENCARGADOFRAY_ROLE"
      checked={roles.includes("ENCARGADOFRAY_ROLE")}
      onChange={(e) => handleRoleChange(e)}
    />
    Encargado Fray
  </label>
  <label className="flex items-center gap-2 mb-1">
    <input
      type="checkbox"
      value="ENCARGADOGALINDEZ_ROLE"
      checked={roles.includes("ENCARGADOGALINDEZ_ROLE")}
      onChange={(e) => handleRoleChange(e)}
    />
    Encargado Galindez
  </label>
  <label className="flex items-center gap-2 mb-1">
    <input
      type="checkbox"
      value="ENCARGADOINMOBILIARIA_ROLE"
      checked={roles.includes("ENCARGADOINMOBILIARIA_ROLE")}
      onChange={(e) => handleRoleChange(e)}
    />
    Encargado Inmobiliaria
  </label>
</div>
        <div>
          <button 
          type='submit'
          className='bg-yellow-400 text-black w-full py-3 px-4 rounded-xl text-sm font-bold uppercase'>
          Registrar
          </button>
        </div>
      </form>
      {success && (
      <div className="bg-green-500 text-white text-sm px-4 py-2 rounded-md text-center mt-4">
      {success}
      </div>
      )}
      {error && (
          <div className="bg-red-500 text-white text-sm px-4 py-2 mb-4 rounded text-center">
            {error}
          </div>
        )}
    </div>

    </div>
  );
};

export default NuevoUsuario;
