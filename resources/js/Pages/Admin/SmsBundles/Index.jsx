import {Head, router, useForm} from '@inertiajs/react';
import React, {useState} from 'react';
import AdminLayout from '@/Layouts/components/admin/AdminLayout';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Switch,
    IconButton,
    Chip
} from '@material-tailwind/react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Simple SVG Icons
const PencilIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

export default function Index({ auth, bundles }) {
    const [showModal, setShowModal] = useState(false);
    const [editingBundle, setEditingBundle] = useState(null);

    const {data, setData, post, put, delete: destroy, processing, errors, reset} = useForm({
        name: '',
        sms_count: '',
        price: '',
        description: '',
        is_active: true,
    });

    const openCreateModal = () => {
        reset();
        setEditingBundle(null);
        setShowModal(true);
    };

    const openEditModal = (bundle) => {
        setEditingBundle(bundle);
        setData({
            name: bundle.name,
            sms_count: bundle.sms_count,
            price: bundle.price,
            description: bundle.description || '',
            is_active: bundle.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingBundle) {
            put(route('admin.sms-bundles.update', editingBundle.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('SMS bundle updated successfully');
                    setShowModal(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update SMS bundle');
                }
            });
        } else {
            post(route('admin.sms-bundles.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('SMS bundle created successfully');
                    setShowModal(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to create SMS bundle');
                }
            });
        }
    };

    const handleDelete = (bundleId) => {
        if (confirm('Are you sure you want to delete this SMS bundle?')) {
            router.delete(route('admin.sms-bundles.delete', bundleId), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('SMS bundle deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete SMS bundle');
                }
            });
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="SMS Bundles Management"/>

            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <Typography variant="h4" color="blue-gray">
                            SMS Bundles Management
                        </Typography>
                        <Typography variant="small" color="gray" className="mt-1">
                            Manage SMS bundle pricing and availability
                        </Typography>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary"
                    >
                        <PlusIcon className="h-5 w-5"/>
                        Add Bundle
                    </Button>
                </div>

                <Card>
                    <CardBody className="overflow-x-auto p-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                        Bundle Name
                                    </Typography>
                                </th>
                                <th className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                        SMS Count
                                    </Typography>
                                </th>
                                <th className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                        Price (UGX)
                                    </Typography>
                                </th>
                                <th className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                        Description
                                    </Typography>
                                </th>
                                <th className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                        Status
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
                            {bundles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">
                                        <Typography variant="small" color="gray">
                                            No SMS bundles found. Create one to get started.
                                        </Typography>
                                    </td>
                                </tr>
                            ) : (
                                bundles.map((bundle) => (
                                    <tr key={bundle.id} className="border-b border-gray-100">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {bundle.name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray">
                                                {bundle.sms_count.toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray">
                                                {bundle.price.toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="gray" className="max-w-xs truncate">
                                                {bundle.description || '-'}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Chip
                                                value={bundle.is_active ? 'Active' : 'Inactive'}
                                                color={bundle.is_active ? 'green' : 'gray'}
                                                size="sm"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <IconButton
                                                    variant="text"
                                                    color="blue"
                                                    onClick={() => openEditModal(bundle)}
                                                >
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                                <IconButton
                                                    variant="text"
                                                    color="red"
                                                    onClick={() => handleDelete(bundle.id)}
                                                >
                                                    <TrashIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={showModal} handler={() => setShowModal(false)} size="md">
                <DialogHeader>
                    {editingBundle ? 'Edit SMS Bundle' : 'Create SMS Bundle'}
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody divider className="space-y-4">
                        <div>
                            <Input
                                label="Bundle Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={!!errors.name}
                            />
                            {errors.name && (
                                <Typography variant="small" color="red" className="mt-1">
                                    {errors.name}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Input
                                type="number"
                                label="SMS Count"
                                value={data.sms_count}
                                onChange={(e) => setData('sms_count', e.target.value)}
                                error={!!errors.sms_count}
                            />
                            {errors.sms_count && (
                                <Typography variant="small" color="red" className="mt-1">
                                    {errors.sms_count}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Input
                                type="number"
                                label="Price (UGX)"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                error={!!errors.price}
                            />
                            {errors.price && (
                                <Typography variant="small" color="red" className="mt-1">
                                    {errors.price}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Textarea
                                label="Description (Optional)"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                label="Active"
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="gray"
                            onClick={() => {
                                setShowModal(false);
                                reset();
                            }}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-gradient-to-r from-primary to-secondary"
                        >
                            {processing ? 'Saving...' : editingBundle ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>

            <ToastContainer/>
        </AdminLayout>
    );
}
