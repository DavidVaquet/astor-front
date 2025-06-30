const API_URL = `${import.meta.env.VITE_API_URL}/transferencias`;

export const crearTransferenciaServices = async ({origen, destino, monto, detalle, cuenta}) => {

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es obligatorio.');

        const response = await fetch(`${API_URL}/crearTransferencia`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({origen, destino, monto, detalle, cuenta})
    });

        if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Error creando la transferencia en Services.')
    };

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'Error creando la transferencia en Services.');    
    }
};


export const obtenerTransferenciasServices = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a loguearte.');

        const response = await fetch(`${API_URL}/obtenerTransferencias`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || 'Error al obtener las transferencias en Services.')
        };

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al obtener las transferencias en Services.');
    }
};


export const editarTransferenciaId = async (id, datosActualizados) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a loguearte.');

        const response = await fetch(`${API_URL}/editarTransferencia/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosActualizados)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Error al editar la transferencia.');
        }

        return data; // ✅ Se retorna normalmente si todo salió bien
    } catch (error) {
        throw new Error(error.message || 'Error al editar la transferencia en Services.');
    }
};

export const eliminarTransferenciaServices = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('El token es necesario, vuelve a iniciar sesión.');
        const response = await fetch(`${API_URL}/eliminarTransferencia/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });

        const data = await response.json();

        if (!response.ok){
            throw new Error(data.msg || 'Error al eliminar la transferencia en Services.')
        };

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar la transferencia.')
    }
}