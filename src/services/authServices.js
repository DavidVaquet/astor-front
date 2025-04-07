const API_URL =  `http://localhost:5002/api/auth`;


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
      console.log('Respuesta login:', data);
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

