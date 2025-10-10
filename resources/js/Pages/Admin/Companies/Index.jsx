import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function CompaniesIndex({ auth, companies }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getStatusBadge = (company) => {
        if (!company.subscription_end) {
            return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">No Subscription</span>;
        }
        
        const endDate = new Date(company.subscription_end);
        const now = new Date();
        
        if (endDate < now) {
            return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>;
        } else if ((endDate - now) / (1000 * 60 * 60 * 24) <= 7) {
            return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Expiring Soon</span>;
        } else {
            return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Companies Management" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Companies Management</h1>
                    <p className="text-gray-600 mt-1">Manage all registered companies</p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search companies by name or slug..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.data && companies.data.length > 0 ? (
                        companies.data
                            .filter(company => 
                                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                company.slug.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((company) => (
                            <div key={company.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden">
                                {/* Company Header */}
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                src={company.logo ? `/${company.logo}` : '/images/user/user.png'} 
                                                alt={company.name}
                                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg">{company.name}</h3>
                                                <p className="text-sm text-purple-100">/{company.slug}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(company)}
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="p-4 space-y-3">
                                    {/* Owner Info */}
                                    {company.owner && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-gray-600">Owner:</span>
                                            <span className="font-medium text-gray-900">{company.owner.name}</span>
                                        </div>
                                    )}

                                    {/* Employees */}
                                    {company.employees && company.employees.length > 0 && (
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span className="text-gray-600 font-medium">Employees ({company.employees.length}):</span>
                                            </div>
                                            <div className="ml-6 flex flex-wrap gap-1">
                                                {company.employees.slice(0, 3).map((employee) => (
                                                    <span key={employee.id} className="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded">
                                                        {employee.user ? employee.user.name : 'Unknown'} 
                                                        {employee.position && <span className="text-indigo-500"> ({employee.position})</span>}
                                                    </span>
                                                ))}
                                                {company.employees.length > 3 && (
                                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                                        +{company.employees.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact */}
                                    {company.phone && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="text-gray-600">{company.phone}</span>
                                        </div>
                                    )}

                                    {/* Email */}
                                    {company.email && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-600 truncate">{company.email}</span>
                                        </div>
                                    )}

                                    {/* Location */}
                                    {company.location && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-gray-600 truncate">{company.location}</span>
                                        </div>
                                    )}

                                    {/* Subscription Info */}
                                    {company.subscription_end && (
                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="text-xs text-gray-500">
                                                Subscription ends: <span className="font-medium text-gray-700">{new Date(company.subscription_end).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Created Date */}
                                    <div className="text-xs text-gray-500">
                                        Registered: {new Date(company.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                                    <Link 
                                        href={`/dashboard/${company.slug}`}
                                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                                    >
                                        View Dashboard
                                    </Link>
                                    {auth.user.admin >= 1 && (
                                        <Link 
                                            href={`/admin/companies/${company.id}/edit`}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Manage
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No companies found
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {companies.links && companies.links.length > 3 && (
                    <div className="mt-6 bg-white rounded-lg shadow-md px-4 py-3 flex items-center justify-between sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {companies.prev_page_url && (
                                <Link href={companies.prev_page_url} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Previous
                                </Link>
                            )}
                            {companies.next_page_url && (
                                <Link href={companies.next_page_url} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{companies.from}</span> to <span className="font-medium">{companies.to}</span> of{' '}
                                    <span className="font-medium">{companies.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {companies.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${index === companies.links.length - 1 ? 'rounded-r-md' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default CompaniesIndex;
