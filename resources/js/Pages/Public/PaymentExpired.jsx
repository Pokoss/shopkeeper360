import React from 'react';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardBody,
    Typography,
    Button,
} from '@material-tailwind/react';
import Navbar from '@/Layouts/components/Navbar';

export default function PaymentExpired({ paymentLink }) {
    const getMessage = () => {
        switch (paymentLink.status) {
            case 'paid':
                return {
                    title: 'Payment Already Completed',
                    message: 'This payment link has already been paid.',
                    icon: (
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    color: 'green',
                };
            case 'expired':
                return {
                    title: 'Payment Link Expired',
                    message: 'This payment link has expired and is no longer valid.',
                    icon: (
                        <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    color: 'gray',
                };
            case 'cancelled':
                return {
                    title: 'Payment Link Cancelled',
                    message: 'This payment link has been cancelled by the merchant.',
                    icon: (
                        <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    color: 'red',
                };
            default:
                return {
                    title: 'Payment Link Unavailable',
                    message: 'This payment link is not available.',
                    icon: (
                        <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ),
                    color: 'gray',
                };
        }
    };

    const content = getMessage();

    return (
        <>
        
            <Head title="Payment Link Unavailable" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl">
                        <CardBody className="text-center py-12 px-6">
                            {/* Icon */}
                            <div className="mb-6">
                                {content.icon}
                            </div>

                            {/* Title */}
                            <Typography variant="h4" color="blue-gray" className="mb-3 font-bold">
                                {content.title}
                            </Typography>

                            {/* Message */}
                            <Typography className="text-gray-600 mb-6">
                                {content.message}
                            </Typography>

                            {/* Company Info */}
                            {paymentLink.company_name && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <Typography variant="small" className="text-gray-600 mb-1">
                                        Merchant
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray">
                                        {paymentLink.company_name}
                                    </Typography>
                                </div>
                            )}

                            {/* Action */}
                            <Typography variant="small" className="text-gray-600 mb-4">
                                Please contact the merchant if you believe this is an error.
                            </Typography>

                            <Button
                                size="lg"
                                color="blue"
                                variant="outlined"
                                onClick={() => window.location.href = '/'}
                                className="w-full"
                            >
                                Go to Homepage
                            </Button>
                        </CardBody>
                    </Card>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <Typography variant="small" className="text-gray-500">
                            Powered by Biashari
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
