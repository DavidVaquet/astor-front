import { useState, useEffect, useRef } from 'react';
import { manejarNuevaTransaccion } from '../controllers/transaccionController';
import { useContext } from 'react';
import { ComprobanteContext } from '../context/ComprobanteContext';
import fax from '../assets/comprobante.jpg';
import { RiEdit2Line } from "react-icons/ri";
import { uploadImgCloudinary } from '../services/uploadService';
import { toast } from 'react-toastify';
import { enviarMensajeNuevoComprobante } from '../helpers/useBroadcastChannelHelper';
  
  export const SubirComprobantes = ({locale, setCambio, titulo, channelBroadCast}) => {

  const [tipo, setTipo] = useState('ingreso');
  const [tipoComprobante, setTipoComprobante] = useState('factura');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [nroComprobante, setNroComprobante] = useState('');
  const [imagenComprobante, setImgComprobante] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cuenta, setCuenta] = useState('');
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
    setCuenta('');
  
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

  const validarFormulario = () => {
    
    if (!imagenComprobante){
        toast.error('Debes subir una imagen.');
        return false;
       };

    if (!tipo){
        toast.error('Debes seleccionar un tipo de transacción.');
        return false;
       };

    if (!tipoComprobante){
        toast.error('Debes seleccionar un tipo de comprobante.');
        return false;
       };

    if (!nroComprobante){
        toast.error('Debes especificar un nro de comprobante.');
        return false;
       };

    if (!metodoPago){
        toast.error('Debes seleccionar un método de pago.');
        return false;
       };

    if (!monto){
        toast.error('Debes especificar el monto.');
        return false;
       };

       return true;
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

       if (!validarFormulario()) return;

      const result = await manejarNuevaTransaccion({
        tipo,
        tipoComprobante,
        monto,
        descripcion,
        metodoPago,
        nroComprobante,
        local: locale,
        usuario,
        imagenComprobante,
        toggleRecargar,
        cuenta,
        resetFields,
        toast
      });

      if (result) {
        toast.success('Comprobante cargado correctamente')
        setCambio(prev => prev + 1);
        setCambioGeneral(prev => prev + 1);
        enviarMensajeNuevoComprobante(channelBroadCast);
      } else {
        toast.error('Ocurrio un error al cargar el comprobante')
      }

  };
  
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-blanco dark:bg-secondary-100 rounded-lg shadow-lg w-full">
  {/* Título */}
  <div className="text-center sm:text-left">
    <h1 className="text-xl sm:text-2xl uppercase font-semibold text-primary">
      {titulo}
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
          className="absolute bg-blanco dark:bg-secondary-100 p-2 rounded-full cursor-pointer left-24 -top-2 hover:text-primary transition"
        >
          <RiEdit2Line />
        </label>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          id="avatar"
          required
          onChange={handleImagenUpload}
        />
      </div>
      <p className="dark:text-gray-500 text-gray-700 text-sm">Formatos permitidos: PNG, JPG, JPEG.</p>
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:outline-none
           dark:focus:ring-2 dark:focus:ring-primary "
        >
          <option value="factura">Factura</option>
          <option value="ticket">Ticket</option>
          <option value="recibo">Recibo</option>
          <option value="transferencia">Transferencia</option>
          <option value="qr">Método QR</option>
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black border-2 border-primary dark:border-none dark:text-white outline-none focus:ring-2 focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="debito">Débito</option>
          <option value="qr">QR</option>
          <option value="combinada">Combinada</option>
        </select>
      ),
    },
    {
      label: "Cuenta bancaria",
      required: false,
      element: (
        <select
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
        >
          <option value="">Seleccionar cuenta bancaria (opcional)</option>
          <option value="BNA+">Banco Nación</option>
          <option value="Mercadopago">Mercadopago</option>
          <option value="Naranja X">Naranja X</option>
          
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 dark:border-none border-primary outline-none dark:focus:ring-2 dark:focus:ring-primary"
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