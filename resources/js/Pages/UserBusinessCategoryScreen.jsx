import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import React,{useState,useEffect} from 'react'

function UserBusinessCategoryScreen({businesses,category}) {
    const [location, setLocation] = useState({ latitude: '', longtitude: '' });
    const [error, setError] = useState('');
    const [business,setBusiness] = useState([])
    const [data,setData] = useState({})
    console.log(business)

    useEffect(() => {
        requestLocation();
        // fetchBusinesses(location.latitude,location.longtitude);
        // setBusiness(businesses)
    }, []);
    

    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    fetchBusinesses(latitude, longitude);
                },
                handleError
            );
        } else {
            fetchBusinesses(location.latitude, location.longtitude);
            setError("Geolocation is not supported by this browser.");
        }
    }

    const fetchBusinesses = async (latitude, longitude) => {

        // axios.post('/business/category/'+category.slug?'lat')
        const response = await axios.post(`/business/category/${category.slug}?latitude=${latitude}&longitude=${longitude}`);
        const businesesss = response.data.businesses.data;
        const dataa = response.data;
        setData(dataa)
        setBusiness(businesesss);
        console.log( dataa);
        // if (response.data.bussinesses.data && response.data.bussinesses.data) {
        // }
        // else {
        //     console.error('unexpected')
        //     setBusiness([]);
        // }
    };

    const handleRetry = () => {
        setError('');
        setLocationPromptVisible(false);
        requestLocation();
    };




    const handleError = (error) => {
        fetchBusinesses(location.latitude,location.longtitude)
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                console.log(1)
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                console.log(2)
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                console.log(3)
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                console.log(4)
                break;
            default:
                setError("An error occurred.");
                console.log(5)
        }
    };

    if(!business){
        return (
            <>ioioi</>
        )
    }

  return (
    <div className='font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
        <Navbar/>
        <div>
        <div className='container mx-auto flex flex-wrap  max-w-full'>
                <main className="p-2 w-full md:w-4/5 flex flex-col items-center">
                <div className='flex w-full justify-center '>
                        <p className='text-lg text-primary font-bold'>{category.name}</p>
                    </div>

                    <form className='mt-5'>
                        <div className='flex rounded-md mx-5'>
                            <input
                                className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="articleTitle"
                                type="text"
                                placeholder={`Find ${category.name} here`}                            //   value={data.search_text ?? ''}
                            //   onChange={(event) => setData('search_text', event.target.value)}
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
                    
                    <div className="w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3">
                    {
                            business && business.map(business => (
                                <Link className='shadow-sm shadow-gray-400' href={`/business/${business.slug}`}>
                                                    <div className='cursor-pointer w-full'
                                                    >

                                                        <img
                                                            src={`/${business.logo}`}
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
                                                                    {business.name}
                                                                </p>
                                                            </div>


                                                            <div className='flex justify-start align-middle'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                                </svg>

                                                                <p className="ml-2 text-gray-700 text-xs mb-2 font-light">
                                                                    {business.location}
                                                                </p>

                                                            </div>
                                                            <div className='flex justify-start align-middle'>
                                                                

                                                                <p className="ml-2 text-red-700 text-xs mb-2 font-light">
                                                                    
                                                                    {business.distance!=null ? `${Intl.NumberFormat('en-US').format((business.distance/1000).toFixed(1))} km away` : 'Distance not available'}
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
        <Footer/>
    </div>
  )
}

export default UserBusinessCategoryScreen