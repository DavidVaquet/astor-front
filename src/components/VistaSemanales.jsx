import React, { useEffect, useState } from 'react'
import { getEstadisticasSemanales } from '../services/historialSemanal';
import { editarEstadisticaController } from '../controllers/historialSemanal';
import { FaEdit, FaSave } from "react-icons/fa";
import { format } from 'date-fns';
import { toast } from "react-toastify";

export const VistaSemanales = ({ local }) => {
    const [estadisticas, setEstadisticas] = useState([]);
    const [nuevosValores, setNuevosValores] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [recargar, setRecargar] = useState(1);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getEstadisticasSemanales({local});
        setEstadisticas(data);
        // console.log(estadisticas);
      }
      fetchData();
    }, [recargar, local])

    const comenzarEdicion = (item) => {
        setEditandoId(item._id);
        setNuevosValores({
            ingresos: Number(item.ingresos),
            egresos: Number(item.egresos),
            balance: Number(item.balance)
        });
    }

    const guardarCambios = async () => {
        await editarEstadisticaController({
            id: editandoId,
            nuevosValores,
            toast
        })
        setEditandoId(null);
        setRecargar((prev) => prev + 1);
    }

  return (
      <div className="p-6 mt-[0px] bg-blanco dark:bg-secondary-100 rounded-lg shadow-xl">
        <h2 className="md:text-2xl text-xl font-bold text-center text-primary uppercase mb-6">
          Estadisticas semanales - {local.toUpperCase()}
        </h2>

        {/* Vista Desktop */}
        <div className="hidden md:block overflow-x-auto  shadow-xl rounded-xl">
          <table className="min-w-full  text-black dark:text-white">
            <thead className="bg-gray-200 dark:bg-secondary-900 dark:text-white text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">📅 Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">🟢 Ingresos</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">🔴 Egresos</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">💰 Balance</th>
                { local === 'inmobiliaria' && (
                    <th className="px-6 py-3 text-left text-sm font-bold uppercase">🏢 Alquiler</th>
                )}
                <th className="px-6 py-3 text-left text-sm font-bold uppercase">✏️ Acción</th>
              </tr>
            </thead>
            <tbody className="">
              {estadisticas.map((item) => {
                const inicio = format(new Date(item.fechaInicio), 'dd/MM/yyyy');
                const fin = format(new Date(item.fechaFin), 'dd/MM/yyyy');
                return (
                <tr
                  key={`${item._id}`}
                  className="bg-blanco dark:bg-gray-900"
                >
                  <td className="px-6 py-4">{inicio} al {fin}</td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    {editandoId === item._id ? (
                      <input
                        type="number"
                        className="px-2 py-1 rounded-md border border-yellow-400 text-black w-full"
                        value={nuevosValores.ingresos}
                        onChange={(e) =>
                          setNuevosValores({
                            ...nuevosValores,
                            ingresos: e.target.value,
                          })
                        }
                      />
                    ) : `$${item.ingresos.toLocaleString()}`}
                  </td>

                  <td className="px-6 py-4 font-semibold text-red-600">
                    {editandoId === item._id ? (
                      <input
                        type="number"
                        className="px-2 py-1 rounded-md border border-yellow-400 text-black w-full"
                        value={nuevosValores.egresos}
                        onChange={(e) =>
                          setNuevosValores({
                            ...nuevosValores,
                            egresos: e.target.value,
                          })
                        }
                      />
                    ) : `$${item.egresos.toLocaleString()}`}
                  </td>

                  <td
                    className={`px-6 py-4 font-bold ${
                      item.balance >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {editandoId === item._id ? (
                      <input
                        type="number"
                        className="px-2 py-1 rounded-md border border-yellow-400 text-black w-full"
                        value={nuevosValores.balance}
                        onChange={(e) =>
                          setNuevosValores({
                            ...nuevosValores,
                            balance: e.target.value,
                          })
                        }
                      />
                    ) : `$${item.balance.toLocaleString()}`}
                  </td>

                  {local === 'inmobiliaria' && (
                    <td className='px-6 py-4 font-semibold text-green-600'>
                      {item.totalAlquiler ? `$${item.totalAlquiler.toLocaleString()}` : '-'}
                    </td>
                  )}

                  <td className="px-6 py-4">
                    {editandoId === item._id ? (
                      <button
                        onClick={guardarCambios}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-md transition"
                      >
                        <FaSave /> Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => comenzarEdicion(item)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md transition"
                      >
                        <FaEdit /> Editar
                      </button>
                    )}
                  </td>
                </tr>
                )})}
            </tbody>
          </table>
        </div>

        {/* Vista Mobile */}
        <div className="md:hidden flex flex-col gap-6 mt-6">
          {estadisticas.map((item) => {
            const inicio = format(new Date(item.fechaInicio), 'dd/MM/yyyy');
            const fin = format(new Date(item.fechaFin), 'dd/MM/yyyy');
            return (
              <div key={`${item._id}`} className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 text-black dark:text-white">
                📅 <span className="font-bold">{inicio} al {fin}</span>

                <p className="mb-2">
                  <strong>🟢 Ingresos:</strong>{" "}
                  {editandoId === item._id ? (
                    <input
                      type="number"
                      value={nuevosValores.ingresos}
                      className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                      onChange={(e) =>
                        setNuevosValores({
                          ...nuevosValores,
                          ingresos: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.ingresos.toLocaleString()}`}
                </p>

                <p className="mb-2">
                  <strong>🔴 Egresos:</strong>{" "}
                  {editandoId === item._id ? (
                    <input
                      type="number"
                      value={nuevosValores.egresos}
                      className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                      onChange={(e) =>
                        setNuevosValores({
                          ...nuevosValores,
                          egresos: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.egresos.toLocaleString()}`}
                </p>

                <p className="mb-2 font-semibold">
                  <strong>💰 Balance:</strong>{" "}
                  {editandoId === item._id ? (
                    <input
                      type="number"
                      value={nuevosValores.balance}
                      className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                      onChange={(e) =>
                        setNuevosValores({
                          ...nuevosValores,
                          balance: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.balance.toLocaleString()}`}
                </p>

                {local === 'inmobiliaria' && (
                  <p className="mb-2">
                    <strong>🏢 Alquiler:</strong> {item.totalAlquiler ? `$${item.totalAlquiler.toLocaleString()}` : '-'}
                  </p>
                )}

                <div className="mt-4 text-right">
                  {editandoId === item._id ? (
                    <button
                      onClick={guardarCambios}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1 rounded-md transition w-full"
                    >
                      <FaSave /> Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => comenzarEdicion(item)}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-md transition w-full"
                    >
                      <FaEdit /> Editar
                    </button>
                  )}
                </div>
              </div>
            )})}
        </div>
      </div>
    );
}
