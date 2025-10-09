import React from 'react'
import { Link } from '@inertiajs/react'

function CompanyCard({props}) {
    const logoUrl = props.company.logo !== '' ? '/' + props.company.logo : '/images/user/user.png';

    return (
        <Link href={`/dashboard/${props.company.slug}`}>
            <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
                {/* Header with gradient background */}
                <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            props.company.active 
                                ? 'bg-green-400 text-green-900' 
                                : 'bg-gray-400 text-gray-900'
                        }`}>
                            {'Active'}
                        </span>
                    </div>
                </div>

                {/* Company Info */}
                <div className="p-6 relative">
                    {/* Logo positioned to overlap gradient */}
                    <div className="absolute -top-12 left-6">
                        <div className="h-20 w-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                            <img 
                                src={logoUrl} 
                                alt={props.company.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-10">
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                {props.company.name}
                            </h3>
                        </div>

                        {/* Role Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-lg text-sm font-semibold flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {props.position}
                            </div>
                        </div>

                        {/* Company Details Grid */}
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                            {props.company.category && (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>{props.company.category}</span>
                                </div>
                            )}
                            {props.company.location && (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{props.company.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500 font-medium">
                                View Dashboard
                            </span>
                            <div className="flex items-center gap-2 text-secondary group-hover:text-primary transition-colors">
                                <span className="text-sm font-semibold">Open</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CompanyCard