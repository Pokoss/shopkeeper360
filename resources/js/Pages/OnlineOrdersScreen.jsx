import Layout from '@/Layouts/components/Layout'
import { router } from '@inertiajs/react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';
import DataTable from 'react-data-table-component';
import Orders from '@/Components/Orders';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OnlineOrdersScreen({ orders, company }) {
    


    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                color: '#4CAF50',
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

    const columns = [
        {
            name: 'Order Number',
            selector: row => row.order_id,
        },
        {
            name: 'Customer Name',
            selector: row => row.user.name,
        },
        {
            name: 'Order Amount (UGX)',
            selector: row => Intl.NumberFormat('en-US').format(row.order_total),
        },
        {
            name: 'Order Status',
            selector: row => row.status == 'pending' ? <div className='bg-red-500 text-white p-2 rounded-lg'>{row.status} </div> : <div className='bg-green-500 p-2 text-white rounded-lg'>{row.status}</div>
        },
        {
            name: 'Sold On',
            selector: row => new Date(row.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <div className='flex gap-4'>
                <button
                    onClick={() => openOrders(row)}
                    className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>

            </div>
        },

    ];
    const registerSale = async (event) => {
        event.preventDefault();

        if (orderProducts.orders.status == 'pending') {

            var company_id = orderProducts.orders.company_id;
            var order_total = orderProducts.orders.order_total;
            var order_id = orderProducts.orders.order_id;
            var user_id = orderProducts.orders.user.id;
            // toast.success(user_id)            
            router.post('/record_sale', { company_id, order_id, order_total, user_id },
                {
                    onSuccess: () => {
                        handleOpen()
                        toast.success('Sale recorded successfully');
                    }
                }
            )
        }
        else {
            handleOpen()
            toast.error('Only pending orders can be recorded');
        }


    }

    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [orderProducts, setOrderProducts] = useState(null);
    function openOrders(row) {
        // toast.success(emeasurement)
        handleOpen("xl")
        var orders1 = { 'orders': row }
        setOrderProducts(orders1)
        console.log(orders1)
    }

    function getTotal(amount) {

        var total = 0;
        amount && amount.map((item) => {
            total = parseFloat(item.sale_price) + total
        })

        return total;
    }

    const [page, setPage] = useState(orders.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/online-portal/orders`, { page, search }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };


    const [search, setSearch] = useState('');
    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value)
        setPage(1)
        var search = e.target.value
        router.get(`/dashboard/${company.company.slug}/online-portal/orders`, {
            search, page: 1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {

            }
        });
    }


    return (
        <div>
            <DataTable
                title={'Online Orders' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Online Orders'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                // onChange={(event) => setName(event.target.value)}
                                onChange={handleSearch}
                                className='md:w-full' />

                        </div>
                    </div>
                }
                columns={columns}
                data={orders.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationTotalRows={orders.total}
                paginationPerPage={orders.per_page}
                paginationServer
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[]}

            // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
            // expandableRows={ExpandableComponent}
            // expandableRowsComponent={ExpandableComponent}
            // expandableRowExpanded={row=>true}
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
                            View Order
                        </Typography>
                    </DialogHeader>
                    <form

                    >
                        <DialogBody divider className="h-[29rem] overflow-scroll">
                            {
                                orderProducts == null ? <div>No Orders</div> :
                                    <div className='font-bold'>
                                        Name: {orderProducts.orders.user.name}<br />
                                        Contact: {orderProducts.orders.contact}<br />
                                        Location Details: {orderProducts.orders.location}<br />
                                        Status: {orderProducts.orders.status}<br />
                                        Total: {"UGX " + Intl.NumberFormat('en-US').format(orderProducts.orders.order_total)}<br />
                                        Ordered On {new Date(orderProducts.orders.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}<br />
                                    </div>
                            }
                            <div ref={componentRef}>
                                <Orders company={company} props={orderProducts} />
                            </div>
                        </DialogBody>
                    </form>

                    <DialogFooter>
                        <div className='flex w-full justify-between'>
                            <div>

                                <div className="space-x-2 flex">
                                    <Button onClick={handleOpen} variant="gradient" color="red">
                                        Close
                                    </Button>
                                    <Button onClick={handlePrint} type='submit' className='bg-green-500'>
                                        Print
                                    </Button>
                                </div>



                            </div>
{/* 
                            {
                               orderProducts.orders.status == 'finished' ? <></>:
                            } */}
                                <Button onClick={registerSale} type='submit' className='bg-primary'>
                                    Record sale
                                </Button>

                        </div>
                    </DialogFooter>
                </Dialog>
            </Fragment>
            <ToastContainer />
        </div>
    )
}
OnlineOrdersScreen.layout = page => <Layout children={page} props={page.props.company} />
export default OnlineOrdersScreen