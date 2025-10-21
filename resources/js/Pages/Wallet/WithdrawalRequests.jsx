import { Head, router, Link } from '@inertiajs/react';
import React from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Typography, 
    Button, 
    Chip
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/Layouts/components/Layout';

export default function WithdrawalRequests({ company, withdrawalRequests }) {
    const handleCancel = (requestId) => {
        if (confirm('Are you sure you want to cancel this withdrawal request?')) {
            router.post(route('withdrawal-requests.cancel', [company.company.slug, requestId]), {}, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Withdrawal request cancelled!');
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error('Failed to cancel request');
                    }
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'approved':
                return 'blue';
            case 'completed':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '🕐';
            case 'approved':
                return '✓';
            case 'completed':
                return '✅';
            case 'rejected':
                return '❌';
            default:
                return '•';
        }
    };

    return (
        <>
            <Head title="Withdrawal History" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Withdrawal History
                        </Typography>
                        <Typography variant="small" color="gray">
                            View and manage your withdrawal requests
                        </Typography>
                    </div>
                    <Link href={route('wallet.index', company.company.slug)}>
                        <Button variant="outlined" color="gray">
                            Back to Wallet
                        </Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                        <CardBody className="text-center">
                            <Typography variant="h6" className="opacity-90 mb-1">
                                Pending
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {withdrawalRequests.data.filter(w => w.status === 'pending').length}
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                        <CardBody className="text-center">
                            <Typography variant="h6" className="opacity-90 mb-1">
                                Approved
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {withdrawalRequests.data.filter(w => w.status === 'approved').length}
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
                        <CardBody className="text-center">
                            <Typography variant="h6" className="opacity-90 mb-1">
                                Completed
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {withdrawalRequests.data.filter(w => w.status === 'completed').length}
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-400 to-red-600 text-white">
                        <CardBody className="text-center">
                            <Typography variant="h6" className="opacity-90 mb-1">
                                Rejected
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {withdrawalRequests.data.filter(w => w.status === 'rejected').length}
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* Withdrawals List */}
                <Card>
                    <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-4">
                        <Typography variant="h6" color="blue-gray">
                            All Withdrawal Requests
                        </Typography>
                    </CardHeader>
                    <CardBody className="px-0">
                        {withdrawalRequests.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Typography variant="h6" color="gray" className="mb-2">
                                    No withdrawal requests yet
                                </Typography>
                                <Typography variant="small" color="gray" className="mb-4">
                                    Create your first withdrawal request from the wallet page
                                </Typography>
                                <Link href={route('wallet.index', company.company.slug)}>
                                    <Button className="bg-gradient-to-r from-green-500 to-green-700">
                                        Go to Wallet
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4 p-4">
                                {withdrawalRequests.data.map((request) => (
                                    <Card key={request.id} className="border">
                                        <CardBody>
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                {/* Left: Request Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xl">{getStatusIcon(request.status)}</span>
                                                        <Typography variant="h6" color="blue-gray">
                                                            Withdrawal Request #{request.id}
                                                        </Typography>
                                                        <Chip 
                                                            value={request.status.charAt(0).toUpperCase() + request.status.slice(1)} 
                                                            color={getStatusColor(request.status)} 
                                                            size="sm" 
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <Typography variant="small" color="gray">
                                                                Payout Method:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {request.payout_detail?.type === 'mobile_money' ? '📱' : '🏦'} {request.payout_detail?.display_name || request.payout_detail?.label}
                                                            </Typography>
                                                        </div>

                                                        <div>
                                                            <Typography variant="small" color="gray">
                                                                Requested By:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {request.requested_by?.name || 'N/A'}
                                                            </Typography>
                                                        </div>

                                                        <div>
                                                            <Typography variant="small" color="gray">
                                                                Date Requested:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                {new Date(request.created_at).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </Typography>
                                                        </div>

                                                        {request.processed_at && (
                                                            <div>
                                                                <Typography variant="small" color="gray">
                                                                    {request.status === 'rejected' ? 'Rejected' : 'Processed'} On:
                                                                </Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                                    {new Date(request.processed_at).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {request.notes && (
                                                        <div className="mt-3">
                                                            <Typography variant="small" color="gray">
                                                                Notes:
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray">
                                                                {request.notes}
                                                            </Typography>
                                                        </div>
                                                    )}

                                                    {request.rejection_reason && (
                                                        <div className="mt-3 p-2 bg-red-50 rounded">
                                                            <Typography variant="small" color="red" className="font-semibold">
                                                                Rejection Reason:
                                                            </Typography>
                                                            <Typography variant="small" color="red">
                                                                {request.rejection_reason}
                                                            </Typography>
                                                        </div>
                                                    )}

                                                    {request.admin_notes && (
                                                        <div className="mt-3 p-2 bg-blue-50 rounded">
                                                            <Typography variant="small" color="blue" className="font-semibold">
                                                                Admin Notes:
                                                            </Typography>
                                                            <Typography variant="small" color="blue">
                                                                {request.admin_notes}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right: Amount & Actions */}
                                                <div className="lg:text-right">
                                                    <div className="mb-4">
                                                        <Typography variant="small" color="gray" className="mb-1">
                                                            Amount
                                                        </Typography>
                                                        <Typography variant="h5" color="blue-gray" className="font-bold">
                                                            UGX {parseFloat(request.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography variant="small" color="gray">
                                                            Fee: UGX {parseFloat(request.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography variant="small" color="red" className="font-semibold">
                                                            Total: UGX {parseFloat(request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>

                                                    {request.status === 'pending' && (
                                                        <Button
                                                            size="sm"
                                                            color="red"
                                                            variant="outlined"
                                                            onClick={() => handleCancel(request.id)}
                                                        >
                                                            Cancel Request
                                                        </Button>
                                                    )}

                                                    {request.status === 'completed' && (
                                                        <Chip value="✅ Completed" color="green" size="sm" />
                                                    )}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}

                                {/* Pagination */}
                                {withdrawalRequests.last_page > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-6">
                                        {withdrawalRequests.links.map((link, index) => (
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
                            </div>
                        )}
                    </CardBody>
                </Card>

                <ToastContainer />
            </div>
        </>
    );
}

WithdrawalRequests.layout = (page) => (
    <Layout children={page} props={page.props.company} />
);
