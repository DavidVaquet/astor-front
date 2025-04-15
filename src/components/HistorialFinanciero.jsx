import { useEffect, useState } from "react";
import { manejarEditarHistorialMensual, manejarObtenerHistorialPorLocal } from "../controllers/historialController";
import { toast } from "react-toastify";
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
      balance: item.balance
    })
  };

  const guardarCambios = async () => {
    await manejarEditarHistorialMensual({
      id: editandoId,
      nuevosValores: valoresEditados,
      toast,
      setError,
    })
    setEditandoId(null);
    setRecargar(prev => !prev);
  };


  useEffect(() => {
    if (local) {
      manejarObtenerHistorialPorLocal({ local, setHistorial, setError });
    }
  }, [local, recargar]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Historial Financiero - {local.toUpperCase()}
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm md:text-base text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Ingresos</th>
              <th className="px-4 py-3">Egresos</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Accion</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item) => (
              <tr
                key={`${item.anio}-${item.mes}`}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-3">
                  {item.mes}/{item.anio}
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  {editandoId === item._id ? (
                    <input
                    type="number"
                    value={valoresEditados.totalIngreso}
                    onChange={(e) => setValoresEditados({...valoresEditados, totalIngreso: e.target.value})}/>
                  ) : `${item.totalIngreso.toLocaleString()}`}
                </td>
                <td className="px-4 py-3 text-red-600 font-semibold">
                  {editandoId === item._id ? (
                  <input
                  type="number"
                  value={valoresEditados.totalEgreso}
                  onChange={(e) => setValoresEditados({...valoresEditados, totalEgreso: e.target.value})}/>
                  ) : `${item.totalEgreso.toLocaleString()}`}
                </td>
                <td
                  className={`px-4 py-3 font-bold ${
                    item.balance >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {editandoId === item._id ? (
                    <input
                    type="number"
                    value={valoresEditados.balance}
                    onChange={(e) => setValoresEditados({...valoresEditados, balance: e.target.value})}
                    />
                  ) : `${item.balance.toLocaleString()}`}
                </td>
                <td
                className="px-4 py-3">
                  {editandoId === item._id ? (
                    <button
                    onClick={guardarCambios}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded shadow-md transition-colors duration-200">
                      Guardar
                    </button>
                  ) : (
                    <button
                    onClick={() => comenzarEdicion(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded shadow-md transition-colors duration-200">
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
