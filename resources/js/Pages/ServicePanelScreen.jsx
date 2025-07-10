import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Select,
    Option,
    Spinner
} from "@material-tailwind/react";
import React, { useState, Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Head, Link, router } from '@inertiajs/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/react';
import Layout from "@/Layouts/components/Layout";

function ServicePanelScreen({ company, services }) {

    function getTotal(price) {
        return price?.reduce((acc, p) => {
            return acc + (parseFloat(p.product.retail_price) * parseFloat(p.quantity));
        }, 0);
    }

    const columns = [
        {
            name: 'Service ID',
            selector: row => row.service_id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name || "Unnamed Service",
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${row.status === 'pending' ? 'bg-red-500' : 'bg-green-600'}`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Current Price (UGX)',
            selector: row => getTotal(row.service_items),
            format: row => Intl.NumberFormat('en-US').format(getTotal(row.service_items)),
            sortable: true,
        },
        {
            name: 'Employee',
            selector: row => row.employee?.name || '—'
        },
        {
            name: 'Added On',
            selector: row =>
                new Date(row.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                })
        },
        {
            name: 'Action',
            cell: row => (
                <button
                    onClick={() => router.visit(`/dashboard/${company.company.slug}/service/panel/${row.service_id}`)}
                    className='p-2 bg-green-600 rounded hover:bg-green-700'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="white" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8fafc',
            }
        },
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '13px',
                textTransform: 'uppercase',
                color: '#4CAF50',
            }
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
    };

    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [service, setService] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createService = async (event) => {
        event.preventDefault();
        const companyId = company.company_id;
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
        try {
            router.post('/add-running-service', { companyId, service }, {
                onSuccess: async () => {
                    toast.success('Service added successfully');
                    setService('');
                    setIsSubmitting(false);
                    try {
                        const response = await axios.get(`/service_id?company_id=${companyId}`);
                        if (response.data.service_id) {
                            router.visit(`/dashboard/${company.company.slug}/service/panel/${response.data.service_id}`);
                        }
                    } catch (error) {
                        console.error('Error fetching new service ID:', error);
                    }
                    handleOpen();
                },
                onError: (e) => toast.error(e)
            });
        } catch (error) {
            toast.dismiss();
            toast.error(error);
        }
    }

    const [search, setSearch] = useState('');
    const handleSearch = e => {
        const value = e.target.value;
        setSearch(value);
        setPage(1);
        router.get(`/dashboard/${company.company.slug}/service/panel`, { search: value, page: 1 }, { preserveState: true, preserveScroll: true });
    }

    const [page, setPage] = useState(services.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/service/panel`, { page, search }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page);
    };

    return (
        <div>
            <Head><title>Running Services</title></Head>

            <Dialog open={size === "xl"} size={size} handler={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">Add a Service</Typography>
                </DialogHeader>
                <form onSubmit={createService}>
                    <DialogBody divider className="h-[28rem] overflow-y-auto px-6 py-4">
                        <div className="w-full space-y-4">
                            <Input label='Name (Optional)' value={service} onChange={(event) => setService(event.target.value)} size='lg' />
                        </div>
                        <ToastContainer />
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button onClick={handleOpen} variant="gradient" color="blue-gray">Close</Button>
                        <Button type='submit' disabled={isSubmitting} className='bg-primary'> {isSubmitting ? <Spinner size="sm" /> : 'Create New Service'}</Button>
                    </DialogFooter>
                </form>
            </Dialog>

            <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Running Services</span>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0 w-full md:w-1/2">
                            <Input type="text" label="Search" value={search} onChange={handleSearch} />
                            <Button onClick={() => handleOpen("xl")} className=" bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2 h-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Service
                            </Button>
                        </div>
                    </div>
                }
                columns={columns}
                data={services.data}
                customStyles={customStyles}
                pointerOnHover
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={services.total}
                paginationPerPage={services.per_page}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}
                noDataComponent={<div className="text-gray-400 py-4">No services available</div>}
            />
        </div>
    );
}

ServicePanelScreen.layout = page => <Layout children={page} props={page.props.company} />;
export default ServicePanelScreen;
