import { useState, useEffect, useRef } from 'react';
import { manejarNuevaTransaccion } from '../../controllers/transaccionController';
import { useContext } from 'react';
import { ComprobanteContext } from '../../context/ComprobanteContext';
import fax from '../../assets/comprobante.jpg';
import { RiEdit2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { uploadImgCloudinary } from '../../services/uploadService';
import { toast } from 'react-toastify';

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
  
  
  const {toggleRecargar} = useContext(ComprobanteContext)
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
    try {
      await manejarNuevaTransaccion({
        tipo,
        tipoComprobante,
        monto,
        descripcion,
        metodoPago,
        nroComprobante,
        local,
        usuario,
        imagenComprobante,
        setError,
        setSuccess,
        resetFields,
        toast,
      });
      toggleRecargar();

    } catch (error) {
      console.error("Error al subir el comprobante:", error.message);
    }
  };
  
  

  return (
    <div className='bg-secondary-100 rounded-lg p-6 shadow-lg'>
      <div>
      <Link to=''>
      Carga de Comprobantes - Local Astor Fray
      </Link>
      </div>
      <hr className='my-4 border-gray-400' />

      <form onSubmit={handleSubmit}
       className='flex-col'>
        {/* Imagen del comprobante */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Imagen del comprobante <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <div className='relative mb-1'>
              <img src={imagenComprobante||fax} 
              alt="Comprobante"
              className='w-28 h-28 object-cover rounded-lg border border-yellow-400 shadow-sm' />
              <label 
                htmlFor='avatar'
                className='absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer left-24 -top-2 hover:text-yellow-400 transition'
              >
                <RiEdit2Line />
              </label>
              <input
              type='file'
              className='hidden'
              ref={fileInputRef}
              id='avatar'
              onChange={(e) => handleImagenUpload(e)} />
            </div>
            <p className='text-gray-500 text-sm'>Formatos permitidos: PNG, JPG, JPEG.</p>
          </div>
        </div>

        {/* Tipo de Comprobante */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Tipo de comprobante <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <select
              value={tipoComprobante}
              required
              onChange={(e) => setTipoComprobante(e.target.value)} 
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'>
              <option value='factura'>Factura</option>
              <option value='ticket'>Ticket</option>
              <option value='recibo'>Recibo</option>
              <option value='transferencia'>Transferencia</option>
            </select>
          </div>
        </div>
        {/* Tipo de Transaccion */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Tipo de transaccion <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <select
              value={tipo}
              required
              onChange={(e) => setTipo(e.target.value)} 
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'>
              <option value='ingreso'>Ingreso</option>
              <option value='egreso'>Egreso</option>
            </select>
          </div>
        </div>

        {/* Número de comprobante */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Número de comprobante <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <input 
              type="text"
              value={nroComprobante}
              required
              onChange={(e) => setNroComprobante(e.target.value)} 
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'
              placeholder='Ej: A-0001-12345678'
            />
          </div>
        </div>

        {/* Fecha del comprobante */}
        {/* <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Fecha del comprobante <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <input 
              type="date" 
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'
            />
          </div>
        </div> */}

        {/* Descripción */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Descripción <span className='text-red-700 font-bold'></span></p>
          </div>
          <div className='flex-1'>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)} 
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'
              placeholder='Añade una breve descripción...'
              rows="2"
            ></textarea>
          </div>
        </div>


        {/* Método de Pago */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Método de pago <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <select 
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
            className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400'>
              <option value='efectivo'>Efectivo</option>
              <option value='transferencia'>Transferencia</option>
              <option value='tarjeta'>Tarjeta</option>
              <option value='debito'>Debito</option>
            </select>
          </div>
        </div>

        {/* Monto final */}
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
            <p className='text-lg font-normal'>Monto final <span className='text-red-700 font-bold'>*</span></p>
          </div>
          <div className='flex-1'>
            <input 
              type="number"
              value={monto}
              required
              onChange={(e) => setMonto(e.target.value)}
              className='w-full py-3 px-4 outline-none rounded-md bg-secondary-900 text-white focus:ring-2 focus:ring-yellow-400 appearance-none'
              placeholder='Ej: $250.000'
            />
          </div>
        </div>

        {/* Botón de carga */}
        <div className='flex items-center justify-center'>
          <button type='submit' className='bg-yellow-400 text-black py-3 px-4 rounded-xl text-sm font-bold uppercase hover:bg-yellow-500 transition-colors'>
            Cargar Comprobante
          </button>
        </div>
      </form>
    </div>
  );
}
