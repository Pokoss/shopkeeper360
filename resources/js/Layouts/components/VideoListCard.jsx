import React, { useState } from 'react'
import { Link } from '@inertiajs/react';

export default function VideoListCard({ title, time, image, price }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group cursor-pointer">
            <div className="p-3 border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 rounded-lg">
                <div className="flex gap-3 items-start">
                    <div className="relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {imageError ? (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary/40">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                        ) : (
                            <img 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                src={image} 
                                alt={title}
                                onError={() => setImageError(true)}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 group-hover:text-primary line-clamp-2 mb-1 transition-colors duration-300">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-600 flex-shrink-0">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 13.24a.75.75 0 101.1 1.02l2.1-2.25a.75.75 0 00.2-.51V6.75z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-bold text-red-600 truncate">
                                UGX {Intl.NumberFormat('en-US').format(price)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400 flex-shrink-0">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                            </svg>
                            <p className="text-xs text-gray-500 truncate">{time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
