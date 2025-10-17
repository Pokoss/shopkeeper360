import Footer from '@/Layouts/components/Footer'
import Navbar from '@/Layouts/components/Navbar'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@material-tailwind/react'
import React from 'react'

export default function PricingScreen({ plans = [] }) {
    // Map database plans to the format expected by the UI
    const formattedPlans = plans.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: `${plan.currency} ${Number(plan.price).toLocaleString()}`,
        rawPrice: plan.price,
        currency: plan.currency,
        color: plan.color || 'bg-gray-100',
        badge: plan.badge || '',
        features: plan.features || [],
        highlight: plan.is_highlighted || false,
        slug: plan.slug
    }));

    return (
        <div>
            <Head title="Pricing" />
            <Navbar />
            <section className="bg-white py-16">
                <div className="container mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Simple & Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-4">
                        Whether you're running a duka, salon, pharmacy, or restaurant — Biashari helps you manage everything in one place.
                    </p>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Choose the right plan for your business. Start with a free trial, upgrade anytime.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {formattedPlans.map((plan, idx) => (
                        <div
                            key={plan.id || idx}
                            className={`w-full md:w-1/3 max-w-sm rounded-xl shadow-md ${plan.highlight ? 'border-4 border-primary' : ''}`}
                        >
                            <div className={`${plan.color} p-6 rounded-t-xl`}>
                                {plan.badge && (
                                    <span className="text-sm font-medium uppercase tracking-wide text-gray-700">{plan.badge}</span>
                                )}
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
                {formattedPlans.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No pricing plans available at the moment.</p>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
