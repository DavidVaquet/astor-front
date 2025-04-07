const API_URL = `${import.meta.env.VITE_API_URL}/usuarios`;



export const obtenerUsers = async () => {

    const token = localStorage.getItem('token');

    try {
        const respuesta = await fetch(`${API_URL}/getUsuarios`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'
                    ,'Authorization': `Bearer ${token}`}
        })

        if (!respuesta.ok) {
            const data = await respuesta.json();
            throw new Error(data.msg || 'Error al obtener los usuarios');
        }

        const data = await respuesta.json();
        return data;


    } catch (error) {
        throw new Error(error.message || 'Error al obtener usuarios')
    }};


 export const editarUsuarios = async (id, datosActualizados) => {

    const token = localStorage.getItem('token');

    try {
       const respuesta = await fetch(`${API_URL}/editarUsuario/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosActualizados),
       });
       
       if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.msg || 'Error al actualizar el usuario')
       };

       const data = await respuesta.json();
       return data;


    } catch (error) {
     throw new Error(error.message || 'Error al actualizar el usuario')   
    }

 }   