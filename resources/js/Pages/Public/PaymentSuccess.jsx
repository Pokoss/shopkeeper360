import React from 'react';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardBody,
    Typography,
    Button,
} from '@material-tailwind/react';

export default function PaymentSuccess({ paymentLink }) {
    return (
        <>
            <Head title="Payment Successful" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Company Logo/Header */}
                    <div className="text-center mb-6">
                        {paymentLink.company_logo ? (
                            <img 
                                src={paymentLink.company_logo} 
                                alt={paymentLink.company_name}
                                className="h-20 w-20 mx-auto mb-4 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                                {(paymentLink.company_name || 'B').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <Typography variant="h5" color="blue-gray" className="font-bold">
                            {paymentLink.company_name || 'Business'}
                        </Typography>
                    </div>

                    <Card className="shadow-xl">
                        <CardBody className="text-center p-8 space-y-6">
                            {/* Success Icon */}
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Success Message */}
                            <div>
                                <Typography variant="h4" color="green" className="font-bold mb-2">
                                    Payment Successful!
                                </Typography>
                                <Typography variant="small" className="text-gray-600">
                                    Your payment has been processed successfully
                                </Typography>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <Typography variant="small" className="text-gray-600">
                                        Amount Paid:
                                    </Typography>
                                    <Typography variant="h6" color="green" className="font-bold">
                                        {paymentLink.formatted_amount}
                                    </Typography>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <Typography variant="small" className="text-gray-600">
                                        Customer:
                                    </Typography>
                                    <Typography variant="small" className="font-semibold text-gray-900">
                                        {paymentLink.customer_name}
                                    </Typography>
                                </div>

                                {paymentLink.purpose && (
                                    <div className="flex justify-between items-center">
                                        <Typography variant="small" className="text-gray-600">
                                            Purpose:
                                        </Typography>
                                        <Typography variant="small" className="font-semibold text-gray-900">
                                            {paymentLink.purpose}
                                        </Typography>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <Typography variant="small" className="text-gray-600">
                                        Reference:
                                    </Typography>
                                    <Typography variant="small" className="font-semibold text-gray-900 font-mono">
                                        {paymentLink.link_code}
                                    </Typography>
                                </div>

                                {paymentLink.paid_at && (
                                    <div className="flex justify-between items-center">
                                        <Typography variant="small" className="text-gray-600">
                                            Date:
                                        </Typography>
                                        <Typography variant="small" className="font-semibold text-gray-900">
                                            {paymentLink.paid_at}
                                        </Typography>
                                    </div>
                                )}
                            </div>

                            {/* Thank You Message */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <Typography variant="small" className="text-green-900 font-semibold">
                                    🎉 Thank you for your payment!
                                </Typography>
                                <Typography variant="small" className="text-green-800 mt-1">
                                    A confirmation has been sent to {paymentLink.company_name}
                                </Typography>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-4">
                                <Button
                                    color="green"
                                    className="w-full"
                                    onClick={() => window.print()}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print Receipt
                                </Button>
                                
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    className="w-full"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Return to Home
                                </Button>
                            </div>
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
