import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function UserNearProductScreen({ products }) {
  console.log(products)

  const [location, setLocation] = useState({ latitude: null, longtitude: null });
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          //   fetchBusinesses(latitude, longitude);
        },
        handleError
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error('Geolocation is not supported by this browser.')
    }
  }, []);


  const searchProduct = (event) => {
    event.preventDefault();
    toast.loading();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchProducts(latitude, longitude, search);
        },
        handleError
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error('Geolocation is not supported by this browser.')
    }

    router.post('/home', { latitude, longitude });
  };
  const fetchProducts = (latitude, longitude, search) => {
    router.get('/products/nearby', { latitude, longitude, search }, {
      onSuccess: () => {
        toast.dismiss();
      }
    });
  };

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.dismiss()
        setError("User denied the request for Geolocation.");
        toast.error("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        toast.dismiss()
        setError("Location information is unavailable.");
        toast.error("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        toast.dismiss()
        setError("The request to get user location timed out.");
        toast.error("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        toast.dismiss()
        setError("An unknown error occurred.");
        toast.error("An unknown error occurred.")
        break;
      default:
        toast.dismiss()
        setError("An error occurred.");
        toast.error('An error occurred')
    }
  };
  return (
    <div className='font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
      <div>
        <Navbar />
        <div>
          <div className='container mx-auto flex flex-wrap  max-w-full'>
            <main className="p-2 w-full md:w-4/5 flex flex-col items-center">
              <div className='flex w-full justify-center '>
                <p className='text-lg text-primary font-bold'>What are you looking for?</p>
              </div>

              <form
                onSubmit={searchProduct}
                className='mt-5'>
                <div className='flex rounded-md mx-5'>
                  <input
                    className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="articleTitle"
                    type="text"
                    placeholder={`Search ${'products'} nearby`}
                    value={search ?? ''}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <button type='submit' className='bg-primary px-4 rounded-r-md shadow text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3">
                {/* {
                            category&&category.map(m => (
                                <div className='rounded-xl bg-primary p-5'>
                                    <p className='text-white font-semibold text-center'>{m.name}</p>
                                </div>
                            ))


                        } */}
              </div>

              <div className="font-oswald w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3">
                {
                  products.data && products.data.map(product => (
                    <Link className='shadow-sm shadow-gray-400' href={`/product/${product.slug}`}>
                      <div className='cursor-pointer w-full'
                      >

                        <img
                          src={`/${product.image}`}
                          className="object-cover w-full h-64 sm:h-90"
                          alt=""
                        />
                        <div className="p-4" >


                          <div className='justify-between'>
                            <p
                              className="inline-block line-clamp-2 mb-2 text-lg font-medium leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                              {product.product.name}
                            </p>
                          </div>


                          <div className='flex justify-start align-middle'>
                            <p className="font-oswald text-red-700 texts mb-1 font-semibold line-clamp-1">
                              {`UGX ${Intl.NumberFormat('en-US').format(product.product.retail_price)}`}
                            </p>


                          </div>
                          <div className='flex justify-start align-middle'>


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <p className="ml-2 text-gray-600 text-xs mb-2 font-light">


                              {product.distance != null ? `${Intl.NumberFormat('en-US').format((product.distance / 1000).toFixed(1))} km away at ${product.business_name}` : 'Distance not available'}{ }
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
        </div>
          <ToastContainer />
        <Footer />
      </div>
    </div>
  )
}

export default UserNearProductScreen