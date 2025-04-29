import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Select,
    Option
} from "@material-tailwind/react";
import React, { useState, Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link, router } from '@inertiajs/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from "@/Layouts/components/Layout";

function ServicePanelScreen({ company, services }) {

    console.log(services)

    function getTotal(price) {
        var tot = 0;
        var total = price && price.map((p) => {
            // console.log(p.product.retail_price)
            tot = parseFloat(tot) + (parseFloat(p.product.retail_price)*parseFloat(p.quantity))

        })
        console.log(tot)
        return tot;

    }

    const columns = [
        {
            name: 'Service Id',
            selector: row => row.service_id,
        },
        {
            name: 'Name',
            selector: row => row.name == null ? "Unnamed Service" : row.name,
        },
        {
            name: 'Status',
            selector: row => row.status == 'pending' ? <div className='bg-red-500 text-white p-2 rounded-lg'>{row.status} </div> : <div className='bg-green-500 p-2 text-white rounded-lg'>{row.status}</div>,
        },
        {
            name: 'Current Price (UGX)',
            selector: row => `${Intl.NumberFormat('en-US').format(getTotal(row.service_items))}`,
        },
        ,
        {
            name: 'Employee',
            selector: row => `${row.employee.name}`,
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
            selector: row => <div className='flex items-center'>
                <button onClick={() => router.visit(`/dashboard/${company.company.slug}/service/panel/${row.service_id}`)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
            </div>
        },
    ];
    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                color: '#997400',
                fontSize: '14px',
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                outline: '1px solid #FFFFFF',
            },
        },
        pagination: {
            style: {
                border: 'none',
            },
        },
    };

    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpenEdit = (value) => setSizeEdit(value);

    const [service, setService] = useState('');

    const createService = async (event) => {
        event.preventDefault();

        var companyId = company.company_id;


        try {
            router.post('/add-running-service', { companyId, service },

                {
                    onSuccess: async () => {
                        toast.success('Service added successfully');
                        setService('');
                        try {
                            // const response = await axios.get(`/getlastsale?company_id=${company_id}`);
                            const response = await axios.get(`/service_id?company_id=${companyId}`);
                            console.log(response.data)
                            if (response.data.service_id && response.data.service_id) {

                                router.visit(`/dashboard/${company.company.slug}/service/panel/${response.data.service_id}`)
                            }
                            else {
                                console.error('unexpected')
                            }
                        } catch (error) {
                            console.error('Error fetching products:', error);

                        }
                        handleOpen();


                    },
                    onError: (e) => {
                        toast.error(e);
                    }

                }
            )
        } catch (error) {
            toast.dismiss()
            toast.error(error);
        }

    }


    return (
        <div>
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
                        onSubmit={createService}
                    >
                        <DialogBody divider className="h-[28rem] overflow-scroll grid place-items-center gap-4">
                            <Input label='Name (Optional)'
                                value={service} onChange={(event) => setService(event.target.value)} size='sm'
                            />

                            <ToastContainer />
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>
                            <Button type='submit' className='bg-primary'>
                                Create New Service
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>

            <DataTable
                title={'Running Service' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Running Services'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                // value={search}
                                // onChange={handleSearch}
                                className='md:w-full' />
                            <span>
                                <Button size='sm' color='success' type='submit' className='flex h-10 items-center bg-primary'
                                    onClick={() => handleOpen("xl")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Service
                                </Button>
                            </span>
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
                paginationTotalRows={'oi'}
                paginationPerPage={'oi'}
                onChangePage={'oi'}
                paginationRowsPerPageOptions={[]}
            />
        </div>
    )
}

ServicePanelScreen.layout = page => <Layout children={page} props={page.props.company} />
export default ServicePanelScreen