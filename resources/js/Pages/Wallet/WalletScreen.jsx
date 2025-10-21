import { Head, router, useForm, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Typography, 
    Button, 
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Select,
    Option,
    Alert
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/Layouts/components/Layout';

export default function WalletScreen({ company, wallet, transactions, payoutDetails = [], pendingWithdrawals = [], availableBalance = 0, pendingAmount = 0 }) {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const { data: withdrawData, setData: setWithdrawData, post: postWithdraw, processing: withdrawProcessing, errors: withdrawErrors, reset: resetWithdraw } = useForm({
        payout_detail_id: '',
        amount: '',
        notes: '',
    });

    // Calculate withdrawal fee based on selected payout method
    const calculateFee = () => {
        if (!withdrawData.payout_detail_id) return 0;
        const selectedPayout = payoutDetails.find(p => p.id === parseInt(withdrawData.payout_detail_id));
        if (!selectedPayout) return 0;
        return selectedPayout.type === 'bank' ? 6000 : 0;
    };

    const fee = calculateFee();
    const totalAmount = parseFloat(withdrawData.amount || 0) + fee;

    const handleWithdraw = (e) => {
        e.preventDefault();

        if (!withdrawData.payout_detail_id) {
            toast.error('Please select a payout method');
            return;
        }

        if (!withdrawData.amount || parseFloat(withdrawData.amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        if (totalAmount > availableBalance) {
            toast.error(`Insufficient available balance. You have ${wallet.currency} ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} available after pending withdrawals. You need ${wallet.currency} ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (including ${wallet.currency} ${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })} fee)`);
            return;
        }

        postWithdraw(route('withdrawal-requests.store', company.company.slug), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Withdrawal request submitted successfully!');
                setShowWithdrawModal(false);
                resetWithdraw();
            },
            onError: () => {
                if (withdrawErrors.amount) {
                    toast.error(withdrawErrors.amount);
                } else if (withdrawErrors.payout_detail_id) {
                    toast.error(withdrawErrors.payout_detail_id);
                } else {
                    toast.error('Failed to submit withdrawal request');
                }
            }
        });
    };

    const getTransactionIcon = (type) => {
        return type === 'deposit' ? '↓' : '↑';
    };

    const getTransactionColor = (type) => {
        return type === 'deposit' ? 'text-green-600' : 'text-red-600';
    };

    return (
        <>
            <Head title="Wallet" />
            <div className="p-6">
                <div className="mb-6">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Business Wallet
                    </Typography>
                    <Typography variant="small" color="gray">
                        Manage payments from bookings, online orders, and payment links
                    </Typography>
                </div>

                {/* Pending Withdrawals Alert */}
                {pendingWithdrawals.length > 0 && (
                    <Alert color="orange" className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Typography variant="h6" className="mb-1">
                                    {pendingWithdrawals.length} Pending Withdrawal{pendingWithdrawals.length > 1 ? 's' : ''}
                                </Typography>
                                <Typography variant="small">
                                    Total amount pending: {wallet.currency} {pendingWithdrawals.reduce((sum, w) => sum + parseFloat(w.total_amount), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </Typography>
                            </div>
                            <Link href={route('withdrawal-requests.index', company.company.slug)}>
                                <Button size="sm" variant="outlined" color="orange">
                                    View All
                                </Button>
                            </Link>
                        </div>
                    </Alert>
                )}

                {/* Wallet Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Balance Card */}
                    <Card className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
                        <CardBody className="text-center py-8">
                            <Typography variant="h6" className="opacity-90 mb-2">
                                Wallet Balance
                            </Typography>
                            <Typography variant="h2" className="font-bold mb-2">
                                {wallet.currency} {Number(wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                            {pendingAmount > 0 && (
                                <div className="mb-4">
                                    <Typography variant="small" className="opacity-90">
                                        Pending Withdrawals: {wallet.currency} {Number(pendingAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </Typography>
                                    <Typography variant="h6" className="font-bold mt-1">
                                        Available: {wallet.currency} {Number(availableBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </Typography>
                                </div>
                            )}
                            <Button 
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-white text-orange-600 hover:bg-gray-100"
                                fullWidth
                                disabled={availableBalance <= 0}
                            >
                                Request Withdrawal
                            </Button>
                        </CardBody>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardBody>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Wallet Info
                            </Typography>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Typography variant="small" color="gray">
                                        Currency
                                    </Typography>
                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                        {wallet.currency}
                                    </Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="small" color="gray">
                                        Total Transactions
                                    </Typography>
                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                        {transactions.total}
                                    </Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="small" color="gray">
                                        Payout Methods
                                    </Typography>
                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                        {payoutDetails.length}
                                    </Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="small" color="gray">
                                        Status
                                    </Typography>
                                    <Chip value="Active" color="green" size="sm" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardBody>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Quick Actions
                            </Typography>
                            <div className="space-y-2">
                                <Link href={route('payout-details.index', company.company.slug)}>
                                    <Button size="sm" variant="outlined" className="w-full" color="blue">
                                        <div className="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                            </svg>
                                            Manage Payout Methods
                                        </div>
                                    </Button>
                                </Link>
                                <Link href={route('withdrawal-requests.index', company.company.slug)}>
                                    <Button size="sm" variant="outlined" className="w-full" color="orange">
                                        <div className="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Withdrawal History
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Transaction History - Full Width at Bottom */}
                <Card>
                    <CardHeader floated={false} shadow={false} className="rounded-none bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Typography variant="h5" className="text-white mb-1">
                                    Transaction History
                                </Typography>
                                <Typography variant="small" className="text-blue-100">
                                    View all your wallet transactions
                                </Typography>
                            </div>
                            <Chip value={`${transactions.total} Total`} className="bg-white text-blue-800" />
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        {transactions.data.length === 0 ? (
                            <div className="text-center py-16">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                </svg>
                                <Typography variant="h6" color="gray" className="mb-2">
                                    No transactions yet
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Payments from bookings, online orders, and payment links will appear here
                                </Typography>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-max table-auto">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-gray-50">
                                                <th className="p-4 text-left">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        Date & Time
                                                    </Typography>
                                                </th>
                                                <th className="p-4 text-left">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        Type
                                                    </Typography>
                                                </th>
                                                <th className="p-4 text-left">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        Description
                                                    </Typography>
                                                </th>
                                                <th className="p-4 text-right">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        Amount
                                                    </Typography>
                                                </th>
                                                <th className="p-4 text-right">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        Balance After
                                                    </Typography>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.data.map((transaction, index) => (
                                                <tr key={transaction.id} className={`${index !== transactions.data.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                                                    <td className="p-4">
                                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                                            {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </Typography>
                                                        <Typography variant="small" color="gray" className="text-xs">
                                                            {new Date(transaction.created_at).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-2xl ${getTransactionColor(transaction.type)}`}>
                                                                {getTransactionIcon(transaction.type)}
                                                            </span>
                                                            <div>
                                                                <Typography variant="small" color="blue-gray" className="font-medium capitalize">
                                                                    {transaction.transaction_type.replace(/_/g, ' ')}
                                                                </Typography>
                                                                <Chip 
                                                                    value={transaction.type} 
                                                                    size="sm" 
                                                                    color={transaction.type === 'deposit' ? 'green' : 'red'}
                                                                    className="mt-1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography variant="small" color="gray">
                                                            {transaction.description || 'No description'}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <Typography variant="h6" className={`font-bold ${getTransactionColor(transaction.type)}`}>
                                                            {transaction.type === 'withdrawal' ? '-' : '+'} {wallet.currency} {Number(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {wallet.currency} {Number(transaction.balance_after).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {transactions.last_page > 1 && (
                                    <div className="flex items-center justify-center gap-2 p-4 border-t">
                                        {transactions.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                size="sm"
                                                variant={link.active ? 'filled' : 'outlined'}
                                                color="blue"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </CardBody>
                </Card>

                {/* Withdrawal Modal */}
                <Dialog open={showWithdrawModal} handler={() => setShowWithdrawModal(false)} size="md">
                    <DialogHeader>Request Withdrawal</DialogHeader>
                    <form onSubmit={handleWithdraw}>
                        <DialogBody divider className="max-h-[60vh] overflow-y-auto">
                            <div className="space-y-4">
                                {payoutDetails.length === 0 ? (
                                    <Alert color="amber" className="mb-4">
                                        <div className="flex flex-col gap-2">
                                            <Typography variant="small" className="font-semibold">
                                                No payout methods found
                                            </Typography>
                                            <Typography variant="small">
                                                Please add a payout method (Mobile Money or Bank Account) before requesting a withdrawal.
                                            </Typography>
                                            <Link href={route('payout-details.index', company.company.slug)}>
                                                <Button size="sm" color="amber" variant="outlined" className="mt-2">
                                                    Add Payout Method
                                                </Button>
                                            </Link>
                                        </div>
                                    </Alert>
                                ) : (
                                    <>
                                        <div>
                                            <Select
                                                label="Payout Method"
                                                value={withdrawData.payout_detail_id.toString()}
                                                onChange={(val) => setWithdrawData('payout_detail_id', val)}
                                                error={!!withdrawErrors.payout_detail_id}
                                            >
                                                {payoutDetails.map((payout) => (
                                                    <Option key={payout.id} value={payout.id.toString()}>
                                                        <div className="flex items-center justify-between w-full">
                                                            <span>
                                                                {payout.type === 'mobile_money' ? '📱' : '🏦'} {payout.label || payout.display_name}
                                                            </span>
                                                            {payout.is_default && (
                                                                <Chip value="Default" size="sm" color="green" className="ml-2" />
                                                            )}
                                                        </div>
                                                    </Option>
                                                ))}
                                            </Select>
                                            {withdrawErrors.payout_detail_id && (
                                                <Typography variant="small" color="red" className="mt-1">
                                                    {withdrawErrors.payout_detail_id}
                                                </Typography>
                                            )}
                                            <Link href={route('payout-details.index', company.company.slug)}>
                                                <Typography variant="small" color="blue" className="mt-2 cursor-pointer hover:underline">
                                                    + Add new payout method
                                                </Typography>
                                            </Link>
                                        </div>

                                        <div>
                                            <Input
                                                type="number"
                                                label="Amount"
                                                value={withdrawData.amount}
                                                onChange={(e) => setWithdrawData('amount', e.target.value)}
                                                error={!!withdrawErrors.amount}
                                                step="0.01"
                                                min="1"
                                            />
                                            {withdrawErrors.amount && (
                                                <Typography variant="small" color="red" className="mt-1">
                                                    {withdrawErrors.amount}
                                                </Typography>
                                            )}
                                        </div>

                                        {withdrawData.payout_detail_id && (() => {
                                            const selectedPayout = payoutDetails.find(p => p.id === parseInt(withdrawData.payout_detail_id));
                                            return selectedPayout && (
                                                <Card className="bg-blue-50 border border-blue-200">
                                                    <CardBody className="py-3">
                                                        <Typography variant="small" color="blue-gray" className="font-bold mb-2">
                                                            Withdrawal Details
                                                        </Typography>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <Typography variant="small" color="gray">
                                                                    Payout Method:
                                                                </Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                    {selectedPayout.type === 'mobile_money' ? '📱 Mobile Money' : '🏦 Bank Transfer'}
                                                                </Typography>
                                                            </div>
                                                            {selectedPayout.type === 'mobile_money' ? (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Network:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.network}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Account Name:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.account_name}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Phone Number:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.formatted_phone || selectedPayout.phone_number}
                                                                        </Typography>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Bank:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.bank_name}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Account Name:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.account_name}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <Typography variant="small" color="gray">
                                                                            Account Number:
                                                                        </Typography>
                                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                            {selectedPayout.account_number}
                                                                        </Typography>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            );
                                        })()}

                                        {withdrawData.amount && withdrawData.payout_detail_id && (
                                            <Card className="bg-gray-50">
                                                <CardBody className="py-3">
                                                    <Typography variant="small" color="blue-gray" className="font-bold mb-2">
                                                        Payment Summary
                                                    </Typography>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <Typography variant="small" color="gray">
                                                                Amount:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {wallet.currency} {parseFloat(withdrawData.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <Typography variant="small" color="gray">
                                                                Fee:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {wallet.currency} {fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                        <hr className="my-1" />
                                                        <div className="flex justify-between">
                                                            <Typography variant="small" className="font-bold">
                                                                Total Deduction:
                                                            </Typography>
                                                            <Typography variant="small" className="font-bold text-red-600">
                                                                {wallet.currency} {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <Typography variant="small" color="gray">
                                                                Wallet Balance:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {wallet.currency} {Number(wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                        {pendingAmount > 0 && (
                                                            <>
                                                                <div className="flex justify-between">
                                                                    <Typography variant="small" color="gray">
                                                                        Pending Withdrawals:
                                                                    </Typography>
                                                                    <Typography variant="small" color="orange" className="font-semibold">
                                                                        - {wallet.currency} {Number(pendingAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                                    </Typography>
                                                                </div>
                                                                <hr className="my-1" />
                                                            </>
                                                        )}
                                                        <div className="flex justify-between">
                                                            <Typography variant="small" className="font-bold">
                                                                Available Balance:
                                                            </Typography>
                                                            <Typography variant="small" color={totalAmount > availableBalance ? 'red' : 'green'} className="font-bold">
                                                                {wallet.currency} {Number(availableBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        )}

                                        <div>
                                            <Textarea
                                                label="Notes (Optional)"
                                                value={withdrawData.notes}
                                                onChange={(e) => setWithdrawData('notes', e.target.value)}
                                                error={!!withdrawErrors.notes}
                                            />
                                            {withdrawErrors.notes && (
                                                <Typography variant="small" color="red" className="mt-1">
                                                    {withdrawErrors.notes}
                                                </Typography>
                                            )}
                                        </div>

                                        <Alert color="blue">
                                            <div className="flex items-start gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mt-0.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                </svg>
                                                <div>
                                                    <Typography variant="small" className="font-bold mb-1">
                                                        Processing Time
                                                    </Typography>
                                                    <Typography variant="small">
                                                        Your withdrawal request will be reviewed and processed within 24 hours. 
                                                        Once approved, funds will be transferred to your selected payout method.
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Alert>
                                    </>
                                )}
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="gray"
                                onClick={() => {
                                    setShowWithdrawModal(false);
                                    resetWithdraw();
                                }}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            {payoutDetails.length > 0 && (
                                <Button
                                    type="submit"
                                    disabled={withdrawProcessing || !withdrawData.payout_detail_id || !withdrawData.amount}
                                    className="bg-gradient-to-r from-orange-500 to-orange-700"
                                >
                                    {withdrawProcessing ? 'Processing...' : 'Submit Request'}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </Dialog>

                <ToastContainer />
            </div>
        </>
    );
}

WalletScreen.layout = (page) => (
    <Layout children={page} props={page.props.company} />
);
