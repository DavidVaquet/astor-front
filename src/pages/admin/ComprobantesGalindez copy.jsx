import { useContext, useEffect, useState } from "react";
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
import { formatearFecha } from "../../helpers/formatearFecha";

export const ComprobantesGalindez = () => {
  const { recargarComprobantes, toggleRecargar } = useContext(ComprobanteContext);

  const [comprobantes, setComprobantes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarImagen = () => setImagenSeleccionada(null);

  const local = "astorGalindez";

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

  const comenzarEdicion = (id, comprobante) => {
    setEditandoId(id);
    setValoresEditados({
      descripcion: comprobante.descripcion,
      monto: comprobante.monto,
      nroComprobante: comprobante.nroComprobante,
    });
  };

  const guardarCambios = (id) => {
    manejarActualizarComprobante({
      id,
      nuevosValores: valoresEditados,
      setError,
      setSuccess,
      toast,
      toggleRecargar,
    });
    setEditandoId(null);
  };

  return (
  <div className="overflow-x-auto rounded-lg p-6 bg-gray-200 shadow-xl">
    {/* Filtros */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="flex flex-col">
        <label className="text-black font-semibold text-sm mb-1">📅 Filtrar por fecha:</label>
        <input
          type="date"
          className="border border-gray-300 px-4 py-2 rounded-md text-black shadow-sm"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-black font-semibold text-sm mb-1">🔍 Buscar por descripción:</label>
        <input
          type="text"
          placeholder="Ej: alquiler, nombre, egreso..."
          className="border border-gray-300 px-4 py-2 rounded-md text-black shadow-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
    </div>

    {error && <p className="text-red-500 font-medium mb-4">❌ Error: {error}</p>}

    {/* Tabla escritorio */}
    <div className="hidden md:block">
      <table className="w-full bg-white text-sm text-black shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-4 text-left">Fecha</th>
            <th className="px-6 py-4 text-left">N° Comprobante</th>
            <th className="px-6 py-4 text-left">Método de pago</th>
            <th className="px-6 py-4 text-left">Tipo</th>
            <th className="px-6 py-4 text-left">Comprobante</th>
            <th className="px-6 py-4 text-left">Descripción</th>
            <th className="px-6 py-4 text-center">Monto</th>
            <th className="px-6 py-4 text-left">Usuario</th>
            <th className="px-6 py-4 text-left hidden lg:table-cell">Cuenta</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comprobantesFiltrados.map((comp, index) => (
            <tr key={comp._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200`}>
              <td className="px-6 py-4">{formatearFecha(comp.fecha)}</td>
              <td className="px-6 py-4">
                {editandoId === comp._id ? (
                  <input
                    value={valoresEditados.nroComprobante}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, nroComprobante: e.target.value })}
                    className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                  />
                ) : comp.nroComprobante}
              </td>
              <td className="px-6 py-4 capitalize">{comp.metodoPago}</td>
              <td className="px-6 py-4 capitalize">{comp.tipo}</td>
              <td className="px-6 py-4 capitalize">{comp.tipoComprobante}</td>
              <td className="px-6 py-4 truncate max-w-[200px]">
                {editandoId === comp._id ? (
                  <input
                    value={valoresEditados.descripcion}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, descripcion: e.target.value })}
                    className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                  />
                ) : (
                  <span title={comp.descripcion}>{comp.descripcion}</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {editandoId === comp._id ? (
                  <input
                    type="number"
                    value={valoresEditados.monto}
                    onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value })}
                    className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                  />
                ) : formatearPesos(comp.monto)}
              </td>
              <td className="px-6 py-4 capitalize">{comp.usuario?.nombre || "Sin usuario"}</td>
              <td className="px-6 py-4 capitalize hidden lg:table-cell">{comp.cuenta || "—"}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-3">
                  <FaImage className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => abrirImagen(comp.imagenComprobante)} />
                  <MdEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" onClick={() => comenzarEdicion(comp._id, comp)} />
                  <FaSave className="text-green-600 hover:text-green-700 cursor-pointer" onClick={() => guardarCambios(comp._id)} />
                  <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => confirmarEliminacion(comp._id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Vista móvil */}
    <div className="md:hidden flex flex-col gap-6 mt-4">
      {comprobantesFiltrados.map((comp) => (
        <div key={comp._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 space-y-2 text-black">
          <p><strong>Fecha:</strong> {formatearFecha(comp.fecha)}</p>
          <p className="capitalize"><strong>N° Comprobante:</strong> {comp.nroComprobante}</p>
          <p className="capitalize"><strong>Método de pago:</strong> {comp.metodoPago}</p>
          <p className="capitalize"><strong>Tipo:</strong> {comp.tipo}</p>
          <p className="capitalize"><strong>Comprobante:</strong> {comp.tipoComprobante}</p>
          <p><strong>Descripción:</strong> {comp.descripcion}</p>
          <p className="capitalize"><strong>Monto:</strong> {formatearPesos(comp.monto)}</p>
          <p className="capitalize"><strong>Usuario:</strong> {comp.usuario?.nombre || "Sin usuario"}</p>
          <p className="capitalize"><strong>Cuenta:</strong> {comp.cuenta || "—"}</p>
          <div className="flex gap-3 pt-2">
            <FaImage className="text-blue-600 hover:text-blue-800 text-lg cursor-pointer" onClick={() => abrirImagen(comp.imagenComprobante)} />
            <MdEdit className="text-yellow-500 hover:text-yellow-700 text-lg cursor-pointer" onClick={() => comenzarEdicion(comp._id, comp)} />
            <FaSave className="text-green-600 hover:text-green-700 text-lg cursor-pointer" onClick={() => guardarCambios(comp._id)} />
            <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg cursor-pointer" onClick={() => confirmarEliminacion(comp._id)} />
          </div>
        </div>
      ))}
    </div>

    {/* Modal imagen */}
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
