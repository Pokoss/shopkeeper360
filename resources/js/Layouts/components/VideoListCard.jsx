import React from 'react'
import { Link } from '@inertiajs/react';

export default function VideoListCard({ title, time, image }) {

    return (
        <div>
                <div className="py-2 border-t border-gray-300 hover:bg-gray-300">
                    <div className="flex justify-start items-center">
                        <div className="lg:w-auto mr-2 mb-8 lg:mb-0">
                            <img className="block w-40 h-20 object-cover" src={image} alt="" />
                        </div>
                        <div className="w-full lg:w-9/12 mr-2 mb-10 lg:mb-0">
                            <div className="">
                                <p className="text-sm font-semibold line-clamp-3 text-black hover:underline">{title}</p>
                                <p className="text-sm font-thin line-clamp-3 text-black hover:underline">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
