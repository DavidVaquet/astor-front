import React from 'react'
import { obtenerTransferenciaController, editarTransferenciaController, eliminarTransferenciaController } from '../../controllers/transferenciaController';
import { useState, useEffect } from 'react';
import { FaImage, FaTrashAlt, FaSave  } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { formatearPesos } from '../../helpers/formatearPesos';
import { formatearFecha } from '../../helpers/formatearFecha';
import { toast } from 'react-toastify';
// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const ListarTransferencias = () => {
    const [fechaFiltro, setFechaFiltro] = useState('');
    // const [filtroLocal, setFiltroLocal] = useState('');
    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const [transferencias, setTransferencias] = useState([]);
    const [recargar, setRecargar] = useState(1);
    const [valoresEditados, setValoresEditados] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
      const obtenerTransferencias = async () => {
        try {
            const data = await obtenerTransferenciaController({toast});
            setTransferencias(data);
        } catch (error) {
            console.error('Error al obtener las transferencias:', error);
        }
      }
      obtenerTransferencias();
    }, [recargar])


    const transferenciasFiltradas = transferencias.filter(t => {
        const coincideBusqueda = filtroBusqueda === '' || (
            t.origen.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
            t.destino.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
            t.detalle && t.detalle.toLowerCase().includes(filtroBusqueda.toLowerCase())
        )
        // const coincideLocal = filtroLocal === '' || t.origen === filtroLocal || t.destino === filtroLocal;
        const coincideFecha = fechaFiltro === '' || new Date(t.fecha).toISOString().slice(0, 10) === fechaFiltro;

        return coincideBusqueda && coincideFecha;
    })
    
    const comenzarEdicion = (id, transferencia) => {
      setEditandoId(id);
      setValoresEditados({
        origen: transferencia.origen,
        destino: transferencia.destino,
        monto: transferencia.monto,
        detalle: transferencia.detalle,
        cuenta: transferencia.cuenta
      })
    };

    const guardarCambios = async (id) => {
    try {
      await editarTransferenciaController({
      id,
      datosActualizados: valoresEditados,
      toast
      });
      

    // Actualizar la lista
    const nuevasTransferencias = transferencias.map((transf) =>
      transf._id === id ? { ...transf, ...valoresEditados } : transf
    );
    setTransferencias(nuevasTransferencias);

    // Resetear estado
    setEditandoId('');
    setValoresEditados('');
    
  } catch (error) {
    console.error('Error al guardar cambios:', error);
  }
  };

  const confirmarEliminacion = async (id) => {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "Esta transferencia será eliminada permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e3342f",
        cancelButtonColor: "#6c757d",
      });
    
      if (result.isConfirmed) {
        await eliminarTransferenciaController({
          id,
          toast
        });
        // Actualizar la lista
        setRecargar((prev) => prev + 1);
      }
    };

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
          <label className="text-black dark:text-white font-semibold text-sm mb-4">🔍 Buscar:</label>
          <input
            type="text"
            placeholder="Ej: origen, destino, descripción..."
            className="border-2 border-primary px-4 py-2 outline-none rounded-md text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-sm"
            value={filtroBusqueda}
            onChange={(e) => setFiltroBusqueda(e.target.value)}
          />
        </div>
        {/* <div className="flex flex-col">
          <label className="text-black font-semibold text-sm mb-1">🔍 Filtrar por local:</label>
          <select
            className="border border-gray-300 px-4 py-2 rounded-md text-black shadow-sm"
            value={filtroLocal}
            onChange={(e) => setFiltroLocal(e.target.value)}
          >
            <option value="">Todos los locales</option>
            <option value="Fray">Astor Fray</option>
            <option value="Galindez">Astor Galindez</option>
          </select>

        </div> */}
      </div>
  
      {/* {error && <p className="text-red-500 font-medium mb-4">❌ Error: {error}</p>} */}
  
      {/* Tabla escritorio */}
      <div className="hidden md:block">
        <table className="w-full bg-white dark:bg-gray-800 text-sm text-black dark:text-white shadow-2xl rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-secondary-900 dark:text-white text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">Fecha</th>
              <th className="px-6 py-4 text-left">Origen</th>
              <th className="px-6 py-4 text-left">Destino</th>
              <th className="px-6 py-4 text-center">Importe</th>
              <th className="px-6 py-4 text-left">Descripción</th>
              <th className="px-6 py-4 text-left">Usuario</th>
              <th className="px-6 py-4 text-left">Cuenta</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className='text-black dark:text-white'>
            {transferenciasFiltradas.map((transf, index) => (
              <tr key={transf._id} className={`${index % 2 === 0 ? "bg-blanco dark:bg-gray-900" : "bg-gray-100 dark:bg-gray-900"}`}>
                <td className="px-6 py-4">{formatearFecha(transf.fecha)}</td>
                <td className="px-6 py-4">
                  {editandoId === transf._id ? (
                    <select
                      value={valoresEditados.origen}
                      onChange={(e) => setValoresEditados({ ...valoresEditados, origen: e.target.value })}
                      className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                    >
                      <option value="Fray">Astor Fray</option>
                      <option value="Galindez">Astor Galindez</option>
                    </select>
                
                  ) : transf.origen}
                </td>
                <td className="px-6 py-4 capitalize">{editandoId === transf._id ? (
                  <select
                  value={valoresEditados.destino}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, destino: e.target.value})}
                  className='w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md'>
                    <option value="Fray">Astor Fray</option>
                      <option value="Galindez">Astor Galindez</option>
                  </select>
                ) : transf.destino}
                </td>
                <td className="px-6 py-4 text-center">
                  {editandoId === transf._id ? (
                    <input
                      type="number"
                      value={valoresEditados.monto}
                      onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value })}
                      className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                    />
                  ) : formatearPesos(transf.monto)}
                </td>
                <td className="px-6 py-4 truncate max-w-[200px]">
                  {editandoId === transf._id ? (
                    <input
                      value={valoresEditados.detalle}
                      onChange={(e) => setValoresEditados({ ...valoresEditados, detalle: e.target.value })}
                      className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
                    />
                  ) : (
                    <span title={transf.detalle}>{transf.detalle}</span>
                  )}
                </td>
                
                <td className="px-6 py-4 capitalize">{transf.usuario?.nombre || "Sin usuario"}</td>
                <td className="px-6 py-4 capitalize  lg:table-cell">{editandoId === transf._id ? (
                  <select
                  value={valoresEditados.cuenta}
                  onChange={(e) => setValoresEditados({ ...valoresEditados, cuenta: e.target.value})}
                  className='w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md'>
                    <option value="Yanina">Yanina</option>
                    <option value="Sebastian">Sebastian</option>
                  </select>  
                ) : transf.cuenta || "—"}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <MdEdit className="text-yellow-500 hover:text-yellow-700 cursor-pointer" onClick={() => comenzarEdicion(transf._id, transf)} />
                    <FaSave className="text-green-600 hover:text-green-700 cursor-pointer" onClick={() => guardarCambios(transf._id)} />
                    <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => confirmarEliminacion(transf._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Vista móvil */}
      <div className="md:hidden flex flex-col gap-6 mt-4">
      {transferenciasFiltradas.map((comp) => (
        <div
          key={comp._id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md p-4 space-y-2 text-black dark:text-white"
        >
          <p>
            <strong>Fecha:</strong> {formatearFecha(comp.fecha)}
          </p>
          <p className="capitalize">
            <strong>Origen:</strong>{' '}
            {editandoId === comp._id ? (
              <select
                value={valoresEditados.origen}
                onChange={(e) => setValoresEditados({ ...valoresEditados, origen: e.target.value })}
                className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
              >
                <option value="Fray">Astor Fray</option>
                <option value="Galindez">Astor Galindez</option>
              </select>
            ) : (
              comp.origen
            )}
          </p>
          <p className="capitalize">
            <strong>Destino:</strong>{' '}
            {editandoId === comp._id ? (
              <select
                value={valoresEditados.destino}
                onChange={(e) => setValoresEditados({ ...valoresEditados, destino: e.target.value })}
                className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
              >
                <option value="Fray">Astor Fray</option>
                <option value="Galindez">Astor Galindez</option>
              </select>
            ) : (
              comp.destino
            )}
          </p>
          <p>
            <strong>Monto:</strong>{' '}
            {editandoId === comp._id ? (
              <input
                type="number"
                value={valoresEditados.monto}
                onChange={(e) => setValoresEditados({ ...valoresEditados, monto: e.target.value })}
                className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
              />
            ) : (
              formatearPesos(comp.monto)
            )}
          </p>
          <p>
            <strong>Detalle:</strong>{' '}
            {editandoId === comp._id ? (
              <input
                value={valoresEditados.detalle}
                onChange={(e) => setValoresEditados({ ...valoresEditados, detalle: e.target.value })}
                className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
              />
            ) : (
              comp.detalle
            )}
          </p>
          <p className="capitalize">
            <strong>Cuenta:</strong>{' '}
            {editandoId === comp._id ? (
              <select
                value={valoresEditados.cuenta}
                onChange={(e) => setValoresEditados({ ...valoresEditados, cuenta: e.target.value })}
                className="w-full px-2 py-1 text-sm text-black border border-yellow-500 rounded-md"
              >
                <option value="Yanina">Yanina</option>
                <option value="Sebastian">Sebastian</option>
              </select>
            ) : (
              comp.cuenta || '—'
            )}
          </p>
          <div className="flex gap-3 pt-2">
            <MdEdit
              className="text-yellow-500 hover:text-yellow-700 text-lg cursor-pointer"
              onClick={() => comenzarEdicion(comp._id, comp)}
            />
            <FaSave
              className="text-green-600 hover:text-green-700 text-lg cursor-pointer"
              onClick={() => guardarCambios(comp._id)}
            />
            <FaTrashAlt
              className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
              onClick={() => confirmarEliminacion(comp._id)}
            />
          </div>
        </div>
      ))}
    </div>
  
      {/* Modal imagen */}
      {/* {imagenSeleccionada && (
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
      )} */}
    </div>
  );
}
