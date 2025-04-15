import { useState, useEffect, useContext } from 'react';
import { manejarTotalPorLocal } from '../../controllers/transaccionController';
import { ComprobanteContext } from '../../context/ComprobanteContext';
import { formatearPesos } from '../../helpers/formatearPesos';
import CardTicket from '../../components/CardTicket';
import CardCharts from '../../components/CardCharts';
import PieChart from '../../components/PieChart';
import { Link } from 'react-router-dom';

export const HomeFray = () => {

  const [totales, setTotales] = useState({
    ingreso: 0,
    egreso: 0,
    balance: 0
  });

  const {recargarComprobantes} = useContext(ComprobanteContext);

  const [error, setError] = useState('');

  useEffect(() => {
    manejarTotalPorLocal({
      local: 'astorFray',
      setTotales,
      setError
    })
  }, [recargarComprobantes]);
   

  return (
    <div>
      <div className='flex items-center mb-5 gap-4'>
          
          <div className='bg-yellow-500 text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
          className='text-[14px] md:text-[18px] text-black font-bold uppercase'
          to='/home/Comprobantes-Fray'>
          SUBIR COMPROBANTES
          </Link>
          </div>

          <div className='bg-yellow-500 text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
          className='text-[14px] md:text-[18px] text-black font-bold uppercase'
          to='/home/Listado-Fray'>
          LISTAR COMPROBANTES
          </Link>
          </div>
          <div className='bg-yellow-500 text-center md:text-start px-1 py-1 md:px-3 md:py-2 rounded-lg'>
          <Link
          className='text-[14px] md:text-[18px] text-black font-bold uppercase'
          to='/home/Historial-Fray'>
          HISTORIAL FINANCIERO
          </Link>
          </div>
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
