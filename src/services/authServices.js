const API_URL = `${import.meta.env.VITE_API_URL}/auth`;


export const login = async (email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.msg || 'Error al iniciar sesión');
      }
  
      const data = await respuesta.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('usuarioId', data.usuarioId);
      localStorage.setItem('usuarioNombre', data.nombre);
      
      return data;
      
    } catch (error) {
        throw new Error(error.message || 'Error en el Login');
    }
  };


  export const register = async (email, password, nombre, roles) => {

    try {
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre, roles }),
      });
  
      if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.msg || 'Error en el registro');
      }
  
      const data = await respuesta.json();
      return data;
  
    } catch (error) {
      throw error; 
    }
  };


export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('usuarioNombre');
    window.location.href = '/login';
};


export const emailRecuperacion = async (email) => {

  try {
    const respuesta = await fetch(`${API_URL}/solicitar-reset-password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email})
    });

    if (!respuesta.ok) {
      const data = await respuesta.json();
      throw new Error(data.msg || 'Error al enviar el email')
    };

    const data = await respuesta.json();
    return data;

  } catch (error) {
    throw new Error(error.message || 'Error al enviar el email');
  }
};


export const confirmarPassword = async (nuevoPassword, token) => {

  try {
    const respuesta = await fetch(`${API_URL}/restablecer-password/${token}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nuevaPassword: nuevoPassword })
    });

    if (!respuesta.ok) {
      const data = await respuesta.json();
      throw new Error(data.msg || 'Error al restablecer la contrasena'); 
    }

    const data = await respuesta.json();
    return data;

  } catch (error) {
    throw new Error(error.message);
  }

}