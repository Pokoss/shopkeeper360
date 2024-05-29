import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import VideoListCard from '@/Layouts/components/VideoListCard';
import { Link } from '@inertiajs/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import React from 'react'

var mapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function UserHomeScreen({ businesses, products, business }) {

    console.log(products)
    return (
        <div>
            <Navbar />
            <section className="flex flex-col lg:flex-row lg:space-x-5 justify-center items-center bg-gray-100 p-2 lg:p-10">
                <div className='w-full  lg:w-4/6'>
                    <Splide options={{
                        rewind: true,
                        autoplay: true,
                    }}>
                        {
                            business && business.map((soon => (
                                <SplideSlide >
                                    <Link className='items-center w-full' href={`/business/${soon.slug}`}>
                                        <div className='flex flex-col items-center justify-center h-full lg:flex-row hover:bg-gray-300'>
                                            <img className="h-96 w-full object-cover bg-white lg:w-3/6 mr-4  sm:h-90" src={`/${soon.logo}`} alt="" />
                                            <div className="w-full justify-start lg:w-3/6 lg:flex-1 space-y-4 mt-2 sm:text-center  text-left">
                                                <h1 className="text-2xl lg:text-3xl font-bold text-primary hover:underline text-left">
                                                    {soon.name}
                                                </h1>
                                                <p className="w-full max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left">
                                                    {soon.location}
                                                </p>
                                                {/* <p className="w-full font-thin text-sm max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left">
                                                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                                    </p> */}
                                                <div className="block text-primary rounded-md hover:underline text-left">
                                                    View this business
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SplideSlide>

                            )))
                        }
                    </Splide>
                </div>
                <div className='hidden md:block w-full lg:w-2/6 text-gray-200'>
                    <h1 className='font-semibold text-lg text-primary'>RECENTLY ADDED ITEMS</h1>
                    {
                        products && products.map((recent => (
                            <Link href={`/product/${recent.slug}`}>
                                <VideoListCard image={'/' + recent.image} price={recent.product.retail_price} title={recent.product.name} time={'By ' + recent.company.name} />
                            </Link>
                        )))
                    }

                    {/* <Link href='/ssgtv' className='flex space-x-2 items-center font-semibold text-base text-primary float-right hover:underline'>
                            <span>See More Recently added Events</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-pulse">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </Link> */}
                </div>

            </section>

            <div className='w-full fill'>

                <div className='container mx-auto flex flex-wrap  max-w-full'>
                    <main className="m-2 w-full md:w-4/5 flex flex-col items-center">
                        <div className='flex w-full justify-center'>
                            <p className='text-lg text-primary font-semibold'>Businesses</p>
                        </div>
                        <div className="w-full mt-3 grid grid-cols-1 gap-y-3 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
                            {
                                businesses.data && businesses.data.map(m => (
                                    <Link href={`/business/${m.slug}`}>
                                        <div className='cursor-pointer w-full'
                                        >

                                            <img
                                                src={`/${m.logo}`}
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
                                                        {m.name}
                                                    </p>
                                                </div>


                                                <div className='flex justify-start align-middle'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>

                                                    <p className="ml-2 text-gray-700 text-xs mb-2 font-light">
                                                        {m.location}
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

                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserHomeScreen