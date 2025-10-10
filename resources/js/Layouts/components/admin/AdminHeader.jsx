import React from 'react'
import { Link } from '@inertiajs/react'

function AdminHeader({sidebarOpen, setSidebarOpen, auth}) {
    return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-purple-600 to-indigo-700 border-b border-purple-500">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex items-center">
          
            {/* Hamburger button */}
            <button
              className="text-purple-200 hover:text-white lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
           
            <div className='flex items-center ml-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className='text-white font-bold text-lg'>Admin Panel</p>
            </div>
          
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src={'/images/user/user.png'} className="w-8 h-8 rounded-full border-2 border-white"
                width="32" height="32" alt=""
              />
              <span className="ml-2 text-sm font-medium text-white">{auth.user.name}</span>
              <span className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-purple-900 rounded-full font-semibold">
                Admin Level {auth.user.admin}
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
    )
}

export default AdminHeader
