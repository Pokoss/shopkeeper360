import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';

function CompaniesAnalytics({ auth, companies, currentMonth, currentYear }) {
    const [filterMonth, setFilterMonth] = useState(currentMonth);
    const [filterYear, setFilterYear] = useState(currentYear);

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const years = [];
    const currentYearVal = new Date().getFullYear();
    for (let i = currentYearVal; i >= currentYearVal - 5; i--) {
        years.push(i);
    }

    const handleFilter = () => {
        router.get('/admin/analytics/companies', {
            month: filterMonth,
            year: filterYear,
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPlanBadge = (plan) => {
        const planColors = {
            basic: 'bg-blue-100 text-blue-800',
            standard: 'bg-purple-100 text-purple-800',
            premium: 'bg-yellow-100 text-yellow-800',
        };
        return planColors[plan] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Recently Created Companies - Analytics" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Recently Created Companies</h1>
                    <p className="text-gray-600 mt-1">Track new companies joining the platform</p>
                </div>

                {/* Total Count Card */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Total Companies Found</p>
                            <h2 className="text-4xl font-bold mt-1">{companies.total || 0}</h2>
                            <p className="text-purple-100 text-sm mt-2">
                                For {months.find(m => m.value === parseInt(filterMonth))?.label} {filterYear}
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Month
                            </label>
                            <select
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year
                            </label>
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleFilter}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {companies.data && companies.data.length > 0 ? (
                                    companies.data.map((company) => (
                                        <tr key={company.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{company.name}</div>
                                                {company.slogan && (
                                                    <div className="text-sm text-gray-500">{company.slogan}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {company.owner ? company.owner.name : 'N/A'}
                                                </div>
                                                {company.owner && company.owner.email && (
                                                    <div className="text-xs text-gray-500">{company.owner.email}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanBadge(company.plan)}`}>
                                                    {company.plan ? company.plan.charAt(0).toUpperCase() + company.plan.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(company.status)}`}>
                                                    {company.status ? company.status.charAt(0).toUpperCase() + company.status.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {company.location || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(company.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No companies found for the selected period.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {companies.data && companies.data.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{companies.from}</span> to{' '}
                                <span className="font-medium">{companies.to}</span> of{' '}
                                <span className="font-medium">{companies.total}</span> results
                            </div>
                            <div className="flex gap-2">
                                {companies.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? 'bg-purple-600 text-white'
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

export default CompaniesAnalytics;
