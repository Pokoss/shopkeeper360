import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link, router } from '@inertiajs/react';
import React,{useState} from 'react'
import { ToastContainer } from 'react-toastify'

function UserBusinessProductCategoryScreen({products}) {
    console.log(products)
    const [search, setSearch] = useState('');
    const searchProduct = (event) => {
        event.preventDefault();
        toast.loading();
        
    
        router.get('/', { search });
      };

    return (
        <div className='font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
            <Navbar />
            <div>
                <div className='container mx-auto flex flex-wrap  max-w-full'>
                    <main className="p-2 w-full md:w-4/5 flex flex-col items-center">
                       

                        <form
                            onSubmit={searchProduct}
                            className='mt-5'>
                            <div className='flex rounded-md mx-5'>
                                <input
                                    className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="articleTitle"
                                    type="text"
                                    placeholder={`Search ${'products'} `}
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
    )
}

export default UserBusinessProductCategoryScreen