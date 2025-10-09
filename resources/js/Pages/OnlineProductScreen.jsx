import Layout from '@/Layouts/components/Layout'
import { Head, router } from '@inertiajs/react';
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
    
    // Edit states
    const [editId, setEditId] = useState(null);
    const [editProductId, setEditProductId] = useState('');
    const [editCategoryId, setEditCategoryId] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editProductName, setEditProductName] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [editSelectedOption, setEditSelectedOption] = useState(null);

    const handleImageChange = (event, isEdit = false) => {
        const file = event.target.files[0];
        
        if (!file) return;

        const setImageFunc = isEdit ? setEditImage : setImage;

        // Only compress if file is larger than 1MB
        if (file.size > 1024 * 1024) {
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 1920,
                maxHeight: 1920,
                success(result) {
                    // Convert Blob to File object
                    const compressedFile = new File([result], file.name, {
                        type: file.type || 'image/jpeg',
                        lastModified: Date.now(),
                    });
                    console.log('Compressed file:', compressedFile.name, compressedFile.size, compressedFile.type);
                    setImageFunc(compressedFile);
                },
                error(err) {
                    console.error('Compression error:', err.message);
                    // Fallback to original file if compression fails
                    setImageFunc(file);
                },
            });
        } else {
            // Use original file if it's small enough
            console.log('Original file:', file.name, file.size, file.type);
            setImageFunc(file);
        }
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

    const editProduct = (row) => {
        setEditId(row.id);
        setEditProductId(row.product_id);
        setEditCategoryId(row.category_id);
        setEditDescription(row.description);
        setEditProductName(row.product.name);
        setEditSelectedOption({
            value: row.product.id,
            label: row.product.name,
            product: row.product.name
        });
        handleOpenEdit("xl");
    };

    const updateProduct = async (event) => {
        event.preventDefault();
        
        var companyId = company.company_id;
        
        if (editCategoryId == '0' || editCategoryId == '') {
            toast.error('Select the category');
            return;
        }
        if (editDescription == '') {
            toast.error('Description is required');
            return;
        }
        
        // Create FormData manually
        const formData = new FormData();
        formData.append('companyId', companyId);
        formData.append('productId', editProductId);
        formData.append('categoryId', editCategoryId);
        if (editImage) {
            formData.append('image', editImage);
        }
        formData.append('description', editDescription);
        formData.append('productName', editProductName);
        
        toast.loading('Updating product...');
        
        try {
            router.post(`/update-online-product/${editId}`, formData, {
                forceFormData: true,
                preserveState: true,
                onSuccess: () => {
                    toast.dismiss();
                    toast.success('Product updated successfully');
                    handleOpenEdit(null);
                    
                    // Reset edit form fields
                    setEditId(null);
                    setEditProductId('');
                    setEditCategoryId('');
                    setEditDescription('');
                    setEditProductName('');
                    setEditImage(null);
                    setEditSelectedOption(null);
                },
                onError: (errors) => {
                    toast.dismiss();
                    console.error('Errors:', errors);
                    const errorMsg = errors.error || errors.image || 'Failed to update product.';
                    toast.error(errorMsg);
                }
            });
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || 'An error occurred');
        }
    };

    const postProduct = async (event) => {
        event.preventDefault();
        
        var companyId = company.company_id;
        
        if (image == null) {
            toast.error('Product Image is a must Online');
            return;
        }
        else if (productId == '') {
            toast.error('Select the product');
            return;
        }
        else if (categoryId == '0'|| categoryId == '') {
            toast.error('Select the category');
            return;
        }
        else if (description == '') {
            toast.error('Description is required');
            return;
        }
        
        // Debug: Log image details before sending
        console.log('Submitting product with image:', {
            name: image?.name,
            size: image?.size,
            type: image?.type,
            isFile: image instanceof File,
            isBlob: image instanceof Blob
        });
        
        // Create FormData manually to ensure file upload works
        const formData = new FormData();
        formData.append('companyId', companyId);
        formData.append('productId', productId);
        formData.append('categoryId', categoryId);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('productName', productName);
        
        // Show loading toast
        toast.loading('Adding product...');
        
        try {
            router.post('/add-online-product', formData, {
                forceFormData: true,
                preserveState: true,
                onSuccess: (page) => {
                    console.log('Success - Product added!');
                    toast.dismiss();
                    toast.success('Product added successfully');
                    handleOpen(null); // Close the modal
                    
                    // Reset form fields
                    setProductId('');
                    setCategoryId('');
                    setDescription('');
                    setProductName('');
                    setImage(null);
                    setSelectedOption(null);
                },
                onError: (errors) => {
                    console.log('Error callback triggered:', errors);
                    toast.dismiss();
                    console.error('Errors:', errors);
                    const errorMsg = errors.error || errors.image || 'Failed to add product. Please try again.';
                    toast.error(errorMsg);
                }
            });
        } catch (error) {
            toast.dismiss();
            console.error('Catch error:', error);
            toast.error(error.message || 'An error occurred');
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
            name: 'Action',
            selector: row => <button onClick={() => editProduct(row)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },]
    return (
        <div>
            <Head>
                <title>
                    Online Products & Services
                </title>
            </Head>
            <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Online Products</span>
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

            {/* Edit Product Dialog */}
            <Fragment>
                <Dialog
                    open={sizeEdit === "xl"}
                    size={sizeEdit}
                    handler={handleOpenEdit}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Edit Product
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={updateProduct}>
                        <DialogBody divider className="h-[28rem] overflow-scroll grid place-items-center gap-4">
                            <Input 
                                label='Product Image (Optional)' 
                                accept=".jpg,.jpeg,.png" 
                                size='md' 
                                type='file' 
                                onChange={(e) => handleImageChange(e, true)} 
                            />
                            <Select 
                                className='w-full'
                                value={editSelectedOption}
                                onChange={(selectedOption) => {
                                    setEditSelectedOption(selectedOption);
                                    setEditProductId(selectedOption.value);
                                    setEditProductName(selectedOption.product);
                                }}
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
                                }} 
                            />

                            <select 
                                className='w-full' 
                                value={editCategoryId} 
                                onChange={(e) => setEditCategoryId(e.target.value)}
                            >
                                <option value={0} className='bg-gray-200'>Select the category.......</option>
                                {category && category.map((m, index) =>
                                    <option key={index} value={m.id}>{m.name}</option>
                                )}
                            </select>

                            <Input 
                                label='Description'
                                value={editDescription} 
                                onChange={(event) => setEditDescription(event.target.value)} 
                                size='sm'
                            />
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={() => handleOpenEdit(null)} variant="gradient" color="blue-gray">
                                Close
                            </Button>
                            <Button type='submit' className='bg-primary'>
                                Update
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