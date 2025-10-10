import React from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';

function SubscriptionsAnalytics({ auth, subscriptions, currentStatus }) {
    const getDaysLeft = (expiryDate) => {
        if (!expiryDate) return 'No expiry set';
        
        const expiry = new Date(expiryDate);
        const now = new Date();
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'Expired';
        if (diffDays === 0) return 'Expires today';
        if (diffDays === 1) return '1 day left';
        return `${diffDays} days left`;
    };

    const getDaysAgoExpired = (expiryDate) => {
        if (!expiryDate) return 'Never subscribed';
        
        const expiry = new Date(expiryDate);
        const now = new Date();
        const diffTime = now - expiry;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        
        if (diffDays === 0) return 'Expired today';
        if (diffDays === 1) return 'Expired yesterday';
        if (diffDays < 30) return `Expired ${diffDays} days ago`;
        if (diffMonths === 1) return 'Expired 1 month ago';
        if (diffMonths < 12) return `Expired ${diffMonths} months ago`;
        
        const diffYears = Math.floor(diffMonths / 12);
        if (diffYears === 1) return 'Expired 1 year ago';
        return `Expired ${diffYears} years ago`;
    };

    const getExpiryBadge = (expiryDate) => {
        if (!expiryDate) return 'bg-gray-100 text-gray-800';
        
        const expiry = new Date(expiryDate);
        const now = new Date();
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'bg-red-100 text-red-800';
        if (diffDays <= 7) return 'bg-orange-100 text-orange-800';
        if (diffDays <= 30) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getPlanBadge = (plan) => {
        const planColors = {
            basic: 'bg-blue-100 text-blue-800',
            standard: 'bg-purple-100 text-purple-800',
            premium: 'bg-yellow-100 text-yellow-800',
        };
        return planColors[plan] || 'bg-gray-100 text-gray-800';
    };

    const handleStatusChange = (status) => {
        router.get('/admin/analytics/subscriptions', { status });
    };

    return (
        <AdminLayout auth={auth}>
            <Head title={`${currentStatus === 'active' ? 'Active' : 'Inactive'} Subscriptions - Analytics`} />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {currentStatus === 'active' ? 'Active Subscriptions' : 'Inactive Subscriptions'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {currentStatus === 'active' 
                            ? 'Monitor companies with active subscription plans' 
                            : 'View companies with expired or no subscriptions'}
                    </p>
                </div>

                {/* Status Toggle */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">View:</span>
                        <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50">
                            <button
                                onClick={() => handleStatusChange('active')}
                                className={`px-6 py-2 text-sm font-medium rounded-l-lg transition-all duration-200 ${
                                    currentStatus === 'active'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Active Subscriptions
                                </div>
                            </button>
                            <button
                                onClick={() => handleStatusChange('inactive')}
                                className={`px-6 py-2 text-sm font-medium rounded-r-lg transition-all duration-200 ${
                                    currentStatus === 'inactive'
                                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Inactive Subscriptions
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Total Count Card */}
                <div className={`bg-gradient-to-br ${currentStatus === 'active' ? 'from-indigo-500 to-purple-600' : 'from-gray-500 to-gray-600'} rounded-lg shadow-lg p-6 text-white mb-6`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${currentStatus === 'active' ? 'text-indigo-100' : 'text-gray-100'} text-sm font-medium`}>
                                {currentStatus === 'active' ? 'Active Subscriptions' : 'Inactive Subscriptions'}
                            </p>
                            <h2 className="text-4xl font-bold mt-1">{subscriptions.total || 0}</h2>
                            <p className={`${currentStatus === 'active' ? 'text-indigo-100' : 'text-gray-100'} text-sm mt-2`}>
                                {currentStatus === 'active' 
                                    ? 'Companies with valid subscriptions' 
                                    : 'Companies with expired or no subscriptions'}
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-4 rounded-full">
                            {currentStatus === 'active' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className={`bg-gradient-to-r ${currentStatus === 'active' ? 'from-indigo-600 to-purple-600' : 'from-gray-600 to-gray-700'}`}>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Subscription Start
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        {currentStatus === 'active' ? 'Expiry Date' : 'Last Expiry Date'}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        {currentStatus === 'active' ? 'Days Remaining' : 'Expired'}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Location
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subscriptions.data && subscriptions.data.length > 0 ? (
                                    subscriptions.data.map((company) => (
                                        <tr key={company.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{company.name}</div>
                                                {company.slogan && (
                                                    <div className="text-sm text-gray-500">{company.slogan}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanBadge(company.plan)}`}>
                                                    {company.plan ? company.plan.charAt(0).toUpperCase() + company.plan.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {company.subscription_date ? (
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(company.subscription_date).toLocaleDateString()}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-gray-500">N/A</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {company.subscription_expiry ? (
                                                    <>
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(company.subscription_expiry).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(company.subscription_expiry).toLocaleTimeString()}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-sm text-gray-500">N/A</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {currentStatus === 'active' ? (
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getExpiryBadge(company.subscription_expiry)}`}>
                                                        {getDaysLeft(company.subscription_expiry)}
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                        {getDaysAgoExpired(company.subscription_expiry)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {company.location || 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            {currentStatus === 'active' 
                                                ? 'No active subscriptions found.' 
                                                : 'No inactive subscriptions found.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {subscriptions.data && subscriptions.data.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{subscriptions.from}</span> to{' '}
                                <span className="font-medium">{subscriptions.to}</span> of{' '}
                                <span className="font-medium">{subscriptions.total}</span> results
                            </div>
                            <div className="flex gap-2">
                                {subscriptions.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? currentStatus === 'active' 
                                                    ? 'bg-indigo-600 text-white' 
                                                    : 'bg-gray-600 text-white'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default SubscriptionsAnalytics;
