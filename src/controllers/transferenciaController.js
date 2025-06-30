import { crearTransferenciaServices, obtenerTransferenciasServices, editarTransferenciaId, eliminarTransferenciaServices } from "../services/transferenciaServices.js";

export const crearTransferenciaController = async ({origen, destino, monto, detalle, cuenta, resetFields, toast}) => {
    try {
        const data = await crearTransferenciaServices({origen, destino, monto, detalle, cuenta});
        if (data) {
            toast.success('Transferencia compartida creada exitosamente.');
            if (typeof resetFields === 'function') resetFields();
            return data;
        } else {
            toast.error('No se pudo registrar la transferencia.');
            return null;
        }
    } catch (error) {
        console.error('Error al crear transferencia:', error);
        toast.error('Ocurrió un error al registrar la transferencia.');
    }
}


export const obtenerTransferenciaController = async ({toast}) => {
    try {
        const data = await obtenerTransferenciasServices();
        if (!data) {
            toast.error('Error al obtener los gastos compartidos.')
        };
        return data;
    } catch (error) {
        console.error('Error al obtener los gastos compartidos:', error);
    }
};

export const editarTransferenciaController = async ({ toast, id, datosActualizados }) => {
    try {
        const data = await editarTransferenciaId(id, datosActualizados);
        if (data && data.transferencia) {
            toast.success('Transferencia editada correctamente.')
            return data;
        } else {
            toast.error('Error al editar la transferencia.')
            return null;
        }
    } catch (error) {
        console.error('Error al editar la transferencia:', error);
    }
};

export const eliminarTransferenciaController = async ({id, toast}) => {
    try {
        const data = await eliminarTransferenciaServices(id);
        if (data) {
            toast.success('Transferencia eliminada exitosamente.');
            return data;
        } else {
            toast.error('Hubo un problema al eliminar la transferencia.')
            return null;
        }
    } catch (error) {
        console.error('Error al editar la transferencia:', error);
    }
}