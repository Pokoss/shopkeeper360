import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link } from '@inertiajs/react';
import React from 'react';


function UserFavouriteBusinessScreen({ businesses}) {
    console.log(businesses)
    return (
        <div className='h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
            <Navbar />
            <div className='container mx-auto flex flex-wrap  max-w-full'>
                <main className="p-2 w-full md:w-4/5 flex flex-col items-center">
                    {/* <div className='flex w-full justify-center '>
                        <p className='text-lg text-primary font-bold'>What are you looking for?</p>
                    </div> */}
                    <form
                        // onSubmit={searchProduct}
                        className='mt-5'>
                        <div className='flex rounded-md mx-5'>
                            <input
                                className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="articleTitle"
                                type="text"
                                placeholder={`Search ${'favourite businesses'}`}
                            // value={search ?? ''}
                            // onChange={(event) => setSearch(event.target.value)}
                            />
                            <button type='submit' className='bg-primary px-4 rounded-r-md shadow text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <div className="w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3">
                        {
                            businesses.data && businesses.data.map((business) => (

                                <Link className='shadow-sm shadow-gray-400' href={`/business/${business.company.slug}`}>
                                    <div className='cursor-pointer w-full'
                                    >
                                        <img
                                            src={`/${business.company.logo}`}
                                            className="object-cover w-full h-64 sm:h-90"
                                            alt=""
                                        />
                                        <div className="p-4 border border-t-0" >
                                            <div className='justify-between'>
                                                <p
                                                    aria-label="Category"
                                                    title="Visit the East"
                                                    className="inline-block mb-3 text-lg font-medium   leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                                                >
                                                    {business.company.name}
                                                </p>
                                            </div>
                                            <div className='flex justify-start align-middle'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>

                                                <p className="ml-2 text-gray-700 text-xs mb-2 font-light">
                                                    {business.company.location}
                                                </p>
                                            </div>
                                            <div className='flex justify-start align-middle'>
                                                <p className="ml-2 text-red-700 text-xs mb-2 font-light">

                                                </p>

                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </main>
                <aside className="p-2 w-full md:w-1/5 flex flex-col items-center">
                    <a className="uppercase mt-5" href="">Promoted</a>
                </aside>
            </div>
            <Footer />
        </div>
    )
}
export default UserFavouriteBusinessScreen