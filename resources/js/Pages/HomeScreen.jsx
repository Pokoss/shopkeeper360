import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Head, Link, router } from '@inertiajs/react'
import { Button, Typography } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function HomeScreen() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const plans = [
        {
            name: 'Basic',
            price: 'UGX 38,500',
            color: 'from-purple-50 to-purple-100',
            borderColor: 'border-purple-300',
            badge: 'Retail Focused',
            badgeColor: 'bg-purple-600',
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
            color: 'from-orange-50 to-orange-100',
            borderColor: 'border-primary',
            badge: 'Most Popular',
            badgeColor: 'bg-primary',
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
            color: 'from-gray-50 to-gray-100',
            borderColor: 'border-gray-400',
            badge: 'Complete Access',
            badgeColor: 'bg-gray-800',
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
        <div className="font-sans text-gray-800 bg-white">
            <Head>
                <title>Biashari - Smart ERP for Retail & Services</title>
            </Head>

            <Navbar />

            {/* Hero Section - Modern Gradient */}
            <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="relative container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-sm font-semibold tracking-wide">🚀 Modern Business Management</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                            Welcome to <span className="text-yellow-300">Biashari</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                            A powerful system designed to help your retail store or service business keep track of all activities, income and expenses
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30">
                                <span className="text-lg font-bold">Start your </span>
                                <span className="text-2xl font-extrabold text-yellow-300">30 days free trial</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href='/company' className="group relative px-8 py-4 text-lg font-bold rounded-xl bg-white text-primary shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105">
                                <span className="relative z-10 flex items-center">
                                    Get Started Free
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </Link>
                            <Link href='/home' className="px-8 py-4 text-lg font-bold rounded-xl bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                                View Businesses
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* Stats Section - Modern Cards */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { value: '30+', label: 'Clients', icon: '👥', color: 'from-blue-500 to-blue-600' },
                            { value: '2.4K', label: 'Daily Transactions', icon: '💳', color: 'from-green-500 to-green-600' },
                            { value: '100+', label: 'Users', icon: '👤', color: 'from-purple-500 to-purple-600' },
                            { value: '13', label: 'Employees', icon: '🏢', color: 'from-orange-500 to-orange-600' },
                            { value: '4', label: 'Years Experience', icon: '⭐', color: 'from-red-500 to-red-600' },
                            { value: '5', label: 'Workshops', icon: '📚', color: 'from-pink-500 to-pink-600' }
                        ].map((stat, idx) => (
                            <div key={idx} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                                <div className={`absolute top-4 right-4 text-3xl`}>{stat.icon}</div>
                                <p className={`text-4xl lg:text-5xl font-extrabold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </p>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer - Modern Layout */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary tracking-wide uppercase">Our Services</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
                        What can we offer <span className="text-primary">your business?</span>
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-4xl mx-auto">
                        We offer a high-end affordable system that will help manage your business, keeping track of your finances,
                        transactions, reports like daily sales, weekly sales or sales for a specific period of time, in addition to your profits and losses.
                        The system also tracks your inventory levels and includes a sale point for selling products among other features.
                    </p>
                </div>
            </section>

            {/* Video Demo - Split Layout */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                        <div className="order-2 lg:order-1">
                            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl shadow-2xl">
                                <div className="bg-black rounded-2xl overflow-hidden">
                                    <iframe 
                                        width="100%" 
                                        height="400" 
                                        src="https://www.youtube.com/embed/78P6Xblg_-g?si=Udf86fUqMAsmwPJC" 
                                        title="Biashari Demo" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerPolicy="strict-origin-when-cross-origin" 
                                        allowFullScreen 
                                        className="w-full"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="w-20 h-2 bg-gradient-to-r from-primary to-secondary mb-6 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                How to use Biashari <span className="text-primary">Retail Module</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                This short video shows how to use the retail module of Biashari. You will see how to create an account, create a business, add and stock products, and also how to sell products using the system.
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    5 min watch
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                    </svg>
                                    Beginner friendly
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Modern Cards */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Our <span className="text-primary">Services</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Comprehensive solutions for modern businesses
                        </p>
                    </div>

                    <div className="space-y-24 max-w-7xl mx-auto">
                        {/* Retail System */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all duration-300">
                                    <img src="/images/user/dashboard.JPG" alt="Biashari Dashboard" className="w-full rounded-2xl" />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-6">
                                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                                    <span className="text-sm font-bold text-primary">FOR BUSINESSES</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Retail and Service <span className="text-primary">Business System</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We offer businesses a comprehensive system to manage their daily activities and also an online platform like a website for business easily accessible with a QR code to showcase products to customers.
                                </p>
                                <ul className="space-y-3">
                                    {['Point of Sale', 'Inventory Management', 'Sales Reports', 'Employee Management', 'QR Code Business Page'].map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/company/register" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Register Your Business
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Online Businesses */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full">
                                    <span className="text-sm font-bold text-secondary">FOR CUSTOMERS</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    View Businesses <span className="text-secondary">Online</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Every business has a QR code. We offer users a place to find various businesses, make bookings, order products or services, and visit them for what they need.
                                </p>
                                <ul className="space-y-3">
                                    {['Browse Local Businesses', 'Order Products Online', 'Book Services', 'View Business Catalogs', 'QR Code Access'].map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/home" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Explore Businesses
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div>
                                <div className="bg-gradient-to-br from-secondary to-blue-600 p-1 rounded-2xl shadow-2xl hover:shadow-secondary/50 transition-all duration-300">
                                    <img src="/images/user/user-screen.JPG" alt="View Businesses Online" className="w-full rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - Modern Cards with Hover */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold text-primary tracking-wide uppercase">Pricing Plans</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Choose Your <span className="text-primary">Perfect Plan</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Whether you're running a duka, salon, pharmacy, or restaurant — Biashari helps you manage everything in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative group rounded-2xl transition-all duration-300 ${
                                    plan.highlight 
                                        ? 'transform hover:scale-105 shadow-2xl border-4 border-primary' 
                                        : 'hover:shadow-xl border-2 ' + plan.borderColor
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            ⭐ RECOMMENDED
                                        </div>
                                    </div>
                                )}
                                
                                <div className={`bg-gradient-to-br ${plan.color} p-8 rounded-t-2xl`}>
                                    <div className={`inline-block ${plan.badgeColor} text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4`}>
                                        {plan.badge}
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline mb-2">
                                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">Per Month</p>
                                </div>
                                
                                <div className="p-8 bg-white rounded-b-2xl">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/company">
                                        <Button 
                                            className={`w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 ${
                                                plan.highlight 
                                                    ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105' 
                                                    : 'bg-gray-800 hover:bg-gray-900'
                                            }`}
                                        >
                                            Start Free Trial
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600">
                            All plans include <span className="font-bold text-primary">30 days free trial</span>. No credit card required.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section - Modern Cards */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Meet Our <span className="text-primary">Team</span>
                        </h2>
                        <p className="text-lg text-gray-600">The people behind Biashari's success</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                        {[
                            { name: 'Opoka Daniel', role: 'C.E.O / Software Developer', image: '/images/team/opoka-daniel.jpeg' },
                            { name: 'Biyinzika Hannah', role: 'Database Administrator / I.S.O', image: '/images/team/hannah-mercy.jpg' },
                            { name: 'Olet Robert', role: 'Creative Director', image: '/images/team/olet.JPG' }
                        ].map((member, idx) => (
                            <div key={idx} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                <div className="overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-80 object-cover object-top group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.role}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                                    <p className="text-white font-bold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Accordion Style */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h3>
                        <p className="text-lg text-gray-600">Everything you need to know about Biashari</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                                answer: "Email us at info@lehub.dev or call +256-752-553-236. We're happy to assist!"
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accepted Payment Methods Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold text-primary tracking-wide uppercase">Payment Options</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Accepted <span className="text-primary">Payment Methods</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Pay for subscriptions and make purchases and bookings from businesses using your preferred payment method
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {/* Visa Card */}
                            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-200 flex flex-col items-center justify-center">
                                <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 mb-4 shadow-md group-hover:shadow-lg transition-all w-20 h-20 flex items-center justify-center">
                                    <span className="text-white font-black text-3xl italic" style={{fontFamily: 'serif'}}>VISA</span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-center">Visa</h4>
                                <p className="text-sm text-gray-500 text-center mt-1">Credit/Debit Card</p>
                            </div>

                            {/* Mastercard */}
                            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-red-200 flex flex-col items-center justify-center">
                                <div className="bg-white rounded-xl p-4 mb-4 shadow-md group-hover:shadow-lg transition-all w-20 h-20 flex items-center justify-center">
                                    <div className="relative w-16 h-12">
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-red-600"></div>
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-500"></div>
                                    </div>
                                </div>
                                <h4 className="font-bold text-gray-900 text-center">Mastercard</h4>
                                <p className="text-sm text-gray-500 text-center mt-1">Credit/Debit Card</p>
                            </div>

                            {/* MTN Mobile Money */}
                            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-yellow-300 flex flex-col items-center justify-center">
                                <div className="bg-yellow-400 rounded-xl p-4 mb-4 shadow-md group-hover:shadow-lg transition-all w-20 h-20 flex items-center justify-center">
                                    <span className="text-black font-black text-2xl">MTN</span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-center">MTN MoMo</h4>
                                <p className="text-sm text-gray-500 text-center mt-1">Mobile Money</p>
                            </div>

                            {/* Airtel Money */}
                            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-red-300 flex flex-col items-center justify-center">
                                <div className="bg-red-600 rounded-xl p-4 mb-4 shadow-md group-hover:shadow-lg transition-all w-20 h-20 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">airtel</span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-center">Airtel Money</h4>
                                <p className="text-sm text-gray-500 text-center mt-1">Mobile Money</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                                <h4 className="text-2xl font-bold text-gray-900">Secure & Reliable Payments</h4>
                            </div>
                            <p className="text-center text-gray-600 max-w-3xl mx-auto">
                                All transactions are encrypted and secure. Businesses can accept payments through cards and mobile money, while customers enjoy flexible payment options for bookings and purchases.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <div>
                                <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                                    <span className="text-sm font-bold text-primary tracking-wide uppercase">Contact Us</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                    Get In <span className="text-primary">Touch</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Have questions about Biashari? We're here to help your business succeed. Send us a message and we'll get back to you as soon as possible.
                                </p>
                                
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>,
                                            title: 'Our Offices',
                                            content: ['Kati House, Level 3, Kampala', 'Namanve Exhibition Center (opening soon)']
                                        },
                                        {
                                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>,
                                            title: 'Phone',
                                            content: ['+256 752 553 236']
                                        },
                                        {
                                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>,
                                            title: 'Email',
                                            content: ['info@biashari.com']
                                        },
                                        {
                                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>,
                                            title: 'Working Hours',
                                            content: ['Mon-Fri: 9am-6pm', 'Sat: 10am-2pm', 'Sun: Emergency Only']
                                        }
                                    ].map((contact, idx) => (
                                        <div key={idx} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                                                    {contact.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{contact.title}</h3>
                                                {contact.content.map((line, i) => (
                                                    <p key={i} className="text-gray-600">{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inquiry Form */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (isSubmitting) return;
                                    
                                    const formData = new FormData(e.target);
                                    setIsSubmitting(true);
                                    
                                    router.post('/submit-inquiry', {
                                        name: formData.get('name'),
                                        email: formData.get('email'),
                                        phone: formData.get('phone'),
                                        subject: formData.get('subject'),
                                        message: formData.get('message')
                                    }, {
                                        onSuccess: () => {
                                            e.target.reset();
                                            setIsSubmitting(false);
                                            toast.success('Thank you for your inquiry! We will get back to you within 24-48 hours.');
                                        },
                                        onError: (errors) => {
                                            setIsSubmitting(false);
                                            const errorMessage = errors?.message || 'There was an error submitting your inquiry. Please try again.';
                                            toast.error(errorMessage);
                                        }
                                    });
                                }} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                placeholder="+256 752 553 236"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                                            isSubmitting 
                                                ? 'opacity-70 cursor-not-allowed' 
                                                : 'hover:shadow-lg hover:scale-105'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
<ToastContainer />
            <Footer />
        </div>
    )
}

export default HomeScreen
