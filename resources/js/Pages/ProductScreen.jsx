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
    Option
} from "@material-tailwind/react";
import React, { useState, Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link, router } from '@inertiajs/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';
import { usePage } from '@inertiajs/react';

function ProductScreen({ company, products, measurements}) {
    const [product, setProduct] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [barcode, setBarcode] = useState('No barcode scanned');
    const [sellingPrice, setSellingPrice] = useState('');
    const [wholeSaleSellingPrice, setWholeSaleSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');

    const [search, setSearch] = useState('');

    const [editProduct, setEditProduct] = useState('');
    const [editAvailable, setEditAvailable] = useState('');
    const [editMeasurement, setEditMeasurement] = useState('');
    const [editBarcode, setEditBarcode] = useState('');
    const [editSellingPrice, setEditSellingPrice] = useState('');
    const [editWholeSaleSellingPrice, setEditWholeSaleSellingPrice] = useState('');
    const [editCostPrice, setEditCostPrice] = useState('');
    const [productId, setProductId] = useState('');
    
    

    function openEditProduct(id, name, available, barcode, emeasurement, retail_price, cost_price, wholesale_price) {
        handleOpenEdit("xl")
        setProductId(id)
        setEditProduct(name)
        setEditAvailable(available)
        setEditBarcode(barcode)
        setEditMeasurement(emeasurement)
        setEditSellingPrice(retail_price)
        setEditWholeSaleSellingPrice(wholesale_price)
        setEditCostPrice(cost_price)
    }

    const [page, setPage] = useState(products.current_page);


    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/inventory/product`, { page, search }, { preserveState: true });
    };

    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };

    const deleteProduct = (event) => {
        event.preventDefault();
        router.post('/delete-product', {productId },
            {
                onSuccess: () => {
                    toast.success('Product deleted successfully');
                    handleOpenEdit();
                }
            });

    }
    const postEdit = (event) => {
        event.preventDefault();
        toast.loading();

        var companyId = company.company_id;
        if (editProduct == '') {
            toast.dismiss()
            toast.error('Write product name');
        }
        else if (editAvailable == '') {
            toast.dismiss()
            toast.error('Select the quantity available')
        }
        else if (editMeasurement == '') {
            toast.dismiss()
            toast.error('Set the measurement')
        }
        else if (editSellingPrice == '') {
            toast.dismiss()
        }
        else if (editCostPrice == '') {
            toast.dismiss()
        }
        else {
            try {
                router.post('/edit-product', { companyId, productId, editProduct, editAvailable, editBarcode, editMeasurement, editCostPrice, editSellingPrice, editWholeSaleSellingPrice },
                    {
                        onSuccess: () => {
                            toast.success('Product edited successfully');
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
        router.get(`/dashboard/${company.company.slug}/inventory/product`, {
            search, page: 1,
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

    const postProduct = async (event) => {
        event.preventDefault();
        toast.loading();
        var companyId = company.company_id;
        if (product == '') {
            toast.dismiss()
            toast.error('Write product name');
        }
        else if (measurement == '') {
            toast.dismiss()
            toast.error('Select the measurement')
        }
        else if (sellingPrice == '') {
            toast.dismiss()
            toast.error('Set the selling Price')
        }
        else if (costPrice == '') {
            toast.dismiss()
        }
        else {
            try {
                router.post('/add-product', { companyId, product, measurement, barcode, costPrice, sellingPrice, wholeSaleSellingPrice },
                    {
                        onSuccess: () => {
                            toast.success('Product added successfully');
                            setProduct('');
                      
                            setMeasurement('');
                            setBarcode('');
                            setSellingPrice('');
                            setWholeSaleSellingPrice('');
                            setCostPrice('');
                            handleOpen();

                        },
                        onError:(e)=>{
                            toast.error(e);
                        }
                        
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }
    }

    console.log(measurement)
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
    const columns = [
        {
            name: 'Product',
            selector: row => row.name,
        },
        {
            name: 'Available',
            selector: row => `${row.available}`,
        },
        {
            name: 'Retail Price (UGX)',
            selector: row => `${Intl.NumberFormat('en-US').format(row.retail_price) } / ${row.measurement.abbriviation}`,
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
                <button onClick={() => openEditProduct(row.id, row.name, row.available, row.barcode, row.measurement.id, row.retail_price, row.cost_price, row.wholesale_price)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
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
                            Add a product
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postProduct}
                    >
                        <DialogBody divider className="h-[28rem] overflow-scroll grid place-items-center gap-4">
                            <Input label='Product'
                                value={product} onChange={(event) => setProduct(event.target.value)} size='sm'
                            />
                            <Select color='deep-orange' label="Measurement"
                                value={measurement} onChange={(e) => setMeasurement(e)}
                            >
                                {measurements && measurements.map((m, index) =>
                                    <Option value={m.id}> {m.name} ({m.abbriviation})</Option>
                                )}

                            </Select>
                            <Input label='Barcode'
                                value={barcode} onChange={(event) => setBarcode(event.target.value)} size='sm'
                            />
                            <Input label='Cost Price' type='number'
                                value={costPrice} onChange={(event) => setCostPrice(event.target.value)} size='sm'
                            />
                            <Input label='Retail Selling Price'
                                value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} size='sm'
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
                            <Button type='submit' className='bg-primary'>
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <DataTable
                title={'Products' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Products'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                onChange={handleSearch}
                                className='md:w-full' />
                            <span>
                                <Button size='sm' color='success' type='submit' className='flex h-10 items-center bg-primary'
                                    onClick={() => handleOpen("xl")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </Button>
                            </span>
                        </div>
                    </div>
                }
                columns={columns}
                data={products.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={products.total}
                paginationPerPage={products.per_page}
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
                            Edit Product
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postEdit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            <Input label='Product'
                                value={editProduct} onChange={(event) => setEditProduct(event.target.value)} size='sm'
                            />
                            <Input label='Available'
                                value={editAvailable} onChange={(event) => setEditAvailable(event.target.value)} size='sm'
                            />
                            {/* <Input label='Barcode'
                                value={editBarcode} onChange={(event) => setEditBarcode(event.target.value)} size='sm'
                            /> */}
                            <Select color='deep-orange' label="Measurement"
                                value={editMeasurement} onChange={(e) => setEditMeasurement(e)}
                            >
                                {measurements && measurements.map((m, index) =>
                                    <Option value={m.id}> {m.name} ({m.abbriviation})</Option>
                                )}
                            </Select>
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

                                <Button onClick={deleteProduct} variant="gradient" color="red">
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
ProductScreen.layout = page => <Layout children={page} props={page.props.company} />
export default ProductScreen