import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

function AdminSidebar({ sidebarOpen, setSidebarOpen, auth }) {
  const [openMenu, setOpenMenu] = useState(null);
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Toggle accordion menu
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="admin-sidebar"
        ref={sidebar}
        className={`fixed z-40 left-0 top-0 h-screen w-64 flex-shrink-0 transform bg-gradient-to-b from-purple-900 via-indigo-900 to-gray-900 text-white shadow-xl overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:top-auto lg:left-auto`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-purple-700">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-lg font-bold">Admin Center</span>
          </div>

          {/* Close button for mobile */}
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-purple-300 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">

            {/* Dashboard */}
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
            </li>

            {/* Users Management */}
            {auth.user.admin >= 1 && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(1)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Users Management
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 1 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 1 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-900 rounded-md">
                    <li>
                      <Link
                        href="/admin/users"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        All Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/users/admins"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        Admin Users
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Companies Management */}
            {auth.user.admin >= 1 && (
              <li className="transition-all duration-200">
                <Link
                  href="/admin/companies"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Companies
                </Link>
              </li>
            )}

            {/* System Configuration */}
            {auth.user.admin >= 1 && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(2)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    System Configuration
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 2 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 2 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-900 rounded-md">
                    <li>
                      <Link
                        href="/admin/business-categories"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        Business Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/measurements"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        Measurements
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* System Settings - Level 2+ */}
            {auth.user.admin >= 2 && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(3)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    System Settings
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 3 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 3 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-900 rounded-md">
                    <li>
                      <Link
                        href="/admin/settings/general"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        General Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/settings/security"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 rounded-md"
                      >
                        Security
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Analytics & Reports */}
            {auth.user.admin >= 1 && (
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics & Reports
                </Link>
              </li>
            )}

            {/* Activity Logs - Level 2+ */}
            {auth.user.admin >= 2 && (
              <li>
                <Link
                  href="/admin/activity-logs"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Activity Logs
                </Link>
              </li>
            )}

            {/* Divider */}
            <li className="pt-4">
              <div className="border-t border-purple-700"></div>
            </li>

            {/* Back to Company Dashboard */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-purple-700 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
