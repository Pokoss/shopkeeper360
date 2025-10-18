import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Typography, Textarea, Button, Chip, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Layout from '@/Layouts/components/Layout';

function SmsScreen({ company, smsBalance, sentSms, bundles, maxLength }) {
    const [selectedBundle, setSelectedBundle] = useState(null);
    const [showTopupModal, setShowTopupModal] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [recipientCount, setRecipientCount] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
        recipients: '',
    });

    // FlutterWave configuration - must be at top level
    const flutterwaveConfig = {
        // public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '',
        public_key: 'FLWPUBK_TEST-03db37124e5570cb191b65425abfb963-X',
            // public_key: 'FLWPUBK-505ff9ef3205cff84de16c7170ee6d88-X',
        tx_ref: Date.now().toString(),
        amount: selectedBundle?.price || 1000,
        currency: 'UGX',
        payment_options: 'mobilemoney, card',
        customer: {
            email: company?.user?.email || company?.company?.email || 'customer@example.com',
            phone_number: company?.company?.contacts || '256700000000',
            name: company?.company?.name || 'Customer',
        },
        customizations: {
            title: 'SMS Top-up',
            description: selectedBundle ? `${selectedBundle.name} - ${selectedBundle.sms_count} SMS` : 'SMS Bundle Purchase',
            logo: 'https://biashari.com/images/logo.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

    // Calculate message length with company name
    const calculateMessageLength = (message) => {
        const companyNameSuffix = ` - ${company.company.name}`;
        return message.length + companyNameSuffix.length;
    };

    // Count valid recipients
    const countRecipients = (recipientsText) => {
        if (!recipientsText.trim()) return 0;
        const numbers = recipientsText.split(/[\s,\n\r]+/).filter(n => n.trim().length > 0);
        return numbers.length;
    };

    const handleMessageChange = (e) => {
        const msg = e.target.value;
        setData('message', msg);
        setMessageLength(calculateMessageLength(msg));
    };

    const handleRecipientsChange = (e) => {
        const recipients = e.target.value;
        setData('recipients', recipients);
        setRecipientCount(countRecipients(recipients));
    };

    const handleSend = (e) => {
        e.preventDefault();

        if (recipientCount === 0) {
            toast.error('Please enter at least one valid phone number');
            return;
        }

        if (smsBalance < recipientCount) {
            toast.error(`Insufficient SMS balance. You need ${recipientCount} SMS but have only ${smsBalance}`);
            return;
        }

        if (messageLength > maxLength) {
            toast.error(`Message too long. Maximum ${maxLength} characters including company name`);
            return;
        }

        toast.loading('Sending SMS...');
        
        post(route('sms.send', company.company.slug), {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss();
                toast.success('SMS sent successfully!');
                reset();
                setMessageLength(0);
                setRecipientCount(0);
            },
            onError: () => {
                toast.dismiss();
                if (errors.balance) {
                    toast.error(errors.balance);
                } else if (errors.recipients) {
                    toast.error(errors.recipients);
                } else {
                    toast.error('Failed to send SMS');
                }
            }
        });
    };

    const handleTopup = (bundle) => {
        setSelectedBundle(bundle);
        setShowTopupModal(true);
    };

    const processTopup = () => {
        if (!selectedBundle) {
            toast.error('Please select a bundle');
            return;
        }

        // Check if FlutterWave key is configured
        // if (!import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY) {
        //     toast.error('Payment gateway not configured. Please contact support.');
        //     console.error('VITE_FLUTTERWAVE_PUBLIC_KEY is not set in environment variables');
        //     return;
        // }

        console.log('Opening FlutterWave payment for bundle:', selectedBundle);

        // Close the confirmation modal first
        setShowTopupModal(false);

        // Open FlutterWave payment modal
        handleFlutterPayment({
            callback: (response) => {
                closePaymentModal();
                
                if (response.status === "successful" || response.status === "completed") {
                    // Process the top-up
                    router.post(route('sms.topup', company.company.slug), {
                        bundle_id: selectedBundle.id,
                        transaction_reference: String(response.transaction_id || response.tx_ref || 'N/A'),
                        payment_method: String(response.payment_type || 'flutterwave'),
                    }, {
                        preserveScroll: false,
                        onSuccess: () => {
                            toast.success('SMS credits added successfully!');
                            setSelectedBundle(null);
                        },
                        onError: () => {
                            toast.error('Failed to process top-up');
                        }
                    });
                } else {
                    toast.error('Payment was not completed');
                }
            },
            onClose: () => {
                toast.info('Payment cancelled');
                setSelectedBundle(null);
            },
        });
    };

    return (
        <>
            <Head title="SMS Messaging" />
            <div className="p-6">
                <div className="mb-6">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        SMS Messaging
                    </Typography>
                    <Typography variant="small" color="gray">
                        Send SMS messages to your customers
                    </Typography>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Send SMS Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader floated={false} shadow={false} className="rounded-none bg-gradient-to-r from-primary to-secondary p-6">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h5" color="white">
                                        Compose Message
                                    </Typography>
                                    <Chip 
                                        value={`${smsBalance} SMS Credits`} 
                                        color={smsBalance > 10 ? "green" : "red"}
                                        className="text-white"
                                    />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSend} className="space-y-4">
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                            Recipients (Phone Numbers)
                                        </Typography>
                                        <Textarea
                                            label="Enter phone numbers (256XXXXXXXXX or +256XXXXXXXXX)"
                                            value={data.recipients}
                                            onChange={handleRecipientsChange}
                                            rows={4}
                                            error={!!errors.recipients}
                                        />
                                        <Typography variant="small" color="gray" className="mt-1">
                                            Separate numbers with comma, space, or new line. {recipientCount} recipient(s)
                                        </Typography>
                                        {errors.recipients && (
                                            <Typography variant="small" color="red" className="mt-1">
                                                {errors.recipients}
                                            </Typography>
                                        )}
                                    </div>

                                    <div>
                                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                            Message
                                        </Typography>
                                        <Textarea
                                            label="Type your message here"
                                            value={data.message}
                                            onChange={handleMessageChange}
                                            rows={6}
                                            error={!!errors.message || messageLength > maxLength}
                                        />
                                        <div className="flex justify-between mt-1">
                                            <Typography variant="small" color="gray">
                                                Company name will be appended: " - {company.company.name}"
                                            </Typography>
                                            <Typography 
                                                variant="small" 
                                                color={messageLength > maxLength ? "red" : "gray"}
                                            >
                                                {messageLength}/{maxLength} characters
                                            </Typography>
                                        </div>
                                        {errors.message && (
                                            <Typography variant="small" color="red" className="mt-1">
                                                {errors.message}
                                            </Typography>
                                        )}
                                    </div>

                                    {errors.balance && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <Typography variant="small" color="red">
                                                {errors.balance}
                                            </Typography>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <Typography variant="small" color="blue-gray">
                                            Cost: {recipientCount} SMS credit(s)
                                        </Typography>
                                        <Button 
                                            type="submit" 
                                            disabled={processing || recipientCount === 0 || smsBalance < recipientCount}
                                            className="bg-gradient-to-r from-primary to-secondary"
                                        >
                                            {processing ? 'Sending...' : 'Send SMS'}
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>

                    {/* SMS Bundles */}
                    <div>
                        <Card>
                            <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-4">
                                <Typography variant="h6" color="blue-gray">
                                    Top-up SMS Credits
                                </Typography>
                            </CardHeader>
                            <CardBody className="space-y-3">
                                {bundles.length === 0 ? (
                                    <Typography variant="small" color="gray">
                                        No bundles available
                                    </Typography>
                                ) : (
                                    bundles.map((bundle) => (
                                        <div 
                                            key={bundle.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                                            onClick={() => handleTopup(bundle)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <Typography variant="small" color="gray" className="text-xs">
                                                        {bundle.name}
                                                    </Typography>
                                                    <Typography variant="h6" color="blue-gray">
                                                        {bundle.sms_count} SMS
                                                    </Typography>
                                                </div>
                                                <Chip value={`UGX ${bundle.price.toLocaleString()}`} color="green" size="sm" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardBody>
                        </Card>

                        {/* SMS History Preview */}
                        <Card className="mt-4">
                            <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-4">
                                <Typography variant="h6" color="blue-gray">
                                    Recent Messages
                                </Typography>
                            </CardHeader>
                            <CardBody className="space-y-2">
                                {sentSms.data.length === 0 ? (
                                    <Typography variant="small" color="gray">
                                        No messages sent yet
                                    </Typography>
                                ) : (
                                    sentSms.data.slice(0, 5).map((sms) => (
                                        <div key={sms.id} className="border-b border-gray-100 pb-2">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {sms.total_sent} recipient(s)
                                            </Typography>
                                            <Typography variant="small" color="gray" className="truncate">
                                                {sms.message.substring(0, 50)}...
                                            </Typography>
                                            <Typography variant="small" color="gray">
                                                {new Date(sms.created_at).toLocaleDateString()}
                                            </Typography>
                                        </div>
                                    ))
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* Top-up Confirmation Modal */}
                <Dialog open={showTopupModal} handler={() => setShowTopupModal(false)}>
                    <DialogHeader>Confirm SMS Top-up</DialogHeader>
                    <DialogBody divider>
                        {selectedBundle && (
                            <div className="space-y-4">
                                <Typography>
                                    You are about to purchase <strong>{selectedBundle.sms_count} SMS credits</strong> for <strong>UGX {selectedBundle.price.toLocaleString()}</strong>.
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Payment will be processed through FlutterWave. Click "Proceed to Payment" to continue.
                                </Typography>
                            </div>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button 
                            variant="text" 
                            color="gray" 
                            onClick={() => {
                                setShowTopupModal(false);
                                setSelectedBundle(null);
                            }}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={processTopup}
                            className="bg-gradient-to-r from-primary to-secondary"
                        >
                            Proceed to Payment
                        </Button>
                    </DialogFooter>
                </Dialog>

                <ToastContainer />
            </div>
        </>
    );
}

SmsScreen.layout = (page) => (
    <Layout children={page} props={page.props.company} />
);

export default SmsScreen;
