import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { router } from '@inertiajs/react'
import { Input, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function UserProductDetailsScreen({ product }) {
    const currentUrl = location.href;
    const [contact, setContact] = useState('')
    const [locationDetails, setLocationDetails] = useState('')
    const [copied, setCopied] = useState(false)
    const copyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    let [number, setNumber] = useState(0);
    let [total, setTotal] = useState(0);
    function addNumber() {
        if (number == 1000) {
            toast.error('1000 is the max number');
        } else {
            number = number + 1;
            setNumber(parseInt(number));
            total = total * parseInt(number)

        }
    }
    function subtractNumber() {
        if (number == 0) {
            toast.error('Quantity below 0 is forbidden')
        } else {
            number = number - 1;
            setNumber(parseInt(number));
        }
    }
    const getTotal = e => {
        e.preventDefault();
        setNumber(e.target.value)
    }

    useEffect(() => {
        total = number * parseInt(product.product.retail_price)
        setTotal(total)
    }, [number]);

    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);

    const orderProduct = async (event) => {
        event.preventDefault();
        toast.loading();

        var company_id = product.company_id;
        var product_id = product.product_id;
        var cost_price = product.product.cost_price;
        var retail_price = product.product.retail_price;
        var order_total = total;
        var quantity = number;

        if (contact == '') {
            toast.error('Type the contact for delivery')
        }
        if (number < 1) {
            toast.error('First Set the quantity')
        }
        else if (locationDetails == '') {
            toast.error('Type the location for delivery')
        }
        else {
            router.post('/order-item', { company_id, product_id, cost_price, retail_price, order_total, quantity, location: locationDetails, contact },
                {
                    onSuccess: () => {
                        toast.dismiss();
                        handleOpen()
                        toast.success('Order Placed Successfully')
                        setContact(''),
                        setLocationDetails('');
                    }
                }
            )
        }
    }

    console.log(product)
    return (
        <div className='font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
            <div>
                <Navbar />
                <div className='w-full fill'>
                    <div className='container mx-auto flex flex-wrap  max-w-full'>
                        <main className="w-full md:w-4/5 flex flex-col items-center">
                            <article className="w-full flex flex-col shadow my-2 ">
                                <div className="bg-white flex flex-col justify-start px-3 md:px-5">
                                    <h1 className="text-3xl font-semibold hover:text-gray-700">{product.product.name}</h1>
                                    <p className="font-san text-sm font-semibold hover:text-gray-700 text-primary pb-1">by {product.company.name}</p>
                                </div>

                                <div className='container mx-auto flex flex-wrap  max-w-full'>
                                    <main className="w-full md:w-2/4 flex flex-col items-center">
                                        <div className='py-5 text-center'>
                                            <img src={`/${product.image}`} className='w-full h-96 object-contain rounded-lg p-1' />
                                            {/* <span className='text-sm italic text-gray-600'>Image: {blog.image_description ?? 'no description'}</span> */}

                                        </div>
                                    </main>
                                    <aside className="w-full md:w-2/4 flex flex-col items-center">

                                        <div className=' p-2 mt-3 w-full flex '>
                                            <p className="w-full justify-start text-base leading-4 text-gray-500 font-light"><span className='text-gray-900 text-md font-semibold'>Price</span></p>
                                            <p className="w-full text-end text-base leading-4 text-gray-500 font-light"><span className='text-red-500 text-md font-semibold'>UGX {Intl.NumberFormat('en-US').format(product.product.retail_price)}</span></p>
                                        </div>
                                        <div className='bg-gray-200 p-2 mt-3 w-full flex items-center'>
                                            <p className="w-full justify-start text-base leading-4 text-gray-500 font-light"><span className='text-gray-900 text-md font-semibold'>Quantity</span></p>


                                            <div className='flex gap-1'>
                                                <button onClick={subtractNumber} className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                </svg>
                                                </button>
                                                <input type="number" required placeholder='' form='stock_item_form' className='rounded-md w-16 flex [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' value={number} onChange={getTotal} />
                                                <button onClick={addNumber} className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                                </button>
                                            </div>

                                        </div>

                                        <div className=' p-2 mt-3 w-full flex '>
                                            <p className="w-full justify-start text-base leading-4 text-gray-500 font-light"><span className='text-gray-900 text-md font-bold'>You will pay</span></p>
                                            <p className="w-full text-end text-base leading-4 text-gray-500 font-light"><span className='text-red-500 text-md font-bold' >UGX {Intl.NumberFormat('en-US').format(total)}</span></p>
                                        </div>

                                        <div className='p-2 mt-7 w-full grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 place-items-center class justify-center'>
                                            <button className='text-white rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Add to cart
                                            </button>

                                            <button onClick={() => handleOpen('xl')} className='text-white rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg> Order Now
                                            </button>

                                        </div>


                                        {/* <div>
                                            <div className='py-4 border-b'>

                                                <div className=" border-gray-200 flex items-center justify-between">
                                                    <p className="text-base leading-4 text-gray-500 font-light"><span className='text-red-500 text-md font-semibold'>UGX {Intl.NumberFormat('en-US').format(product.product.retail_price)} </span></p>
                                                    <div className="flex justify-center bg-primary p-1 rounded-lg">
                                                        <svg className="fill-current text-white w-5 pl-1" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                        </svg>
                                                        <input type="number" className="mx-4 border border-primary text-center w-12 h-8 rounded-md" />
                                                        <svg className="fill-current text-white w-5 pr-1" viewBox="0 0 448 512">
                                                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                        </svg>
                                                    </div>
                                                    <Button className='bg-primary'>
                                                        Add To Cart
                                                    </Button>
                                                   
                                                </div>
                                            </div>

                                        </div> */}
                                    </aside>
                                </div>







                                <div className=" px-3 md:px-5 my-5">
                                    {/* {events.ticket_prices && events.ticket_prices.map((ticket => (
                  <TicketPrices props={ticket} />
                )))} */}




                                    <div className="text-md my-3 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r to-black from-primary">{"About"}</div>
                                    {product.description}
                                </div>
                                <div className="ml-4 text-sm pb-6 text-blue-900 font-thin">
                                    {/* {!['regional', 'africa', 'world'].includes(category_name.slug) && <>
                                    By <span className="text-blue-900 font-semibold hover:text-gray-800">{blog.user.name +', '}</span>
                                </>}
                                on {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} */}
                                </div>
                                {/* <div className='w-full'>
                            <AdsComponent dataAdSlot='6063218924' />
                        </div> */}

                                <h4 className='text-lg ml-7 font-semibold hover:text-gray-700 pb-2'>Share Item</h4>

                                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-2 px-3">
                                    <WhatsappShareButton title='Check this interesting article I found: ' url={currentUrl} className='flex space-x-3 items-center'>
                                        <WhatsappIcon round={true} size={30} />
                                        <span>WhatsApp</span>
                                    </WhatsappShareButton>
                                    <TwitterShareButton title='Check this interesting article I found: ' url={currentUrl} className='flex space-x-3 items-center'>
                                        <XIcon round={true} size={30} />
                                        <span>X (Former Twitter)</span>
                                    </TwitterShareButton>
                                    <FacebookShareButton quote='Check this interesting article I found: ' url={currentUrl} className='flex space-x-3 items-center'>
                                        <FacebookIcon round={true} size={30} />
                                        <span>Facebook</span>
                                    </FacebookShareButton>
                                    <button onClick={copyLink} className='flex space-x-3 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                        </svg>
                                        <span>{copied ? 'Copied' : 'Copy link'}</span>
                                    </button>
                                </div>
                                {/* <div className="w-full  p-4 mt-5 bg-white border rounded-lg shadow-md sm:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 ">
                                    {comments && comments.length} Comments
                                </h5>
                            </div>
                            <form className="mb-6" onSubmit={handleSubmit}>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows="3" value={commentForm.body} onChange={(event) => commentForm.setData('body', event.target.value)}
                                        className="px-0 w-full text-sm  border-0 focus:ring-0 "
                                        placeholder="Write a comment..." required></textarea>
                                </div>
                                <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 rounded focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Post comment
                                </button>
                            </form>

                            <div className="flow-root">
                                {comments && comments.map((comment, index) => (
                                    <CommentCard key={index} comment={comment} />
                                ))}
                            </div>
                        </div> */}
                            </article>
                        </main>
                        <aside className="p-2 w-full md:w-1/5 flex flex-col items-center">
                            {/* <Splide aria-label="My Favorite Images" options={{ rewind: true, autoplay: true, }}>
              {
                documents && documents.map(document => (
                  <SplideSlide key={document.uid} className='h-50 w-full'>
                    <Link
                      to={`/escorts/${document.uid}`}
                    >
                      <img className='object-cover h-60 w-full'
                        src={document.imageUrl}
                      />
                      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                        <h3 className="text-md text-white font-bold">
                          {document.lastName}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {document.username}
                        </p>
                      </div>
                    </Link>
                  </SplideSlide>
                ))
              }
            </Splide> */}


                            <div className="text-sm py-6 sticky top-20">
                                <div className="w-full text-center">
                                    {/* <Adsense
                                client='ca-pub-2005682797531342'
                                slot='7046626912'
                                adTest='on'
                                style={{ display: 'block' }}
                                format='auto'
                                responsive='true'
                                layoutKey='-gw-1+2a-9x+5c'
                            /> */}
                                    <a className="uppercase mt-5" href="">Promoted</a>
                                    {/* <a href="">
                                        <img className="mx-auto p-1" src="/images/event/host.jpg" alt="advertisement area" />
                                    </a> */}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <Fragment>
                <Dialog
                    open={
                        size === "xl"
                    }
                    size={size}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Just few details and its done
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={orderProduct}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}

                            <p className='text-lg font-bold text-black'>

                                Order {number + ' ' + product.product.name} at  <span className='text-red-700'>UGX {Intl.NumberFormat('en-US').format(total)}</span>
                            </p>


                            <Input label='Phone contact for delivery'
                                value={contact} onChange={(event) => setContact(event.target.value)} size='sm'
                            />
                            <Input label='Describe where to bring the order'
                                value={locationDetails} onChange={(event) => setLocationDetails(event.target.value)} size='sm'
                            />


                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>


                            <Button type='submit' className='bg-primary'>
                                Order Now
                            </Button>


                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default UserProductDetailsScreen