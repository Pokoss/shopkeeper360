import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import VideoListCard from '@/Layouts/components/VideoListCard';
import { Link, router } from '@inertiajs/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import React, { useState, useEffect } from 'react'

var mapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function UserHomeScreen() {

    const [products, setProducts] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [business, setBusiness] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageErrors, setImageErrors] = useState({});

    const [location, setLocation] = useState({ latitude: null, longtitude: null });
    const [error, setError] = useState('');

    const handleImageError = (id) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        requestLocation();
        // fetchBusinesses(location.latitude,location.longtitude);
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
            fetchBusinesses(latitude, longitude);
            setError("Geolocation is not supported by this browser.");
        }
    }

    const fetchBusinesses = async (latitude, longitude) => {
        // router.post('/home', { latitude, longitude });

        const response = await axios.post(`/home?latitude=${latitude}&longitude=${longitude}`);
        const data = response.data

        setBusiness(data.business);
        setCategories(data.categories)
        setProducts(data.products)
        setBusinesses(data.businesses)
        // console.log(business)
        // const dataa = response.data;
    };

    const handleRetry = () => {
        setError('');
        setLocationPromptVisible(false);
        requestLocation();
    };




    const handleError = (error) => {
        fetchBusinesses(location.latitude, location.longtitude)
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

    // if (!loading) {
    //     return (
    //         <div>
    //             Loading!!!
    //         </div>
    //     )
    // }


    // console.log(products)


    return (
        <div className='font-oswald min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-green-50'>
            <Navbar />
            
            {/* Hero Section with Featured Businesses */}
            <section className="relative px-4 py-8 lg:px-8 lg:py-12">
                <div className="max-w-7xl mx-auto">
                    <div className='flex flex-col lg:flex-row gap-6'>
                        {/* Main Carousel */}
                        <div className='w-full lg:w-2/3'>
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <Splide options={{
                                    rewind: true,
                                    autoplay: true,
                                    interval: 5000,
                                    pauseOnHover: true,
                                }}>
                                    {business && business.length == 0 ? (
                                        <SplideSlide>
                                            <div className='w-full h-96 flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-300 mb-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                                </svg>
                                                <p className='text-gray-400 text-lg'>No featured businesses available</p>
                                            </div>
                                        </SplideSlide>
                                    ) : (
                                        business && business.map((soon, index) => (
                                            <SplideSlide key={index}>
                                                <Link href={`/business/${soon.slug}`}>
                                                    <div className='relative group'>
                                                        <div className='flex flex-col lg:flex-row'>
                                                            <div className="relative w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                                                {imageErrors[`featured-${index}`] ? (
                                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-primary/40 mb-3">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                                                        </svg>
                                                                        <p className="text-gray-400 text-sm font-medium">{soon.name}</p>
                                                                    </div>
                                                                ) : (
                                                                    <img 
                                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                                                        src={`/${soon.logo}`} 
                                                                        alt={soon.name}
                                                                        onError={() => handleImageError(`featured-${index}`)}
                                                                    />
                                                                )}
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                            </div>
                                                            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                                                                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 w-fit">
                                                                    Featured Business
                                                                </div>
                                                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                                                                    {soon.name}
                                                                </h1>
                                                                <div className="space-y-3 mb-6">
                                                                    <div className="flex items-start gap-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary flex-shrink-0 mt-1">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                                        </svg>
                                                                        <p className="text-gray-600 leading-relaxed">
                                                                            {soon.location}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-start gap-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary flex-shrink-0 mt-1">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                                        </svg>
                                                                        <p className="text-gray-600 leading-relaxed">
                                                                            {soon.contacts}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
                                                                    <span>View Business</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SplideSlide>
                                        ))
                                    )}
                                </Splide>
                            </div>
                        </div>

                        {/* Recently Added Items Sidebar */}
                        <div className='w-full lg:w-1/3'>
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                                <div className="bg-gradient-to-r from-primary to-secondary p-6">
                                    <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                        </svg>
                                        Recently Added
                                    </h2>
                                </div>
                                <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                                    {products && products.length == 0 ? (
                                        <div className='flex flex-col justify-center items-center py-16 px-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-300 mb-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            <p className='text-gray-400 text-center'>No products available yet</p>
                                        </div>
                                    ) : (
                                        products && products.map((recent, index) => (
                                            <Link key={index} href={`/product/${recent.slug}`}>
                                                <VideoListCard 
                                                    image={'/' + recent.image} 
                                                    price={recent.product.retail_price} 
                                                    title={recent.product.name} 
                                                    time={'By ' + recent.company.name} 
                                                />
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions Section */}
            <section className="px-4 py-8 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-3'>
                            How can we help you today?
                        </h2>
                        <p className="text-gray-600">Discover businesses and products near you</p>
                    </div>
                    
                    <div className='flex flex-col sm:flex-row justify-center gap-4 mb-12'>
                        <Link>
                            <div className='group relative bg-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1'>
                                <div className="bg-primary/10 group-hover:bg-white/20 p-4 rounded-xl transition-colors duration-300">
                                    <img className='w-8 h-8 group-hover:scale-110 transition-transform duration-300' src='/images/access/search-business.png' alt="Search Business" />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>Search Business</p>
                                    <p className='text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300'>Find local businesses</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>

                        <Link href='/products/nearby'>
                            <div className='group relative bg-white hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/90 p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 transform hover:-translate-y-1'>
                                <div className="bg-secondary/10 group-hover:bg-white/20 p-4 rounded-xl transition-colors duration-300">
                                    <img className='w-8 h-8 group-hover:scale-110 transition-transform duration-300' src='/images/access/search-product.png' alt="Search Product" />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>Search Product</p>
                                    <p className='text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300'>Browse available products</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="px-4 py-8 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <main className="w-full">
                        {categories && categories.map((category, catIndex) => (
                            <div key={catIndex} className='mb-16'>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-10 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                                        <h2 className='text-3xl font-bold text-gray-800'>
                                            {category.name} <span className="text-primary">nearby</span>
                                        </h2>
                                    </div>
                                </div>

                                {category.businesses && category.businesses.length === 0 ? (
                                    <div className='w-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-16 flex flex-col items-center justify-center shadow-inner'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-300 mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                        </svg>
                                        <p className='text-gray-400 text-lg font-medium'>No nearby {category.name} found</p>
                                        <p className='text-gray-400 text-sm mt-2'>Check back later for new businesses</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {category.businesses && category.businesses.map((business, busIndex) => (
                                                <Link key={busIndex} href={`/business/${business.slug}`}>
                                                    <div className='group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2'>
                                                        <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                                                            {imageErrors[`business-${catIndex}-${busIndex}`] ? (
                                                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-primary/40 mb-2">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                                                    </svg>
                                                                    <p className="text-gray-400 text-xs font-medium text-center px-3 line-clamp-2">{business.name}</p>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={`/${business.logo}`}
                                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                                    alt={business.name}
                                                                    onError={() => handleImageError(`business-${catIndex}-${busIndex}`)}
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            <div className="absolute top-3 right-3">
                                                                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                                                    <p className="text-xs font-semibold text-primary">
                                                                        {business.distance != null ? `${Intl.NumberFormat('en-US').format((business.distance / 1000).toFixed(1))} km` : 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="p-5">
                                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                                                                {business.name}
                                                            </h3>

                                                            <div className='flex items-start gap-2 mb-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                                </svg>
                                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                                    {business.location}
                                                                </p>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                                                <span className="text-sm text-gray-500">View Details</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        
                                        <div className="flex justify-center mt-8">
                                            <Link href={'/business/category/' + category.slug}>
                                                <button className='group bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-secondary px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3'>
                                                    <span>More {category.name} nearby</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </main>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default UserHomeScreen