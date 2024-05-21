import Layout from '@/Layouts/components/Layout'
import React, { Fragment, useEffect, useState,useRef } from 'react'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';
import Receipt from '@/Components/Receipt';
import { useReactToPrint } from "react-to-print";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';

function PointOfSaleScreen({ company, products, cart_items }) {
    console.log(cart_items)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    useEffect(() => {
        var initialOptions = products.data.map((prod) => ({
            value: prod.id,
            label: String(prod.name + ' (' + prod.brand + ') -> UGX ' + Intl.NumberFormat('en-US').format(prod.retail_price)),
        }));
        setOptions(initialOptions);
    }, [products]);

    const [options, setOptions] = useState([]);
    const [receiptProducts, setReceiptProducts] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const [cartTotal, setCartTotal] = useState(0);
    const [change, setChange] = useState(0);
    const [received, setReceived] = useState();

    const getChange = e => {
        e.preventDefault();
        setReceived(e.target.value)

        var total= e.target.value - cartTotal

        setChange(total)
     

    }
    
    useEffect(() => {

        if(received==''){
            setChange(0)
        }
        if(cart_items.length == 0){
            setCartTotal(0);
        }
        var total =0;
        var cart = cart_items && cart_items.map((item) => {
            var itemtotal = item.quantity * parseFloat(item.product.retail_price)
            total = total + itemtotal
            setCartTotal(total)
        });
    }, [cart_items,received]);



    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption); // Update selectedOption state when an option is selected
        console.log(selectedOption.value)
    };
    const [inputVal, setInputVal] = useState('');

    const formatOptionLabel = ({ value, label, brand }) => (
        <div style={{ display: "" }}>
          <div>{'oioiioioo'}</div>
          <div style={{ marginLeft: "10px", color: "#ccc" }}>
            {'oioioi'}
          </div>
        </div>
      );

    const filterOptions = async (inputValue) => {
        var company_id = company.company_id;
        setInputVal(inputValue)
        if (!inputValue) {
            var initialOptions = products.data.map((prod) => ({
                value: prod.id,
                label: String(prod.name + ' (' + prod.brand + ') -> UGX ' + Intl.NumberFormat('en-US').format(prod.retail_price))
            }));
            setOptions(initialOptions);
            return;
        }
        try {
            const response = await axios.get(`/search_stock?q=${inputValue}`,{params:{company_id}});
            if (response.data.product.data && response.data.product.data) {
                console.log('pro data:', response.data.product.data);
                const productss = response.data.product.data;
                var filteredOptions = productss.map((prod) => ({
                    value: prod.id,
                    label: String(prod.name + ' (' + prod.brand + ') -> UGX ' + Intl.NumberFormat('en-US').format(prod.retail_price)),
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


    let [number, setNumber] = useState(0);
    function addNumber() {
        if (number == 1000) {
            toast.error('Best I can do is 10 ' + props.name + ' tickets');
        } else {
            number = number + 1;
            setNumber(parseInt(number));
        }
    }
    function subtractNumber() {
        if (number == 0) {
            toast.error('Seriously!! You want negative tickets')
        } else {
            number = number - 1;
            setNumber(parseInt(number));
        }
    }

    function removeItem(itemId, itemName) {
        var company_id = company.company.id;
        router.post('/delete_cart_item', { itemId, company_id }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(itemName + ' removed');
               
            }
        })

    }
    
    function emptyCart() {
        var company_id = company.company.id;
        router.post('/empty_cart_item', { company_id }, {
            preserveScroll: true,
            onSuccess: () => {
                setCartTotal(0)
                toast.success('Cart Cleared');
            }
        })

    }
    function registerPay() {
        var company_id = company.company.id;
        
       

        
        if(cart_items.length == 0 ){
            toast.error('You cant sale nothing')
        }
        else{
            var sale_total = cartTotal;
            var discount = 0;
            router.post('/register_pay', { company_id,sale_total,discount }, {
                preserveScroll: true,
                onSuccess: async () => {
                    
                    toast.success('Success');
                    try {
                        const response = await axios.get(`/getlastsale`,{company_id});
                        console.log(response);
                        if (response.data && response.data) {
                            console.log('pro data:', response.data);
                            setReceiptProducts(response.data);
                            handleOpen("xl")
                            
                        }
                        else {
                            console.error('unexpected')
                            setReceiptProducts(null);
                           
                        }
                    } catch (error) {
                        console.error('Error fetching products:', error);
                        setReceiptProducts(null);
                    }
                    
                    
                }
            })
        }

    }


    function addToCart() {
        if (number < 1) {
            toast.error('Quantity must be 1 or higher')
        }
        else if (number == '') {
            toast.error('Input the quantity')
        }
        else {

            var company_id = company.company.id;
            var user_id = company.user.id;
            var product_id = selectedOption.value;
            var quantity = number;
            router.post('/addtocart', { quantity, product_id, company_id, user_id }, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(selectedOption.label + ' added to cart')
                    setSelectedOption(useState(null));
                    setNumber('');
                    setInputVal('');
                }
            })
        }
    }
    const [size, setSize] = useState(null);
    
    const handleOpen = (value) => setSize(value);

    return (
        <div>
            <div className='px-5 pt-1'>

            <div className='p-2 w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center'>

            </div>

                <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center">
                <Input type='number'label='Amount received' value={received} onChange={getChange}></Input>
                    <div className='font-bold text-xl'>
                        
                        <span className='text-base font-semibold'>
                        Change: UGX {Intl.NumberFormat('en-US').format(change)}
                        </span>
                    
                    </div>
                    <div>
                    <div className='font-bold text-xl mb-1'>
                        UGX {Intl.NumberFormat('en-US').format(cartTotal)}<br/>
                                            
                    </div>
                    <button onClick={()=> registerPay()} className='py-2 px-10 rounded-md font-semibold text-base text-gray-100 bg-primary hover:bg-red-700'>Register Pay</button>
                    </div>
                </div>
                
                <div className='bg-gray-400 p-2 mt-7 w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center'>
                    <Select
                        value={selectedOption} // Set the value prop to the selected option state
                        onChange={handleSelectChange} // Call handleSelectChange when an option is selected
                        // formatOptionLabel={formatOptionLabel}
                        options={options}
                        isClearable
                        placeholder="Search for a product..."
                        onInputChange={filterOptions}
                        noOptionsMessage={() => 'No product found'}
                        inputValue={inputVal}
                        className='w-full' styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? 'brown' : 'brown',
                            }),
                        }} />

                    <div className='flex gap-1'>
                        <button onClick={subtractNumber} className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                        </button>
                        <input type="number" required placeholder='' form='stock_item_form' className='rounded-md w-16 flex [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' value={number} onChange={(event) => setNumber(event.target.value)} />
                        <button onClick={addNumber} className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </button>
                    </div>

                    <button onClick={addToCart} className='rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> Add</button>
                </div>

                <div className="flex justify-between items-center bg-tertiary px-5 py-2 mt-5">
                    <span className='font-semibold text-base'>Cart</span>
                    <button onClick={() => emptyCart()} className='bg-red-400 py-1 px-5 rounded-md text-white hover:bg-primary md:mr-28'>Clear all</button>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className='w-2/6'>Product</th>
                            <th className='w-1/6'>Price (UGX)</th>
                            <th className='w-1/6'>Qty</th>
                            <th className='w-1/6 print:hidden'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-100 ">
                        {
                            cart_items && cart_items.map((item => (
                                <tr key={item.id} className='w-full justify-end'>
                                    <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 w-1/3">
                                        {item.product.name + ' (' + item.product.brand + ')'}
                                    </td>
                                    <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 ">
                                        {Intl.NumberFormat('en-US').format(item.product.retail_price)}
                                    </td>
                                    <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                        {item.quantity}
                                    </td>
                                    <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                        <button onClick={() => removeItem(item.id, item.product.name)} className='bg-red-400 rounded-md p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        </button>
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>

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
                            Print Receipt
                        </Typography>
                    </DialogHeader>
                    <form
                       
                    >
                        <DialogBody divider className="h-[29rem] overflow-scroll">
                           <div ref={componentRef}>
                           <Receipt company={company} props={receiptProducts} />
                            </div> 
                        </DialogBody>
                    </form>

                    <DialogFooter>
                            <div className='flex w-full justify-between'>

                                <Button  variant="gradient" color="red">
                                    Ignore
                                </Button>
                                <div className="space-x-2">
                                   
                                    
                                    <Button onClick={handlePrint} type='submit' className='bg-green-500'>
                                        Print
                                    </Button>
                                </div>
                            </div>
                        </DialogFooter>
                </Dialog>
            </Fragment>
            <ToastContainer />
            {/* <Receipt/> */}
        </div>
    )
}
PointOfSaleScreen.layout = page => <Layout children={page} props={page.props.company} />
export default PointOfSaleScreen