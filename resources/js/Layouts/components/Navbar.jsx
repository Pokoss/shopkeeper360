import React, { useState } from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import { Link, usePage } from '@inertiajs/react';

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const { auth } = usePage().props;

    return (
        <nav className="font-oswald w-full bg-gradient-to-r from-primary via-secondary to-primary shadow-lg backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <div className="px-4 mx-auto lg:max-w-7xl">
                <div className="flex items-center justify-between py-3">
                    {/* Logo */}
                    <Link className='flex items-center group' href="/">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                            <img 
                                src='/images/user/shopwhite.png' 
                                className='h-10 relative z-10 cursor-pointer transform group-hover:scale-105 transition-transform' 
                                alt="Biashari"
                            />
                        </div>
                        <p className='ml-3 text-white text-xl font-bold tracking-wide group-hover:text-yellow-300 transition-colors'>
                            Biashari
                        </p>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link href={'/'}>
                            <div className="px-4 py-2 text-white font-medium hover:bg-white/10 rounded-lg transition-all hover:shadow-lg hover:shadow-white/5">
                                Home
                            </div>
                        </Link>
                        <Link href={'/pricing'}>
                            <div className="px-4 py-2 text-white font-medium hover:bg-white/10 rounded-lg transition-all hover:shadow-lg hover:shadow-white/5">
                                Pricing
                            </div>
                        </Link>

                        {/* Divider */}
                        <div className="h-6 w-px bg-white/20 mx-2"></div>

                        {/* Favorites Menu */}
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all group relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-yellow-300 transition-colors">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                </button>
                            </MenuHandler>
                            <MenuList className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl">
                                <Link href={'/favourite-business'}>
                                    <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Favourite Businesses
                                    </MenuItem>
                                </Link>
                                <Link href={'/company'}>
                                    <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        Favourite Products
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>

                        {/* Search Menu */}
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-yellow-300 transition-colors">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </MenuHandler>
                            <MenuList className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl">
                                <Link href={'/company'}>
                                    <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Business
                                    </MenuItem>
                                </Link>
                                <Link href={'/products/nearby'}>
                                    <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Product
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>

                        {/* User Menu */}
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <button className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all ml-2">
                                    <Avatar 
                                        className='cursor-pointer ring-2 ring-white/30 hover:ring-yellow-300 transition-all' 
                                        src='/images/user/user.png' 
                                        alt="avatar" 
                                        variant="circular" 
                                        size="sm"
                                    />
                                    {auth.user && (
                                        <div className="hidden lg:flex flex-col items-start">
                                            <span className="text-sm font-semibold leading-none">{auth.user.name}</span>
                                            <span className="text-xs text-white/70 leading-none mt-0.5">{auth.user.email}</span>
                                        </div>
                                    )}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </MenuHandler>
                            <MenuList className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl min-w-[240px]">
                                {auth.user && (
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{auth.user.email}</p>
                                        {auth.user.email_verified_at && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs text-green-600 font-medium">Verified</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {auth.user ? (
                                    <>
                                        <Link href={'/company'}>
                                            <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                My Businesses
                                            </MenuItem>
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className='w-full'>
                                            <MenuItem className="flex items-center gap-2 hover:bg-red-50 text-red-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Log Out
                                            </MenuItem>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={'/login'}>
                                            <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                Login
                                            </MenuItem>
                                        </Link>
                                        <Link href={'/register'}>
                                            <MenuItem className="flex items-center gap-2 hover:bg-primary/10">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                </svg>
                                                Create Account
                                            </MenuItem>
                                        </Link>
                                    </>
                                )}
                            </MenuList>
                        </Menu>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {navbar ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {navbar && (
                    <div className="md:hidden pb-4 space-y-2 border-t border-white/10 pt-4">
                        {auth.user && (
                            <div className="px-4 py-3 bg-white/10 rounded-lg mb-3">
                                <p className="text-sm font-semibold text-white">{auth.user.name}</p>
                                <p className="text-xs text-white/70">{auth.user.email}</p>
                                {auth.user.email_verified_at && (
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs text-yellow-300 font-medium">Verified</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <Link href={'/'}>
                            <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Home</div>
                        </Link>
                        <Link href={'/pricing'}>
                            <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Pricing</div>
                        </Link>
                        <Link href={'/favourite-business'}>
                            <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Favourite Businesses</div>
                        </Link>
                        <Link href={'/company'}>
                            <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Search Business</div>
                        </Link>
                        <Link href={'/products/nearby'}>
                            <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Search Product</div>
                        </Link>
                        <div className="border-t border-white/10 my-2"></div>
                        {auth.user ? (
                            <>
                                <Link href={'/company'}>
                                    <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">My Businesses</div>
                                </Link>
                                <Link href={route('logout')} method="post" as="button" className='w-full text-left'>
                                    <div className="block px-4 py-2 text-red-300 hover:bg-white/10 rounded-lg transition-all">Log Out</div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={'/login'}>
                                    <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Login</div>
                                </Link>
                                <Link href={'/register'}>
                                    <div className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all">Create Account</div>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar