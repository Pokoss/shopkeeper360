import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from '@inertiajs/react';

function WholeSaleHomeScreen() {
  return (
    <div className='font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
      <Navbar />

      <section className="flex flex-col lg:flex-row lg:space-x-5 justify-center items-center bg-gray-100 p-2 lg:p-2">
        <div className='w-full  lg:w-4/6'>



          <Splide options={
            {
              rewind: true,
              autoplay: true
            }
          }>
            <SplideSlide>
              <Link className='items-center w-full' href={`/business`}>
                <div className='flex flex-col items-center justify-center h-full lg:flex-row hover:bg-gray-300'>
                  <img className="h-96 w-full object-cover bg-white lg:w-3/6 mr-4  sm:h-90" src={`/${'images/products/beans-20240525185827243-nb0gcykherbtid7n.png'}`} alt="" />
                  <div className="w-full justify-start lg:w-3/6 lg:flex-1 space-y-4 mt-2 sm:text-center  text-left">
                    <h1 className="text-2xl lg:text-3xl font-bold text-primary hover:underline text-left">
                      Beef Burger
                    </h1>
                    <p className="w-full max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left">
                      Located at
                    </p>
                    <p className="w-full max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left">
                      0706234062
                    </p>
                    {/* <p className="w-full font-thin text-sm max-w-xl text-md leading-relaxed text-gray-800 lg:ml-0 text-left">
                                                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                                    </p> */}
                    <div className="block text-primary rounded-md hover:underline text-left">
                      View this product
                    </div>
                  </div>
                </div>
              </Link>
            </SplideSlide>
            <SplideSlide>
              oi1
            </SplideSlide>
          </Splide>
        </div>
        <div className='hidden md:block w-full lg:w-2/6 text-gray-200'>
          <h1 className='font-semibold text-lg text-primary'>RECENTLY WHOLESALE ITEMS</h1>
          {/* {
                        products && products.map((recent => (
                            <Link href={`/product/${recent.slug}`}>
                                <VideoListCard image={'/' + recent.image} price={recent.product.retail_price} title={recent.product.name} time={'By ' + recent.company.name} />
                            </Link>
                        )))
                    } */}
          oioi

          {/* <Link href='/ssgtv' className='flex space-x-2 items-center font-semibold text-base text-primary float-right hover:underline'>
                            <span>See More Recently added Events</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-pulse">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </Link> */}
        </div>
      </section>

      <div className='w-full fill'>


        <div className='mt-3 container mx-auto flex flex-wrap  max-w-full'>
          <main className="p-2 w-full md:w-4/5 flex flex-col items-center">
            oi
          </main>

          <aside className='p-2 w-full md:w-1/5 flex flex-col items-center'>
            oi
          </aside>
        </div>
      </div>



      <Footer />
    </div>
  )
}

export default WholeSaleHomeScreen