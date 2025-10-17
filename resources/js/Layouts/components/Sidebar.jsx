import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';

function Sidebar({ sidebarOpen, setSidebarOpen, props }) {
  const [openMenu, setOpenMenu] = useState(null);
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Toggle accordion menu
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  // Feature Access Logic
  
  // Core features available to everyone regardless of plan
  const coreFeatures = ['dashboard', 'receipts'];
  
  // Category-specific features (always available if category matches)
  const retailFeatures = ['pos', 'inventory'];
  const serviceFeatures = ['service-panel', 'service-tracking'];
  const hotelFeatures = ['rooms', 'bookings'];

  // Category-based feature matrix (what features each category TYPE can access)
  const categoryFeatureMatrix = {
    'retail-store': [...retailFeatures],
    'supermarket': [...retailFeatures],
    'pharmacy': [...retailFeatures],
    'agricultural-equipment': [...retailFeatures],
    'saloon-spa': [...serviceFeatures],
    'professional-services': [...serviceFeatures],
    'restaurant': [...retailFeatures, ...serviceFeatures],
    'accommodation': [...serviceFeatures, ...hotelFeatures],
    'hotel': [...retailFeatures, ...serviceFeatures, ...hotelFeatures],
  };

  // Plan-based restrictions (what additional features each plan unlocks)
  const planFeatures = {
    basic: [], // Only core features + category features
    standard: ['hr', 'accounting'], // Adds HR and Accounting
    premium: ['hr', 'accounting', 'online-portal', 'analytics', 'business-account'], // Full suite
  };

  const getAccessibleFeatures = (categorySlug, plan) => {
    // Start with core features (always available)
    const features = [...coreFeatures];
    
    // Add category-specific features
    const categoryFeatures = categoryFeatureMatrix[categorySlug] || [];
    features.push(...categoryFeatures);
    
    // Add plan-based features
    const planBasedFeatures = planFeatures[plan?.toLowerCase()] || planFeatures.basic;
    features.push(...planBasedFeatures);
    
    return [...new Set(features)]; // Remove duplicates
  };

  // Get category slug from the category relationship
  const categorySlug = props?.company?.category?.slug;
  const plan = props?.company?.plan || 'basic';
  
  // Debug logging
  console.log('🔍 Sidebar Debug:', {
    categorySlug,
    plan,
    categoryId: props?.company?.category_id,
    category: props?.company?.category,
    companyName: props?.company?.name
  });
  
  const accessibleFeatures = getAccessibleFeatures(categorySlug, plan);
  
  console.log('✅ Accessible Features:', accessibleFeatures);

  const hasAccess = (feature) => accessibleFeatures.includes(feature);
  
  const canAccessByPosition = (allowedPositions) => {
    return allowedPositions.includes(props.position);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, [sidebarOpen]);

  return (
    <div className="lg:w-64">
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`fixed z-40 left-0 top-0 h-screen w-64 flex-shrink-0 transform bg-gradient-to-b from-gray-800 to-black text-white shadow-xl overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:top-auto lg:left-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={props.company.logo !== '' ? '/' + props.company.logo : '/images/user/user.png'}
              alt="Logo"
              className="w-10 h-10 rounded-full shadow-md"
            />
            <span className="text-lg font-bold">{props.company.name}</span>
          </Link>

          {/* Close Button (Mobile Only) */}
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">

            {/* Dashboard */}
            <li>
              <Link
                href={`/dashboard/${props.company.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg> */}
                Dashboard
              </Link>
            </li>

            {/* POS */}
            {canAccessByPosition(['owner', 'dispenser', 'admin']) && hasAccess('pos') && (
              <li>
                <Link
                  href={`/dashboard/${props.company.slug}/pos`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621a3 3 0 01-.879-2.122V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25z" />
                  </svg>
                  Point of Sale
                </Link>
              </li>
            )}

                        {/* Service Panel */}
            {canAccessByPosition(['owner', 'dispenser', 'admin']) && hasAccess('service-panel') && (
              <li>
                <Link
                  href={`/dashboard/${props.company.slug}/service/panel`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621a3 3 0 01-.879-2.122V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 03 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 03 12V5.25z" />
                  </svg>
                  Service Panel
                </Link>
              </li>
            )}
            {/* Receipts */}
            {canAccessByPosition(['owner', 'dispenser', 'admin']) && hasAccess('receipts') && (
              <li>
                <Link
                  href={`/dashboard/${props.company.slug}/accounting/receipts`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                  Receipts
                </Link>
              </li>
            )}
            {/* Inventory */}
            {canAccessByPosition(['owner', 'admin']) && hasAccess('inventory') && (
              <li className="transition-all duration-200 ">
                <button
                  onClick={() => toggleMenu(1)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    Inventory
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
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/inventory/supplier`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Supplier
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/inventory/product`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/inventory/stock`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Stock
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            {/* Service */}
            {canAccessByPosition(['owner', 'admin']) && hasAccess('service-tracking') && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(6)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                    Service Tracking
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 6 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 6 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/inventory/services`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Services List
                      </Link>
                    </li>
                    
                  </ul>
                )}
              </li>
            )}

            {/* Human Resource */}
            {canAccessByPosition(['owner', 'admin', 'hr']) && hasAccess('hr') && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(2)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0Zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0Z" />
                    </svg>
                    Human Resource
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
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/hr/employee`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Employees
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Accounting */}
            {canAccessByPosition(['owner', 'admin', 'accountant']) && hasAccess('accounting') && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(3)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                    Accounting
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
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/sales`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Sales
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/accounting/expenses`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Expenses
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Online Portal */}
            {canAccessByPosition(['owner', 'admin', 'dispenser']) && hasAccess('online-portal') && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(4)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0Z" />
                    </svg>
                    Online Portal
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 4 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 4 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/online-portal/category`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/online-portal/product`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/online-portal/orders`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Orders
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Room Management */}
            {canAccessByPosition(['owner', 'admin']) && (hasAccess('rooms') || hasAccess('bookings')) && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(7)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    Room Management
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 7 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 7 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/rooms`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Rooms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/rooms/bookings`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Bookings
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Analytics */}
            {canAccessByPosition(['owner', 'admin']) && hasAccess('analytics') && (
              <li>
                <Link
                  href={`/dashboard/${props.company.slug}/analytics`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                  Analytics
                </Link>
              </li>
            )}

            {/* Business Account */}
            {canAccessByPosition(['owner', 'admin', 'accountant']) && hasAccess('business-account') && (
              <li className="transition-all duration-200">
                <button
                  onClick={() => toggleMenu(5)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    Business Account
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${openMenu === 5 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === 5 && (
                  <ul className="ml-4 mt-1 space-y-1 bg-gray-800">
                    <li>
                      <Link
                        href={`/dashboard/${props.company.slug}/business-account/profile`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary rounded-md"
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;