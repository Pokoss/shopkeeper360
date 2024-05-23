
import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Link } from '@inertiajs/react'
import { Typography } from '@material-tailwind/react'
import React from 'react'


function HomeScreen() {
    return (

        <div className="space-y-12 dark:bg-gray-800 dark:text-gray-100">
            <Navbar />

            <section>
                <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
                    <h1 className="text-4xl font-bold leadi sm:text-5xl">Shopkeeper 360

                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">A system designed to help your retail store keep track of all activities income and expenses</p>
                    <div className="flex flex-wrap justify-center">
                        <Link href='/company' className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white shadow-sm shadow-primary  text-gray-900">Get started</Link>
                        <Link href='/home' className="px-8 py-3 m-2 text-lg border bg-primary text-white rounded ">Shop Online</Link>
                    </div>
                </div>
            </section>
            <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid justify-center grid-cols-2 mx-auto text-center lg:grid-cols-3">
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">30+</p>
                        <p className="text-sm sm:text-base">Clients</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">2.4K</p>
                        <p className="text-sm sm:text-base">Daily transations</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">100+</p>
                        <p className="text-sm sm:text-base">Users</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">13</p>
                        <p className="text-sm sm:text-base">Employees</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">4</p>
                        <p className="text-sm sm:text-base">Years of experience</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leadi lg:text-6xl">5</p>
                        <p className="text-sm sm:text-base">Workshops</p>
                    </div>
                </div>
            </section>
            <section className="py-8">
                <div className="container mx-auto">
                    <div className="p-4 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
                        <h2 className="text-2xl font-bold leadi sm:text-4xl">What can we offer to you?</h2>
                        <p className="px-8 my-4">We offer a high end affordable system that will help manage you business by helping you manage finances and keeping you upto date
                            with business transations and reports like daily sales, weekly sales or sales for a specific peroid of time, your profits and losses. The system also tracks your inventory
                            has a sale point for sellinging products and many more features. So basically youll be missing out if you dont join us so please scale your business by joing us today and watch your business
                            start growing massively
                        </p>
                    </div>

                </div>
            </section>
            <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
                <div>
                    <h3 className="my-6 w-full text-center text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Our<span className="text-primary"> Services</span>
                    </h3>



                </div>
                {/*Mission Section*/}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-white p-12 md:p-24 flex justify-end items-center">
                        <a href="" data-aos='fade-right'>
                            <img src="/images/user/dashboard.JPG" className="w-full max-w-md" />
                        </a>
                    </div>
                    <div className="bg-gray-100 p-12 md:p-24 flex justify-start items-center">
                        <div className="max-w-md" data-aos='fade-left'>
                            <div className="w-24 h-2 bg-secondary mb-4"></div>
                            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">Retail Business System</h2>
                            {/* <p className="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed"> */}
                            <Typography>
                                We offer businesses a system to manage their daily business activities and also an online platform like a website for business to show products people

                            </Typography>
                            {/* </p> */}
                            <Typography>
                                <Link href="/company/register" className="mt-5 inline-block border-2 border-primary font-light text-primary text-sm uppercase tracking-widest item-left py-3 px-8 hover:bg-primary hover:text-white">Register</Link>
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-white p-12 md:p-24 flex justify-start items-center">
                        <a href="" data-aos='fade-left'>
                            <img src="/images/user/sale_point.JPG" className="w-full max-w-md" />
                        </a>
                    </div>
                    <div className="md:order-first bg-gray-100 p-12 md:p-24 flex justify-end items-center">
                        <div className="max-w-md" data-aos='fade-right'>
                            <div className="w-24 h-2 bg-secondary mb-4"></div>
                            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">Online Shopping Center</h2>
                            {/* <p className="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed"> */}
                            <Typography>
                                We offer users a place to find various businesses, make bookings from that business order different products from the business. Its a place where you find different type of retail stores view their products and order from them or visit them for what you want
                            </Typography>
                            <Link href="/airportpickup" className="mt-5 inline-block border-2 border-primary font-light text-primary text-sm uppercase tracking-widest py-3 px-8 hover:bg-primary hover:text-white">Contact for Pickup</Link>
                            {/* </p> */}
                            {/* <a href="" className="inline-block border-2 border-primary font-light text-primary text-sm uppercase tracking-widest py-3 px-8 hover:bg-primary hover:text-white">Book Custom Package</a> */}

                        </div>
                    </div>
                </div>


            </section>


            <section class="bg-white ">

                <div class="container px-6 py-8 mx-auto">
                    <h2 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">Our <span className='text-primary'>Team</span></h2>

                    <div class="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center w-full">
                        <div class="w-full max-w-xs text-center">
                            <img class="object-cover object-top w-full h-48 mx-auto rounded-lg" src="/images/team/opoka-daniel.jpeg" alt="opoka" />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">Opoka Daniel</h3>
                                <span class="mt-1 font-medium text-gray-600 ">C.E.O / Sotware Developer</span>
                            </div>
                        </div>

                        {/* <div class="w-full max-w-xs text-center">
                <img class="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

                <div class="mt-2">
                    <h3 class="text-lg font-medium text-gray-700 ">Okwerede Jude</h3>
                    <span class="mt-1 font-medium text-gray-600 ">Backend Developer</span>
                </div>
            </div> */}

                        <div class="w-full max-w-xs text-center">
                            <img class="object-cover object-top w-full h-48 mx-auto rounded-lg" src="/images/team/hannah-mercy.jpg" alt="hannah" />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">Biyinzika Hannah</h3>
                                <span class="mt-1 font-medium text-gray-600 ">Database Administrator / I.S.O</span>
                            </div>
                        </div>

                        <div class="w-full max-w-xs text-center">
                            <img class="object-cover object-top w-full h-48 mx-auto rounded-lg" src="/images/team/olet.jpg" alt="Olet Robert" />

                            <div class="mt-2">
                                <h3 class="text-lg font-medium text-gray-700 ">Olet Robert</h3>
                                <span class="mt-1 font-medium text-gray-600 ">Creative Director</span>
                            </div>

                            {/* <div class="flex justify-center mt-2 -mx-2">
                    <a href="#" class="mx-2 text-gray-600 transition-colors duration-300  hover:text-red-700 dark:hover:text-blue-400" aria-label="Reddit">
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
                            </path>
                        </svg>
                    </a>

                    <a href="#" class="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                            </path>
                        </svg>
                    </a>

                    <a href="#" class="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                            </path>
                        </svg>
                    </a>
                </div> */}
                        </div>

                        {/* <div class="w-full max-w-xs text-center">
                <img class="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />

                <div class="mt-2">
                    <h3 class="text-lg font-medium text-gray-700 ">Kigundu Allan</h3>
                    <span class="mt-1 font-medium text-gray-600 ">Digital / Social Media</span>
                </div>
            </div> */}

                        {/* <div class="w-full max-w-xs text-center">
                <img class="object-cover object-center w-full h-48 mx-auto rounded-lg" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />

                <div class="mt-2">
                    <h3 class="text-lg font-medium text-gray-700 ">Aleni Feni Joseph</h3>
                    <span class="mt-1 font-medium text-gray-600 ">Marketing Manager</span>
                </div>
            </div> */}
                    </div>
                </div>
            </section>


            <h3 className="w-full text-center text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Frequent<span className="text-primary"> Questions</span>
            </h3>
            <section className="bg-white">
                <div className="container px-6 py-12 mx-auto">


                    <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-8 md:grid-cols-2 xl:grid-cols-3">
                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">What destinations in Uganda does Vialey Kankou Tours cover?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Vialey Kankou Tours covers a wide range of destinations in Uganda, including popular national parks like Bwindi Impenetrable National Park, Queen Elizabeth National Park, Murchison Falls National Park, and more. We also offer city tours in Kampala and cultural experiences in local communities.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">Are your packages customizable?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Absolutely! We offer both pre-designed packages and fully customizable itineraries. If our pre-designed packages don't meet your specific requirements, our experienced team can tailor an itinerary to match your interests, preferences, and budget. Just let us know your preferences, and we'll create a unique and memorable journey just for you.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">What types of vehicles do you offer for car hire?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    We have a diverse fleet of well-maintained vehicles available for car hire, including sedans, SUVs, minibusses, and 4x4 vehicles suitable for safaris. Our vehicles are equipped with modern amenities and maintained to ensure your comfort and safety during your travels.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">What is your cancellation policy?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Our cancellation policy may vary depending on the specific package or service booked. We recommend reviewing our terms and conditions or contacting our team directly for detailed information regarding cancellations, refunds, and any applicable fees.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">Is travel insurance included in your packages?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    No, travel insurance is not included in our packages. We highly recommend obtaining comprehensive travel insurance to protect yourself against unexpected events, including trip cancellations, medical emergencies, or lost luggage. Please ensure you have suitable travel insurance coverage before embarking on your journey.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="inline-block p-3 text-white bg-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">How can I contact Vialey Kankou Tours for further assistance or inquiries?</h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    For further assistance or inquiries, you can reach our friendly team through various channels. You can fill out the contact form on our website, email us at info@vialeykankoutours.com, or call us at +256-393-246-536. We'll be more than happy to assist you and provide any additional information you may need.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Location</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Our Offices
                        </p>
                        {/* <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis
                            in, accusamus quisquam.
                        </p> */}
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: globe-alt --> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                        </svg>

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Addresses
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        1. Wandegeya Kampala<br />
                                        2. Munyonyo<br />
                                        3. Namanve Exibition and Business Center (opening soon)
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: phone --> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Phone number
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        +256 765 974 111
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: mail --> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Email
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        info@lehub.dev
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        {/* <!-- Heroicon name: clock --> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        Working Hours
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Monday -  Friday: 9am to 6pm<br />
                                        Saturday - 10am to 2pm<br />
                                        Sunday -  Contact if its a serious emergency
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>


<Footer/>
        </div>
    )
}

export default HomeScreen