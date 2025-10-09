import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Head, Link, router } from '@inertiajs/react'
import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UserBusinessScreen({ business, category, products: initialProducts, favourite }) {
    const [products, setProducts] = useState(initialProducts.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(initialProducts.next_page_url);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(!!initialProducts.next_page_url);
    const [searchQuery, setSearchQuery] = useState('');
    const [imageErrors, setImageErrors] = useState({});
    const [isFavourite, setIsFavourite] = useState(favourite);
    const observerTarget = useRef(null);

    const handleImageError = (id) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    // Update local state when prop changes
    useEffect(() => {
        setIsFavourite(favourite);
    }, [favourite]);

    const favouriteAction = (event) => {
        event.preventDefault();

        var company_id = business.id;

        try {
            router.post('/favourite-business', { company_id, }, {
                onSuccess: () => {
                    // Toggle the favorite state immediately for UI responsiveness
                    setIsFavourite(prev => prev === 0 ? 1 : 0);
                    
                    toast.success(isFavourite == 0 ? `${business.name} added to favourite` : `${business.name} removed from favourite`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
                onError: (errors) => {
                    toast.error('Failed to update favourite status');
                    console.error(errors);
                }
            })
        }
        catch (error) {
            toast.dismiss()
            toast.error(error.message || 'An error occurred');
        }
    }

    const loadMoreProducts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(nextPageUrl);
            const newProducts = response.data.data;
            
            setProducts(prev => [...prev, ...newProducts]);
            setNextPageUrl(response.data.next_page_url);
            setHasMore(!!response.data.next_page_url);
        } catch (error) {
            console.error('Error loading more products:', error);
            toast.error('Failed to load more products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, nextPageUrl]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality if needed
        console.log('Searching for:', searchQuery);
    }



    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-green-50'>
            <Head title={`${business.name} - Products & Services`} />
            <Navbar />
            
            {/* Hero Business Header */}
            <div className="relative font-oswald w-full overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8">
                            {/* Business Logo Section */}
                            <div className="lg:col-span-3 flex flex-col items-center justify-center">
                                <div className="relative group">
                                    {imageErrors['business-logo'] ? (
                                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-primary/40">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <Avatar 
                                            className='ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300' 
                                            src={`/${business.logo}`} 
                                            alt={business.name}
                                            size="xxl" 
                                            variant="circular"
                                            onError={() => handleImageError('business-logo')}
                                        />
                                    )}
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                                            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Business Info Section */}
                            <div className="lg:col-span-9">
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{business.name}</h1>
                                                {category && category.length > 0 && (
                                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                                        {category[0]?.name || 'Shop'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                                                <div className="bg-primary/20 p-2 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-semibold mb-1">Contact</p>
                                                    <p className="font-bold text-gray-800">{business.contacts}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
                                                <div className="bg-secondary/20 p-2 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-semibold mb-1">Location</p>
                                                    <p className="font-bold text-gray-800">{business.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href={`/businesscart`} className="group relative overflow-hidden bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary hover:to-blue-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex items-center justify-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                                <span>My Cart</span>
                                            </div>
                                        </Link>

                                        <button
                                            onClick={favouriteAction}
                                            className={`group relative overflow-hidden ${isFavourite == 0 ? 'bg-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 border-2 border-red-500 text-red-500 hover:text-white' : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'} px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill={isFavourite == 0 ? "none" : "currentColor"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                <span>{isFavourite == 0 ? 'Add to Favorites' : 'Remove from Favorites'}</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Categories Section */}
                {category && category.length > 0 && (
                    <div className='mb-8'>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                            <h2 className='text-2xl font-bold text-gray-800'>Browse by Category</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {category.map((cat, index) => (
                                <Link key={index} href={`/business/${business.slug}/category/${cat.id}`}>
                                    <div className='group relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1'>
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="bg-primary/10 group-hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                                </svg>
                                            </div>
                                            <p className='text-gray-800 group-hover:text-white font-semibold text-center text-sm transition-colors duration-300'>{cat.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search Bar */}
                <form onSubmit={handleSearch} className='mb-8'>
                    <div className='max-w-2xl mx-auto'>
                        <div className='relative'>
                            <input
                                className="w-full py-4 pl-12 pr-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg"
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <button 
                                type='submit' 
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                {/* Products Section */}
                <div className='mb-8'>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                        <h2 className='text-2xl font-bold text-gray-800'>Products & Services</h2>
                    </div>

                    {products.length === 0 ? (
                        <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-16 flex flex-col items-center justify-center shadow-inner'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-300 mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p className='text-gray-400 text-lg font-medium'>No products available yet</p>
                            <p className='text-gray-400 text-sm mt-2'>Check back later for new items</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {products.map((product, index) => (
                                    <Link key={index} href={`/product/${product.slug}`}>
                                        <div className='group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2'>
                                            <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                                                {imageErrors[`product-${index}`] ? (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-primary/40 mb-2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                        </svg>
                                                        <p className="text-gray-400 text-xs font-medium text-center px-3 line-clamp-2">{product.product.name}</p>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={`/${product.image}`}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                        alt={product.product.name}
                                                        onError={() => handleImageError(`product-${index}`)}
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Quick View Badge */}
                                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="p-4">
                                                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2 min-h-[3rem]">
                                                    {product.product.name}
                                                </h3>

                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
                                                            <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-lg font-bold text-red-600">
                                                            {Intl.NumberFormat('en-US').format(product.product.retail_price)}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-medium">UGX</div>
                                                </div>

                                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                                    <span className="text-xs text-gray-500">View Details</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Infinite Scroll Loading Indicator */}
                            <div ref={observerTarget} className="flex justify-center items-center py-8">
                                {loading && (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="text-gray-600 font-medium">Loading more products...</p>
                                    </div>
                                )}
                                {!hasMore && products.length > 0 && (
                                    <div className="text-center">
                                        <p className="text-gray-400 font-medium">You've reached the end</p>
                                        <p className="text-gray-400 text-sm mt-1">No more products to load</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default UserBusinessScreen