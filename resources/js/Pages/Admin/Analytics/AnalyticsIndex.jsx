import React from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function AnalyticsIndex({ auth }) {
    const analyticsCards = [
        {
            title: 'Recently Created Companies',
            description: 'View companies that recently joined the platform with month/year filtering',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            link: '/admin/analytics/companies',
            gradient: 'from-purple-500 to-purple-600',
        },
        {
            title: 'User Activity',
            description: 'Track user registrations and last login activity',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            link: '/admin/analytics/users',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Active Subscriptions',
            description: 'Monitor subscription status and expiry dates',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            link: '/admin/analytics/subscriptions',
            gradient: 'from-indigo-500 to-purple-600',
        },
        {
            title: 'Company Transactions',
            description: 'View transaction volumes by company with monthly filtering',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            link: '/admin/analytics/transactions',
            gradient: 'from-green-500 to-green-600',
        },
    ];

    return (
        <AdminLayout auth={auth}>
            <Head title="Analytics & Reports" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
                    <p className="text-gray-600 mt-2">Sales and marketing insights to drive business growth</p>
                </div>

                {/* Analytics Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analyticsCards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.link}
                            className="block group"
                        >
                            <div className={`bg-gradient-to-br ${card.gradient} rounded-lg shadow-lg p-8 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                                        {card.icon}
                                    </div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="w-6 h-6 transform transition-transform duration-200 group-hover:translate-x-1" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                                <p className="text-white text-opacity-90 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Information Banner */}
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Analytics & Reports</h3>
                            <p className="text-blue-800 mb-2">
                                This section provides comprehensive insights for sales and marketing teams to track business performance and customer engagement.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-blue-800">
                                <li>All data is paginated (20 results per page) for optimal performance</li>
                                <li>Filter by month and year where applicable</li>
                                <li>Real-time data synchronized with your database</li>
                                <li>Export functionality coming soon</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AnalyticsIndex;
