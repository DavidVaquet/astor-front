import { guardarHistorial, obtenerHistorialMensual, obtenerHistorialGeneral, editarHistorialGeneral, editarHistorialMensual } from "../services/historialServices";


export const manejarGuardarHistorial = async ({toast, setError}) => {

    try {
    
    const data = await guardarHistorial();
    toast.success(data.msg || 'Historial guardado con exito');
    setError('');


    } catch (error) {
    setError(error.message);
    toast.error(`Error: ${setError}`);
    }
};


export const manejarObtenerHistorialPorLocal = async ({local, setHistorial, setError}) => {

    try {
        const data = await obtenerHistorialMensual(local);
        setHistorial(data);
        setError('');
    } catch (error) {
        setError(error.message);

    }
};


export const manejarObtenerHistorialGeneral = async ({setHistorial, setError}) => {

    try {
        const data = await obtenerHistorialGeneral();
        setHistorial(data);
        setError('');

    } catch (error) {
        setError(error.message)
    }
};


export const manejarEditarHistorialGeneral = async ({
    id,
    nuevosValores,
    toast,
    setError,
    toggleRecargar,
}) => {
    try {
        const data = await editarHistorialGeneral(id, nuevosValores);
        toast.success(data.msg || 'Historial actualizado correctamente');
        setError('');
        
        if (toggleRecargar) toggleRecargar();

    } catch (error) {
       setError(error.message);
       toast.error(error.message); 
    }
};

export const manejarEditarHistorialMensual = async ({
    id,
    nuevosValores,
    toast,
    setError,
    toggleRecargar,
}) => {
    try {
        const data = await editarHistorialMensual(id, nuevosValores);
        toast.success(data.msg || 'Historial actualizado correctamente');
        setError('');
        
        if (toggleRecargar) toggleRecargar();

    } catch (error) {
       setError(error.message);
       toast.error(error.message); 
    }
};