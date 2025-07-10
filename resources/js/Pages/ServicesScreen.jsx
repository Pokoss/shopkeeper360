import Layout from '@/Layouts/components/Layout'
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
import { useCallback } from 'react';
import { usePage } from '@inertiajs/react';

function ServicesScreen({ company, services }) {

    const [service, setService] = useState('');

    const [sellingPrice, setSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');

    const [search, setSearch] = useState('');

    const [editService, setEditService] = useState('');
    const [editSellingPrice, setEditSellingPrice] = useState('');
    const [editCostPrice, setEditCostPrice] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function openEditService(id, name, retail_price, cost_price,) {
        handleOpenEdit("xl")
        setServiceId(id)
        setEditService(name)
        setEditSellingPrice(retail_price)
        setEditCostPrice(cost_price)
    }


    const [page, setPage] = useState(service.current_page);


    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/inventory/service`, { page, search }, { preserveState: true });
    };

    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };

    const deleteService = (event) => {
        event.preventDefault();
        router.post('/delete-service', { serviceId },
            {
                onSuccess: () => {
                    toast.success('Service deleted successfully');
                    handleOpenEdit();
                }
            });

    }
    const postEdit = (event) => {
        event.preventDefault();
        toast.loading();

        var companyId = company.company_id;
        if (editService == '') {
            toast.dismiss()
            toast.error('Write service name');
        }
        else if (editSellingPrice == '') {
            toast.dismiss()
        }
        else if (editCostPrice == '') {
            toast.dismiss()
        }
        else {
            try {
                router.post('/edit-service', { companyId, serviceId, editService, editCostPrice, editSellingPrice },
                    {
                        onSuccess: () => {
                            toast.success('Service edited successfully');
                            handleOpenEdit();
                        }
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }

    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value)
        setPage(1)
        var search = e.target.value
        router.get(`/dashboard/${company.company.slug}/inventory/service`, {
            search, page: 1,
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

    const postService = async (event) => {
        event.preventDefault();
        toast.success(sellingPrice);
        var companyId = company.company_id;
        var type = 'service';
        if (service == '') {
            toast.dismiss()
            toast.error('Write service name');
        }
        else if (sellingPrice == '') {
            toast.dismiss()
            toast.error('Set the selling Price')
        }
        else if (costPrice == '') {
            toast.dismiss()
        }
        else {
            if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
            try {
                router.post('/add-service', { companyId, service, costPrice, sellingPrice },
                    {
                        onSuccess: () => {
                            toast.success('Service added successfully');
                            setService('');
                            setSellingPrice('');
                            setCostPrice('');
                            handleOpen();
                            setIsSubmitting(false);
                        },
                        onError: (e) => {
                            toast.error(e);
                        }

                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
                setIsSubmitting(false);
            }
        }
    }

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
    const columns = [
        {
            name: 'Service',
            selector: row => row.name,
        },
        {
            name: 'Retail Price (UGX)',
            selector: row => `${Intl.NumberFormat('en-US').format(row.retail_price)}`,
        },
        // {
        //     name: 'Measurement',
        //     selector: row => `${row.measurement.name} (${row.measurement.abbriviation})`,
        // },
        ,
        {
            name: 'Added On',
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            name: 'Action',
            selector: row => <div className='flex items-center'>
                <button onClick={() => openEditService(row.id, row.name, row.retail_price, row.cost_price)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
            </div>
        },
    ];

    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpenEdit = (value) => setSizeEdit(value);


    return (
        <div>
            <Head>
                <title>
                    Services
                </title>
            </Head>
            <Fragment>
                <Dialog
                    open={
                        size === "xl"
                    }
                    size={size}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Add a Service
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postService}
                    >
                        <DialogBody divider className="h-[28rem] overflow-scroll grid place-items-center gap-4">
                            <Input label='Service'
                                value={service} onChange={(event) => setService(event.target.value)} size='sm'
                            />
                            
                            <Input label='Selling Price' type='number'
                                value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} size='sm'
                            />
                            <Input label='Cost Price (Optional)' type='number'
                                value={costPrice} onChange={(event) => setCostPrice(event.target.value)} size='sm'
                            />
                            {/* <Input label='Wholesale Selling Price' type='number'
                                value={wholeSaleSellingPrice} onChange={(event) => setWholeSaleSellingPrice(event.target.value)} size='sm'
                            /> */}
                            <ToastContainer />
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>
                            <Button disabled={isSubmitting} type='submit' className='bg-primary'>
                                 {isSubmitting ? <Spinner size="sm" /> : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Services</span>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0 w-full md:w-1/2">
                            <Input type="text" label="Search" value={search} onChange={handleSearch} />
                            <Button onClick={() => handleOpen("xl")} className=" bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2 h-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add
                            </Button>
                        </div>
                    </div>
                }
                columns={columns}
                data={services.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={services.total}
                paginationPerPage={services.per_page}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}
            />
            <Fragment>
                <Dialog
                    open={
                        sizeEdit === "xl"
                    }
                    size={sizeEdit}
                    handler={handleOpenEdit}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Edit Service
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postEdit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            <Input label='Service'
                                value={editService} onChange={(event) => setEditService(event.target.value)} size='sm'
                            />
                            
                            {/* <Input label='Barcode'
                                value={editBarcode} onChange={(event) => setEditBarcode(event.target.value)} size='sm'
                            /> */}
                           
                            <Input label='Cost Price' type='number'
                                value={editCostPrice} onChange={(event) => setEditCostPrice(event.target.value)} size='sm'
                            />
                            <Input label='Retail Price' type='number'
                                value={editSellingPrice} onChange={(event) => setEditSellingPrice(event.target.value)} size='sm'
                            />
                            {/* <Input label='Wholesale Price' type='number'
                                value={editWholeSaleSellingPrice} onChange={(event) => setEditWholeSaleSellingPrice(event.target.value)} size='sm'
                            /> */}
                        </DialogBody>
                        <DialogFooter>
                            <div className='flex w-full justify-between'>

                                <Button onClick={deleteService} variant="gradient" color="red">
                                    Delete
                                </Button>
                                <div className="space-x-2">
                                    <Button onClick={handleOpenEdit} variant="gradient" color="blue-gray">
                                        Close
                                    </Button>
                                    <Button type='submit' className='bg-primary'>
                                        Edit
                                    </Button>
                                </div>
                                <ToastContainer />
                            </div>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>

        </div>
    )
}
ServicesScreen.layout = page => <Layout children={page} props={page.props.company} />

export default ServicesScreen