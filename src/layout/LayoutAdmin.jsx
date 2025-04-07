import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const LayoutAdmin = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-6 bg-secondary-900 text-white'>
      <Sidebar/>
      <div className='xl:col-span-5'>
      <Header/>
      <div className='h-[90vh] overflow-y-scroll overflow-x-hidden scrollbar-none  p-8'>
      <Outlet/>
      </div>
      </div>
      </div>
  )
}
