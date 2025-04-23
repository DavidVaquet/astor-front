const API_URL = `${import.meta.env.VITE_API_URL}/historial`;

export const guardarHistorial = async () => {

    const token = localStorage.getItem('token');

    try {
        const respuesta = await fetch(`${API_URL}/guardar-historial`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        })
        
        if (!respuesta.ok) {
            const data = await respuesta.json();
            throw new Error(data.msg || "Error al guardar historial mensual")
        }

        const data = await respuesta.json();
        return data;

    } catch (error) {
       throw new Error(error.message || "Error al ejecutar el servicio"); 
    }
};


export const obtenerHistorialMensual = async (local) => {
    
    const token = localStorage.getItem('token');

    try {
       const respuesta = await fetch(`${API_URL}/obtener-historial/${local}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
       });
       
       if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.msg || 'Error al obtener el historial mensual');
       }

       const data = await respuesta.json();
       return data;

    } catch (error) {
       throw new Error(error.message || 'Error al obtener el historial mensual')     
    }
};


export const obtenerHistorialGeneral = async () => {

    const token = localStorage.getItem('token');

    try {
        const respuesta = await fetch(`${API_URL}/obtener-historialgeneral`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });

        if (!respuesta.ok) {
            const data = await respuesta.json();
            throw new Error(data.message || 'Error al obtener el historial - Service')
        };

        const data = await respuesta.json();
        return data;

    } catch (error) {
        
        throw new Error(error.message || 'Error al obtener el historial - Service')
    }
};


export const editarHistorialGeneral = async (id, valoresActualizados) => {

    const token = localStorage.getItem('token');

    try {
        const respuesta = await fetch(`${API_URL}/editar-historial-general/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(valoresActualizados),
        });

        if (respuesta.status === 403) {
            throw new Error("No tienes permisos para editar el historial.");
        };

        if (!respuesta.ok) {
            const data = await respuesta.json();
            throw new Error(data.msg || 'Error al editar el historial general')
        };

        
        const data = await respuesta.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al editar el historial general')
    }
};


export const editarHistorialMensual = async (id, valoresActualizados) => {

    const token = localStorage.getItem('token');

    try {
        const respuesta = await fetch(`${API_URL}/editar-historial-mensual/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(valoresActualizados)
        });

        if (respuesta.status === 403) {
            throw new Error("No tienes permisos para editar el historial.");
        };
        
        if (!respuesta.ok) {
            const data = await respuesta.json();
            throw new Error(data.msg || 'Error al editar el historial mensual')
        };

        const data = await respuesta.json();
        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};