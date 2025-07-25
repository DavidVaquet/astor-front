import { useEffect, useState } from "react";
import {
  manejarEditarHistorialMensual,
  manejarObtenerHistorialPorLocal,
} from "../controllers/historialController";
import { toast } from "react-toastify";
import { FaEdit, FaSave } from "react-icons/fa";

export const HistorialFinanciero = ({ local }) => {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const [recargar, setRecargar] = useState(false);

  const comenzarEdicion = (item) => {
    setEditandoId(item._id);
    setValoresEditados({
      totalIngreso: item.totalIngreso,
      totalEgreso: item.totalEgreso,
      balance: item.balance,
    });
  };

  const guardarCambios = async () => {
    await manejarEditarHistorialMensual({
      id: editandoId,
      nuevosValores: valoresEditados,
      toast,
      setError,
    });
    setEditandoId(null);
    setRecargar((prev) => !prev);
  };

  useEffect(() => {
    if (local) {
      manejarObtenerHistorialPorLocal({ local, setHistorial, setError });
    }
  }, [local, recargar]);

  return (
    <div className="p-6 bg-blanco dark:bg-secondary-100 rounded-lg shadow-xl">
      <h2 className="md:text-2xl text-xl font-bold text-center text-primary uppercase mb-6">
        Historial Financiero - {local.toUpperCase()}
      </h2>

      {error && (
        <p className="text-red-500 text-center font-semibold mb-4">
          ❌ {error}
        </p>
      )}

      {/* Vista Desktop */}
      <div className="hidden md:block overflow-x-auto  shadow-xl rounded-xl">
        <table className="min-w-full  text-black dark:text-white">
          <thead className="bg-bclaro dark:bg-secondary-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">📅 Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">🟢 Ingresos</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">🔴 Egresos</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">💰 Balance</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">✏️ Acción</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 dark:bg-secondary-900 dark:text-white text-black">
            {historial.map((item) => (
              <tr
                key={`${item.anio}-${item.mes}`}
                className="bg-blanco dark:bg-gray-900"
              >
                <td className="px-6 py-4">{item.mes}/{item.anio}</td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  {editandoId === item._id ? (
                    <input
                      type="number"
                      className="px-2 py-1 rounded-md border border-yellow-400 text-black w-full"
                      value={valoresEditados.totalIngreso}
                      onChange={(e) =>
                        setValoresEditados({
                          ...valoresEditados,
                          totalIngreso: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.totalIngreso.toLocaleString()}`}
                </td>

                <td className="px-6 py-4 font-semibold text-red-600">
                  {editandoId === item._id ? (
                    <input
                      type="number"
                      className="px-2 py-1 rounded-md border border-yellow-400 text-black w-full"
                      value={valoresEditados.totalEgreso}
                      onChange={(e) =>
                        setValoresEditados({
                          ...valoresEditados,
                          totalEgreso: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.totalEgreso.toLocaleString()}`}
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
                      value={valoresEditados.balance}
                      onChange={(e) =>
                        setValoresEditados({
                          ...valoresEditados,
                          balance: e.target.value,
                        })
                      }
                    />
                  ) : `$${item.balance.toLocaleString()}`}
                </td>

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
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile */}
      <div className="md:hidden flex flex-col gap-6 mt-6">
        {historial.map((item) => (
          <div key={`${item.anio}-${item.mes}`} className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 text-black dark:text-white">
            📅 <span className="font-bold">{item.mes}/{item.anio}</span>

            <p className="mb-2">
              <strong>🟢 Ingresos:</strong>{" "}
              {editandoId === item._id ? (
                <input
                  type="number"
                  value={valoresEditados.totalIngreso}
                  className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                  onChange={(e) =>
                    setValoresEditados({
                      ...valoresEditados,
                      totalIngreso: e.target.value,
                    })
                  }
                />
              ) : `$${item.totalIngreso.toLocaleString()}`}
            </p>

            <p className="mb-2">
              <strong>🔴 Egresos:</strong>{" "}
              {editandoId === item._id ? (
                <input
                  type="number"
                  value={valoresEditados.totalEgreso}
                  className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                  onChange={(e) =>
                    setValoresEditados({
                      ...valoresEditados,
                      totalEgreso: e.target.value,
                    })
                  }
                />
              ) : `$${item.totalEgreso.toLocaleString()}`}
            </p>

            <p className="mb-2 font-semibold">
              <strong>💰 Balance:</strong>{" "}
              {editandoId === item._id ? (
                <input
                  type="number"
                  value={valoresEditados.balance}
                  className="mt-1 w-full px-2 py-1 rounded-md border border-yellow-400 text-black"
                  onChange={(e) =>
                    setValoresEditados({
                      ...valoresEditados,
                      balance: e.target.value,
                    })
                  }
                />
              ) : `$${item.balance.toLocaleString()}`}
            </p>

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
        ))}
      </div>
    </div>
  );
};
