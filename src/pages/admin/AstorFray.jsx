import { useState, useEffect, useRef } from 'react';
import { manejarNuevaTransaccion } from '../../controllers/transaccionController';
import { useContext } from 'react';
import { ComprobanteContext } from '../../context/ComprobanteContext';
import fax from '../../assets/comprobante.jpg';
import { RiEdit2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { uploadImgCloudinary } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { enviarMensajeNuevoComprobante } from '../../helpers/useBroadcastChannelHelper';
  
  export const AstorFray = () => {

  const [tipo, setTipo] = useState('ingreso');
  const [tipoComprobante, setTipoComprobante] = useState('factura');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [nroComprobante, setNroComprobante] = useState('');
  const [imagenComprobante, setImgComprobante] = useState('');
  const [local] = useState('astorFray');
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  
  const { toggleRecargar, setCambioFray, setCambioGeneral } = useContext(ComprobanteContext);
  
  const fileInputRef = useRef(null);

  const resetFields = () => {
    setTipo('ingreso'); 
    setTipoComprobante('factura');
    setMonto('');
    setDescripcion('');
    setMetodoPago('efectivo');
    setNroComprobante('');
    setImgComprobante('');
  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  

    useEffect(() => {
    const idUsuario = localStorage.getItem("usuarioId");
    if (idUsuario) {
      setUsuario(idUsuario);
    }
    }, []);

    const handleImagenUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const imageUrl = await uploadImgCloudinary(file);
      setImgComprobante(imageUrl); 
      setSuccess('Imagen subida correctamente');
    } catch (error) {
      setError('Error al subir la imagen', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const result = await manejarNuevaTransaccion({
        tipo,
        tipoComprobante,
        monto,
        descripcion,
        metodoPago,
        nroComprobante,
        local,
        usuario,
        imagenComprobante,
        toggleRecargar,
        setError,
        setSuccess,
        resetFields,
        toast
      });

      if (result) {
        setCambioFray(prev => prev + 1);
        setCambioGeneral(prev => prev + 1);
        enviarMensajeNuevoComprobante('astorFray');
      } 

  };
  
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-secondary-100 rounded-lg shadow-lg w-full">
  {/* Título */}
  <div className="text-center sm:text-left">
    <h1 className="text-xl sm:text-2xl font-bold text-primary">
      Carga de Comprobantes - Local Astor Fray
    </h1>
  </div>

  <hr className="border-gray-400" />

  {/* Imagen del comprobante */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
  </div>

  {/* Campos del formulario */}
  {[
    {
      label: "Tipo de comprobante",
      required: true,
      element: (
        <select
          value={tipoComprobante}
          onChange={(e) => setTipoComprobante(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="factura">Factura</option>
          <option value="ticket">Ticket</option>
          <option value="recibo">Recibo</option>
          <option value="transferencia">Transferencia</option>
        </select>
      ),
    },
    {
      label: "Tipo de transacción",
      required: true,
      element: (
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      ),
    },
    {
      label: "Número de comprobante",
      required: true,
      element: (
        <input
          type="text"
          value={nroComprobante}
          onChange={(e) => setNroComprobante(e.target.value)}
          required
          placeholder="Ej: A-0001-12345678"
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
        />
      ),
    },
    {
      label: "Descripción",
      required: false,
      element: (
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Añade una breve descripción..."
          rows={2}
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
        />
      ),
    },
    {
      label: "Método de pago",
      required: true,
      element: (
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="debito">Débito</option>
        </select>
      ),
    },
    {
      label: "Monto final",
      required: true,
      element: (
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
          placeholder="Ej: $250.000"
          className="w-full py-2 px-3 rounded-md bg-secondary-900 text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
        />
      ),
    },
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
      Cargar Comprobante
    </button>
  </div>
</form>

   )}