const API_URL = `${import.meta.env.VITE_API_URL}/estadisticas`;

export const getEstadisticasSemanales = async ( { local, mes, anio } = {} ) => {  

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a loguearte.');

        const queryParams = new URLSearchParams();
        if (local) queryParams.append('local', local);
        if (mes) queryParams.append('mes', mes);
        if (anio) queryParams.append('anio', anio);

        const response = await fetch(`${API_URL}/semanales?${queryParams}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
         });

        if (!response.ok) {
            throw new Error('Error al obtener las estadisticas semanales.')
        }

        const data = await response.json();
        return data;

        } catch (error) {
          console.error(error);
          throw new Error(error.message || 'Error al obtener las estadisticas semanales.')
        }

}


export const editarEstadisticaServices = async ({id, nuevosValores}) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a iniciar sesión.');
        // console.log("Llamando a editar-estadistica con ID:", id);
        console.log("Valores a enviar:", nuevosValores);
        console.log("Token:", token);
        console.log("URL:", `${API_URL}/editar-estadistica/${id}`);
        const response = await fetch(`${API_URL}/editar-estadistica/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
            ingresos: Number(nuevosValores.ingresos),
            egresos: Number(nuevosValores.egresos),
            balance: Number(nuevosValores.balance)
})
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || 'Error al editar las estadisticas.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw new Error(`Error al editar las estadísticas: ${error.message}`);
    }
}


export const eliminarEstadisticaServices = async (id) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a iniciar sesión.');

        const response = await fetch(`${API_URL}/eliminar-estadistica/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || 'Error al editar las estadisticas.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar las estadisticas:', error);
    }
}