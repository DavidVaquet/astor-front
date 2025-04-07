import { useEffect } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { toast } from "react-toastify";

export const RutaProtegida = ({ rolesPermitidos = [] }) => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

 
  const tienePermiso = rolesPermitidos.some((rol) => roles.includes(rol));

  useEffect(() => {
    if (token && !tienePermiso) {
      toast.error("No tienes permiso para acceder a esta sección", {
        toastId: "acceso-denegado"
      });

    }
  }, [token, tienePermiso]);

  if (!token) return <Navigate to="/login" />;
  if (!tienePermiso) {
    return (
      <div className="text-center text-red-500 font-bold mt-10 text-lg">
        No tienes permiso para acceder a esta sección.
      </div>
    );
  }
  return <Outlet />;
};
