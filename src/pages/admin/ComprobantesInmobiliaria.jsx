import { useEffect, useState, useContext } from "react";
import {
  manejarActualizarComprobante,
  manejarEliminarComprobante,
  manejarObtenerComprobantesPorLocal,
} from "../../controllers/transaccionController";
import { formatearPesos } from "../../helpers/formatearPesos";
import { FaImage, FaTrashAlt, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { ComprobanteContext } from "../../context/ComprobanteContext";
import Swal from "sweetalert2";

export const ComprobantesInmobiliaria = () => {
  const { recargarComprobantes, toggleRecargar } = useContext(ComprobanteContext);

  const [comprobantes, setComprobantes] = useState([]);
  const [error, setError] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [success, setSuccess] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const [busqueda, setBusqueda] = useState('');

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarImagen = () => setImagenSeleccionada(null);

  const local = "inmobiliaria";

  useEffect(() => {
    manejarObtenerComprobantesPorLocal({ local, setComprobantes, setError });
  }, [local, recargarComprobantes]);

  const comprobantesFiltrados = comprobantes.filter((comp) => {
    const coincideFecha = fechaFiltro
      ? new Date(comp.fecha).toISOString().slice(0, 10) === fechaFiltro
      : true;
  
    const coincideBusqueda = busqueda
      ? comp.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
        comp.usuario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        comp.tipo?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
  
    return coincideFecha && coincideBusqueda;
  });

  console.log("Buscando:", busqueda);
  console.log("Filtrados:", comprobantesFiltrados.length);

  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: "¿Eliminar comprobante?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        manejarEliminarComprobante({
          id,
          setError,
          setSuccess: () => {},
          toast,
          toggleRecargar,
        });
      }
    });
  };

  // Funcion para comenzar a editar  
       const comenzarEdicion = (id, comprobante) => {
        setEditandoId(id);
        setValoresEditados({
          descripcion: comprobante.descripcion,
          monto: comprobante.monto,
          nroComprobante: comprobante.nroComprobante
        })
       };
       
      //  Funcion para guardar los cambios
      const guardarCambios = (id) => {
        manejarActualizarComprobante({
          id,
          nuevosValores: valoresEditados,
          setError,
          setSuccess,
          toast,
          toggleRecargar
        })
        setEditandoId(null);
      };

  return (
    <div className="overflow-x-auto rounded-lg">
      
      <div className="flex">

      <div className="mb-4">
        <label className="mr-2 font-semibold text-md text-white pr-2">Filtrar por fecha:</label>
        <input
          type="date"
          className="border border-gray-300 px-2 py-1 rounded-md text-black shadow-sm"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>
      <div className="mb-4 ml-6">
        <label className="mr-2 font-semibold text-md text-white pr-2">Filtrar por descripción:</label>
        <input
        type="text"
        className="border border-gray-300 px-2 py-1 rounded-md text-black shadow-sm"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      </div>

      {error && <p className="text-red-500 font-medium mb-4">Error: {error}</p>}

      {/* TABLA MODERNA */}
      <table className="min-w-full hidden md:table bg-white text-black dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr className="text-left text-gray-700 dark:text-gray-300">
            <th className="py-3 px-5">N° Comprobante</th>
            <th className="py-3 px-5">Método de pago</th>
            <th className="py-3 px-5">Tipo de comprobante</th>
            <th className="py-3 px-5">Tipo</th>
            <th className="py-3 px-5">Descripción</th>
            <th className="py-3 px-5">Monto</th>
            <th className="py-3 px-5">Usuario</th>
            <th className="py-3 px-5">Acción</th>
          </tr>
        </thead>
        <tbody>
          {comprobantesFiltrados.map((comprobante) => (
            <tr key={comprobante._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-5 capitalize">
                {editandoId === comprobante._id ? (
                  <input value={valoresEditados.nroComprobante} className="w-full px-2 py-1 text-sm text-black border-2 border-yellow-600 rounded-md" onChange={(e) => setValoresEditados({ ...valoresEditados, nroComprobante: e.target.value})}/>
                ) : comprobante.nroComprobante}
              </td>
              <td className="py-3 px-5 capitalize">{comprobante.metodoPago}</td>
              <td className="py-3 px-5 capitalize">{comprobante.tipoComprobante}</td>
              <td className="py-3 px-5 capitalize">{comprobante.tipo}</td>
              <td className="py-3 px-5 capitalize">
                {editandoId === comprobante._id ? (
                  <input value={valoresEditados.descripcion} className="w-full px-2 py-1 text-sm text-black border-2 border-yellow-600 rounded-md" onChange={(e) => setValoresEditados({...valoresEditados, descripcion: e.target.value})}/>
                ) : comprobante.descripcion}
              </td>
              <td className="py-3 px-5">
                {editandoId === comprobante._id ? (
                  <input value={valoresEditados.monto} type="number" min='0' className="w-full px-2 py-1 text-sm text-black border-2 border-yellow-600 rounded-md" onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value})}/>
                ) : formatearPesos(comprobante.monto)}
              </td>
              <td className="py-3 px-5 capitalize">{comprobante.usuario?.nombre || "Sin usuario"}</td>
              <td className="py-3 px-5 flex gap-3 items-center">
                <FaImage className="text-blue-500 hover:text-blue-700 text-lg cursor-pointer" onClick={() => abrirImagen(comprobante.imagenComprobante)} />
                <MdEdit className="text-yellow-500 hover:text-yellow-700 text-lg cursor-pointer" onClick={() => comenzarEdicion(comprobante._id, comprobante)} />
                <FaSave className="text-green-600 hover:text-green-700 text-lg cursor-pointer" onClick={() => guardarCambios(comprobante._id)} />
                <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg cursor-pointer" onClick={() => confirmarEliminacion(comprobante._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VISTA MOVIL EN CARDS */}
      <div className="md:hidden flex flex-col gap-4 text-black">
        {comprobantesFiltrados.map((comp) => (
          <div key={comp._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-2 border border-gray-200 dark:border-gray-700">
            <div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">N° Comprobante:</span>
              <p className="capitalize text-black dark:text-white">
                {editandoId === comp._id ? (
                  <input
                    value={valoresEditados.nroComprobante}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, nroComprobante: e.target.value })}
                    className="text-black w-full border border-yellow-500 rounded p-1 mt-1 capitalize"
                  />
                ) : (
                  comp.nroComprobante
                )}
              </p>
            </div>
            <p className="capitalize text-sm"><strong>Método de pago:</strong> {comp.metodoPago}</p>
            <p className="capitalize text-sm"><strong>Tipo comprobante:</strong> {comp.tipoComprobante}</p>
            <p className="capitalize text-sm"><strong>Tipo:</strong> {comp.tipo}</p>
            <div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Descripción:</span>
              <p className="text-black dark:text-white">
                {editandoId === comp._id ? (
                  <input
                    value={valoresEditados.descripcion}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, descripcion: e.target.value })}
                    className="text-black w-full border border-yellow-500 rounded p-1 mt-1 capitalize"
                  />
                ) : (
                  comp.descripcion
                )}
              </p>
            </div>
            <div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Monto:</span>
              <p className="text-black dark:text-white">
                {editandoId === comp._id ? (
                  <input
                    type="number"
                    min="0"
                    value={valoresEditados.monto}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value })}
                    className="text-black w-full border border-yellow-500 rounded p-1 mt-1"
                  />
                ) : (
                  formatearPesos(comp.monto)
                )}
              </p>
            </div>
            <p className="capitalize text-sm"><strong>Usuario:</strong> {comp.usuario?.nombre || "Sin usuario"}</p>
            <div className="flex justify-start gap-3 pt-2">
              <FaImage className="text-blue-500 text-lg cursor-pointer" onClick={() => abrirImagen(comp.imagenComprobante)} />
              {editandoId === comp._id ? (
                <FaSave className="text-green-600 text-lg cursor-pointer" onClick={() => guardarCambios(comp._id)} />
              ) : (
                <MdEdit className="text-yellow-500 text-lg cursor-pointer" onClick={() => comenzarEdicion(comp._id, comp)} />
              )}
              <FaTrashAlt className="text-red-500 text-lg cursor-pointer" onClick={() => confirmarEliminacion(comp._id)} />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {imagenSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-[100vh]">
            <button
              onClick={cerrarImagen}
              className="absolute top-1 right-2 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <img
              src={imagenSeleccionada}
              alt="Comprobante"
              className="max-w-full max-h-[75vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
