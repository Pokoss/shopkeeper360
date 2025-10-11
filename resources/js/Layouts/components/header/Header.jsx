import React from 'react'
import UserMenu from './UserMenu';
import { Link } from '@inertiajs/react'

function Header({sidebarOpen, setSidebarOpen,props}) {
    return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
          
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
           
            <p className='text-primary font-bold ml-3'>Biashari</p>
          
          </div>

          {/* Header: Center - Subscription Info */}
          {props?.company && (
            <div className="hidden md:flex items-center gap-4">
              {/* Plan Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Plan</span>
                  <span className={`text-sm font-bold ${
                    props.company.plan === 'premium' ? 'text-purple-900' :
                    props.company.plan === 'standard' ? 'text-purple-700' :
                    'text-purple-600'
                  }`}>
                    {props.company.plan ? props.company.plan.charAt(0).toUpperCase() + props.company.plan.slice(1) : 'Basic'}
                  </span>
                </div>
              </div>

              {/* Subscription Expiry */}
              {props.company.subscription_expiry && (() => {
                const now = new Date();
                const expiryDate = new Date(props.company.subscription_expiry);
                const diffTime = expiryDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                let message = '';
                let colorClass = '';
                let bgGradient = '';
                let borderColor = '';
                let shouldPulse = false;
                
                if (diffDays < 0) {
                  message = 'Expired';
                  colorClass = 'text-red-600';
                  bgGradient = 'from-red-50 to-red-100';
                  borderColor = 'border-red-300';
                  shouldPulse = true;
                } else if (diffDays === 0) {
                  message = 'Expires today! Please renew';
                  colorClass = 'text-red-600';
                  bgGradient = 'from-red-50 to-orange-50';
                  borderColor = 'border-red-300';
                  shouldPulse = true;
                } else if (diffDays === 1) {
                  message = 'Expires tomorrow! Please renew';
                  colorClass = 'text-orange-600';
                  bgGradient = 'from-orange-50 to-yellow-50';
                  borderColor = 'border-orange-300';
                  shouldPulse = true;
                } else if (diffDays <= 7) {
                  message = `${diffDays} days left`;
                  colorClass = 'text-orange-600';
                  bgGradient = 'from-orange-50 to-yellow-50';
                  borderColor = 'border-orange-200';
                  shouldPulse = true;
                } else if (diffDays <= 30) {
                  message = `${diffDays} days left`;
                  colorClass = 'text-yellow-700';
                  bgGradient = 'from-yellow-50 to-green-50';
                  borderColor = 'border-yellow-200';
                } else {
                  message = `${diffDays} days left`;
                  colorClass = 'text-green-600';
                  bgGradient = 'from-green-50 to-emerald-50';
                  borderColor = 'border-green-200';
                }
                
                return (
                  <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${bgGradient} rounded-lg border ${borderColor} ${shouldPulse ? 'animate-pulse' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">Subscription</span>
                      <span className={`text-sm font-bold ${colorClass}`}>
                        {message}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Header: Right side */}
          <div className="flex items-center">
            <UserMenu props={props}/>
          </div>

        </div>
      </div>
    </header>
    )
}

export default Header
