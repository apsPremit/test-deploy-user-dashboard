"use client"
import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
const DashboardHeader = () => {
    const { isSidebarOpen, setSidebarOpen } = useContext(StateContext)
    const newOrderHandler = () => {
        window.location.reload()
        window.location.href = "/dashboard/new_order";
    }

    return (
        <div className='flex justify-between items-center py-5 '>
            <div className='flex items-center'>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className='text-xl mr-3 lg:hidden'> <RxHamburgerMenu /></button>
                <h2 className='text-2xl font-bold'>New Order</h2>
            </div>
            <button onClick={newOrderHandler} className='text-white bg-main px-3 py-2 rounded-lg'>Create new Order</button>
        </div>
    );
};

export default DashboardHeader;