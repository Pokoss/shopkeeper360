import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Card,
    CardBody,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Switch,
    IconButton,
    Chip,
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/Layouts/components/admin/AdminLayout';

export default function PaymentFees({ auth, fees }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingFee, setEditingFee] = useState(null);
    const [formData, setFormData] = useState({
        fee_type: 'platform',
        name: '',
        min_amount: '0',
        max_amount: '',
        calculation_type: 'fixed',
        fee_value: '',
        is_active: true,
        priority: '1',
    });

    const handleOpenDialog = (fee = null) => {
        if (fee) {
            setEditingFee(fee);
            setFormData({
                fee_type: fee.fee_type,
                name: fee.name,
                min_amount: fee.min_amount.toString(),
                max_amount: fee.max_amount ? fee.max_amount.toString() : '',
                calculation_type: fee.calculation_type,
                fee_value: fee.fee_value.toString(),
                is_active: fee.is_active,
                priority: fee.priority.toString(),
            });
        } else {
            setEditingFee(null);
            setFormData({
                fee_type: 'platform',
                name: '',
                min_amount: '0',
                max_amount: '',
                calculation_type: 'fixed',
                fee_value: '',
                is_active: true,
                priority: '1',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingFee(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const url = editingFee 
            ? `/admin/payment-fees/${editingFee.id}`
            : '/admin/payment-fees';
        
        const method = editingFee ? 'put' : 'post';

        router[method](url, formData, {
            onSuccess: () => {
                toast.success(editingFee ? 'Fee updated successfully' : 'Fee created successfully');
                handleCloseDialog();
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
            },
        });
    };

    const handleDelete = (feeId) => {
        if (confirm('Are you sure you want to delete this fee?')) {
            router.delete(`/admin/payment-fees/${feeId}`, {
                onSuccess: () => {
                    toast.success('Fee deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete fee');
                },
            });
        }
    };

    const handleToggleStatus = (feeId) => {
        router.post(`/admin/payment-fees/${feeId}/toggle`, {}, {
            onSuccess: () => {
                toast.success('Fee status updated');
            },
            onError: () => {
                toast.error('Failed to update fee status');
            },
        });
    };

    const platformFees = fees.filter(fee => fee.fee_type === 'platform');
    const gatewayFees = fees.filter(fee => fee.fee_type === 'gateway');

    return (
        <>
            <Head title="Payment Fees Management" />
            <ToastContainer />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant="h4" color="blue-gray">
                            Payment Fees Configuration
                        </Typography>
                        <Typography variant="small" className="text-gray-600 mt-1">
                            Manage platform and gateway fees for payment links
                        </Typography>
                    </div>
                    <Button
                        color="blue"
                        onClick={() => handleOpenDialog()}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Fee
                    </Button>
                </div>

                {/* Platform Fees */}
                <Card>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            Platform Fees (Your Revenue)
                        </Typography>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Name
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Amount Range
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Fee
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Priority
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Status
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Actions
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {platformFees.map((fee, index) => (
                                        <tr key={fee.id} className="border-b border-gray-100">
                                            <td className="p-4">
                                                <Typography variant="small" className="font-semibold text-gray-900">
                                                    {fee.name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-700">
                                                    {Number(fee.min_amount).toLocaleString()} - {fee.max_amount ? Number(fee.max_amount).toLocaleString() : '∞'} UGX
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-900 font-semibold">
                                                    {fee.calculation_type === 'fixed' 
                                                        ? `${Number(fee.fee_value).toLocaleString()} UGX`
                                                        : `${fee.fee_value}%`
                                                    }
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    value={fee.priority}
                                                    size="sm"
                                                    variant="ghost"
                                                    color="blue"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <Switch
                                                    checked={fee.is_active}
                                                    onChange={() => handleToggleStatus(fee.id)}
                                                    color="green"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <IconButton
                                                        size="sm"
                                                        color="blue"
                                                        variant="text"
                                                        onClick={() => handleOpenDialog(fee)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </IconButton>
                                                    <IconButton
                                                        size="sm"
                                                        color="red"
                                                        variant="text"
                                                        onClick={() => handleDelete(fee.id)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>

                {/* Gateway Fees */}
                <Card>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                            Gateway Fees (Flutterwave Charges)
                        </Typography>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Name
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Amount Range
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Fee
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Priority
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Status
                                            </Typography>
                                        </th>
                                        <th className="p-4">
                                            <Typography variant="small" className="font-semibold text-gray-700">
                                                Actions
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gatewayFees.map((fee) => (
                                        <tr key={fee.id} className="border-b border-gray-100">
                                            <td className="p-4">
                                                <Typography variant="small" className="font-semibold text-gray-900">
                                                    {fee.name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-700">
                                                    {Number(fee.min_amount).toLocaleString()} - {fee.max_amount ? Number(fee.max_amount).toLocaleString() : '∞'} UGX
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="text-gray-900 font-semibold">
                                                    {fee.calculation_type === 'fixed' 
                                                        ? `${Number(fee.fee_value).toLocaleString()} UGX`
                                                        : `${fee.fee_value}%`
                                                    }
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    value={fee.priority}
                                                    size="sm"
                                                    variant="ghost"
                                                    color="orange"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <Switch
                                                    checked={fee.is_active}
                                                    onChange={() => handleToggleStatus(fee.id)}
                                                    color="green"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <IconButton
                                                        size="sm"
                                                        color="blue"
                                                        variant="text"
                                                        onClick={() => handleOpenDialog(fee)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </IconButton>
                                                    <IconButton
                                                        size="sm"
                                                        color="red"
                                                        variant="text"
                                                        onClick={() => handleDelete(fee.id)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>

                {/* Add/Edit Dialog */}
                <Dialog open={openDialog} handler={handleCloseDialog} size="md">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            {editingFee ? 'Edit Payment Fee' : 'Add New Payment Fee'}
                        </DialogHeader>
                        <DialogBody divider className="space-y-4 max-h-[60vh] overflow-y-auto">
                            <div>
                                <Typography variant="small" className="mb-2 font-semibold">
                                    Fee Type
                                </Typography>
                                <Select
                                    value={formData.fee_type}
                                    onChange={(value) => setFormData({ ...formData, fee_type: value })}
                                >
                                    <Option value="platform">Platform Fee (Your Revenue)</Option>
                                    <Option value="gateway">Gateway Fee (Flutterwave)</Option>
                                </Select>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-semibold">
                                    Name
                                </Typography>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Platform Fee - Small"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Typography variant="small" className="mb-2 font-semibold">
                                        Minimum Amount (UGX)
                                    </Typography>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={formData.min_amount}
                                        onChange={(e) => setFormData({ ...formData, min_amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Typography variant="small" className="mb-2 font-semibold">
                                        Maximum Amount (UGX)
                                    </Typography>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={formData.max_amount}
                                        onChange={(e) => setFormData({ ...formData, max_amount: e.target.value })}
                                        placeholder="Leave empty for no limit"
                                    />
                                </div>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-semibold">
                                    Calculation Type
                                </Typography>
                                <Select
                                    value={formData.calculation_type}
                                    onChange={(value) => setFormData({ ...formData, calculation_type: value })}
                                >
                                    <Option value="fixed">Fixed Amount</Option>
                                    <Option value="percentage">Percentage</Option>
                                </Select>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-semibold">
                                    Fee Value {formData.calculation_type === 'percentage' ? '(%)' : '(UGX)'}
                                </Typography>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.fee_value}
                                    onChange={(e) => setFormData({ ...formData, fee_value: e.target.value })}
                                    placeholder={formData.calculation_type === 'percentage' ? 'e.g., 1.2' : 'e.g., 500'}
                                    required
                                />
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-semibold">
                                    Priority (Lower number = higher priority)
                                </Typography>
                                <Input
                                    type="number"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <Switch
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    color="green"
                                />
                                <Typography variant="small" className="font-semibold">
                                    Active
                                </Typography>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleCloseDialog}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color="blue">
                                {editingFee ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </div>
        </>
    );
}

PaymentFees.layout = (page) => <AdminLayout children={page} auth={page.props.auth} />;
