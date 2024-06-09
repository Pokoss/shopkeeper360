import Layout from '@/Layouts/components/Layout'
import { router } from '@inertiajs/react';
import Select from 'react-select';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import React from 'react'
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import Compressor from 'compressorjs';
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function OnlineProductScreen({ company, products, product,category }) {
    console.log(products)
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(products.current_page);
    const [inputVal, setInputVal] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption); // Update selectedOption state when an option is selected
        setProductId(selectedOption.value)
        setProductName(selectedOption.product)
        console.log(selectedOption)
    };

    const [productId, setProductId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        new Compressor(file, {
            quality: 0.6,
            success(result) {
                setImage(result);
            },
            error(err) {
                console.log(err.message);
            },
        });
    };


    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/online-portal/product`, { page, search }, { preserveState: true });
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
        router.get(`/dashboard/${company.company.slug}/online-portal/product`, {
            search, page: 1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }

    const postProduct = async (event) => {
        event.preventDefault();
        toast.loading();
        var companyId = company.company_id;
        if (image == null) {
            toast.dismiss()
            toast.error('Product Image is a must Online');
        }
        else if (productId == '') {
            toast.dismiss()
            toast.error('Select the product')
        }
        else if (categoryId == '0'|| categoryId == '') {
            toast.dismiss()
            toast.error('Select the category')
        }
        else if (description == '') {
            toast.dismiss()
            toast.error('Select the category')
        }
        
        
        else {
            toast.success('success')
            try {
                router.post('/add-online-product', { companyId, productId, categoryId, image, description, productName },
                    {
                        onSuccess: () => {
                            toast.success('Product added successfully');
                            handleOpen();
                            companyId('');
                            productId('');
                            setCategoryId('');
                            productName('');
                            setImage(null);

                        }
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
            }
        }
    }

    const [options, setOptions] = useState([]);

    useEffect(() => {
        var initialOptions = product.data.map((prod) => ({
            value: prod.id,
            label: String(prod.name),
            product: prod.name 
        }));
        setOptions(initialOptions);
    }, [product]);

    const filterOptions = async (inputValue) => {
        setInputVal(inputValue)
        if (!inputValue) {
            var initialOptions = product.data.map((prod) => ({
                value: prod.id,
                label: String(prod.name),
                product: prod.name 
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
                    product: prod.name

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


    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpenEdit = (value) => setSizeEdit(value);

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
            
            selector: row =><img className='h-28 w-28 object-cover rounded-md' src={'/'+row.image}/>,
        },
        {
            name: 'Name',
            selector: row => row.product.name,
        },
        {
            name: 'Category',
            selector: row => row.category.name,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <button onClick={() => editEmployee(row.user.name, row.user.email, row.position, row.id)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },]
    return (
        <div>
            <DataTable
                title={'Online Products' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Online Products'}</span>
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
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={products.total}
                paginationPerPage={products.per_page}
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
                            Add a product
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postProduct}
                    >
                        <DialogBody divider className="h-[28rem] overflow-scroll grid place-items-center gap-4">
                            <Input label='Company Logo' accept=".jpg,.jpeg,.png" size='md' type='file' onChange={handleImageChange} />
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

                            <select className='w-full' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <option  value={0} className='bg-gray-200'> Select the category.......</option>
                                {category && category.map((m, index) =>
                                    <option value={m.id} > {m.name}</option>
                                )}
                            </select>

                            <Input label='Description'
                            value={description} onChange={(event) => setDescription(event.target.value)} size='sm'
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
            <ToastContainer />
        </div>
    )

}

OnlineProductScreen.layout = page => <Layout children={page} props={page.props.company} />

export default OnlineProductScreen