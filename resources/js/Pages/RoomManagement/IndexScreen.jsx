import { Head, router } from '@inertiajs/react';
import { Button, Card, Input, Select, Option, Typography, Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter, Spinner } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/components/Layout';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function RoomManagementScreen({ company, rooms }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(rooms.current_page);

    const fetchData = (page) => {
        router.get(
            `/dashboard/${company.company.slug}/rooms`,
            { page, search },
            { preserveState: true }
        );
    };

    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        setPage(1);
        var searchVal = e.target.value;
        router.get(
            `/dashboard/${company.company.slug}/rooms`,
            {
                search: searchVal,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {},
            }
        );
    };
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const initialFormData = {
        name: '',
        type: '',
        description: '',
        hourly_rate: '',
        nightly_rate: '',
        daily_rate: '',
        weekly_rate: '',
        monthly_rate: '',
        status: 'available'
    };
    const [formData, setFormData] = useState(initialFormData);

    const [bookingData, setBookingData] = useState({
        check_in: '',
        check_out: '',
        guest_name: '',
        guest_phone: '',
        guest_email: '',
        number_of_guests: 1,
        rate_type: 'nightly'
    });

    const [estimatedPrice, setEstimatedPrice] = useState(0);

    useEffect(() => {
        computeEstimated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingData, selectedRoom]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const computeEstimated = () => {
        if (!selectedRoom) {
            setEstimatedPrice(0);
            return;
        }

        const { check_in, check_out, rate_type } = bookingData;
        if (!check_in || !check_out) {
            setEstimatedPrice(0);
            return;
        }

        const start = new Date(check_in);
        const end = new Date(check_out);
        if (isNaN(start) || isNaN(end) || end <= start) {
            setEstimatedPrice(0);
            return;
        }

        const ms = end - start;
        const hours = Math.ceil(ms / (1000 * 60 * 60));
        const days = Math.ceil(hours / 24);
        const weeks = Math.ceil(days / 7);
        const months = Math.ceil(days / 30);

        const r = selectedRoom;

        let total = 0;
        switch (rate_type) {
            case 'hourly':
                total = (Number(r.hourly_rate) || 0) * hours;
                break;
            case 'nightly':
                // nights use days approximation
                total = (Number(r.nightly_rate) || 0) * Math.max(1, Math.ceil(hours / 24));
                break;
            case 'daily':
                total = (Number(r.daily_rate) || 0) * Math.max(1, days);
                break;
            case 'weekly':
                total = (Number(r.weekly_rate) || 0) * Math.max(1, weeks);
                break;
            case 'monthly':
                total = (Number(r.monthly_rate) || 0) * Math.max(1, months);
                break;
            default:
                total = 0;
        }

        setEstimatedPrice(total);
    };

    const handleOpenAddModal = () => {
        setFormData(initialFormData);
        setShowAddModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        router.post(`/dashboard/${company.company.slug}/rooms`, formData, {
            onSuccess: () => {
                setShowAddModal(false);
                setFormData(initialFormData);
                toast.success('Room added successfully');
            },
            onError: (errors) => {
                Object.values(errors).forEach(msg => toast.error(msg));
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(`/dashboard/${company.company.slug}/rooms/${selectedRoom.id}`, formData, {
            onSuccess: () => {
                setShowEditModal(false);
                toast.success('Room updated successfully');
            },
            onError: (errors) => {
                Object.values(errors).forEach(msg => toast.error(msg));
            }
        });
    };

    const handleBookRoom = (e) => {
        e.preventDefault();
        // include rate_type in bookingData
        router.post(`/dashboard/${company.company.slug}/rooms/${selectedRoom.id}/book`, bookingData, {
            onSuccess: () => {
                setShowBookModal(false);
                setBookingData({
                    check_in: '',
                    check_out: '',
                    guest_name: '',
                    guest_phone: '',
                    guest_email: '',
                    number_of_guests: 1,
                    rate_type: 'nightly'
                });
                setEstimatedPrice(0);
                toast.success('Room booked successfully');
            },
            onError: (errors) => {
                Object.values(errors).forEach(msg => toast.error(msg));
            }
        });
    };

    const columns = [
        {
            name: 'Room',
            selector: row => row.name,
        },
        {
            name: 'Type',
            selector: row => row.type,
        },
        {
            name: 'Hourly Rate',
            selector: row => `UGX ${Intl.NumberFormat().format(row.hourly_rate || 0)}`,
        },
        {
            name: 'Nightly Rate',
            selector: row => `UGX ${Intl.NumberFormat().format(row.nightly_rate || 0)}`,
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === 'available' ? 'bg-green-100 text-green-800' :
                    row.status === 'occupied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                            setSelectedRoom(row);
                            setFormData({
                                ...row,
                                hourly_rate: row.hourly_rate ?? '',
                                nightly_rate: row.nightly_rate ?? '',
                                daily_rate: row.daily_rate ?? '',
                                weekly_rate: row.weekly_rate ?? '',
                                monthly_rate: row.monthly_rate ?? '',
                                status: row.status || 'available'
                            });
                            setShowEditModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    {row.status === 'available' ? (
                        <Tooltip content="Book this room">
                            <Button
                                size="sm"
                                color="green"
                                onClick={() => {
                                    setSelectedRoom(row);
                                    setBookingData({
                                        check_in: '',
                                        check_out: '',
                                        guest_name: '',
                                        guest_phone: '',
                                        guest_email: '',
                                        number_of_guests: 1,
                                        rate_type: 'nightly'
                                    });
                                    setEstimatedPrice(0);
                                    setShowBookModal(true);
                                }}
                            >
                                Book
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip content={row.status === 'maintenance' ? 'Room is under maintenance' : 'Room is currently occupied'}>
                            <span>
                                <Button size="sm" color="green" disabled>Book</Button>
                            </span>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Head title="Room Management" />
            <Card className="overflow-hidden">
                <DataTable
                    title={
                        <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                            <span className="text-lg font-medium">Room Management</span>
                            <div className="flex items-center space-x-2 mt-2 md:mt-0 w-full md:w-1/2">
                                <Input
                                    type="text"
                                    label="Search"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <Button
                                    onClick={handleOpenAddModal}
                                    className="bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2 h-10"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Add New Room
                                </Button>
                            </div>
                        </div>
                    }
                    columns={columns}
                    data={rooms.data}
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: '#f8fafc',
                            },
                        },
                        headCells: {
                            style: {
                                fontWeight: 'bold',
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                color: '#4CAF50',
                            },
                        },
                        rows: {
                            style: {
                                minHeight: '50px',
                            },
                            highlightOnHoverStyle: {
                                backgroundColor: '#f1f5f9',
                                cursor: 'pointer',
                            },
                        },
                    }}
                    pointerOnHover
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={rooms.total}
                    paginationPerPage={rooms.per_page}
                    onChangePage={handlePageChange}
                    paginationRowsPerPageOptions={[]}
                />
            </Card>

            {/* Add Room Modal */}
            {showAddModal && (
                <Dialog open={showAddModal} size="xl" handler={() => setShowAddModal(false)} className="overflow-y-auto max-h-screen">
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">Add New Room</Typography>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <DialogBody divider className="grid place-items-center gap-4 max-h-[70vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-2 w-full text-left">Room Details</Typography>
                            <Input label="Room Name/Number" name="name" value={formData.name} onChange={handleInputChange} required />
                            <Select label="Room Type" name="type" value={formData.type} onChange={(val) => setFormData(prev => ({ ...prev, type: val }))} required>
                                <Option value="single">Single</Option>
                                <Option value="double">Double</Option>
                                <Option value="twin">Twin</Option>
                                <Option value="triple">Triple</Option>
                                <Option value="family">Family</Option>
                                <Option value="executive">Executive</Option>
                                <Option value="studio">Studio</Option>
                                <Option value="apartment">Apartment</Option>
                                <Option value="villa">Villa</Option>
                            </Select>
                            <Input label="Description" name="description" value={formData.description} onChange={handleInputChange} />
                            <Typography variant="h6" color="blue-gray" className="mb-2 w-full text-left">Rates</Typography>
                            <Input type="number" label="Hourly Rate" name="hourly_rate" value={formData.hourly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Nightly Rate" name="nightly_rate" value={formData.nightly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Daily Rate" name="daily_rate" value={formData.daily_rate} onChange={handleInputChange} />
                            <Input type="number" label="Weekly Rate" name="weekly_rate" value={formData.weekly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Monthly Rate" name="monthly_rate" value={formData.monthly_rate} onChange={handleInputChange} />
                        <Typography variant="h6" color="blue-gray" className="mb-2 w-full text-left">Room Details</Typography>
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={() => setShowAddModal(false)} variant="gradient" color="blue-gray">Close</Button>
                            <Button type="submit" className="bg-primary" disabled={isSubmitting}>
                                {isSubmitting ? <Spinner size="sm" /> : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            )}

            {/* Edit Room Modal */}
            {showEditModal && (
                <Dialog open={showEditModal} size="xl" handler={() => setShowEditModal(false)} className="overflow-y-auto max-h-screen">
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">Edit Room</Typography>
                    </DialogHeader>
                    <form onSubmit={handleUpdate}>
                        <DialogBody divider className="grid place-items-center gap-4 max-h-[70vh] overflow-y-auto">
                            <Input label="Room Name/Number" name="name" value={formData.name} onChange={handleInputChange} required />
                            <Select label="Room Type" name="type" value={formData.type} onChange={(val) => setFormData(prev => ({ ...prev, type: val }))} required>
                                <Option value="single">Single</Option>
                                <Option value="double">Double</Option>
                                <Option value="twin">Twin</Option>
                                <Option value="triple">Triple</Option>
                                <Option value="family">Family</Option>
                                <Option value="executive">Executive</Option>
                                <Option value="studio">Studio</Option>
                                <Option value="apartment">Apartment</Option>
                                <Option value="villa">Villa</Option>
                            </Select>
                            <Select label="Status" name="status" value={formData.status} onChange={(val) => setFormData(prev => ({ ...prev, status: val }))} required>
                                <Option value="available">Available</Option>
                                <Option value="occupied">Occupied</Option>
                                <Option value="maintenance">Under Maintenance</Option>
                            </Select>
                            <Input label="Description" name="description" value={formData.description} onChange={handleInputChange} />
                            <Typography variant="h6" color="blue-gray" className="mb-2 w-full text-left">Rates</Typography>
                            <Input type="number" label="Hourly Rate" name="hourly_rate" value={formData.hourly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Nightly Rate" name="nightly_rate" value={formData.nightly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Daily Rate" name="daily_rate" value={formData.daily_rate} onChange={handleInputChange} />
                            <Input type="number" label="Weekly Rate" name="weekly_rate" value={formData.weekly_rate} onChange={handleInputChange} />
                            <Input type="number" label="Monthly Rate" name="monthly_rate" value={formData.monthly_rate} onChange={handleInputChange} />
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={() => setShowEditModal(false)} variant="gradient" color="blue-gray">Close</Button>
                            <Button type="submit" className="bg-primary">Update</Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            )}

            {/* Book Room Modal */}
            {showBookModal && selectedRoom && (
                <Dialog open={showBookModal} size="xl" handler={() => setShowBookModal(false)} className="overflow-y-auto max-h-screen">
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">Book Room: {selectedRoom?.name}</Typography>
                    </DialogHeader>
                    <form onSubmit={handleBookRoom}>
                        <DialogBody divider className="grid place-items-center gap-4 max-h-[70vh] overflow-y-auto">
                            <Input type="datetime-local" label="Check-in Date/Time" name="check_in" value={bookingData.check_in} onChange={handleBookingChange} required />
                            <Input type="datetime-local" label="Check-out Date/Time" name="check_out" value={bookingData.check_out} onChange={handleBookingChange} required />
                            <Select label="Rate Type" name="rate_type" value={bookingData.rate_type} onChange={(val) => setBookingData(prev => ({ ...prev, rate_type: val }))}>
                                <Option value="hourly">Hourly</Option>
                                <Option value="nightly">Nightly</Option>
                                <Option value="daily">Daily</Option>
                                <Option value="weekly">Weekly</Option>
                                <Option value="monthly">Monthly</Option>
                            </Select>
                        <Typography variant="h6" color="blue-gray" className="mb-2 w-full text-left">Guest Information</Typography>

                            <Typography variant="h6" color="blue-gray" className="mb-2">Guest Information</Typography>
                            <Input type="text" label="Guest Name" name="guest_name" value={bookingData.guest_name} onChange={handleBookingChange} required />
                            <Input type="tel" label="Phone Number" name="guest_phone" value={bookingData.guest_phone} onChange={handleBookingChange} required />
                            <Input type="email" label="Email Address" name="guest_email" value={bookingData.guest_email} onChange={handleBookingChange} />
                            <Input type="number" label="Number of Guests" name="number_of_guests" min="1" value={bookingData.number_of_guests} onChange={handleBookingChange} required />

                            <div>
                                <Typography variant="small">Estimated Price:</Typography>
                                <div className="text-lg font-semibold">UGX {Intl.NumberFormat().format(estimatedPrice || 0)}</div>
                                <Typography variant="caption" color="gray">This is an estimate. Final bill will be calculated at checkout.</Typography>
                            </div>
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={() => setShowBookModal(false)} variant="gradient" color="blue-gray">Close</Button>
                            <Button type="submit" className="bg-primary">Book</Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            )}

            <ToastContainer />
        </div>
    );
}

RoomManagementScreen.layout = page => <Layout children={page} props={page.props.company} />
export default RoomManagementScreen;
