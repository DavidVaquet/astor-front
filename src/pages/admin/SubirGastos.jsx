import React from 'react';
import { useState, useEffect } from 'react';
import { crearTransferenciaController } from '../../controllers/transferenciaController';
import { toast } from 'react-toastify';

export const SubirGastos = () => {

    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [detalle, setDetalle] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [importe, setImporte] = useState('');

    const resetFields = () => {
        setOrigen('');
        setDestino('');
        setDetalle('');
        setCuenta('');
        setImporte('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await crearTransferenciaController({
            origen,
            destino,
            cuenta,
            monto: importe,
            detalle,
            toast,
            resetFields
        })
        return result;
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-blanco dark:bg-secondary-100 rounded-lg shadow-lg w-full">
  {/* Título */}
  <div className="text-center sm:text-left">
    <h1 className="text-xl sm:text-2xl uppercase font-semibold text-primary">
      Nuevo gasto compartido
    </h1>
  </div>

  <hr className="border-gray-400" />

  {/* Imagen del comprobante */}
  {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <label className="sm:w-1/4 w-full text-sm sm:text-base font-medium">
      Imagen del comprobante <span className="text-red-700 font-bold">*</span>
    </label>
    <div className="flex-1 w-full">
      <div className="relative mb-1">
        <img
          src={imagenComprobante || fax}
          alt="Comprobante"
          className="w-28 h-28 object-cover rounded-lg border border-primaryshadow-sm"
        />
        <label
          htmlFor="avatar"
          className="absolute bg-secondary-100 p-2 rounded-full cursor-pointer left-24 -top-2 hover:text-primary transition"
        >
          <RiEdit2Line />
        </label>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          id="avatar"
          onChange={handleImagenUpload}
        />
      </div>
      <p className="text-gray-500 text-sm">Formatos permitidos: PNG, JPG, JPEG.</p>
    </div>
  </div> */}

  {/* Campos del formulario */}
  {[
    {
      label: "Local de origen",
      required: true,
      element: (
        <select
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:outline-none
           dark:focus:ring-2 dark:focus:ring-primary "
        >
          <option value="">Seleccionar origen</option>
          <option value="Fray">Astor Fray</option>
          <option value="Galindez">Astor Galindez</option>
        </select>
      ),
    },
    {
      label: "Local de destino",
      required: true,
      element: (
        <select
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:outline-none
           dark:focus:ring-2 dark:focus:ring-primary "
        >
          <option value="">Seleccionar destino</option>
          <option value="Galindez">Astor Galindez</option>
          <option value="Fray">Astor Fray</option>
        </select>
      ),
    },
    {
      label: "Importe",
      required: true,
      element: (
        <input
          type="number"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          required
          placeholder="Ej: 100.000"
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
        />
      ),
    },
    {
      label: "Cuenta",
      required: true,
      element: (
        <select
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
        >
          <option value="">Seleccionar cuenta</option>
          <option value="Yanina">Yanina</option>
          <option value="Sebastian">Sebastian</option>
        </select>
      ),
    },
    {
      label: "Descripción",
      required: false,
      element: (
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          placeholder="Añade una breve descripción..."
          rows={2}
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
        />
      ),
        }
    // {
    //   label: "Método de pago",
    //   required: true,
    //   element: (
    //     <select
    //       value={metodoPago}
    //       onChange={(e) => setMetodoPago(e.target.value)}
    //       required
    //       className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
    //     >
    //       <option value="efectivo">Efectivo</option>
    //       <option value="transferencia">Transferencia</option>
    //       <option value="tarjeta">Tarjeta</option>
    //       <option value="debito">Débito</option>
    //       <option value="qr">QR</option>
    //       <option value="combinada">Combinada</option>
    //     </select>
    //   ),
    // },
    // {
    //   label: "Cuenta",
    //   required: false,
    //   element: (
    //     <select
    //       value={cuenta}
    //       onChange={(e) => setCuenta(e.target.value)}
    //       required
    //       className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
    //     >
    //       <option value="">Seleccionar cuenta (opcional)</option>
    //       <option value="Yanina">Yanina</option>
    //       <option value="Sebastian">Sebastian</option>
          
    //     </select>
    //   ),
    // },
    // {
    //   label: "Monto final",
    //   required: true,
    //   element: (
    //     <input
    //       type="number"
    //       value={monto}
    //       onChange={(e) => setMonto(e.target.value)}
    //       required
    //       placeholder="Ej: $250.000"
    //       className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
    //     />
    //   ),
    // },
  ].map(({ label, required, element }, i) => (
    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <label className="sm:w-1/4 w-full text-sm sm:text-base font-medium">
        {label} {required && <span className="text-red-700 font-bold">*</span>}
      </label>
      <div className="flex-1 w-full">{element}</div>
    </div>
  ))}

  {/* Botón de carga */}
  <div className="flex justify-center mt-4">
    <button
      type="submit"
      className="bg-primary text-black py-2 px-6 rounded-xl text-sm font-bold uppercase hover:bg-yellow-500 transition-colors"
    >
      Crear Gasto
    </button>
  </div>
</form>

   )
}
