import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link, router } from '@inertiajs/react'
import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserBusinessScreen({ business, category, products, favourite }) {
    console.log(favourite)
    // const [likeChecker,setLikeChecker] = useState{false}

    const favouriteAction = (event) => {
        event.preventDefault();

        var company_id = business.id;

        try {

            router.post('/favourite-business', {company_id,},{
                onSuccess: ()=>{
               
                    toast.success(favourite == 0 ? `${business.name} added to favourite` : `${business.name} removed from favourite`)
                }
            })
        
            }
            catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        

        }
       


    return (
        <div className='h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
            <Navbar />
            <div className="font-oswald w-full  p-5 shadow-sm shadow-primary bg-white ">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="grid-cols-1 lg:col-span-3">
                        <div className="mx-auto flex items-center justify-center  ">

                            <Avatar className='ml-4 items-center justify-center' src={`/${business.logo}`} alt="avatar" size="xxl" variant="circular">
                            </Avatar>
                        </div>

                    </div>

                    <div className="col-span-1 lg:col-span-9">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">{business.name} </h2>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left sm:grid-cols-2">
                            <div>
                                <p className="font-semibold text-primary">{business.contacts}</p>
                                <p className="text-sm font-semibold text-zinc-700">Contact</p>
                            </div>

                            <div>
                                <p className="font-semibold text-primary">{business.location} </p>
                                <p className="text-sm font-semibold text-zinc-700">Location</p>
                            </div>

                            {/* <div>
                                <p className=" font-semibold text-primary">{'Electronic Shop'}</p>
                                <p className="text-sm font-semibold text-zinc-700">Type</p>
                            </div>

                            <div>
                                <p className="font-semibold text-primary">{'3'}</p>
                                <p className="text-sm font-semibold text-zinc-700">Page Visits</p>
                            </div> */}

                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Link to={`/businesscart`} className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white" ><p className='w-full text-center'>My Cart</p></Link>

                            <button
                            onClick={favouriteAction}
                            className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white" >{favourite == 0 ? 'Add Favourite' : 'Remove Favourite' }</button>
                        </div>
                    </div>
                </div>


            </div>
            <div className='container mx-auto flex flex-wrap  max-w-full'>
                <main className="p-2 w-full md:w-4/5 flex flex-col items-center">

                    <div className="w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3">
                        {
                            category.map(m => (
                                <Link href={`/business/${business.slug}/category/${m.id}`}>
                                <div className='rounded-xl bg-primary p-5'>
                                    <p className='text-white font-semibold text-center'>{m.name}</p>
                                </div>
                                </Link>
                            ))


                        }
                        
                    </div>
                    {/* <div className='flex w-full justify-center mt-14'>
                        <p className='text-lg text-primary font-bold'>All Items</p>
                    </div> */}

                    <form className='mt-5'>
                        <div className='flex rounded-md mb-10 mx-5'>
                            <input
                                className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="articleTitle"
                                type="text"
                                placeholder="Search for an item here"
                            //   value={data.search_text ?? ''}
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
                        {
                            products.data && products.data.map(m => (
                                <Link href={`/product/${m.slug}`}>
                                    <div className='cursor-pointer w-full'
                                    // to={`/escorts/${link}`}
                                    //   state={{ id: '' }}
                                    >

                                        <img
                                            src={`/${m.image}`}
                                            className="object-cover w-full h-64 sm:h-90"
                                            alt=""
                                        />
                                        <div className="p-2 border border-t-0" >


                                            <div className='justify-between'>
                                                <p

                                                    aria-label="Category"
                                                    title="Visit the East"
                                                    className="inline-block mb-2 text-lg font-medium line-clamp-2  leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                                                >
                                                    {m.product.name}
                                                </p>
                                            </div>


                                            <div className='justify-start'>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg> */}

                                                <p className="text-red-700 mb-2 font-semibold line-clamp-1">
                                                    {`UGX ${Intl.NumberFormat('en-US').format(m.product.retail_price)}`}
                                                </p>

                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                        <div className='flex justify-center mt-3 space-x-4 bg-gray-200 p-3 rounded-xl items-center'>             
                        <div><Link className='bg-white p-2 text-black rounded-md hover:bg-primary hover:text-white text-xs font-bold' href={products.first_page_url}>First</Link></div>
                        <div><Link className='bg-white p-2 text-black rounded-md hover:bg-primary hover:text-white text-xs font-bold' href={products.previous_page_url}>Previous</Link></div>
                        <div className='text-xs font-bold'> {'Page '+products.current_page + ' of ' + products.last_page}</div>
                        <div><Link className='bg-white p-2 text-black rounded-md hover:bg-primary hover:text-white text-xs font-bold' href={products.next_page_url}>Next</Link></div>
                        <div><Link className='bg-white p-2 text-black rounded-md hover:bg-primary hover:text-white text-xs font-bold' href={products.last_page_url}>Last</Link></div>
                        </div>


                </main>
                <aside className="p-2 w-full md:w-1/5 flex flex-col items-center">
                    <a className="uppercase mt-5" href="">Promoted</a>
                </aside>
            </div>
            <ToastContainer/>s
            <Footer />
        </div>
    )
}

export default UserBusinessScreen