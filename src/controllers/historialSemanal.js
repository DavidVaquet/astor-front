import { editarEstadisticaServices, eliminarEstadisticaServices } from "../services/historialSemanal";

export const editarEstadisticaController = async ({id, nuevosValores, toast, resetFields}) => {

    try {
        const estadistica = await editarEstadisticaServices({id, nuevosValores});
        if (estadistica){
            toast.success('Estadistica editada correctamente.');
            if (resetFields) resetFields();
            return estadistica;
        } else {
            toast.error('Error al editar la estadistica.');
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export const eliminarEstadisticaController = async ({id, toast}) => {

    try {
        const estadistica = await eliminarEstadisticaServices(id);
        if (estadistica){
            toast.success('Estadistica eliminada correctamente.');
            return estadistica;
        } else {
            toast.error('Ocurrio un error al eliminar la estadistica.');
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}