import React, { useState } from 'react';
import AdminLayout from '@/Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    Card,
    CardBody,
    Typography,
    Chip,
    Input,
    Button,
    Select,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Alert,
} from '@material-tailwind/react';

export default function WithdrawalRequests({ auth, withdrawalRequests, stats, filters }) {
    const [searchFilters, setSearchFilters] = useState({
        status: filters.status || 'all',
        search: filters.search || '',
    });

    const [approveDialog, setApproveDialog] = useState({ open: false, request: null });
    const [rejectDialog, setRejectDialog] = useState({ open: false, request: null });
    const [completeDialog, setCompleteDialog] = useState({ open: false, request: null });
    const [detailsDialog, setDetailsDialog] = useState({ open: false, request: null });
    const [rejectionReason, setRejectionReason] = useState('');
    const [adminNotes, setAdminNotes] = useState('');

    const handleFilterChange = (name, value) => {
        setSearchFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/withdrawal-requests', searchFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearchFilters({
            status: 'all',
            search: '',
        });
        router.get('/admin/withdrawal-requests');
    };

    const openApproveDialog = (request) => {
        setApproveDialog({ open: true, request });
        setAdminNotes('');
    };

    const openRejectDialog = (request) => {
        setRejectDialog({ open: true, request });
        setRejectionReason('');
        setAdminNotes('');
    };

    const openCompleteDialog = (request) => {
        setCompleteDialog({ open: true, request });
        setAdminNotes('');
    };

    const handleApprove = () => {
        router.post(`/admin/withdrawal-requests/${approveDialog.request.id}/approve`, {
            admin_notes: adminNotes,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setApproveDialog({ open: false, request: null });
                setAdminNotes('');
            },
        });
    };

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }
        router.post(`/admin/withdrawal-requests/${rejectDialog.request.id}/reject`, {
            rejection_reason: rejectionReason,
            admin_notes: adminNotes,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setRejectDialog({ open: false, request: null });
                setRejectionReason('');
                setAdminNotes('');
            },
        });
    };

    const handleComplete = () => {
        router.post(`/admin/withdrawal-requests/${completeDialog.request.id}/complete`, {
            admin_notes: adminNotes,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setCompleteDialog({ open: false, request: null });
                setAdminNotes('');
            },
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'amber',
            approved: 'blue',
            completed: 'green',
            rejected: 'red',
        };
        return colors[status] || 'gray';
    };

    const getPayoutTypeColor = (type) => {
        return type === 'mobile_money' ? 'cyan' : 'purple';
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Withdrawal Requests Management" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <Typography variant="h3" color="blue-gray" className="font-bold">
                        Withdrawal Requests Management
                    </Typography>
                    <Typography color="gray" className="mt-1">
                        Review and process withdrawal requests from businesses
                    </Typography>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="amber" className="font-bold">
                                {stats.pending}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Pending Requests
                            </Typography>
                            <Typography color="gray" className="text-xs mt-1">
                                UGX {Number(stats.pendingAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue" className="font-bold">
                                {stats.approved}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Approved (Processing)
                            </Typography>
                            <Typography color="gray" className="text-xs mt-1">
                                UGX {Number(stats.approvedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="green" className="font-bold">
                                {stats.completed}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Completed
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="red" className="font-bold">
                                {stats.rejected}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Rejected
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardBody>
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Search Company
                                    </Typography>
                                    <Input
                                        label="Search by company name"
                                        value={searchFilters.search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Filter by Status
                                    </Typography>
                                    <Select
                                        label="Select Status"
                                        value={searchFilters.status}
                                        onChange={(value) => handleFilterChange('status', value)}
                                    >
                                        <Option value="all">All Statuses</Option>
                                        <Option value="pending">Pending</Option>
                                        <Option value="approved">Approved</Option>
                                        <Option value="completed">Completed</Option>
                                        <Option value="rejected">Rejected</Option>
                                    </Select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <Button type="submit" color="blue" className="flex-1">
                                        Apply Filters
                                    </Button>
                                    <Button type="button" variant="outlined" onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                {/* Withdrawal Requests Table */}
                <Card>
                    <CardBody className="overflow-x-auto px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            ID
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Company
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Amount
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Payout Method
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Status
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Date
                                        </Typography>
                                    </th>
                                    <th className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            Actions
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalRequests.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-4 text-center">
                                            <Typography color="gray">No withdrawal requests found</Typography>
                                        </td>
                                    </tr>
                                ) : (
                                    withdrawalRequests.data.map((request) => (
                                        <tr 
                                            key={request.id} 
                                            className="border-b border-blue-gray-50 hover:bg-blue-gray-50/50 cursor-pointer"
                                            onClick={() => setDetailsDialog({ open: true, request })}
                                        >
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    #{request.id}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                                        {request.company.name}
                                                    </Typography>
                                                    {request.company.email && (
                                                        <Typography variant="small" color="gray" className="text-xs">
                                                            {request.company.email}
                                                        </Typography>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        UGX {Number(request.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                    </Typography>
                                                    {request.fee > 0 && (
                                                        <Typography variant="small" color="gray" className="text-xs">
                                                            Fee: UGX {Number(request.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                                                        Total: UGX {Number(request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <Chip
                                                        value={request.payout_detail.type === 'mobile_money' ? 'Mobile Money' : 'Bank'}
                                                        color={getPayoutTypeColor(request.payout_detail.type)}
                                                        size="sm"
                                                        className="mb-1"
                                                    />
                                                    <Typography variant="small" color="gray" className="text-xs">
                                                        {request.payout_detail.type === 'mobile_money' 
                                                            ? `${request.payout_detail.network} - ${request.payout_detail.formatted_phone}`
                                                            : `${request.payout_detail.bank_name} - ${request.payout_detail.account_number}`
                                                        }
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    value={request.status.toUpperCase()}
                                                    color={getStatusColor(request.status)}
                                                    size="sm"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="gray" className="text-xs">
                                                    {new Date(request.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                color="green"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openApproveDialog(request);
                                                                }}
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                color="red"
                                                                variant="outlined"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openRejectDialog(request);
                                                                }}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                    {request.status === 'approved' && (
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openCompleteDialog(request);
                                                            }}
                                                        >
                                                            Mark Complete
                                                        </Button>
                                                    )}
                                                    {(request.status === 'completed' || request.status === 'rejected') && (
                                                        <Chip value="Done" color="gray" size="sm" />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {withdrawalRequests.data.length > 0 && (
                            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    Showing {withdrawalRequests.from} to {withdrawalRequests.to} of {withdrawalRequests.total} results
                                </Typography>
                                <div className="flex gap-2">
                                    {withdrawalRequests.links.map((link, index) => {
                                        // Parse label to remove HTML entities
                                        const label = link.label
                                            .replace('&laquo;', '«')
                                            .replace('&raquo;', '»')
                                            .replace('Previous', 'Prev')
                                            .replace('Next', 'Next');
                                        
                                        return (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'filled' : 'outlined'}
                                                size="sm"
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                            >
                                                {label}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

            {/* Approve Dialog */}
            <Dialog open={approveDialog.open} handler={() => setApproveDialog({ open: false, request: null })}>
                <DialogHeader>Approve Withdrawal Request</DialogHeader>
                <DialogBody divider className="max-h-96 overflow-y-auto">
                    {approveDialog.request ? (
                        <div className="space-y-4">
                            <Alert color="green" className="mb-4">
                                You are about to approve this withdrawal request. The business will be notified via email.
                            </Alert>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Company</Typography>
                                <Typography className="font-bold">{approveDialog.request.company.name}</Typography>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Amount Details</Typography>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span>Amount:</span>
                                        <span className="font-bold">UGX {Number(approveDialog.request.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    {approveDialog.request.fee > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span>Fee:</span>
                                            <span>UGX {Number(approveDialog.request.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold pt-2 border-t">
                                        <span>Total:</span>
                                        <span>UGX {Number(approveDialog.request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Payout Details</Typography>
                                <div className="space-y-1 text-sm">
                                    {approveDialog.request.payout_detail.type === 'mobile_money' ? (
                                        <>
                                            <div><strong>Method:</strong> Mobile Money - {approveDialog.request.payout_detail.network}</div>
                                            <div><strong>Account Name:</strong> {approveDialog.request.payout_detail.account_name}</div>
                                            <div><strong>Phone:</strong> {approveDialog.request.payout_detail.formatted_phone}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div><strong>Method:</strong> Bank Transfer</div>
                                            <div><strong>Bank:</strong> {approveDialog.request.payout_detail.bank_name}</div>
                                            <div><strong>Account Name:</strong> {approveDialog.request.payout_detail.account_name}</div>
                                            <div><strong>Account Number:</strong> {approveDialog.request.payout_detail.account_number}</div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Textarea
                                    label="Admin Notes (Optional)"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setApproveDialog({ open: false, request: null })} className="mr-2">
                        Cancel
                    </Button>
                    <Button color="green" onClick={handleApprove}>
                        Approve Request
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={rejectDialog.open} handler={() => setRejectDialog({ open: false, request: null })}>
                <DialogHeader>Reject Withdrawal Request</DialogHeader>
                <DialogBody divider className="max-h-96 overflow-y-auto">
                    {rejectDialog.request ? (
                        <div className="space-y-4">
                            <Alert color="red" className="mb-4">
                                You are about to reject this withdrawal request. Please provide a clear reason.
                            </Alert>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Company</Typography>
                                <Typography className="font-bold">{rejectDialog.request.company.name}</Typography>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Amount</Typography>
                                <Typography className="font-bold">UGX {Number(rejectDialog.request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</Typography>
                            </div>

                            <div>
                                <Textarea
                                    label="Rejection Reason (Required) *"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={3}
                                    required
                                    error={!rejectionReason.trim()}
                                />
                            </div>

                            <div>
                                <Textarea
                                    label="Admin Notes (Optional)"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setRejectDialog({ open: false, request: null })} className="mr-2">
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleReject}>
                        Reject Request
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Complete Dialog */}
            <Dialog open={completeDialog.open} handler={() => setCompleteDialog({ open: false, request: null })}>
                <DialogHeader>Mark Withdrawal as Completed</DialogHeader>
                <DialogBody divider className="max-h-96 overflow-y-auto">
                    {completeDialog.request ? (
                        <div className="space-y-4">
                            <Alert color="blue" className="mb-4">
                                Confirm that you have successfully sent the funds to the business. The wallet balance will be deducted.
                            </Alert>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Company</Typography>
                                <Typography className="font-bold">{completeDialog.request.company.name}</Typography>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Amount Sent</Typography>
                                <Typography className="font-bold text-green-600">UGX {Number(completeDialog.request.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</Typography>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Total Deducted from Wallet</Typography>
                                <Typography className="font-bold">UGX {Number(completeDialog.request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</Typography>
                                <Typography variant="small" color="gray" className="text-xs mt-1">
                                    (Includes UGX {Number(completeDialog.request.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })} processing fee)
                                </Typography>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <Typography variant="small" color="gray" className="mb-2">Payout Sent To</Typography>
                                <div className="space-y-1 text-sm">
                                    {completeDialog.request.payout_detail.type === 'mobile_money' ? (
                                        <>
                                            <div>{completeDialog.request.payout_detail.network} - {completeDialog.request.payout_detail.formatted_phone}</div>
                                            <div>{completeDialog.request.payout_detail.account_name}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>{completeDialog.request.payout_detail.bank_name}</div>
                                            <div>{completeDialog.request.payout_detail.account_name} - {completeDialog.request.payout_detail.account_number}</div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Textarea
                                    label="Completion Notes (Optional)"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    rows={3}
                                    placeholder="e.g., Transaction reference, confirmation details..."
                                />
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={() => setCompleteDialog({ open: false, request: null })} className="mr-2">
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleComplete}>
                        Confirm Completion
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Details Dialog */}
            <Dialog 
                open={detailsDialog.open} 
                handler={() => setDetailsDialog({ open: false, request: null })}
                size="lg"
            >
                <DialogHeader>Withdrawal Request Details</DialogHeader>
                <DialogBody divider className="max-h-[70vh] overflow-y-auto">
                    {detailsDialog.request ? (
                        <div className="space-y-4">
                            {/* Request ID and Status */}
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <Typography variant="small" color="gray" className="mb-1">
                                        Request ID
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray">
                                        #{detailsDialog.request.id}
                                    </Typography>
                                </div>
                                <Chip
                                    value={detailsDialog.request.status.toUpperCase()}
                                    color={getStatusColor(detailsDialog.request.status)}
                                    size="lg"
                                />
                            </div>

                            {/* Company Information */}
                            <Card className="border border-blue-gray-100">
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Company Information
                                    </Typography>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Company Name:</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                {detailsDialog.request.company.name}
                                            </Typography>
                                        </div>
                                        {detailsDialog.request.company.email && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Email:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {detailsDialog.request.company.email}
                                                </Typography>
                                            </div>
                                        )}
                                        {detailsDialog.request.company.phone && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Phone:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {detailsDialog.request.company.phone}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Wallet Information */}
                            <Card className="border border-green-100 bg-green-50">
                                <CardBody>
                                    <Typography variant="h6" color="green" className="mb-3">
                                        💰 Wallet Balance
                                    </Typography>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Current Balance:</Typography>
                                            <Typography variant="h5" color="green" className="font-bold">
                                                UGX {Number(detailsDialog.request.wallet.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                        </div>
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Currency:</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                {detailsDialog.request.wallet.currency}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Amount Details */}
                            <Card className="border border-blue-gray-100">
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Amount Breakdown
                                    </Typography>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Withdrawal Amount:</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                UGX {Number(detailsDialog.request.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </div>
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Processing Fee:</Typography>
                                            <Typography variant="small" color="blue-gray">
                                                UGX {Number(detailsDialog.request.fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t">
                                            <Typography variant="small" color="blue-gray" className="font-bold">Total Amount:</Typography>
                                            <Typography variant="h6" color="blue-gray" className="font-bold">
                                                UGX {Number(detailsDialog.request.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Payout Details */}
                            <Card className="border border-blue-gray-100">
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-3 flex items-center gap-2">
                                        <Chip
                                            value={detailsDialog.request.payout_detail.type === 'mobile_money' ? 'Mobile Money' : 'Bank Transfer'}
                                            color={getPayoutTypeColor(detailsDialog.request.payout_detail.type)}
                                            size="sm"
                                        />
                                        Payout Destination
                                    </Typography>
                                    <div className="space-y-2">
                                        {detailsDialog.request.payout_detail.type === 'mobile_money' ? (
                                            <>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Network:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.network}
                                                    </Typography>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Account Name:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.account_name}
                                                    </Typography>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Phone Number:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.formatted_phone}
                                                    </Typography>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Bank Name:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.bank_name}
                                                    </Typography>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Account Name:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.account_name}
                                                    </Typography>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" color="gray">Account Number:</Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {detailsDialog.request.payout_detail.account_number}
                                                    </Typography>
                                                </div>
                                                {detailsDialog.request.payout_detail.branch && (
                                                    <div className="flex justify-between">
                                                        <Typography variant="small" color="gray">Branch:</Typography>
                                                        <Typography variant="small" color="blue-gray">
                                                            {detailsDialog.request.payout_detail.branch}
                                                        </Typography>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {detailsDialog.request.payout_detail.label && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Label:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {detailsDialog.request.payout_detail.label}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Timeline */}
                            <Card className="border border-blue-gray-100">
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Timeline
                                    </Typography>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Typography variant="small" color="gray">Requested:</Typography>
                                            <Typography variant="small" color="blue-gray">
                                                {new Date(detailsDialog.request.created_at).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Typography>
                                        </div>
                                        {detailsDialog.request.requested_by && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Requested By:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {detailsDialog.request.requested_by.name}
                                                </Typography>
                                            </div>
                                        )}
                                        {detailsDialog.request.processed_at && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Processed:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {new Date(detailsDialog.request.processed_at).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </Typography>
                                            </div>
                                        )}
                                        {detailsDialog.request.processed_by && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Processed By:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {detailsDialog.request.processed_by.name}
                                                </Typography>
                                            </div>
                                        )}
                                        {detailsDialog.request.completed_at && (
                                            <div className="flex justify-between">
                                                <Typography variant="small" color="gray">Completed:</Typography>
                                                <Typography variant="small" color="blue-gray">
                                                    {new Date(detailsDialog.request.completed_at).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Notes */}
                            {(detailsDialog.request.notes || detailsDialog.request.admin_notes || detailsDialog.request.rejection_reason) && (
                                <Card className="border border-blue-gray-100">
                                    <CardBody>
                                        <Typography variant="h6" color="blue-gray" className="mb-3">
                                            Notes & Comments
                                        </Typography>
                                        <div className="space-y-3">
                                            {detailsDialog.request.notes && (
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-bold mb-1">
                                                        Business Notes:
                                                    </Typography>
                                                    <Typography variant="small" color="blue-gray" className="bg-gray-50 p-2 rounded">
                                                        {detailsDialog.request.notes}
                                                    </Typography>
                                                </div>
                                            )}
                                            {detailsDialog.request.admin_notes && (
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-bold mb-1">
                                                        Admin Notes:
                                                    </Typography>
                                                    <Typography variant="small" color="blue-gray" className="bg-blue-50 p-2 rounded">
                                                        {detailsDialog.request.admin_notes}
                                                    </Typography>
                                                </div>
                                            )}
                                            {detailsDialog.request.rejection_reason && (
                                                <div>
                                                    <Typography variant="small" color="red" className="font-bold mb-1">
                                                        Rejection Reason:
                                                    </Typography>
                                                    <Typography variant="small" color="red" className="bg-red-50 p-2 rounded">
                                                        {detailsDialog.request.rejection_reason}
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button color="gray" onClick={() => setDetailsDialog({ open: false, request: null })}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </AdminLayout>
    );
}
