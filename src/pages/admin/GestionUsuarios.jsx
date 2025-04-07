import { useEffect, useState } from "react";
import { manejarObtenerUsuarios, manejarActualizarUsuario } from "../../controllers/userController";
import { traducirRol } from "../../helpers/traducirRol";
import { toast } from "react-toastify";

export const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});

  const toggleRecargar = () => manejarObtenerUsuarios({ setUsuarios, setError });

  useEffect(() => {
    manejarObtenerUsuarios({ setUsuarios, setError });
  }, []);

  const comenzarEdicion = (usuario) => {
    setEditandoId(usuario._id);
    setValoresEditados({
      nombre: usuario.nombre,
      email: usuario.email,
      estado: usuario.estado,
      roles: usuario.roles[0],
    });
  };

  const guardarCambios = async (id) => {
    await manejarActualizarUsuario({
      id,
      datosActualizados: valoresEditados,
      setError,
      toast,
      toggleRecargar,
    });
    setEditandoId(null);
  };

  return (
    <div className="p-4 mt-2 text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Usuarios del Sistema</h2>

      {error && <p className="text-red-500 mb-4 font-semibold text-center">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="mb-2">
              <span className="font-semibold">Nombre: </span>
              {editandoId === usuario._id ? (
                <input
                  type="text"
                  value={valoresEditados.nombre}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, nombre: e.target.value })}
                  className="w-full px-2 py-1 border rounded mt-1"
                />
              ) : (
                <span className="capitalize">{usuario.nombre}</span>
              )}
            </div>

            <div className="mb-2">
              <span className="font-semibold">Email: </span>
              {editandoId === usuario._id ? (
                <input
                  type="email"
                  value={valoresEditados.email}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, email: e.target.value })}
                  className="w-full px-2 py-1 border rounded mt-1"
                />
              ) : (
                <span>{usuario.email}</span>
              )}
            </div>

            <div className="mb-2">
              <span className="font-semibold">Rol: </span>
              {editandoId === usuario._id ? (
                <select
                  value={valoresEditados.roles}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, roles: e.target.value })}
                  className="w-full px-2 py-1 border rounded mt-1"
                >
                  <option value="ADMIN_ROLE">ADMIN</option>
                  <option value="ENCARGADOFRAY_ROLE">ENCARGADO FRAY</option>
                  <option value="ENCARGADOGALINDEZ_ROLE">ENCARGADO GALINDEZ</option>
                  <option value="ENCARGADOINMOBILIARIA_ROLE">ENCARGADO INMOBILIARIA</option>
                </select>
              ) : (
                <span>{usuario.roles.map((rol) => traducirRol(rol)).join(", ")}</span>
              )}
            </div>

            <div className="mb-2">
              <span className="font-semibold">Estado: </span>
              {editandoId === usuario._id ? (
                <select
                  value={valoresEditados.estado}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, estado: e.target.value === "true" })}
                  className="w-full px-2 py-1 border rounded mt-1"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              ) : (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${usuario.estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {usuario.estado ? "Activo" : "Inactivo"}
                </span>
              )}
            </div>

            <div className="text-right mt-4">
              {editandoId === usuario._id ? (
                <button
                  onClick={() => guardarCambios(usuario._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => comenzarEdicion(usuario)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
