import React from 'react'
import { RiMore2Fill, RiAddLine } from "react-icons/ri";
import { FaBalanceScale } from "react-icons/fa";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { Link } from 'react-router-dom';

const CardTicket = (props) => {

const {ticket, totalTickets, text, link, informacion} = props;

let status = '';
let textColor = '';

switch(ticket) {
    case 'ingreso':
        status = 'bg-green-500/10 text-green-500';
        textColor = 'text-green-500';
        break;
        case 'egreso':
            status = 'bg-reed-500/10 text-red-500';
            textColor = 'text-red-500';
            break;
            case 'pendiente':
                status = 'bg-yellow-500/10 text-yellow-500'
                textColor = 'text-yellow-500';
                break;
                case 'total':
                  status = 'bg-purple-500/10 text-purple-500'
                  textColor = 'text-purple-500';
                  break;
                } 

  return (
    <div className='bg-secondary-100 p-4 rounded-2xl'>
      
      <div className='flex items-center justify-between mb-4'>
        <div>
          <FaBalanceScale className={`text-4xl ${status}  p-2 box-content rounded-xl`}/>
        </div>
        {/* <div>
          <Menu
          menuButton={
            <MenuButton className='flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition'>
            <RiMore2Fill/>
            </MenuButton>
          }
          align='center'
          arrowClassName='bg-secondary-100'
          transition
          menuClassName='p-4'
          >
            <MenuItem className='p-0 hover:bg-secondary-900'>
             <Link
             to='/'
             className='rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center p-0 flex-1'
             >
              Diario
             </Link>
            </MenuItem>
            <MenuItem className='p-0 hover:bg-secondary-900'>
             <Link
             to='/'
             className='rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center p-0 flex-1'
             >
              Semanal
             </Link>
            </MenuItem>
            <MenuItem className='p-0 hover:bg-secondary-900'>
             <Link
             to='/'
             className='rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center p-0 flex-1'
             >
              Mensual
             </Link>
            </MenuItem>
            </Menu>
        </div> */}
          
      </div>
      <div className='py-2'>
        <div>
        <h1 className='text-4xl text-white font-bold mb-4'>{totalTickets}</h1>
        <p className={textColor}>{text}</p>
        </div>
        <div>
            <hr className='border border-separate border-gray-200/50 my-4' />
            <Link to={link} className='flex items-center gap-2 text-blue-500 font-medium'><RiAddLine/>{informacion}</Link>
        </div>
      </div>
      </div>
  )
}

export default CardTicket
