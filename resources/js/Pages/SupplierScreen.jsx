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

function SupplierScreen({ company, supplier }) {
    console.log(supplier);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [search, setSearch] = useState('');

    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAddress, setEditAddress] = useState('');

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(supplier.current_page);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const fetchData = (page) => {
         router.get(`/dashboard/${company.company.slug}/inventory/supplier`, { page,search }, { preserveState: true,preserveScroll: true });
    };
   


    const handlePageChange = (newPage) => {
       
        setPage(newPage);
        fetchData(newPage);
    };

    function editSupplier(name, phone, address) {
        handleOpenEdit("xl")
        setEditName(name);
        setEditPhone(phone);
        setEditAddress(address);
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value)
        setPage(1)
        var search = e.target.value
        router.get(`/dashboard/${company.company.slug}/inventory/supplier`, {
            search, page: 1,
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

 

    const handleSubmit = async (event) => {
        event.preventDefault();
        var companyId = company.company_id;
        if (name == '') {
            toast.dismiss()
            toast.error('Write supplier name/business');
        }
        else if (phone == '') {
            toast.dismiss()
            toast.error('write the number of the supplier')
        }
        else if (address == '') {
            toast.dismiss()
            toast.error('Write the suppliers address')
        }
        else {
            if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
            try {
                router.post('/add-supplier', { companyId, name, address, phone },
                    {
                        onSuccess: () => {
                            toast.success('registered successfully');
                            setName('');
                            setAddress('');
                            setPhone();
                            handleOpen();
                            setIsSubmitting(false);
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
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date(row.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            name: 'Action',
            selector: row => <div className='flex gap-4'>
                <button onClick={() => editSupplier(row.name, row.phone, row.address)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
            </div>
        },
    ];

    const [size, setSize] = useState(null);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpenEdit = (value) => setSizeEdit(value);

    return (
        <div>
            <Head>
                <title>
                    Suppliers
                </title>
            </Head>
            <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Supplier</span>
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
                data={supplier.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={supplier.total}
                paginationPerPage={supplier.per_page}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}
            
            />
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
                            Add a supplier
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            <Input label='Name'
                                value={name} onChange={(event) => setName(event.target.value)} size='sm'
                            />
                            <Input label='Phone'
                                value={phone} onChange={(event) => setPhone(event.target.value)} size='sm'
                            />
                            <Input label='Address'
                                value={address} onChange={(event) => setAddress(event.target.value)} size='sm'
                            />
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
                            Edit a supplier
                        </Typography>
                    </DialogHeader>
                    <form
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            <Input label='Name'
                                value={editName} onChange={(event) => setEditName(event.target.value)} size='sm'
                            />
                            <Input label='Phone'
                                value={editPhone} onChange={(event) => setEditPhone(event.target.value)} size='sm'
                            />
                            <Input label='Address'
                                value={editAddress} onChange={(event) => setEditAddress(event.target.value)} size='sm'
                            />
                        </DialogBody>
                        <DialogFooter>
                            <div className='flex w-full justify-between'>

                                <Button onClick={handleOpenEdit} variant="gradient" color="red">
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
                            </div>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <ToastContainer />
        </div>
    )
}
SupplierScreen.layout = page => <Layout children={page} props={page.props.company} />
export default SupplierScreen