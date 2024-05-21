import Layout from '@/Layouts/components/Layout'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Option
} from "@material-tailwind/react";
import React, { useState, Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link, router } from '@inertiajs/react'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function StockScreen({ company, stock_item, product }) {
  
    console.log(company)
    const [search, setSearch] = useState('');

    const [quantity, setQuantity] = useState('');
    const [batch, setBatch] = useState('');
    const [expiry, setExpiry] = useState('');
    const [inputVal, setInputVal] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption); // Update selectedOption state when an option is selected
        console.log(selectedOption.value)
    };

    

    const [products, setProducts] = useState([]);

    const [options, setOptions] = useState([]);

    const [editName, setEditName] = useState('');
    const [editBatch, setEditBatch] = useState('');
    const [editExpiry, setEditExpiry] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    function editStock(name, brand, quantity, batch, expiry) {
        handleOpenEdit("xl")
        setEditName(name + ' (' + brand + ')');
        setEditQuantity(quantity);
        setEditBatch(batch);
        setEditExpiry(expiry);
    }

    useEffect(() => {
        var initialOptions = product.data.map((prod) => ({
            value: prod.id,
            label: String(prod.name + ' (' + prod.brand + ')'),
        }));
        setOptions(initialOptions);
    }, [product]);

    const filterOptions = async (inputValue) => {
        setInputVal(inputValue)
        if (!inputValue) {
            var initialOptions = product.data.map((prod) => ({
                value: prod.id,
                label: String(prod.name + ' (' + prod.brand + ')')
            }));
            setOptions(initialOptions);
            return;
        }
        try {
            const response = await axios.get(`/search_stock?q=${inputValue}`);
            console.log('full response', response)
            if (response.data.product.data && response.data.product.data) {
                console.log('pro data:', response.data.product.data);
                const productss = response.data.product.data;
                var filteredOptions = productss.map((prod) => ({
                    value: prod.id,
                    label: String(prod.name + ' (' + prod.brand + ')'),

                }));
                setOptions(filteredOptions);
            }
            else {
                console.error('unexpected')
                setOptions([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setOptions([]);
        }
    };

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
            selector: row => row.product.name,
        },
        {
            name: 'Brand',
            selector: row => row.product.brand,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Batch',
            selector: row => row.batch,
        },
        {
            name: 'Expiry Date',
            selector: row => row.expiry_date,
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <button onClick={() => editStock(row.product.name, row.product.brand, row.quantity, row.batch, row.expiry_date)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },
    ];

    const [page, setPage] = useState(products.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/inventory/stock`, { page,search }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };

    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value)
        setPage(1)
        var search = e.target.value
        router.get(`/dashboard/${company.company.slug}/inventory/stock`, {
            search,page:1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

    const postStock = async (event) => {
        event.preventDefault();
        toast.loading();
        var companyId = company.company_id;
        toast.success(companyId);
        var product_id = selectedOption.value;
        if (quantity == '') {
            toast.dismiss()
            toast.error('Write the quantity')
        }
        else if (quantity <= 0) {
            toast.dismiss()
            toast.error('Quantity cannot be 0 pr less')
        }
        else {
            try {
                router.post('/add-stock', { product_id, companyId, quantity, batch, expiry },
                    {
                        onSuccess: () => {
                            toast.success('Product added successfully');
                            setInputVal('');
                            setSelectedOption(useState(null));
                            setQuantity('');
                            setBatch('');
                            setExpiry('');
                            handleOpen();
                        }
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }
    }

    const [size, setSize] = useState(null);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpen = (value) => setSize(value);
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
                            Add a stock
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postStock}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">                          
                            <Select className='w-full'
                                value={selectedOption} // Set the value prop to the selected option state
                                onChange={handleSelectChange} // Call handleSelectChange when an option is selected
                                options={options}
                                isClearable
                                placeholder="Search for a product..."
                                onInputChange={filterOptions}                               
                                inputValue={inputVal}
                                loadingMessage={'searching..'}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? 'brown' : 'brown',
                                    }),
                                }} />
                            <Input label='Quantity' type='number'
                                value={quantity} onChange={(event) => setQuantity(event.target.value)}
                            />
                            <Input label='Batch'
                                value={batch} onChange={(event) => setBatch(event.target.value)}
                            />
                            <Input label='Expiry' type='date'
                                value={expiry} onChange={(event) => setExpiry(event.target.value)}
                            />                    
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
                title={'Stock' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Stock'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                onChange={handleSearch}
                                className='md:w-full' />
                            <span>
                                <Button size='sm' color='green' type='submit' className='flex h-10 items-center bg-primary'
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
                data={stock_item.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}                
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={stock_item.total}
                paginationPerPage={stock_item.per_page}
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
                            Edit a Stock
                        </Typography>
                    </DialogHeader>
                    <form
                    // onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">                           
                            <Input label='Name' disabled
                                value={editName} onChange={(event) => setEditName(event.target.value)} size='sm'
                            />
                            <Input label='Quantity' type='number'
                                value={editQuantity} onChange={(event) => setEditQuantity(event.target.value)} size='sm'
                            />
                            <Input label='Batch'
                                value={editBatch} onChange={(event) => setEditBatch(event.target.value)} size='sm'
                            />
                            <Input label='Expiry' type='date'
                                value={editExpiry} onChange={(event) => setEditExpiry(event.target.value)} size='sm'
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
StockScreen.layout = page => <Layout children={page} props={page.props.company} />
export default StockScreen