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
    Select,
    Option,
    IconButton
} from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/Layouts/components/Layout';

export default function PayoutDetails({ company, payoutDetails = [] }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPayout, setEditingPayout] = useState(null);

    const { data: addData, setData: setAddData, post, processing, errors, reset } = useForm({
        type: 'mobile_money',
        label: '',
        phone_number: '',
        network: 'MTN',
        bank_name: '',
        account_name: '',
        account_number: '',
        branch: '',
        is_default: false,
    });

    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        label: '',
        phone_number: '',
        network: '',
        bank_name: '',
        account_name: '',
        account_number: '',
        branch: '',
        is_default: false,
    });

    const handleAdd = (e) => {
        e.preventDefault();

        // Validation
        if (!addData.account_name) {
            toast.error('Account holder name is required');
            return;
        }

        if (addData.type === 'mobile_money') {
            if (!addData.phone_number) {
                toast.error('Phone number is required');
                return;
            }
            if (!addData.phone_number.match(/^(07|\+?256|0)/)) {
                toast.error('Phone number must start with 07, 256, or +256');
                return;
            }
        } else if (addData.type === 'bank') {
            if (!addData.bank_name || !addData.account_number) {
                toast.error('Bank name and account number are required');
                return;
            }
        }

        post(route('payout-details.store', company.company.slug), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Payout method added successfully!');
                setShowAddModal(false);
                reset();
            },
            onError: (errors) => {
                if (errors.phone_number) {
                    toast.error(errors.phone_number);
                } else {
                    toast.error('Failed to add payout method');
                }
            }
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();

        put(route('payout-details.update', [company.company.slug, editingPayout.id]), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Payout method updated successfully!');
                setShowEditModal(false);
                setEditingPayout(null);
                resetEdit();
            },
            onError: () => {
                toast.error('Failed to update payout method');
            }
        });
    };

    const openEditModal = (payout) => {
        setEditingPayout(payout);
        setEditData({
            label: payout.label || '',
            phone_number: payout.phone_number || '',
            network: payout.network || '',
            bank_name: payout.bank_name || '',
            account_name: payout.account_name || '',
            account_number: payout.account_number || '',
            branch: payout.branch || '',
            is_default: payout.is_default,
        });
        setShowEditModal(true);
    };

    const handleSetDefault = (payoutId) => {
        router.post(route('payout-details.set-default', [company.company.slug, payoutId]), {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Default payout method updated!');
            },
            onError: () => {
                toast.error('Failed to set default');
            }
        });
    };

    const handleDelete = (payoutId) => {
        if (confirm('Are you sure you want to delete this payout method?')) {
            router.delete(route('payout-details.destroy', [company.company.slug, payoutId]), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Payout method deleted successfully!');
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error('Failed to delete payout method');
                    }
                }
            });
        }
    };

    const mobileMoneyPayouts = payoutDetails.filter(p => p.type === 'mobile_money');
    const bankPayouts = payoutDetails.filter(p => p.type === 'bank');

    return (
        <>
            <Head title="Payout Methods" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Payout Methods
                        </Typography>
                        <Typography variant="small" color="gray">
                            Manage your withdrawal destinations
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('wallet.index', company.company.slug)}>
                            <Button variant="outlined" color="gray">
                                Back to Wallet
                            </Button>
                        </Link>
                        <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-green-500 to-green-700">
                            + Add Payout Method
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mobile Money Section */}
                    <Card>
                        <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📱</span>
                                <Typography variant="h6" color="blue-gray">
                                    Mobile Money
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {mobileMoneyPayouts.length === 0 ? (
                                <div className="text-center py-8">
                                    <Typography variant="small" color="gray">
                                        No mobile money accounts added
                                    </Typography>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {mobileMoneyPayouts.map((payout) => (
                                        <Card key={payout.id} className="border">
                                            <CardBody className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Typography variant="h6" color="blue-gray">
                                                                {payout.label || payout.network}
                                                            </Typography>
                                                            {payout.is_default && (
                                                                <Chip value="Default" size="sm" color="green" />
                                                            )}
                                                        </div>
                                                        <Typography variant="small" color="gray" className="mb-1">
                                                            Network: {payout.network}
                                                        </Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {payout.account_name}
                                                        </Typography>
                                                        <Typography variant="small" color="gray">
                                                            {payout.formatted_phone || payout.phone_number}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {!payout.is_default && (
                                                            <IconButton
                                                                size="sm"
                                                                variant="text"
                                                                color="green"
                                                                onClick={() => handleSetDefault(payout.id)}
                                                                title="Set as default"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                </svg>
                                                            </IconButton>
                                                        )}
                                                        <IconButton
                                                            size="sm"
                                                            variant="text"
                                                            color="blue"
                                                            onClick={() => openEditModal(payout)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton
                                                            size="sm"
                                                            variant="text"
                                                            color="red"
                                                            onClick={() => handleDelete(payout.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    {/* Bank Accounts Section */}
                    <Card>
                        <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏦</span>
                                <Typography variant="h6" color="blue-gray">
                                    Bank Accounts
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {bankPayouts.length === 0 ? (
                                <div className="text-center py-8">
                                    <Typography variant="small" color="gray">
                                        No bank accounts added
                                    </Typography>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bankPayouts.map((payout) => (
                                        <Card key={payout.id} className="border">
                                            <CardBody className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Typography variant="h6" color="blue-gray">
                                                                {payout.label || payout.bank_name}
                                                            </Typography>
                                                            {payout.is_default && (
                                                                <Chip value="Default" size="sm" color="green" />
                                                            )}
                                                        </div>
                                                        <Typography variant="small" color="gray" className="mb-1">
                                                            Bank: {payout.bank_name}
                                                        </Typography>
                                                        <Typography variant="small" color="gray" className="mb-1">
                                                            Account: {payout.account_name}
                                                        </Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {payout.masked_account_number || payout.account_number}
                                                        </Typography>
                                                        {payout.branch && (
                                                            <Typography variant="small" color="gray">
                                                                Branch: {payout.branch}
                                                            </Typography>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {!payout.is_default && (
                                                            <IconButton
                                                                size="sm"
                                                                variant="text"
                                                                color="green"
                                                                onClick={() => handleSetDefault(payout.id)}
                                                                title="Set as default"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                </svg>
                                                            </IconButton>
                                                        )}
                                                        <IconButton
                                                            size="sm"
                                                            variant="text"
                                                            color="blue"
                                                            onClick={() => openEditModal(payout)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </IconButton>
                                                        <IconButton
                                                            size="sm"
                                                            variant="text"
                                                            color="red"
                                                            onClick={() => handleDelete(payout.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>

                {/* Add Payout Modal */}
                <Dialog open={showAddModal} handler={() => setShowAddModal(false)} size="md">
                    <DialogHeader>Add Payout Method</DialogHeader>
                    <form onSubmit={handleAdd}>
                        <DialogBody divider className="max-h-[60vh] overflow-y-auto">
                            <div className="space-y-4">
                                <Select
                                    label="Payout Type"
                                    value={addData.type}
                                    onChange={(val) => setAddData('type', val)}
                                >
                                    <Option value="mobile_money">📱 Mobile Money (No Fee)</Option>
                                    <Option value="bank">🏦 Bank Account (UGX 6,000 fee)</Option>
                                </Select>

                                <Input
                                    label="Label (Optional)"
                                    value={addData.label}
                                    onChange={(e) => setAddData('label', e.target.value)}
                                    placeholder="e.g., My MTN, Main Bank Account"
                                />

                                {addData.type === 'mobile_money' ? (
                                    <>
                                        <Select
                                            label="Network"
                                            value={addData.network}
                                            onChange={(val) => setAddData('network', val)}
                                        >
                                            <Option value="MTN">MTN Mobile Money</Option>
                                            <Option value="Airtel">Airtel Money</Option>
                                        </Select>
                                        <Input
                                            label="Account Holder Name *"
                                            value={addData.account_name}
                                            onChange={(e) => setAddData('account_name', e.target.value)}
                                            placeholder="Name as registered on mobile money"
                                            error={!!errors.account_name}
                                        />
                                        {errors.account_name && (
                                            <Typography variant="small" color="red">
                                                {errors.account_name}
                                            </Typography>
                                        )}
                                        <Input
                                            label="Phone Number *"
                                            value={addData.phone_number}
                                            onChange={(e) => setAddData('phone_number', e.target.value)}
                                            placeholder="07XXXXXXXX or +256XXXXXXXXX"
                                            error={!!errors.phone_number}
                                        />
                                        {errors.phone_number && (
                                            <Typography variant="small" color="red">
                                                {errors.phone_number}
                                            </Typography>
                                        )}
                                        <Typography variant="small" color="gray">
                                            Phone number must start with 07, 256, or +256
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            label="Bank Name"
                                            value={addData.bank_name}
                                            onChange={(e) => setAddData('bank_name', e.target.value)}
                                            placeholder="e.g., Stanbic Bank"
                                        />
                                        <Input
                                            label="Account Name"
                                            value={addData.account_name}
                                            onChange={(e) => setAddData('account_name', e.target.value)}
                                            placeholder="Account holder name"
                                        />
                                        <Input
                                            label="Account Number"
                                            value={addData.account_number}
                                            onChange={(e) => setAddData('account_number', e.target.value)}
                                            placeholder="Account number"
                                        />
                                        <Input
                                            label="Branch (Optional)"
                                            value={addData.branch}
                                            onChange={(e) => setAddData('branch', e.target.value)}
                                            placeholder="e.g., Kampala Main Branch"
                                        />
                                    </>
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_default"
                                        checked={addData.is_default}
                                        onChange={(e) => setAddData('is_default', e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="is_default" className="text-sm text-gray-700 cursor-pointer">
                                        Set as default payout method for {addData.type === 'mobile_money' ? 'Mobile Money' : 'Bank'}
                                    </label>
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="gray"
                                onClick={() => {
                                    setShowAddModal(false);
                                    reset();
                                }}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-green-500 to-green-700"
                            >
                                {processing ? 'Adding...' : 'Add Payout Method'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>

                {/* Edit Payout Modal */}
                {editingPayout && (
                    <Dialog open={showEditModal} handler={() => setShowEditModal(false)} size="md">
                        <DialogHeader>Edit Payout Method</DialogHeader>
                        <form onSubmit={handleEdit}>
                            <DialogBody divider className="max-h-[60vh] overflow-y-auto">
                                <div className="space-y-4">
                                    <Input
                                        label="Label (Optional)"
                                        value={editData.label}
                                        onChange={(e) => setEditData('label', e.target.value)}
                                        placeholder="e.g., My MTN, Main Bank Account"
                                    />

                                    {editingPayout.type === 'mobile_money' ? (
                                        <>
                                            <Select
                                                label="Network"
                                                value={editData.network}
                                                onChange={(val) => setEditData('network', val)}
                                            >
                                                <Option value="MTN">MTN Mobile Money</Option>
                                                <Option value="Airtel">Airtel Money</Option>
                                            </Select>
                                            <Input
                                                label="Account Holder Name *"
                                                value={editData.account_name}
                                                onChange={(e) => setEditData('account_name', e.target.value)}
                                                placeholder="Name as registered on mobile money"
                                            />
                                            <Input
                                                label="Phone Number *"
                                                value={editData.phone_number}
                                                onChange={(e) => setEditData('phone_number', e.target.value)}
                                                placeholder="07XXXXXXXX or +256XXXXXXXXX"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Input
                                                label="Bank Name"
                                                value={editData.bank_name}
                                                onChange={(e) => setEditData('bank_name', e.target.value)}
                                            />
                                            <Input
                                                label="Account Name"
                                                value={editData.account_name}
                                                onChange={(e) => setEditData('account_name', e.target.value)}
                                            />
                                            <Input
                                                label="Account Number"
                                                value={editData.account_number}
                                                onChange={(e) => setEditData('account_number', e.target.value)}
                                            />
                                            <Input
                                                label="Branch (Optional)"
                                                value={editData.branch}
                                                onChange={(e) => setEditData('branch', e.target.value)}
                                            />
                                        </>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="edit_is_default"
                                            checked={editData.is_default}
                                            onChange={(e) => setEditData('is_default', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="edit_is_default" className="text-sm text-gray-700 cursor-pointer">
                                            Set as default payout method
                                        </label>
                                    </div>
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="gray"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingPayout(null);
                                        resetEdit();
                                    }}
                                    className="mr-2"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="bg-gradient-to-r from-blue-500 to-blue-700"
                                >
                                    {editProcessing ? 'Updating...' : 'Update'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                )}

                <ToastContainer />
            </div>
        </>
    );
}

PayoutDetails.layout = (page) => (
    <Layout children={page} props={page.props.company} />
);
