import { useState, useEffect, useContext, useCallback } from 'react';
import { cargarResumenBalances } from '../../controllers/transaccionController';
import { ComprobanteContext } from '../../context/ComprobanteContext';
import { Link } from 'react-router-dom';
import { formatearPesos } from '../../helpers/formatearPesos';
import CardTicket from '../../components/CardTicket';
import CardCharts from '../../components/CardCharts';
import PieChart from '../../components/PieChart';
import { useBroadcastChannel } from '../../helpers/useBroadcastChannelHelper';

export const HomeInmobiliaria = () => {

 const [resumen, setResumen] = useState({});
 const [error, setError] = useState('');
 
 const cargarDatos = useCallback(() => cargarResumenBalances(setResumen, setError), [cargarResumenBalances, setResumen, setError]);
 
   useBroadcastChannel((local) => {
     if (local === 'astorInmobiliaria') {
       cargarDatos();
     }
   });
 
   useEffect(() => {
     cargarDatos(); 
   }, [cargarDatos]);

  return (
    <div>
      <div className='flex items-center mb-5 gap-4'>
        <div className='bg-primary text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
            className='text-[14px] md:text-[18px] text-black font-bold uppercase'
            to='/home/Comprobantes-Inmobiliaria'>
            SUBIR COMPROBANTES
          </Link>
        </div>

        <div className='bg-primary text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
            className='text-[14px] md:text-[18px] text-black font-bold uppercase'
            to='/home/Listado-Inmobiliaria'>
            LISTAR COMPROBANTES
          </Link>
        </div>

        <div className='bg-primary text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
            className='text-[14px] md:text-[18px] text-black font-bold uppercase'
            to='/home/Historial-Inmobiliaria'>
            HISTORIAL FINANCIERO
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
        <CardTicket 
          ticket='ingreso'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.ingreso)}
          text='Balance positivo'
          link='/home/Comprobantes-Inmobiliaria'
          />
        <CardTicket 
          ticket='pendiente'
          totalTickets='0'
          text='Balance pendiente'
          link='/home/Comprobantes-Inmobiliaria'
          />
        <CardTicket 
          ticket='egreso'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.egreso)}
          text='Balance negativo'
          link='/home/Comprobantes-Inmobiliaria'
          />
        <CardTicket 
          ticket='total'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.balance)}
          text='Balance total'
          link='/home/Comprobantes-Inmobiliaria'
          />
      </div>

      <div className='col-span-1 xl:col-span-4 flex flex-col xl:flex-row items-center gap-14 mt-6'>
        <div className='w-full xl:w-2/3'>
          <CardCharts />
        </div>
        <div className='w-full xl:w-auto'>
          <PieChart local="inmobiliaria" anio={2025} />
        </div>
      </div>
    </div>
  );
};
