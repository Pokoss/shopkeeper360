import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';

function TransactionsAnalytics({ auth, transactions, totalTransactionCount, currentMonth, currentYear }) {
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
        router.get('/admin/analytics/transactions', {
            month: filterMonth,
            year: filterYear,
        });
    };

    const getPlanBadge = (plan) => {
        const planColors = {
            basic: 'bg-blue-100 text-blue-800',
            standard: 'bg-purple-100 text-purple-800',
            premium: 'bg-yellow-100 text-yellow-800',
        };
        return planColors[plan] || 'bg-gray-100 text-gray-800';
    };

    const getTransactionBadge = (count) => {
        if (count >= 100) return 'bg-green-100 text-green-800';
        if (count >= 50) return 'bg-blue-100 text-blue-800';
        if (count >= 20) return 'bg-yellow-100 text-yellow-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Company Transactions - Analytics" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Company Transactions</h1>
                    <p className="text-gray-600 mt-1">Track transaction volumes by company</p>
                </div>

                {/* Total Count Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-green-100 text-sm font-medium">Transaction Summary</p>
                            <div className="flex items-baseline gap-3 mt-1">
                                <h2 className="text-4xl font-bold">{transactions.total || 0}</h2>
                                <span className="text-green-100 text-lg">
                                    {transactions.total === 1 ? 'company' : 'companies'}
                                </span>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-green-100 text-sm">with a total of</span>
                                <span className="text-2xl font-bold">{totalTransactionCount?.toLocaleString() || 0}</span>
                                <span className="text-green-100 text-sm">
                                    {totalTransactionCount === 1 ? 'transaction' : 'transactions'}
                                </span>
                            </div>
                            <p className="text-green-100 text-xs mt-2">
                                For {months.find(m => m.value === parseInt(filterMonth))?.label} {filterYear}
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 transition-all duration-200"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-green-600 to-green-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Transaction Count
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Performance
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.data && transactions.data.length > 0 ? (
                                    transactions.data.map((transaction, index) => (
                                        <tr key={transaction.company_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {index + transactions.from <= 3 && (
                                                        <div className="mr-2">
                                                            {index + transactions.from === 1 && (
                                                                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )}
                                                            {index + transactions.from === 2 && (
                                                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )}
                                                            {index + transactions.from === 3 && (
                                                                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        #{index + transactions.from}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{transaction.company_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanBadge(transaction.plan)}`}>
                                                    {transaction.plan ? transaction.plan.charAt(0).toUpperCase() + transaction.plan.slice(1) : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {transaction.transaction_count.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTransactionBadge(transaction.transaction_count)}`}>
                                                    {transaction.transaction_count >= 100 ? 'Excellent' :
                                                     transaction.transaction_count >= 50 ? 'Good' :
                                                     transaction.transaction_count >= 20 ? 'Average' : 'Low'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No transactions found for the selected period.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {transactions.data && transactions.data.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{transactions.from}</span> to{' '}
                                <span className="font-medium">{transactions.to}</span> of{' '}
                                <span className="font-medium">{transactions.total}</span> results
                            </div>
                            <div className="flex gap-2">
                                {transactions.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? 'bg-green-600 text-white'
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

export default TransactionsAnalytics;
