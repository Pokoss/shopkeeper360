import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { router } from '@inertiajs/react'
import { Input, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useState, useEffect, Fragment } from 'react'
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function UserProductDetailsScreen({ product }) {
    const currentUrl = location.href;
    const [contact, setContact] = useState('')
    const [locationDetails, setLocationDetails] = useState('')
    const [copied, setCopied] = useState(false)
    const [number, setNumber] = useState(0);
    const [total, setTotal] = useState(0);
    const [size, setSize] = useState(null);

    const copyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function addNumber() {
        if (number == 1000) {
            toast.error('1000 is the max number');
        } else {
            setNumber(number + 1);
        }
    }

    function subtractNumber() {
        if (number == 0) {
            toast.error('Quantity below 0 is forbidden')
        } else {
            setNumber(number - 1);
        }
    }

    const getTotal = e => {
        e.preventDefault();
        setNumber(e.target.value)
    }

    useEffect(() => {
        const newTotal = number * parseInt(product.product.retail_price)
        setTotal(newTotal)
    }, [number]);

    const handleOpen = (value) => setSize(value);

    const orderProduct = async (event) => {
        event.preventDefault();
        toast.loading('Placing order...');

        var company_id = product.company_id;
        var product_id = product.product_id;
        var cost_price = product.product.cost_price;
        var retail_price = product.product.retail_price;
        var order_total = total;
        var quantity = number;

        if (contact == '') {
            toast.dismiss();
            toast.error('Type the contact for delivery');
            return;
        }
        if (number < 1) {
            toast.dismiss();
            toast.error('First Set the quantity');
            return;
        }
        if (locationDetails == '') {
            toast.dismiss();
            toast.error('Type the location for delivery');
            return;
        }

        router.post('/order-item', { company_id, product_id, cost_price, retail_price, order_total, quantity, location: locationDetails, contact },
            {
                onSuccess: () => {
                    toast.dismiss();
                    handleOpen(null)
                    toast.success('Order Placed Successfully')
                    setContact('');
                    setLocationDetails('');
                    setNumber(0);
                }
            }
        )
    }

    return (
        <div className='font-sans min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50'>
            <Navbar />
            
            <div className='container mx-auto px-4 py-6 max-w-7xl'>
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                    <a href="/" className="hover:text-primary transition-colors hover:underline">Home</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <a href={`/business/${product.company.slug}`} className="hover:text-primary transition-colors hover:underline">{product.company.name}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="text-gray-900 font-medium">{product.product.name}</span>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Product Details - Left Side */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Product Header with Gradient */}
                            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.product.name}</h1>
                                <div className="flex items-center space-x-2 text-white/90">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                    </svg>
                                    <span className="text-lg">Sold by {product.company.name}</span>
                                </div>
                            </div>

                            {/* Product Image and Pricing Grid */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                                {/* Image Section */}
                                <div className="flex flex-col">
                                    <div className='relative w-full bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 group'>
                                        <img 
                                            src={`/${product.image}`} 
                                            alt={product.product.name}
                                            className='w-full h-96 object-contain p-4 group-hover:scale-105 transition-transform duration-300' 
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                        <span className="font-medium">100% Genuine Product</span>
                                    </div>
                                </div>

                                {/* Pricing and Action Section */}
                                <div className="flex flex-col space-y-4">
                                    {/* Price Card */}
                                    <div className='bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5'>
                                        <p className="text-sm text-gray-600 mb-1">Price</p>
                                        <p className="text-4xl font-bold text-red-600">
                                            UGX {Intl.NumberFormat('en-US').format(product.product.retail_price)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className='bg-gray-50 border-2 border-gray-200 rounded-xl p-5'>
                                        <p className="text-sm font-semibold text-gray-700 mb-3">Select Quantity</p>
                                        <div className='flex items-center justify-between'>
                                            <button 
                                                onClick={subtractNumber} 
                                                className='bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary h-12 w-12 rounded-full flex justify-center items-center shadow-md hover:shadow-lg transition-all duration-200'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                </svg>
                                            </button>
                                            <input 
                                                type="number" 
                                                className='rounded-lg w-24 h-12 text-center text-2xl font-bold border-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                                                value={number} 
                                                onChange={getTotal} 
                                                min="0"
                                                max="1000"
                                            />
                                            <button 
                                                onClick={addNumber} 
                                                className='bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary h-12 w-12 rounded-full flex justify-center items-center shadow-md hover:shadow-lg transition-all duration-200'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total Amount */}
                                    <div className='bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5'>
                                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                        <p className="text-3xl font-bold text-green-700">
                                            UGX {Intl.NumberFormat('en-US').format(total)}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='grid grid-cols-2 gap-3 pt-2'>
                                        <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl flex items-center justify-center py-3 px-4 transition-all duration-200 hover:shadow-md border border-gray-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                            Add to Cart
                                        </button>

                                        <button 
                                            onClick={() => handleOpen('xl')} 
                                            className='bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl flex items-center justify-center py-3 px-4 transition-all duration-200 hover:shadow-lg shadow-md'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="border-t border-gray-200 px-6 py-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    Product Description
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Share Section */}
                            <div className="border-t border-gray-200 px-6 py-6">
                                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                    </svg>
                                    Share this Product
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <WhatsappShareButton title={`Check out ${product.product.name} from ${product.company.name}: `} url={currentUrl} className='flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200'>
                                        <WhatsappIcon round={true} size={32} />
                                        <span className="font-medium text-gray-700">WhatsApp</span>
                                    </WhatsappShareButton>
                                    <TwitterShareButton title={`Check out ${product.product.name} from ${product.company.name}: `} url={currentUrl} className='flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200'>
                                        <XIcon round={true} size={32} />
                                        <span className="font-medium text-gray-700">Twitter</span>
                                    </TwitterShareButton>
                                    <FacebookShareButton quote={`Check out ${product.product.name} from ${product.company.name}: `} url={currentUrl} className='flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200'>
                                        <FacebookIcon round={true} size={32} />
                                        <span className="font-medium text-gray-700">Facebook</span>
                                    </FacebookShareButton>
                                    <button onClick={copyLink} className='flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200'>
                                        <div className="bg-gray-700 rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">{copied ? 'Copied!' : 'Copy Link'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-20">
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-primary mb-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-600 mb-4">Contact the seller directly</p>
                                    <a href={`tel:${product.company.contact}`} className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors">
                                        Call Now
                                    </a>
                                </div>
                                
                                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                                    <p className="font-semibold text-gray-900 mb-2">🚚 Delivery Information</p>
                                    <p>Fast delivery available across Uganda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Dialog */}
            <Dialog open={size === "xl"} size={size} handler={handleOpen} className="bg-white">
                <DialogHeader className="border-b border-gray-200">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <Typography variant="h4" color="blue-gray" className="font-bold">
                            Complete Your Order
                        </Typography>
                    </div>
                </DialogHeader>

                <form onSubmit={orderProduct}>
                    <DialogBody className="space-y-6 max-h-[60vh] overflow-y-auto">
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 text-center border border-primary/20">
                            <p className='text-lg font-bold text-gray-800 mb-2'>
                                Order Summary
                            </p>
                            <p className="text-2xl font-bold text-primary">
                                {number} × {product.product.name}
                            </p>
                            <p className="text-3xl font-bold text-red-600 mt-3">
                                Total: UGX {Intl.NumberFormat('en-US').format(total)}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Contact for Delivery</label>
                                <Input 
                                    label='e.g., +256 700 000 000'
                                    value={contact} 
                                    onChange={(event) => setContact(event.target.value)} 
                                    size='lg'
                                    className="w-full"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location</label>
                                <Input 
                                    label='Describe where to bring the order'
                                    value={locationDetails} 
                                    onChange={(event) => setLocationDetails(event.target.value)} 
                                    size='lg'
                                    className="w-full"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>}
                                />
                            </div>
                        </div>
                    </DialogBody>

                    <DialogFooter className="border-t border-gray-200 space-x-3">
                        <Button onClick={() => handleOpen(null)} variant="outlined" color="gray" size="lg">
                            Cancel
                        </Button>
                        <Button type='submit' className='bg-gradient-to-r from-primary to-secondary' size="lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Place Order
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>

            <ToastContainer />
            <Footer />
        </div>
    )
}

export default UserProductDetailsScreen
