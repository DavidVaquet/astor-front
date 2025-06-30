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
      <div className="grid grid-cols-2 gap-3 mb-6 md:flex md:items-center md:justify-start">
  {[
    { label: "SUBIR COMPROBANTES", to: "/home/comprobantes-inmobiliaria" },
    { label: "LISTAR COMPROBANTES", to: "/home/listado-inmobiliaria" },
    { label: "HISTORIAL MENSUAL", to: "/home/historial-inmobiliaria" },
    { label: "HISTORIAL SEMANAL", to: "/home/semanal-inmobiliaria" },
  ].map(({ label, to }, i) => (
    <Link
      key={i}
      to={to}
      className="bg-primary text-black font-semibold uppercase text-[11px] md:text-[15px] text-center px-2 py-3 md:px-4 md:py-1 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center h-[40px] md:h-[50px]"
    >
      {label}
    </Link>
  ))}
</div>


      <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
        <CardTicket 
          ticket='ingreso'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.ingreso)}
          text='Balance positivo'
          link='/home/Comprobantes-Inmobiliaria'
          informacion='Agregar nuevo comprobante'
          />
        <CardTicket 
          ticket='pendiente'
          totalTickets='0'
          text='Balance pendiente'
          link='/home/Comprobantes-Inmobiliaria'
          informacion='Agregar nuevo comprobante'
          />
        <CardTicket 
          ticket='egreso'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.egreso)}
          text='Balance negativo'
          link='/home/Comprobantes-Inmobiliaria'
          informacion='Agregar nuevo comprobante'
          />
        <CardTicket 
          ticket='total'
          totalTickets={formatearPesos(resumen?.inmobiliaria?.balance)}
          text='Balance total'
          link='/home/Comprobantes-Inmobiliaria'
          informacion='Agregar nuevo comprobante'
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
