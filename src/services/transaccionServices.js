const API_URL = `${import.meta.env.VITE_API_URL}/transacciones`;


export const nuevoComprobante = async(tipo, monto, tipoComprobante, nroComprobante, imagenComprobante, local, descripcion, metodoPago, usuario) => {

    const token = localStorage.getItem('token');
    const body = {
        tipo,
        monto: Number(monto),
        tipoComprobante,
        nroComprobante,
        imagenComprobante,
        local,
        metodoPago,
        descripcion,
        usuario
    };

    try {

        if (!token) {
            console.error("❌ No hay token en localStorage");
            throw new Error("No se encontró el token. Por favor, inicia sesión nuevamente.");
          }
          
        const respuesta = await fetch(`${API_URL}/crearTransaccion`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
            body: JSON.stringify(body)
        });

        if (!respuesta.ok) {
            const data = await respuesta.json();
            console.error("⚠️ Backend respondió:", data);
            throw new Error(data.msg || data.error || 'Error al subir el comprobante');
          }

        return await respuesta.json();

    } catch (error) {
        
        throw new Error(error.message || 'Error en el comprobante')
    }
};


export const obtenerComprobantesPorLocal = async (local) => {

        const token = localStorage.getItem('token');
        
        const respuesta = await fetch(`${API_URL}/listarComprobantes/${local}`, {
            headers: {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener los comprobantes')
        }

        return await respuesta.json();
};


export const eliminarComprobantes = async (id) => {

    const token = localStorage.getItem('token');
  console.log('🔐 Token enviado:', token);
  console.log({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    try {
      const respuesta = await fetch(`${API_URL}/eliminarComprobante/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });

      if(respuesta.status === 403) {
        throw new Error("No tienes permisos para eliminar comprobantes.");
      }
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el comprobante - Service');
      }
  
      return await respuesta.json();
      
    } catch (error) {
      throw new Error(error.message || 'Error al eliminar el comprobante');
    }
  };
  

  export const actualizarComprobante = async(id, datos) => {

    const token = localStorage.getItem('token');

    try {
      
      const res = await fetch(`${API_URL}/editarComprobante/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (!res.ok) {
        throw new Error('Error al modificar el comprobante')
      };

      return await res.json();

    } catch (error) {

      throw new Error( error.message || 'Error al actualizar el comprobante' );  
    }
  };