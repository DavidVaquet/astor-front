const API_URL = `http://localhost:5002/api/transacciones`;

export const obtenerTotalesPorLocal = async(local) => {

    const token = localStorage.getItem('token');

    try {
       const respuesta = await fetch(`${API_URL}/totalPorLocal/${local}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
       });

       if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error (data.msg || 'Error al obtener los totales por local');
       }

       const data = await respuesta.json();
       return data;

    } catch (error) {
       
      throw new Error( error.message || 'Error al obtener los totales por local');
    }
};

export const obtenerTotalGeneral = async() => {

    const token = localStorage.getItem('token');

    try {
     const respuesta = await fetch(`${API_URL}/obtenerTotalesGenerales`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
     });

    if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error (data.msg || 'Error al obtener el total general')
    };
    
    const data = await respuesta.json();
    return data;

    } catch (error) {
    
    throw new Error( error.message || 'Error al obtener el total general')
    };
};


export const obtenerTotalesMensuales = async (local, anio) => {
  const token = localStorage.getItem("token");

  try {
    const respuesta = await fetch(
      `http://localhost:5002/api/transacciones/totalesMensuales/${local}/${anio}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!respuesta.ok) {
      const data = await respuesta.json();
      throw new Error(data.msg || "Error al obtener los totales mensuales");
    }

    const data = await respuesta.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Error en el servicio de totales mensuales");
  }
};
