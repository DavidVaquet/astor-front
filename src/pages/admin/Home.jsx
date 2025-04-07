import { manejarTotalGeneral } from '../../controllers/transaccionController';
import { useState, useEffect } from 'react';
import CardTicket from '../../components/CardTicket';
import CardCharts from '../../components/CardCharts';
import PieChart from '../../components/PieChart';
import { formatearPesos } from '../../helpers/formatearPesos';

export const Home = () => {

  const [totales, setTotales] = useState({
    ingreso: 0,
    egreso: 0,
    balance: 0
  });

  const [error, setError] = useState('');

  useEffect(() => {
    manejarTotalGeneral({
      setTotales,
      setError
    })
  }, [setTotales, setError]);
  
  return (
    <div>
      <div className='flex items-center mb-5'>
          <h1 className='text-3xl text-primary text-center uppercase'>Estadisticas Generales Astor</h1>
        </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
      {/* Card */}
      
      <CardTicket 
      ticket='ingreso'
      totalTickets={formatearPesos(totales.ingreso)}
      text='Balance positivo'/>
      <CardTicket 
      ticket='pendiente'
      totalTickets='0'
      text='Balance pendiente'/>
      <CardTicket 
      ticket='egreso'
      totalTickets={formatearPesos(totales.egreso)}
      text='Balance negativo'/>
      
      <CardTicket 
      ticket='total'
      totalTickets={formatearPesos(totales.balance)}
      text='Balance total'/>
      
    
      
      
      <div className='col-span-1 xl:col-span-4 flex flex-col xl:flex-row items-center gap-14 mt-6'>
        <div className='w-full xl:w-2/3'>
          <CardCharts/>
            </div>
              <div className='w-full xl:w-auto'>
                <PieChart/>
                </div>
                  </div>

      </div>

                    
    </div>
  )
}
