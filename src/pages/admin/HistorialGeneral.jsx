import { useEffect, useState } from "react";
import {
  manejarEditarHistorialGeneral,
  manejarObtenerHistorialGeneral,
} from "../../controllers/historialController";
import { toast } from "react-toastify";
import { FaEdit, FaSave, FaCalendarAlt } from "react-icons/fa";

export const HistorialGeneral = () => {
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
    await manejarEditarHistorialGeneral({
      id: editandoId,
      nuevosValores: valoresEditados,
      setError,
      setHistorial,
      toast,
    });
    setEditandoId(null);
    setRecargar((prev) => !prev);
  };

  useEffect(() => {
    manejarObtenerHistorialGeneral({ setHistorial, setError });
  }, [recargar]);

  return (
    <div className="p-6 mt-[70px] bg-gray-200 rounded-lg shadow-xl">
      <h2 className="md:text-2xl text-xl font-bold text-center text-primary uppercase mb-6">
        Historial Financiero General
      </h2>

      {error && (
        <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
      )}

      {/* Vista escritorio */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-black dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                📅 Fecha
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                🟢 Ingresos
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                🔴 Egresos
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                💰 Balance
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                ✏️ Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {historial.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-2">
                  {item.mes}/{item.anio}
                </td>

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

      {/* Vista móvil */}
<div className="md:hidden flex flex-col gap-6 mt-6">
  {historial.map((item) => (
    <div
      key={item._id}
      className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 text-black dark:text-white"
    >
      <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-lg">
        📅 <span className="font-bold">{item.mes}/{item.anio}</span>
      </div>

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
            💾 Guardar
          </button>
        ) : (
          <button
            onClick={() => comenzarEdicion(item)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-md transition w-full"
          >
            ✏️ Editar
          </button>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};
