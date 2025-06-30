import { useState, useEffect, useCallback } from 'react';
import { cargarResumenBalances } from '../../controllers/transaccionController';
import CardTicket from '../../components/CardTicket';
import CardCharts from '../../components/CardCharts';
import PieChart from '../../components/PieChart';
import { formatearPesos } from '../../helpers/formatearPesos';
import { useBroadcastChannel } from '../../helpers/useBroadcastChannelHelper';

export const Home = () => {
  
  const [resumen, setResumen] = useState({});
  const [error, setError] = useState('');
  const cargarDatos = useCallback(() => cargarResumenBalances(setResumen, setError), [cargarResumenBalances, setResumen, setError]);

  useBroadcastChannel((local) => {
    if (['astorFray', 'astorGalindez', 'astorInmobiliaria'].includes(local)) {
      cargarDatos();
    }
  });

  useEffect(() => {
    cargarDatos(); 
  }, [cargarDatos]);


  return (
    <div>
      <div className='flex items-center mb-5'>
        <h1 className='text-3xl text-primary text-center uppercase font-bold'>Estadísticas Generales Astor</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
        <CardTicket
          ticket='ingreso'
          totalTickets={formatearPesos(resumen?.general?.ingreso)}
          text='Balance positivo'
          informacion='Ver comprobantes Astor Fray'
          link='/home/Listado-Fray'
        />
        <CardTicket
          ticket='pendiente'
          totalTickets='0'
          text='Balance pendiente'
          // informacion='Listar comprobantes Galindez'
        />
        <CardTicket
          ticket='egreso'
          totalTickets={formatearPesos(resumen?.general?.egreso)}
          text='Balance negativo'
          informacion='Ver comprobantes Galindez'
          link='/home/Listado-Galindez'
        />
        <CardTicket
          ticket='total'
          totalTickets={formatearPesos(resumen?.general?.balance)}
          text='Balance total'
          informacion='Ver comprobantes Inmobiliaria'
          link='/home/Listado-Inmobiliaria'
        />
      </div>

      <div className='col-span-1 xl:col-span-4 flex flex-col xl:flex-row items-center gap-14 mt-6'>
        <div className='w-full xl:w-2/3'>
          <CardCharts />
        </div>
        <div className='w-full xl:w-auto'>
          <PieChart />
        </div>
      </div>
    </div>
  );
};
