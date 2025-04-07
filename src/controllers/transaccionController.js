import { obtenerTotalGeneral, obtenerTotalesMensuales, obtenerTotalesPorLocal } from "../services/totalesService";
import { nuevoComprobante } from "../services/transaccionServices";
import { obtenerComprobantesPorLocal as fetchComprobantes, eliminarComprobantes, actualizarComprobante } from "../services/transaccionServices";

export const manejarNuevaTransaccion = async({
    tipo,
    monto,
    tipoComprobante,
    nroComprobante,
    imagenComprobante,
    local,
    descripcion,
    metodoPago,
    setError,   
    setSuccess,
    resetFields,
    usuario,
    toast }) => {
    
        try {
            const data = await nuevoComprobante(tipo,monto,tipoComprobante,nroComprobante,imagenComprobante,local,descripcion,metodoPago,usuario);

            if (setSuccess) setSuccess('Comprobante cargado correctamente');
            if (setError) setError('');
            if (resetFields) resetFields();

            toast.success("Comprobante cargado correctamente", {
                position: "top-center",
                autoClose: 3000,
              });

            return data;

        } catch (error) {
            if (setError) setError(error.message);
            if (setSuccess) setSuccess("");
            console.error("Error al subir el comprobante:", error.message);
        }
};


export const manejarObtenerComprobantesPorLocal = async ({local, setComprobantes, setError}) => {

    try {
        
        const data = await fetchComprobantes(local);
        setComprobantes(data);
        setError('');

    } catch (error) {
        setError(error.message);
        setComprobantes([]);
    }


};

export const manejarTotalPorLocal = async({local, setTotales, setError}) => {

    try {
        const data = await obtenerTotalesPorLocal(local);
        setTotales(data);
        setError('');

    } catch (error) {
        setError(error.message);
    }
};

export const manejarTotalGeneral = async({ setTotales, setError }) => {

    try {
        const data = await obtenerTotalGeneral();
        setTotales(data);
        setError('');

    } catch (error) {
        setError(error.message);
    }
};


export const manejarEliminarComprobante = async({id, setError, setSuccess, toast, toggleRecargar}) => {

    try {
        await eliminarComprobantes(id);
        setSuccess('Comprobante eliminado correctamente');
        setError('');
        toast.success('Comprobante eliminado correctamente');

        if (toggleRecargar) toggleRecargar();

    } catch (error) {
        setError(error.message);
        setSuccess('');
        toast.error('❌ ' + error.message);
    }
};


export const manejarActualizarComprobante = async({id, nuevosValores, setSuccess, toast, setError, toggleRecargar}) => {

    try {
        const comprobanteActualizado = await actualizarComprobante(id, nuevosValores);

        setSuccess('Comprobante actualizado correctamente');
        setError('');
        toast.success('Comprobante actualizado');

        if (toggleRecargar) toggleRecargar();

        return comprobanteActualizado;

    } catch (error) {

      setError(error.message);
      setSuccess('');
      toast.error('❌ ' + error.message);
    }
};



export const manejarCantidadPorMes = async ({ local, anio, setData, setError }) => {
    try {
      const datos = await obtenerTotalesMensuales(local, anio);
  
     
      const meses = ["abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const labels = Object.keys(datos).filter((mes) => meses.includes(mes.toLowerCase()));
      const series = labels.map((mes) => datos[mes]);
  
      setData({ series, labels });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

