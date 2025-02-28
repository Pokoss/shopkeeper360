import React, { useState } from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import { Link,usePage } from '@inertiajs/react';
function Navbar() {
    
    const [navbar, setNavbar] = useState(false);
    const { auth } = usePage().props;
    console.log(auth);

    return (
        <nav className="font-oswald w-full bg-primary shadow sticky top-0 z-50">
            <div className="justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-4 md:block">
                        <Link className='flex items-center' href="/">
                            <img src='/images/user/shopwhite.png' className='h-10 cursor-pointer' />
                            <p className='ml-2 text-white text-lg font-semibold'>
                                Biashari
                                </p>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="flex flex-col md:flex-row items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-yellow-500">
                                <Link href={'/home'}>
                                    <p>Home</p>
                                </Link>

                            </li>
                            {/* <li className="text-white hover:text-yellow-500">
                                <Link href={'/wholesale'}>
                                    <p>Wholesale</p>
                                </Link>

                            </li> */}
                            <li className="text-white hover:text-yellow-500">
                                <Link href={'/'}>
                                    <p>About</p>
                                </Link>

                            </li>
                            {/* <li className="text-white hover:text-yellow-500">
                                <a href="">Massage</a>
                            </li>
                            <li className="text-white hover:text-yellow-500">
                                <a href="">Locations</a>
                            </li> */}
                            
            
                            <li className="text-white hover:text-yellow-500">
                                <Menu
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>

                                        {/* <Button variant="gradient" color='white'>{name}</Button> */}
                                    </MenuHandler>
                                    <MenuList>
                                        {
                                         <Link href={'/favourite-business'}><MenuItem>Favourite Businesses</MenuItem></Link>
                                                                         
                                        }
                                        {
                                           <Link href={'/company'}><MenuItem>Favourite Products</MenuItem></Link>
                                      

                                        }
                                        
                                        
                                        
                                    </MenuList>

                                </Menu>

                            </li>
                            <li className="text-white hover:text-yellow-500">
                                <Menu
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>

                                        {/* <Button variant="gradient" color='white'>{name}</Button> */}
                                    </MenuHandler>
                                    <MenuList>
                                        {
                                         <Link href={'/company'}><MenuItem>Search Business</MenuItem></Link>
                                                                         
                                        }
                                        {
                                           <Link href={'/products/nearby'}><MenuItem>Search Product</MenuItem></Link>
                                      

                                        }
                                        
                                        
                                        
                                    </MenuList>

                                </Menu>

                            </li>
                            <li className="text-white hover:text-yellow-500">
                                <Menu
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                        <Avatar src='/images/user/user.png' alt="avatar" variant="circular" />
                                        {/* <Button variant="gradient" color='white'>{name}</Button> */}
                                    </MenuHandler>
                                    <MenuList>
                                        {
                                            auth.user?
                                            <Link href={'/company'}><MenuItem>My Businesses</MenuItem></Link>
                                            :
                                            <Link href={'/login'}><MenuItem>Login</MenuItem></Link>                                            
                                        }
                                        {
                                            auth.user?
                                            <Link href={route('logout')} method="post" as="button" className='w-full'><MenuItem>Login Out</MenuItem></Link>
                                            :
                                            <Link href={'/register'}><MenuItem>Create Account</MenuItem></Link>

                                        }
                                        
                                        
                                        
                                    </MenuList>

                                </Menu>

                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar