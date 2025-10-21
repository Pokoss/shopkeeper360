import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Spinner,
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import Navbar from '@/Layouts/components/Navbar';
import Footer from '@/Layouts/components/Footer';

export default function PaymentPage({ paymentLink }) {
    const [processing, setProcessing] = useState(false);

    // Debug: log paymentLink to console
    console.log('PaymentLink data:', paymentLink);

    // Safety check - if no payment link data, show error
    if (!paymentLink) {
        return (
            <>
                <Head title="Payment Link Not Found" />
                <ToastContainer />
                <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardBody className="text-center p-8">
                            <Typography variant="h4" color="red" className="mb-4">
                                Payment Link Not Found
                            </Typography>
                            <Typography className="text-gray-600">
                                The payment link you're trying to access is invalid or does not exist.
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }

    const verifyPayment = async (transaction_id, tx_ref) => {
        try {
            const response = await axios.post('/pay/verify', {
                transaction_id,
                tx_ref,
            });

            if (response.data.success) {
                toast.success('Payment successful! Thank you.');
                // Redirect to success page after 2 seconds
                setTimeout(() => {
                    window.location.href = `/pay/${paymentLink.link_code}/success`;
                }, 2000);
            } else {
                toast.error(response.data.message || 'Payment verification failed');
            }
        } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
        } finally {
            setProcessing(false);
        }
    };

    const flutterwaveConfig = {
        public_key: 'FLWPUBK-505ff9ef3205cff84de16c7170ee6d88-X',
        tx_ref: `PLK_${paymentLink.link_code}_${Date.now()}`,
        amount: parseFloat(paymentLink.fees?.total_amount || paymentLink.amount),
        currency: paymentLink.currency || 'UGX',
        payment_options: 'card,mobilemoney',
        customer: {
            email: paymentLink.customer_email || 'customer@example.com',
            phone_number: paymentLink.customer_phone,
            name: paymentLink.customer_name,
        },
        customizations: {
            title: paymentLink.company_name,
            description: paymentLink.purpose || 'Payment',
            logo: paymentLink.company_logo || 'https://biashari.com/images/user/shopkeeper360.png',
        },
        callback: (response) => {
            console.log('Flutterwave Response:', response);
            closePaymentModal();

            if (response.status === 'successful' || response.status === 'completed') {
                verifyPayment(
                    response.transaction_id,
                    response.tx_ref
                );
            } else {
                toast.error('Payment was not successful. Please try again.');
                setProcessing(false);
            }
        },
        onClose: () => {
            console.log('Payment modal closed');
            setProcessing(false);
        },
    };

    // Initialize Flutterwave hook
    const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

    const handlePaymentClick = async () => {
        setProcessing(true);
        try {
            // Initiate payment on backend first
            const response = await axios.post(`/pay/${paymentLink.link_code}/initiate`);
            if (response.data.success) {
                // Update config with backend tx_ref and total amount including fees
                flutterwaveConfig.tx_ref = response.data.tx_ref;
                flutterwaveConfig.amount = response.data.payment_link.amount; // Use total amount with fees
                handleFlutterPayment({
                    callback: (response) => {
                        console.log('Flutterwave Response:', response);
                        closePaymentModal();

                        if (response.status === 'successful' || response.status === 'completed') {
                            verifyPayment(
                                response.transaction_id,
                                response.tx_ref
                            );
                        } else {
                            toast.error('Payment was not successful. Please try again.');
                            setProcessing(false);
                        }
                    },
                    onClose: () => {
                        console.log('Payment modal closed');
                        setProcessing(false);
                    },
                });
            } else {
                toast.error(response.data.message || 'Failed to initiate payment');
                setProcessing(false);
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
            toast.error('Failed to initiate payment. Please try again.');
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title={`Payment - ${paymentLink.company_name}`} />
            <ToastContainer />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
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
                            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                                {(paymentLink.company_name || 'B').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <Typography variant="h5" color="blue-gray" className="font-bold">
                            {paymentLink.company_name || 'Business'}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                            Payment Request
                        </Typography>
                    </div>

                    <Card className="shadow-xl">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6"
                        >
                            <Typography variant="h3" color="white" className="text-center font-bold">
                                {paymentLink.formatted_amount}
                            </Typography>
                            <Typography variant="small" color="white" className="text-center opacity-90 mt-1">
                                Amount to Pay
                            </Typography>
                        </CardHeader>
                        
                        <CardBody className="space-y-6">
                            {/* Customer Details */}
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <Typography variant="small" className="font-semibold text-gray-700 uppercase tracking-wide">
                                    Payment Details
                                </Typography>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Typography variant="small" className="text-gray-600">
                                            Customer Name:
                                        </Typography>
                                        <Typography variant="small" className="font-semibold text-gray-900">
                                            {paymentLink.customer_name}
                                        </Typography>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <Typography variant="small" className="text-gray-600">
                                            Phone Number:
                                        </Typography>
                                        <Typography variant="small" className="font-semibold text-gray-900">
                                            {paymentLink.customer_phone}
                                        </Typography>
                                    </div>
                                    
                                    {paymentLink.customer_email && (
                                        <div className="flex justify-between items-center">
                                            <Typography variant="small" className="text-gray-600">
                                                Email:
                                            </Typography>
                                            <Typography variant="small" className="font-semibold text-gray-900">
                                                {paymentLink.customer_email}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Purpose */}
                            {paymentLink.purpose && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <Typography variant="small" className="font-semibold text-blue-900 mb-2">
                                        Purpose
                                    </Typography>
                                    <Typography variant="small" className="text-blue-800">
                                        {paymentLink.purpose}
                                    </Typography>
                                </div>
                            )}

                            {/* Fee Breakdown Table */}
                            {paymentLink.fee_breakdown && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                        <Typography variant="small" className="font-semibold text-gray-700 uppercase tracking-wide">
                                            Payment Breakdown
                                        </Typography>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {paymentLink.fee_breakdown.map((item, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex justify-between items-center px-4 py-3 ${
                                                    item.is_total ? 'bg-blue-50 font-semibold' : 'bg-white'
                                                }`}
                                            >
                                                <Typography 
                                                    variant="small" 
                                                    className={item.is_total ? 'text-blue-900 font-bold' : 'text-gray-700'}
                                                >
                                                    {item.label}
                                                </Typography>
                                                <Typography 
                                                    variant="small" 
                                                    className={item.is_total ? 'text-blue-900 font-bold text-lg' : 'text-gray-900'}
                                                >
                                                    {item.formatted}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Payment Button */}
                            <div className="pt-4">
                                <Button
                                    size="lg"
                                    color="blue"
                                    className="w-full flex items-center justify-center gap-2"
                                    onClick={handlePaymentClick}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <Spinner className="h-5 w-5" />
                                            Preparing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Pay {paymentLink.formatted_amount}
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Security Notice */}
                            <div className="flex items-center justify-center gap-2 text-gray-500 pt-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <Typography variant="small" className="text-xs">
                                    Secured by Flutterwave
                                </Typography>
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
