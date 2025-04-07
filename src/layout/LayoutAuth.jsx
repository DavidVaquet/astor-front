import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutAuth = () => {
  return (
    <div className='min-h-screen flex bg-secondary-900 p-4 items-center justify-center'>





       <Outlet/>
       </div>
  )
}
