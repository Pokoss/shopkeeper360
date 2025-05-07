import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link } from '@inertiajs/react'
import { Button } from '@material-tailwind/react'
import React from 'react'

function PricingScreen() {
  return (
    <div>
        <Navbar/>
         <div className='container mx-auto flex flex-wrap  max-w-full'>
        
        <div className="container px-4 mt-10 mx-auto">
            <div className="max-w-3xl mx-auto mb-18 text-center">
                <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold bg-primary text-orange-100 rounded-full">Our System Monthly</span>
                <h1 className="font-heading text-1xl xs:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    <span>We offer affordable plans to your business</span>
                    
                    
                </h1>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/3 px-4 mb-10 lg:mb-0">
                        <div className="relative max-w-sm lg:max-w-none mx-auto bg-white rounded-6xl">
                            <div className="pt-2 px-2">
                                <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-purple-50 overflow-hidden">
                                    <img className="absolute bottom-0 left-0 w-full" src="saturn-assets/images/pricing/wave-bg1.svg" alt="" />
                                    <div className="relative text-center">
                                        <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-gray-50 bg-secondary rounded-full">Basic</span>
                                        <span className="block text-3xl font-bold">UGX 38,500</span>
                                        <span className="block text-sm font-medium">Per month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-8 mb-7 relative">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                                    <div className="w-full border-b-8 border-dotted border-orange-50"></div>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                                <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                            </div>
                            <div className="px-6 pb-12">
                                <ul className="mb-12">
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/green-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Retail functions only</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/green-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Point of sale</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Print receipts</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Limited to 3 employees</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Query only 1 month range</span>
                                    </li>
                                    
                                </ul>
                                <div className="text-center">
                                <Link href='/company'>
                                <Button className='bg-secondary' >Start Free Trial</Button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-4 mb-10 lg:mb-0">
                        <div className="relative max-w-sm lg:max-w-none mx-auto bg-orange-700 rounded-6xl">
                            <div className="pt-2 px-2">
                                <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-orange-900 overflow-hidden">
                                    <img className="absolute bottom-0 left-0 w-full" src="saturn-assets/images/pricing/wave-bg2.svg" alt="" />
                                    <div className="relative text-center">
                                        <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-white bg-primary rounded-full">Standard</span>
                                        <span className="block text-3xl font-bold text-white">UGX 54,000</span>
                                        <span className="block text-sm font-medium text-white">Per Month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-8 mb-7 relative">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                                    <div className="w-full border-b-8 border-dotted border-orange-50"></div>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                                <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                            </div>
                            <div className="px-6 pb-12">
                                <ul className="mb-12">
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/orange-check.svg" alt="" />
                                        <span className="ml-3 text-gray-50">Both retail and service functions</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/orange-check.svg" alt="" />
                                        <span className="ml-3 text-gray-50">Print receipts, bills and reports</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/orange-check.svg" alt="" />
                                        <span className="ml-3 text-gray-50">QR code showing your products or services</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/orange-check.svg" alt="" />
                                        <span className="ml-3 text-gray-50">Add upto 10 employees</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/orange-check.svg" alt="" />
                                        <span className="ml-3 text-gray-50">Add customer bookings and appointments</span>
                                    </li>
                                </ul>
                                <div className="text-center">
                                    
                                <Link href='/company'>
                                <Button className='bg-primary' >Start Free Trial</Button>
                                </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-4">
                        <div className="relative max-w-sm lg:max-w-none mx-auto bg-white rounded-6xl">
                            <div className="pt-2 px-2">
                                <div className="relative pt-12 pb-10 px-6 h-52 rounded-6xl bg-purple-50 overflow-hidden">
                                    <img className="absolute bottom-0 left-0 w-full" src="saturn-assets/images/pricing/wave-bg1.svg" alt="" />
                                    <div className="relative text-center">
                                        <span className="inline-block py-1.5 px-5 mb-6 font-semibold text-gray-100 bg-secondary rounded-full">Premium</span>
                                        <span className="block text-3xl font-bold">UGX 99,000</span>
                                        <span className="block text-sm font-medium">Per Month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-8 mb-7 relative">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                                    <div className="w-full border-b-8 border-dotted border-orange-50"></div>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                                <div className="absolute top-0 right-0 transform translate-x-1/2 w-8 h-8 bg-orange-50 rounded-full"></div>
                            </div>
                            <div className="px-6 pb-12">
                            <ul className="mb-12">
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/green-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">All standard features</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/green-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">View your business analytics</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Unlimited queries</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Add unlimited staff</span>
                                    </li>
                                    <li className="flex mb-5 items-center">
                                        <img src="saturn-assets/images/pricing/red-check.svg" alt="" />
                                        <span className="ml-3 text-gray-900">Send custom smses to your customers</span>
                                    </li>
                                    
                                </ul>
                                <div className="text-center">
                                <Link href='/company'>
                                <Button className='bg-secondary' >Start Free Trial</Button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    

</div>
<Footer/>
    </div>
  )
}

export default PricingScreen