import { obtenerUsers, editarUsuarios } from "../services/userServices";

export const manejarObtenerUsuarios = async({setUsuarios, setError}) => {

    try {
       const data = await obtenerUsers();
       setUsuarios(data);
       setError('');

    } catch (error) {
       setError(error.message); 
    }
};


export const manejarActualizarUsuario = async({id, datosActualizados, toast, setError, toggleRecargar}) => {

   try {
      
      const data = await editarUsuarios(id, datosActualizados);

      if (toast) {
         toast.success('Usuario actualizado correctamente');
      }

      setError('');
      
      if(toggleRecargar) toggleRecargar();

      return data;

   } catch (error) {
      if (setError) setError(error.message);
      if (toast) toast.error(error.message);
      console.error("Error al editar usuario:", error.message);
   }
};
