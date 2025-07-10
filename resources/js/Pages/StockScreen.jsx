import Layout from '@/Layouts/components/Layout'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Option,
    Spinner
} from "@material-tailwind/react";
import React, { useState, Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Head, Link, router } from '@inertiajs/react'
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
        console.log(selectedOption)
    };

    

    const [products, setProducts] = useState([]);

    const [options, setOptions] = useState([]);

    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editBatch, setEditBatch] = useState('');
    const [editExpiry, setEditExpiry] = useState('');
    const [editQuantity, setEditQuantity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function editStock(id,name, quantity, batch, expiry) {
        handleOpenEdit("xl")
        setEditId(id);
        setEditName(name);
        setEditQuantity(quantity);
        setEditBatch(batch);
        setEditExpiry(expiry);
    }

    useEffect(() => {
        var initialOptions = product.data.map((prod) => ({
            value: prod.id,
            label: String(prod.name),
        }));
        setOptions(initialOptions);
    }, [product]);

    const filterOptions = async (inputValue) => {
        setInputVal(inputValue)
        if (!inputValue) {
            var initialOptions = product.data.map((prod) => ({
                value: prod.id,
                label: String(prod.name)
            }));
            setOptions(initialOptions);
            return;
        }
        try {
            var company_id = company.company_id;
            const response = await axios.get(`/search_stock?q=${inputValue}&company_id=${company_id}`);
            console.log('full response', response.data)
            if (response.data.product.data && response.data.product.data) {
                console.log('pro data:', response.data.product.data);
                const productss = response.data.product.data;
                var filteredOptions = productss.map((prod) => ({
                    value: prod.id,
                    label: String(prod.name),

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
            name: 'Product',
            selector: row => row.product.name,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Batch',
            selector: row => row.batch == null? "No batch":row.batch,
        },
        {
            name: 'Expiry Date',
            selector: row => row.expiry_date == null? "No date":new Date(row.expiry_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}),
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            name: 'Action',
            selector: row => <button onClick={() => editStock(row.id, row.product.name, row.quantity, row.batch, row.expiry_date)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },
    ];

    const [page, setPage] = useState(stock_item.current_page);
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

    const postDelete = (event) => {
        event.preventDefault();
        var stockId = editId;

        try {
            router.post('/delete-stock', { stockId },
                {
                    onSuccess: () => {
                        toast.success('Product deleted');
                        handleOpenEdit()
                        // setSelectedOption(useState(null));
                    }
                }
            )
        } catch (error) {
            toast.dismiss()
            toast.error(error);
        }


    }
    const postEdit = (event) => {
        event.preventDefault();

        var stockId = editId;
        var quantity = editQuantity;
        var batch = editBatch;
        var expiry_date = editExpiry;

        if (quantity == '') {
            toast.dismiss()
            toast.error('Write the quantity')
        }
        else if (quantity <= 0) {
            toast.dismiss()
            toast.error('Quantity cannot be 0 or less')
        }
        else{
            try {
                router.post('/edit-stock', { stockId, quantity, batch, expiry_date },
                    {
                        onSuccess: () => {
                            toast.success('Product edited successfully');
                            handleOpenEdit();
                            // setSelectedOption(useState(null));
                        }
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }
    }

    const postStock = async (event) => {
        event.preventDefault();
        toast.loading();
        var companyId = company.company_id;
        var product_id = selectedOption.value;

        if (selectedOption == null) {
            toast.dismiss()
            toast.error('Item is required')
        }
        else if (quantity == '') {
            toast.dismiss()
            toast.error('Write the quantity')
        }
        else if (quantity <= 0) {
            toast.dismiss()
            toast.error('Quantity cannot be 0 pr less')
        }
        else {
            if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
            try {
                router.post('/add-stock', { product_id, companyId, quantity, batch, expiry },
                    {
                        onSuccess: () => {
                            toast.success('Product added successfully');
                            handleOpen();
                            setBatch('');
                            setQuantity('');
                            setExpiry('');
                            setInputVal('');
                            setIsSubmitting(false);
                            // setSelectedOption(useState(null));
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

    const [size, setSize] = useState(null);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpenEdit = (value) => setSizeEdit(value);
    return (
        <div>
            <Head>
                <title>
                    Stock Product
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
                        <span className="text-lg font-medium">Stock</span>
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
                    onSubmit={postEdit}
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
                                <Button onClick={postDelete} variant="gradient" color="red">
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
            <ToastContainer/>
        </div>
    )
}
StockScreen.layout = page => <Layout children={page} props={page.props.company} />
export default StockScreen