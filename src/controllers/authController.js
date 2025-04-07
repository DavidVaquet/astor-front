import { replace } from 'react-router-dom';
import {login, register} from '../services/authServices';
export const manejarLogin = async ({ email, password, setError, setUser, navigate }) => {
  
  try {
    const data = await login(email, password);

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuarioId", data.usuarioId);
    localStorage.setItem("roles", JSON.stringify(data.roles));

    
    if (setUser) {
      setUser({ token: data.token, roles: data.roles });
    }

    if (data.roles.includes("ENCARGADOFRAY_ROLE")) {
      navigate("/home/AstorFray", { replace: true });
    } else if (data.roles.includes("ENCARGADOGALINDEZ_ROLE")) {
      navigate("/home/AstorGalindez", { replace: true });
    } else if (data.roles.includes("ENCARGADOINMOBILIARIA_ROLE")) {
      navigate("/home/Inmobiliaria", { replace: true });
    } else {
      navigate("/home", { replace: true }); 
    }

  } catch (error) {
    if (setError) setError(error.message);

    
    console.error("Error al iniciar sesión:", error.message);
  }
};


export const manejarRegistro = async ({
    email,
    password,
    nombre,
    roles,
    setError,
    setUser,
    setSuccess,
    resetFields
  }) => {
    try {
      const data = await register(email, password, nombre, roles);
  
      
      if (setError) setError("");
  
      
      if (setSuccess) setSuccess("Usuario creado con éxito");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioId", data.usuarioId);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      if (setUser) setUser({ token: data.token, roles: data.roles });
      
      if (resetFields) resetFields();

    } catch (error) {
      if (setSuccess) setSuccess("");
      if (setError) setError(error.message);
      console.error("Error al registrar:", error.message);
    }
  };