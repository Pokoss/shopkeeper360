import React, { useState } from 'react';
import Layout from '@/Layouts/components/Layout';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
    Select,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Chip,
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { router } from '@inertiajs/react';

export default function PaymentLinks({ company, paymentLinks, stats, filters }) {
    const [createDialog, setCreateDialog] = useState(false);
    const [detailsDialog, setDetailsDialog] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        amount: '',
        currency: 'UGX',
        purpose: '',
        notes: '',
        expires_at: '',
    });
    const [filterStatus, setFilterStatus] = useState(filters.status || '');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post(`/dashboard/${company.company.slug}/payment-links`, formData, {
            onSuccess: () => {
                toast.success('Payment link created successfully!');
                setCreateDialog(false);
                resetForm();
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => toast.error(error));
            }
        });
    };

    const resetForm = () => {
        setFormData({
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            amount: '',
            currency: 'UGX',
            purpose: '',
            notes: '',
            expires_at: '',
        });
    };

    const handleFilter = () => {
        router.get(`/dashboard/${company.company.slug}/payment-links`, {
            status: filterStatus,
            search: searchQuery,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    };

    const handleWhatsAppShare = (link) => {
        const message = `Hello ${link.customer_name},\n\nYou have a payment request from ${company.company.company_name}.\n\nAmount: ${link.formatted_amount}\n${link.purpose ? `Purpose: ${link.purpose}\n` : ''}\nPay here: ${link.public_url}`;
        const whatsappUrl = `https://wa.me/${link.customer_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCancel = (linkId) => {
        if (!confirm('Are you sure you want to cancel this payment link?')) return;

        router.post(`/dashboard/${company.company.slug}/payment-links/${linkId}/cancel`, {}, {
            onSuccess: () => {
                toast.success('Payment link cancelled successfully');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to cancel payment link');
            }
        });
    };

    const handleDelete = (linkId) => {
        if (!confirm('Are you sure you want to delete this payment link? This action cannot be undone.')) return;

        router.delete(`/dashboard/${company.company.slug}/payment-links/${linkId}`, {
            onSuccess: () => {
                toast.success('Payment link deleted successfully');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to delete payment link');
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'green';
            case 'pending': return 'orange';
            case 'expired': return 'gray';
            case 'cancelled': return 'red';
            default: return 'gray';
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-1">
                            Payment Links
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                            Create and manage shareable payment links for your customers
                        </Typography>
                    </div>
                    <Button color="blue" onClick={() => setCreateDialog(true)}>
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Link
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="small" className="text-gray-600">Total Links</Typography>
                            <Typography variant="h4" color="blue-gray">{stats.total_links}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="small" className="text-gray-600">Paid</Typography>
                            <Typography variant="h4" color="green">{stats.total_paid}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="small" className="text-gray-600">Pending</Typography>
                            <Typography variant="h4" color="orange">{stats.total_pending}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="small" className="text-gray-600">Amount Collected</Typography>
                            <Typography variant="h4" color="green">
                                {new Intl.NumberFormat('en-UG', {
                                    style: 'currency',
                                    currency: 'UGX'
                                }).format(stats.total_amount_paid)}
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="text-center">
                            <Typography variant="small" className="text-gray-600">Amount Pending</Typography>
                            <Typography variant="h4" color="orange">
                                {new Intl.NumberFormat('en-UG', {
                                    style: 'currency',
                                    currency: 'UGX'
                                }).format(stats.total_amount_pending)}
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardBody>
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <Input
                                    label="Search by name, phone, or code"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-48">
                                <Select
                                    label="Filter by Status"
                                    value={filterStatus}
                                    onChange={(value) => setFilterStatus(value)}
                                >
                                    <Option value="">All Status</Option>
                                    <Option value="pending">Pending</Option>
                                    <Option value="paid">Paid</Option>
                                    <Option value="expired">Expired</Option>
                                    <Option value="cancelled">Cancelled</Option>
                                </Select>
                            </div>
                            <Button color="blue" onClick={handleFilter}>
                                Apply
                            </Button>
                            {(filterStatus || searchQuery) && (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFilterStatus('');
                                        setSearchQuery('');
                                        router.get(`/dashboard/${company.company.slug}/payment-links`);
                                    }}
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </CardBody>
                </Card>

                {/* Payment Links Table */}
                <Card>
                    <CardHeader className="p-4">
                        <Typography variant="h6">Payment Links</Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-auto px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Customer</Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Amount</Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Purpose</Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Status</Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Created</Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="font-bold">Actions</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentLinks.data && paymentLinks.data.length > 0 ? (
                                    paymentLinks.data.map((link) => (
                                        <tr
                                            key={link.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setSelectedLink(link);
                                                setDetailsDialog(true);
                                            }}
                                        >
                                            <td className="p-4">
                                                <Typography variant="small" className="font-semibold">
                                                    {link.customer_name}
                                                </Typography>
                                                <Typography variant="small" className="text-gray-600">
                                                    {link.customer_phone}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="font-semibold">
                                                    {link.formatted_amount}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-700">
                                                    {link.purpose || '-'}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    value={link.status_label}
                                                    color={getStatusColor(link.status)}
                                                    size="sm"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-600">
                                                    {new Date(link.created_at).toLocaleDateString()}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <Tooltip content="Copy Link">
                                                        <IconButton
                                                            size="sm"
                                                            color="blue"
                                                            variant="text"
                                                            onClick={() => handleCopyLink(link.public_url)}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Share on WhatsApp">
                                                        <IconButton
                                                            size="sm"
                                                            color="green"
                                                            variant="text"
                                                            onClick={() => handleWhatsAppShare(link)}
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                                            </svg>
                                                        </IconButton>
                                                    </Tooltip>
                                                    {link.status === 'pending' && (
                                                        <>
                                                            <Tooltip content="Cancel">
                                                                <IconButton
                                                                    size="sm"
                                                                    color="red"
                                                                    variant="text"
                                                                    onClick={() => handleCancel(link.id)}
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    )}
                                                    {(link.status === 'pending' || link.status === 'cancelled') && (
                                                        <Tooltip content="Delete">
                                                            <IconButton
                                                                size="sm"
                                                                color="red"
                                                                variant="text"
                                                                onClick={() => handleDelete(link.id)}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-600">
                                            No payment links found. Create your first one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>

                {/* Pagination */}
                {paymentLinks.links && paymentLinks.links.length > 3 && (
                    <div className="flex justify-center mt-4 gap-2">
                        {paymentLinks.links.map((link, index) => (
                            <Button
                                key={index}
                                size="sm"
                                variant={link.active ? 'filled' : 'outlined'}
                                color="blue"
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                            >
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </Button>
                        ))}
                    </div>
                )}

                {/* Create Dialog */}
                <Dialog open={createDialog} handler={() => setCreateDialog(!createDialog)} size="lg">
                    <DialogHeader>Create Payment Link</DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <DialogBody divider className="max-h-[70vh] overflow-y-auto">
                            <div className="space-y-4">
                                <Input
                                    label="Customer Name *"
                                    value={formData.customer_name}
                                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                                    required
                                />
                                <Input
                                    label="Customer Phone *"
                                    value={formData.customer_phone}
                                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                                    required
                                />
                                <Input
                                    label="Customer Email (Optional)"
                                    type="email"
                                    value={formData.customer_email}
                                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Amount *"
                                        type="number"
                                        min="1"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        required
                                    />
                                    <Select
                                        label="Currency"
                                        value={formData.currency}
                                        onChange={(value) => setFormData({...formData, currency: value})}
                                    >
                                        <Option value="UGX">UGX</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="KES">KES</Option>
                                    </Select>
                                </div>
                                <Input
                                    label="Purpose (Optional)"
                                    value={formData.purpose}
                                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                />
                                <Textarea
                                    label="Notes (Optional)"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    rows={3}
                                />
                                <Input
                                    label="Expires At (Optional)"
                                    type="datetime-local"
                                    value={formData.expires_at}
                                    onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
                                />
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button variant="text" color="red" onClick={() => setCreateDialog(false)} className="mr-2">
                                Cancel
                            </Button>
                            <Button type="submit" color="blue">
                                Create Link
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>

                {/* Details Dialog */}
                <Dialog open={detailsDialog} handler={() => setDetailsDialog(!detailsDialog)} size="md">
                    <DialogHeader>Payment Link Details</DialogHeader>
                    <DialogBody divider className="max-h-[70vh] overflow-y-auto">
                        {selectedLink ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <Typography variant="small" className="text-gray-600 mb-1">Link Code</Typography>
                                    <Typography variant="h6" color="blue">{selectedLink.link_code}</Typography>
                                    <Typography variant="small" className="text-gray-600 break-all mt-2">
                                        {selectedLink.public_url}
                                    </Typography>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Customer Name</Typography>
                                        <Typography className="font-semibold">{selectedLink.customer_name}</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Phone</Typography>
                                        <Typography className="font-semibold">{selectedLink.customer_phone}</Typography>
                                    </div>
                                </div>

                                {selectedLink.customer_email && (
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Email</Typography>
                                        <Typography className="font-semibold">{selectedLink.customer_email}</Typography>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Amount</Typography>
                                        <Typography variant="h6" color="blue">{selectedLink.formatted_amount}</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Status</Typography>
                                        <Chip
                                            value={selectedLink.status_label}
                                            color={getStatusColor(selectedLink.status)}
                                            size="sm"
                                            className="w-fit"
                                        />
                                    </div>
                                </div>

                                {selectedLink.purpose && (
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Purpose</Typography>
                                        <Typography>{selectedLink.purpose}</Typography>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Created At</Typography>
                                        <Typography>{new Date(selectedLink.created_at).toLocaleString()}</Typography>
                                    </div>
                                    {selectedLink.paid_at && (
                                        <div>
                                            <Typography variant="small" className="text-gray-600">Paid At</Typography>
                                            <Typography>{new Date(selectedLink.paid_at).toLocaleString()}</Typography>
                                        </div>
                                    )}
                                </div>

                                {selectedLink.created_by_name && (
                                    <div>
                                        <Typography variant="small" className="text-gray-600">Created By</Typography>
                                        <Typography>{selectedLink.created_by_name}</Typography>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" onClick={() => setDetailsDialog(false)}>
                            Close
                        </Button>
                        {selectedLink && (
                            <>
                                <Button
                                    color="blue"
                                    variant="outlined"
                                    onClick={() => handleCopyLink(selectedLink.public_url)}
                                    className="mr-2"
                                >
                                    Copy Link
                                </Button>
                                <Button
                                    color="green"
                                    onClick={() => handleWhatsAppShare(selectedLink)}
                                >
                                    Share on WhatsApp
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
}

PaymentLinks.layout = (page) => (
    <Layout children={page} props={page.props.company} />
);
