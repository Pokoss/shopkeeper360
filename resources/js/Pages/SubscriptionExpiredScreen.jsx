import { Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';

function SubscriptionExpiredScreen({ company }) {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch pricing plans from API
        axios.get('/api/pricing-plans')
            .then(response => {
                const fetchedPlans = response.data.plans || [];
                setPlans(fetchedPlans);
                // Default to basic plan if available
                const basicPlan = fetchedPlans.find(p => p.slug === 'basic');
                setSelectedPlan(basicPlan || fetchedPlans[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pricing plans:', error);
                toast.error('Failed to load pricing plans');
                setLoading(false);
            });
    }, []);

    const renewSubscription = (planId) => {
        var company_id = company.company.id

        router.post('/renew-subscription', { 
            company_id,
            plan_id: planId 
        }, {
            preserveScroll: true,
            onSuccess: () => {
                closePaymentModal() // this will close the modal programmatically
                toast.success('Subscription renewed successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to renew subscription');
                console.error(errors);
            }
        })
    }

    // Generate FlutterWave config dynamically based on selected plan
    const getFlutterWaveConfig = () => {
        if (!selectedPlan) return null;

        const config = {
            public_key: 'FLWPUBK_TEST-03db37124e5570cb191b65425abfb963-X',
            // public_key: 'FLWPUBK-505ff9ef3205cff84de16c7170ee6d88-X',
            tx_ref: Date.now(),
            amount: parseFloat(selectedPlan.price),
            currency: selectedPlan.currency || 'UGX',
            payment_options: 'card,mobilemoney',
            customer: {
                email: company.user.email,
                name: company.user.name,
            },
            customizations: {
                title: 'Biashari',
                description: `${selectedPlan.name} Subscription`,
                logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
            },
        };

        return {
            ...config,
            text: `Pay ${selectedPlan.currency} ${Number(selectedPlan.price).toLocaleString()}`,
            callback: (response) => {
                console.log(response);
                renewSubscription(selectedPlan.id);
            },
            onClose: () => { },
        };
    };

    const fwConfig = getFlutterWaveConfig();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-600">Loading pricing plans...</p>
            </div>
        );
    }

    return (
        <div>
            <section>
                <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-5xl">
                    <img className='w-28 h-28' src='/images/user/shopkeeper360.png' />
                    <h1 className="text-4xl text-primary font-bold leading sm:text-4xl">Biashari</h1>
                    <p className="px-8 mt-8 mb-5 text-lg">
                        Hey, {company.company.name}, your subscription has expired. Please select a plan below to renew your subscription.
                    </p>

                    {/* Pricing Plans Selection */}
                    {plans.length > 0 && (
                        <div className="w-full max-w-4xl mb-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Plan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {plans.map(plan => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`cursor-pointer rounded-xl shadow-md transition-all duration-200 ${
                                            selectedPlan?.id === plan.id
                                                ? 'border-4 border-primary scale-105'
                                                : 'border-2 border-gray-200 hover:border-primary hover:scale-102'
                                        } ${plan.is_highlighted ? 'ring-2 ring-purple-300' : ''}`}
                                    >
                                        <div className={`p-6 rounded-t-xl`} style={{ backgroundColor: plan.color || '#f3f4f6' }}>
                                            {plan.badge && (
                                                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full">
                                                    {plan.badge}
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                            <p className="text-3xl font-semibold mt-4 text-gray-900">
                                                {plan.currency} {Number(plan.price).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">Per Month</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-b-xl">
                                            <ul className="space-y-3 text-left">
                                                {plan.features.slice(0, 4).map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                                {plan.features.length > 4 && (
                                                    <li className="text-sm text-gray-500 italic">
                                                        +{plan.features.length - 4} more features
                                                    </li>
                                                )}
                                            </ul>
                                            {selectedPlan?.id === plan.id && (
                                                <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Selected
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href='/company' 
                            className="px-8 py-3 text-lg font-semibold rounded bg-white shadow-sm shadow-primary text-gray-900 hover:bg-gray-50 transition"
                        >
                            Go Home
                        </Link>
                        {fwConfig && selectedPlan && (
                            <FlutterWaveButton 
                                {...fwConfig} 
                                className='px-8 py-3 text-lg border bg-primary text-white rounded hover:bg-primary-dark transition-all shadow-md hover:shadow-lg' 
                            />
                        )}
                    </div>

                    {!selectedPlan && plans.length > 0 && (
                        <p className="mt-4 text-red-600">Please select a plan to continue</p>
                    )}
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default SubscriptionExpiredScreen
