"use client"

import { useContext, useEffect, useState } from "react"

import {
  manejarEliminarComprobante,
  manejarObtenerComprobantesPorLocal,
  manejarActualizarComprobante,
} from "../controllers/transaccionController"

import { formatearPesos } from "../helpers/formatearPesos"
import { formatearFecha } from "../helpers/formatearFecha"
import { FaImage, FaTrashAlt, FaSave } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { toast } from "react-toastify"
import { ComprobanteContext } from "../context/ComprobanteContext"

// SweetAlert2
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export const ListarComprobantes = ({ localProp, setCambio }) => {
  // UseContext
  const { recargarComprobantes, toggleRecargar, setCambioGeneral, setCambioFray } = useContext(ComprobanteContext)
  const comprobanteContext = useContext(ComprobanteContext)

  // SetStates
  const [comprobantes, setComprobantes] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [fechaFiltro, setFechaFiltro] = useState("")
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null)
  const [editandoId, setEditandoId] = useState(null)
  const [valoresEditados, setValoresEditados] = useState({})
  const [busqueda, setBusqueda] = useState("")

  const local = localProp

  const abrirImagen = (url) => setImagenSeleccionada(url)
  const cerrarImagen = () => setImagenSeleccionada(null)

  useEffect(() => {
    manejarObtenerComprobantesPorLocal({ local, setComprobantes, setError })
  }, [local, recargarComprobantes])

  const confirmarEliminacion = async (id) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Este comprobante será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
    })

    if (result.isConfirmed) {
      await manejarEliminarComprobante({
        id,
        setError,
        setSuccess,
        toast,
        toggleRecargar,
      })

      setCambio((prev) => prev + 1)
      setCambioGeneral((prev) => prev + 1)
    }
  }

  // Filtros de busqueda
  const comprobantesFiltrados = comprobantes.filter((comp) => {
    const coincideFecha = fechaFiltro ? new Date(comp.fecha).toISOString().slice(0, 10) === fechaFiltro : true

    const coincideBusqueda = busqueda
      ? comp.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
        comp.usuario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        comp.tipo?.toLowerCase().includes(busqueda.toLowerCase())
      : true

    return coincideFecha && coincideBusqueda
  })

  // Funcion para comenzar a editar
  const comenzarEdicion = (id, comprobante) => {
    setEditandoId(id)
    setValoresEditados({
      descripcion: comprobante.descripcion,
      monto: comprobante.monto,
      nroComprobante: comprobante.nroComprobante,
    })
  }

  //  Funcion para guardar los cambios
  const guardarCambios = async (id) => {
    await manejarActualizarComprobante({
      id,
      nuevosValores: valoresEditados,
      setError,
      setSuccess,
      toast,
      toggleRecargar,
    })
    setEditandoId(null)
    setCambio((prev) => prev + 1)
    setCambioGeneral((prev) => prev + 1)
  }

  return (
    <div className="overflow-x-auto px-2 py-6 rounded-lg bg-blanco dark:bg-secondary-100 shadow-xl">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-black dark:text-white font-semibold text-sm mb-4">📅 Filtrar por fecha:</label>
          <input
            type="date"
            className="border-2 border-primary px-4 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 py-2 outline-none rounded-md text-black shadow-sm"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black dark:text-white font-semibold text-sm mb-4">🔍 Buscar por descripción:</label>
          <input
            type="text"
            placeholder="Ej: alquiler, nombre, egreso..."
            className="border-2 border-primary px-4 py-2 outline-none rounded-md text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-sm"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500 font-medium mb-4">❌ Error: {error}</p>}

      {/* Tabla escritorio */}
      <div className="hidden md:block">
        <table className="w-full bg-white dark:bg-gray-800 text-sm text-black dark:text-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-secondary-900 dark:text-white text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">Fecha</th>
              <th className="px-6 py-4 text-left">N° Comprobante</th>
              <th className="px-6 py-4 text-left">Método de pago</th>
              <th className="px-6 py-4 text-left">Tipo</th>
              <th className="px-6 py-4 text-left">Comprobante</th>
              <th className="px-6 py-4 text-left">Descripción</th>
              <th className="px-6 py-4 text-center">Monto</th>
              <th className="px-6 py-4 text-left">Usuario</th>
              <th className="px-7 py-4 text-left">Cuenta</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white">
            {comprobantesFiltrados.map((comp, index) => (
              <tr
                key={comp._id}
                className={`${index % 2 === 0 ? "bg-blanco dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"} border-b border-gray-200 dark:border-gray-600`}
              >
                <td className="px-6 py-4">{formatearFecha(comp.fecha)}</td>
                <td className="px-6 py-4">
                  {editandoId === comp._id ? (
                    <input
                      value={valoresEditados.nroComprobante}
                      onChange={(e) => setValoresEditados({ ...valoresEditados, nroComprobante: e.target.value })}
                      className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                    />
                  ) : (
                    comp.nroComprobante
                  )}
                </td>
                <td className="px-6 py-4 capitalize">
                  {comp.metodoPago?.toLowerCase() === "qr" ? "QR" : comp.metodoPago}
                </td>
                <td className={`px-6 py-4 capitalize ${comp.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}>{comp.tipo}</td>
                <td className="px-6 py-4 capitalize text-center">
                  {comp.tipoComprobante?.toLowerCase() === "qr" ? "QR" : comp.tipoComprobante}
                </td>
                <td className="px-6 py-4 truncate max-w-[200px]">
                  {editandoId === comp._id ? (
                    <input
                      value={valoresEditados.descripcion}
                      onChange={(e) => setValoresEditados({ ...valoresEditados, descripcion: e.target.value })}
                      className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
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
                      className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                    />
                  ) : (
                    formatearPesos(comp.monto)
                  )}
                </td>
                <td className="px-6 py-4 capitalize">{comp.usuario?.nombre || "Sin usuario"}</td>
                <td className="px-7 py-4 capitalize hidden lg:table-cell">
                  {editandoId === comp._id ? (
                    <select
                     className="w-auto  py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                      value={valoresEditados.cuenta}
                      onChange={(e) => setValoresEditados({...valoresEditados, cuenta: e.target.value})}
                      >
                        <option value="BNA+">Banco Nación</option>
                        <option value="Mercadopago">Mercadopago</option>
                        <option value="Naranja X">Naranja X</option>
                    </select>
                  ) : (
                   comp.cuenta || "—"   
                  )}
                  
                  </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <FaImage
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                      onClick={() => abrirImagen(comp.imagenComprobante)}
                    />
                    <MdEdit
                      className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 cursor-pointer"
                      onClick={() => comenzarEdicion(comp._id, comp)}
                    />
                    <FaSave
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 cursor-pointer"
                      onClick={() => guardarCambios(comp._id)}
                    />
                    <FaTrashAlt
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                      onClick={() => confirmarEliminacion(comp._id)}
                    />
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
          <div
            key={comp._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md p-4 space-y-2 text-black dark:text-white"
          >
            <p><strong>Fecha:</strong> {formatearFecha(comp.fecha)}</p>

            <p className="capitalize">
              <strong>N° Comprobante:</strong>{" "}
              {editandoId === comp._id ? (
                <input
                  value={valoresEditados.nroComprobante}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, nroComprobante: e.target.value })}
                  className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                />
              ) : (
                comp.nroComprobante
              )}
            </p>

            <p className="capitalize"><strong>Método de pago:</strong> {comp.metodoPago}</p>
            <p className={`capitalize ${comp.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500' }`}><strong>Tipo:</strong> {comp.tipo}</p>
            <p className="capitalize"><strong>Comprobante:</strong> {comp.tipoComprobante}</p>

            <p>
              <strong>Descripción:</strong>{" "}
              {editandoId === comp._id ? (
                <input
                  value={valoresEditados.descripcion}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, descripcion: e.target.value })}
                  className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                />
              ) : (
                comp.descripcion
              )}
            </p>

            <p className='capitalize'>
              <strong>Monto:</strong>{" "}
              {editandoId === comp._id ? (
                <input
                  type="number"
                  value={valoresEditados.monto}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value })}
                  className="w-full px-2 py-1 text-sm text-black dark:text-white dark:bg-gray-600 border border-yellow-500 dark:border-yellow-400 rounded-md"
                />
              ) : (
                formatearPesos(comp.monto)
              )}
            </p>

            <p className="capitalize"><strong>Usuario:</strong> {comp.usuario?.nombre || "Sin usuario"}</p>
            <p className="capitalize"><strong>Cuenta:</strong> {comp.cuenta || "—"}</p>

            <div className="flex gap-3 pt-2">
              <FaImage className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-lg cursor-pointer" onClick={() => abrirImagen(comp.imagenComprobante)} />
              <MdEdit className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-lg cursor-pointer" onClick={() => comenzarEdicion(comp._id, comp)} />
              <FaSave className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-lg cursor-pointer" onClick={() => guardarCambios(comp._id)} />
              <FaTrashAlt className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-lg cursor-pointer" onClick={() => confirmarEliminacion(comp._id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal imagen */}
      {imagenSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl max-h-[100vh]">
            <button
              onClick={cerrarImagen}
              className="absolute top-1 right-2 text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
            >
              &times;
            </button>
            <img
              src={imagenSeleccionada || "/placeholder.svg"}
              alt="Comprobante"
              className="max-w-full max-h-[75vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
