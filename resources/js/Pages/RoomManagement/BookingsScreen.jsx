import { Head, router } from '@inertiajs/react';
import { Card, Typography, Button } from '@material-tailwind/react';
import React from 'react';
import Layout from '@/Layouts/components/Layout';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

function BookingsScreen({ company, bookings }) {
    const columns = [
        {
            name: 'Room',
            selector: row => row.room?.name ?? '—',
            sortable: true
        },
        {
            name: 'Guest Name',
            selector: row => row.guest_name,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.guest_phone,
        },
        {
            name: 'Check In',
            selector: row => new Date(row.check_in).toLocaleString(),
        },
        {
            name: 'Check Out',
            selector: row => new Date(row.check_out).toLocaleString(),
        },
        {
            name: 'Rate Type',
            selector: row => row.rate_type,
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => {
                const label = row.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                const classes = row.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    row.status === 'checked_in' ? 'bg-green-100 text-green-800' :
                    row.status === 'checked_out' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800';

                return (
                    <span className={`px-2 py-1 rounded-full text-xs ${classes}`}>
                        {label}
                    </span>
                );
            }
        },
        {
            name: 'Estimated / Total',
            selector: row => row.total_amount ?? row.estimated_amount,
            cell: row => {
                const est = row.estimated_amount ?? 0;
                const tot = row.total_amount;
                if (tot) {
                    return `UGX ${Intl.NumberFormat().format(tot)}`;
                }
                return `Est: UGX ${Intl.NumberFormat().format(est)}`;
            }
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    {row.status === 'confirmed' && (
                        <Button className='w-20 p-1'
                            size="sm"
                            color="green"
                            onClick={() => {
                                router.post(
                                    `/dashboard/${company.company.slug}/rooms/bookings/${row.id}/checkin`,
                                    {},
                                    {
                                        onSuccess: () => toast.success('Guest checked in successfully'),
                                        onError: (errors) => Object.values(errors).forEach(msg => toast.error(msg)),
                                        preserveScroll: true
                                    }
                                );
                            }}
                        >
                            Check In
                        </Button>
                    )}

                    {row.status === 'checked_in' && (
                        <Button
                        className='w-20 p-1'
                            size="sm"
                            color="blue"
                            onClick={() => {
                                router.post(
                                    `/dashboard/${company.company.slug}/rooms/bookings/${row.id}/checkout`,
                                    {},
                                    {
                                        onSuccess: () => toast.success('Guest checked out successfully'),
                                        onError: (errors) => Object.values(errors).forEach(msg => toast.error(msg)),
                                        preserveScroll: true
                                    }
                                );
                            }}
                        >
                            Check Out
                        </Button>
                    )}

                    {['confirmed', 'checked_in'].includes(row.status) && (
                        <Button
                        className='w-20 p-1'
                            size="sm"
                            variant="outlined"
                            color="red"
                            onClick={() => {
                                if (!confirm('Are you sure you want to cancel this booking?')) return;
                                router.post(
                                    `/dashboard/${company.company.slug}/rooms/bookings/${row.id}/cancel`,
                                    {},
                                    {
                                        onSuccess: () => toast.success('Booking cancelled'),
                                        onError: (errors) => Object.values(errors).forEach(msg => toast.error(msg)),
                                        preserveScroll: true
                                    }
                                );
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <Head title="Room Bookings" />
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Room Bookings</Typography>
            </div>

            <Card className="overflow-hidden">
                <DataTable
                    columns={columns}
                    data={bookings.data}
                    pagination
                    paginationServer
                    paginationTotalRows={bookings.total}
                    onChangePage={(page) => {
                        router.get(`/dashboard/${company.company.slug}/rooms/bookings`,
                            { page },
                            { preserveScroll: true, preserveState: true }
                        );
                    }}
                />
            </Card>
        </div>
    );
}

BookingsScreen.layout = page => <Layout children={page} props={page.props.company} />
export default BookingsScreen;
