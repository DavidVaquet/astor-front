import { useState, useEffect, useRef, useContext } from 'react';
import { manejarNuevaTransaccion } from '../../controllers/transaccionController';
import { ComprobanteContext } from '../../context/ComprobanteContext';
import { uploadImgCloudinary } from '../../services/uploadService';
import { enviarMensajeNuevoComprobante } from '../../helpers/useBroadcastChannelHelper';
import { comision } from '../../helpers/comision';
import fax from '../../assets/comprobante.jpg';
import { RiEdit2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatearPesos } from '../../helpers/formatearPesos';


  export const Inmobiliaria = () => {



  const { toggleRecargar, setCambioGeneral, setCambioInmobiliaria } = useContext(ComprobanteContext);  
  const [tipo, setTipo] = useState('ingreso');
  const [tipoComprobante, setTipoComprobante] = useState('factura');
  const [descripcion, setDescripcion] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [nroComprobante, setNroComprobante] = useState('');
  const [imagenComprobante, setImgComprobante] = useState('');
  const [local] = useState('inmobiliaria');
  const [usuario, setUsuario] = useState('');
  const [montoAlquiler, setMontoAlquiler] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [montoComision, setMontoComision] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');

  const fileInputRef = useRef(null);

  const resetFields = () => {
    setTipo('');
    setTipoComprobante('');
    setMontoComision('');
    setDescripcion('');
    setMetodoPago('');
    setNroComprobante('');
    setImgComprobante('');
    setMontoAlquiler('');
    setPorcentaje('');

    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

    useEffect(() => {
    const idUsuario = localStorage.getItem("usuarioId");
    if (idUsuario) {
      setUsuario(idUsuario);
    }
    }, []);

    useEffect(() => {
      const comisionCalculada = comision(montoAlquiler, porcentaje);
      console.log(comisionCalculada);
      setMontoComision(comisionCalculada);
    }, [montoAlquiler, porcentaje])
    

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
        monto: montoComision,
        descripcion,
        metodoPago,
        nroComprobante,
        local,
        usuario,
        porcentaje,
        montoAlquiler,
        imagenComprobante,
        toggleRecargar,
        setError,
        setSuccess,
        resetFields,
        toast
      });
      console.log(result);

      if (result) {
        setCambioInmobiliaria(prev => prev + 1);
        setCambioGeneral(prev => prev + 1);
        enviarMensajeNuevoComprobante('astorInmobiliaria');
      } 

  };
    

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-blanco dark:bg-secondary-100 rounded-lg shadow-lg w-full">
  {/* Título */}
  <div className="text-center sm:text-left">
    <Link to="" className="text-xl uppercase sm:text-2xl font-semibold text-primary">
      Nuevo comprobante - Inmobiliaria
    </Link>
  </div>

  <hr className="border-gray-400" />

  {/* Imagen del comprobante */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <label className="sm:w-1/4 w-full text-sm sm:text-base font-medium dark:text-white">
      Imagen del comprobante <span className="text-red-700 font-bold">*</span>
    </label>
    <div className="flex-1 w-full">
      <div className="relative mb-1">
        <img
          src={imagenComprobante || fax}
          alt="Comprobante"
          className="w-28 h-28 object-cover rounded-lg border border-primary shadow-sm"
        />
        <label
          htmlFor="avatar"
          className="absolute border-2 border-primary bg-blanco dark:bg-secondary-100 p-2 rounded-full cursor-pointer left-24 -top-2 hover:text-primary transition"
        >
          <RiEdit2Line />
        </label>
        <input
          type="file"
          className="hidden"
          id="avatar"
          ref={fileInputRef}
          onChange={(e) => handleImagenUpload(e)}
        />
      </div>
      <p className="dark:text-gray-500 text-gray-700 text-sm">Formatos permitidos: PNG, JPG, JPEG.</p>
    </div>
  </div>

  {/* Campos dinámicos */}
  {[
    {
      label: "Tipo de comprobante",
      required: true,
      element: (
        <select
          value={tipoComprobante}
          onChange={(e) => setTipoComprobante(e.target.value)}
          required
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary"
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
      label: "Importe del alquiler",
      required: true,
      element: (
        <input
          type="number"
          value={montoAlquiler}
          onChange={(e) => setMontoAlquiler(e.target.value)}
          required
          placeholder="Ej: $700.000"
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary appearance-none"
        />
      ),
    },
    {
      label: "Porcentaje",
      required: true,
      element: (
        <input
          type="number"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
          required
          placeholder="Ej: 10"
          className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none outline-none dark:focus:ring-2 dark:focus:ring-primary appearance-none"
        />
      ),
    },
    {
      label: "Ganancia neta",
      required: true,
      element: (
        <div className="w-full py-2 px-3 rounded-md bg-blanco dark:bg-secondary-900 text-black dark:text-white border-2 border-primary dark:border-none">
          {formatearPesos(montoComision)}
        </div>
      ),
    },
  ].map(({ label, required, element }, index) => (
    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <label className="sm:w-1/4 w-full text-sm sm:text-base font-medium dark:text-white">
        {label} {required && <span className="text-red-700 font-bold">*</span>}
      </label>
      <div className="flex-1 w-full">{element}</div>
    </div>
  ))}

  {/* Botón */}
  <div className="flex justify-center mt-4">
    <button
      type="submit"
      className="bg-primary text-black py-2 px-6 rounded-xl text-sm font-bold uppercase hover:bg-yellow-500 transition-colors"
    >
      Cargar Comprobante
    </button>
  </div>
</form>


  )};
