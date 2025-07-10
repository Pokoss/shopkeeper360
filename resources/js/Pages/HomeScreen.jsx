import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Head, Link } from '@inertiajs/react'
import { Button, Typography } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'

function HomeScreen() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState('');

    // Geolocation logic - commented for testing on another page
    /* useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                handleError
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []); */

    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
            default:
                setError("An error occurred.");
        }
    };

    const plans = [
        {
            name: 'Basic',
            price: 'UGX 38,500',
            color: 'bg-purple-100',
            badge: 'Retail Focused',
            features: [
                'Retail functions only',
                'Point of Sale',
                'No Receipt Printing',
                'Up to 3 Employees',
                'Query 1 Month Range'
            ],
            highlight: false
        },
        {
            name: 'Standard',
            price: 'UGX 54,000',
            color: 'bg-orange-100',
            badge: 'Most Popular',
            features: [
                'Retail & Service Functions',
                'Print Receipts & Reports',
                'QR Product Display Page',
                'Up to 10 Employees',
                'Customer Bookings & Appointments'
            ],
            highlight: true
        },
        {
            name: 'Premium',
            price: 'UGX 99,000',
            color: 'bg-gray-100',
            badge: 'Complete Access',
            features: [
                'All Standard Features',
                'Business Analytics Dashboard',
                'Unlimited Queries',
                'Unlimited Staff Accounts',
                'Send SMS Campaigns'
            ],
            highlight: false
        }
    ];

    return (
        <div className="font-oswald text-gray-800">
            <Head>
                <title>Smart ERP for Retail & Services</title>
            </Head>

            <Navbar />

            {/* Hero Section */}
            <section className="text-center py-16 px-4 md:px-10 lg:px-32">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">Biashari</h1>
                <p className="text-lg mb-4 max-w-xl mx-auto">
                    A system designed to help your retail store or service business keep track of all activities, income and expenses
                </p>
                <p className="mb-6 text-lg font-semibold text-primary">
                    Register your business with us and start your <span className="text-red-700">30 days free trial</span>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href='/company' className="px-8 py-3 text-lg font-medium rounded bg-white shadow-sm shadow-primary text-gray-900 transition hover:bg-gray-100">
                        Get started
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-10 bg-gray-50">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center container mx-auto px-4">
                    {[
                        { value: '30+', label: 'Clients' },
                        { value: '2.4K', label: 'Daily Transactions' },
                        { value: '100+', label: 'Users' },
                        { value: '13', label: 'Employees' },
                        { value: '4', label: 'Years of Experience' },
                        { value: '5', label: 'Workshops' }
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center p-4">
                            <p className="text-4xl lg:text-6xl font-bold">{stat.value}</p>
                            <p className="text-sm sm:text-base mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16 px-4 md:px-10 lg:px-32 text-center max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold mb-6">What can we offer your business?</h2>
                <p className="text-lg leading-relaxed">
                    We offer a high-end affordable system that will help manage your business, keeping track of your finances,
                    transactions, reports like daily sales, weekly sales or sales for a specific period of time, in addition to your profits and losses.
                    The system also tracks your inventory levels and includes a sale point for selling products among other features.
                </p>
            </section>

            {/* Video Demo */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 flex justify-center items-center">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/78P6Xblg_-g?si=Udf86fUqMAsmwPJC" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen 
                        className="w-full max-w-md"
                    ></iframe>
                </div>
                <div className="p-8 md:p-12 flex justify-center items-center bg-white">
                    <div className="max-w-md">
                        <div className="w-24 h-2 bg-secondary mb-4"></div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">How to use Biashari Retail Module</h2>
                        <Typography>
                            This is a short video showing how to use the retail module of Biashari. You will see how to create an account, create a business, add and stock products, and also how to sell products using the system.
                        </Typography>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
                    Our <span className="text-primary">Services</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Retail System */}
                    <div className="bg-white p-8 flex justify-center items-center">
                        <img src="/images/user/dashboard.JPG" alt="Biashari Dashboard Preview" className="w-full max-w-md" />
                    </div>
                    <div className="bg-gray-100 p-8 flex justify-center items-center">
                        <div className="max-w-md">
                            <div className="w-24 h-2 bg-secondary mb-4"></div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Retail and Service Business System</h2>
                            <Typography>
                                We offer businesses a system to manage their daily business activities and also an online platform like a website for business easily accessible with a QR code to showcase products to customers.
                            </Typography>
                            <Link href="/company/register" className="mt-5 inline-block border-2 border-primary text-primary text-sm uppercase tracking-widest py-3 px-8 hover:bg-primary hover:text-white transition">
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Online Businesses */}
                    <div className="bg-white p-8 flex justify-center items-center">
                        <img src="/images/user/user-screen.JPG" alt="View Businesses Online" className="w-full max-w-md" />
                    </div>
                    <div className="bg-gray-100 p-8 flex justify-center items-center">
                        <div className="max-w-md">
                            <div className="w-24 h-2 bg-secondary mb-4"></div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">View Businesses Online</h2>
                            <Typography>
                                Every business has a QR code. We offer users a place to find various businesses, make bookings, order products or services, and visit them for what they need.
                            </Typography>
                            <Link href="/home" className="mt-5 inline-block border-2 border-primary text-primary text-sm uppercase tracking-widest py-3 px-8 hover:bg-primary hover:text-white transition">
                                View Businesses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto text-center mb-12">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Our <span className="text-primary">Pricing</span>
                    </h3>
                    <p className="text-gray-600 max-w-xl mx-auto mb-10">
                        Whether you're running a duka, salon, pharmacy, or restaurant — Biashari helps you manage everything in one place.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`w-full md:w-1/3 max-w-sm rounded-xl shadow-md ${plan.highlight ? 'border-4 border-primary' : ''}`}
                        >
                            <div className={`${plan.color} p-6 rounded-t-xl`}>
                                <span className="text-sm font-medium uppercase tracking-wide text-gray-700">{plan.badge}</span>
                                <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
                                <p className="text-3xl font-semibold mt-4">{plan.price}</p>
                                <p className="text-sm text-gray-600">Per Month</p>
                            </div>
                            <ul className="p-6 space-y-4 text-left">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="text-green-500 mr-2">✔</span> {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="px-6 pb-6">
                                <Link href="/company">
                                    <Button className={`w-full ${plan.highlight ? 'bg-primary' : 'bg-secondary'}`}>
                                        Start Free Trial
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-8">Our <span className="text-primary">Team</span></h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                        <div className="w-full max-w-xs text-center">
                            <img src="/images/team/opoka-daniel.jpeg" alt="Opoka Daniel" className="object-cover object-top w-full h-48 mx-auto rounded-lg" />
                            <h3 className="text-lg font-medium mt-2">Opoka Daniel</h3>
                            <span className="font-medium text-gray-600">C.E.O / Software Developer</span>
                        </div>
                        <div className="w-full max-w-xs text-center">
                            <img src="/images/team/hannah-mercy.jpg" alt="Biyinzika Hannah" className="object-cover object-top w-full h-48 mx-auto rounded-lg" />
                            <h3 className="text-lg font-medium mt-2">Biyinzika Hannah</h3>
                            <span className="font-medium text-gray-600">Database Administrator / I.S.O</span>
                        </div>
                        <div className="w-full max-w-xs text-center">
                            <img src="/images/team/olet.JPG" alt="Olet Robert" className="object-cover object-top w-full h-48 mx-auto rounded-lg" />
                            <h3 className="text-lg font-medium mt-2">Olet Robert</h3>
                            <span className="font-medium text-gray-600">Creative Director</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-16">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
                    Frequently Asked <span className="text-primary">Questions</span>
                </h3>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                question: "What type of businesses can use the Biashari system",
                                answer: "The Biashari system is designed for all retail and service type of businesses like shops, supermarkets, hardware stores, electronic stores, pharmacies, restaurants, hotels, etc."
                            },
                            {
                                question: "What happens if I fail to renew my subscription",
                                answer: "We disable important features but your data remains safe until you renew. We give reminders and a 4-day grace period."
                            },
                            {
                                question: "Does your system work offline?",
                                answer: "Currently it's fully online, but we are soon releasing an offline sale point where you can transact without internet."
                            },
                            {
                                question: "What is your cancellation policy?",
                                answer: "No penalty — simply stop using the system or let the subscription expire. Contact our team for any issues."
                            },
                            {
                                question: "If my store has many products, do you do data entry for us?",
                                answer: "Yes, we can provide data entrants at UGX 70 per product. They ensure accurate data entry."
                            },
                            {
                                question: "How can I contact Biashari for assistance?",
                                answer: "Email us at info@lehub.dev or call +256-752-553-236. We’re happy to assist!"
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold text-gray-700">{faq.question}</h4>
                                    <p className="mt-2 text-sm text-gray-500">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-base text-primary font-semibold uppercase">Location</h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                            Our Offices
                        </h3>
                    </div>
                    <dl className="space-y-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <dt className="text-lg font-medium text-gray-900">Addresses</dt>
                                <dd className="mt-1 text-base text-gray-500">
                                    1. Kati House, Level 3, Kampala<br />
                                    2. Namanve Exhibition and Business Center (opening soon)
                                </dd>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <dt className="text-lg font-medium text-gray-900">Phone number</dt>
                                <dd className="mt-1 text-base text-gray-500">+256 752 553 236</dd>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <dt className="text-lg font-medium text-gray-900">Email</dt>
                                <dd className="mt-1 text-base text-gray-500">info@lehub.dev</dd>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <dt className="text-lg font-medium text-gray-900">Working Hours</dt>
                                <dd className="mt-1 text-base text-gray-500">
                                    Monday - Friday: 9am to 6pm<br />
                                    Saturday: 10am to 2pm<br />
                                    Sunday: Emergency Only
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomeScreen