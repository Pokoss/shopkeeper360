import Receipt from '@/Components/Receipt';
import CustomerBill from '@/Components/CustomerBill';
import Layout from '@/Layouts/components/Layout';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
} from '@material-tailwind/react';

export default function ServiceDetailsScreen({ company, service, service_id, service_items, cart_items }) {
    console.log(service)
    const [cartTotal, setCartTotal] = useState(0);
    const [received, setReceived] = useState('');
    const [change, setChange] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [receiptProducts, setReceiptProducts] = useState(null);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);

    const componentRef = useRef();
    const componentRef1 = useRef();

    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => setSize1(value);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => {
            handleOpen();
            router.visit(`/dashboard/${company.company.slug}/service/panel`);
        },
    });

    const handlePrint1 = useReactToPrint({
        content: () => componentRef1.current,
        onAfterPrint: () => handleOpen1(),
    });

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputVal, setInputVal] = useState('');
    const [number, setNumber] = useState(1);

    // Initialize options
    useEffect(() => {
        if (service_items?.data) {
            const initialOptions = service_items.data.map((item) => ({
                value: item.id,
                label: item.name,
                price: 'UGX ' + Intl.NumberFormat('en-US').format(item.retail_price),
            }));
            setOptions(initialOptions);
        }
    }, [service_items]);

    // Calculate totals
    useEffect(() => {
        let total = 0;
        if (Array.isArray(cart_items)) {
            cart_items.forEach((item) => {
                const price = parseFloat(item.product?.retail_price) || 0;
                const quantity = parseInt(item.quantity) || 0;
                total += price * quantity;
            });
        }

        setCartTotal(total);

        if (received) {
            const numReceived = parseFloat(received);
            setChange(numReceived - total);
        } else {
            setChange(0);
        }
    }, [cart_items, received]);

    // Handle search input
    const filterOptions = async (inputValue) => {
        setInputVal(inputValue);
        if (!inputValue) return setOptions(service_items.data.map((item) => ({
            value: item.id,
            label: item.name,
            price: 'UGX ' + Intl.NumberFormat('en-US').format(item.retail_price),
        })));

        try {
            const res = await axios.get(`/search_services?q=${inputValue}&company_id=${company.company.id}`);
            const filtered = res.data.service_items.data.map((item) => ({
                value: item.id,
                label: item.name,
                price: 'UGX ' + Intl.NumberFormat('en-US').format(item.retail_price),
            }));
            setOptions(filtered);
        } catch (err) {
            console.error('Search error:', err);
            setOptions([]);
        }
    };

    const formatOptionLabel = ({ label, price }) => (
        <div className="flex flex-col">
            <span className="font-semibold">{label}</span>
            <span className="text-xs text-red-600 font-medium">{price}</span>
        </div>
    );

    const addNumber = () => {
        if (number >= 1000) {
            toast.error('Maximum quantity reached');
            return;
        }
        setNumber((prev) => prev + 1);
    };

    const subtractNumber = () => {
        if (number <= 1) {
            toast.error('Minimum quantity reached');
            return;
        }
        setNumber((prev) => prev - 1);
    };

    const addToCart = () => {
        if (!selectedOption) {
            toast.error('Please select a product');
            return;
        }

        if (number < 1) {
            toast.error('Quantity must be at least 1');
            return;
        }

        const { value: product_id } = selectedOption;
        const { id: user_id } = company.user;
        const company_id = company.company.id;
        const quantity = number;

        router.post('/addtoservice', { service_id, quantity, product_id, company_id, user_id }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${selectedOption.label} added to tab`);
                setSelectedOption(null);
                setNumber(1);
                setInputVal('');
            },
        });
    };

    const getDiscountAmount = e => {
    const val = e.target.value;
    setDiscountAmount(val);
    setChange(parseFloat(val) + (parseFloat(received) - parseFloat(cartTotal)));
  };

    const removeItem = (itemId, itemName) => {
        const company_id = company.company.id;
        router.post('/delete_service_item', { itemId, company_id, service_id }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${itemName} removed`);
            },
        });
    };

    const emptyCart = () => {
        const company_id = company.company.id;
        router.post('/empty_service_items', { company_id, service_id }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Tab cleared');
                router.visit(`/dashboard/${company.company.slug}/service/panel`);
            },
        });
    };

    const registerPay = async () => {
        if (!cart_items.length) {
            toast.error('Cannot proceed with an empty cart');
            return;
        }

        const company_id = company.company.id;
        const sale_total = cartTotal;
        const discount = discountAmount;

        router.post('/record_service_sale', { service_id, company_id, sale_total, discount }, {
            preserveScroll: true,
            onSuccess: async () => {
                toast.success('Sale recorded successfully');
                try {
                    const res = await axios.get(`/getlastsale?company_id=${company_id}`);
                    if (res.data) {
                        setReceiptProducts(res.data);
                        handleOpen('xl');
                    }
                } catch (error) {
                    console.error('Error fetching receipt data:', error);
                    toast.error('Failed to load receipt');
                }
            },
        });
    };
    const viewReceipt = () => {
        handleOpen1('xl');
    };
    return (
        <div className="p-4">
            <Head title="Service Details" />
            <ToastContainer />

            {/* Header */}
            <div className="mb-4">
                <span>Service ID: <span className="text-red-800">{service_id}</span></span>
            </div>

            {/* Product Search & Add */}
            <div className='bg-white shadow-xl rounded-2xl p-5 mb-2 grid grid-cols-1 md:grid-cols-3 gap-6 items-end'>
                <Select
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    onInputChange={filterOptions}
                    inputValue={inputVal}
                    placeholder="Search service/item..."
                    formatOptionLabel={formatOptionLabel}
                    noOptionsMessage={() => "No item found"}
                    className="w-full"
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            borderColor: state.isFocused ? '#3B82F6' : '#A5B4FC',
                        }),
                    }}
                />
                <div className="flex items-center justify-center space-x-2">
                    <button onClick={subtractNumber} disabled={number <= 1} className="bg-green-600 text-white rounded-full w-10 h-10 flex justify-center items-center disabled:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                    </button>
                    <input
                        type="number"
                        min="1"
                        max="1000"
                        value={number}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setNumber(isNaN(val) ? 1 : Math.max(1, Math.min(1000, val)));
                        }}
                        className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button onClick={addNumber} className="bg-green-600 text-white rounded-full w-10 h-10 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                        </svg>
                    </button>
                </div>
                <button onClick={addToCart} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-secondary hover:to-primary text-white py-2 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    Add to Cart
                </button>
            </div>

            {/* Payment Summary */}

            {!!cart_items.length && (
                <div className="bg-gradient-to-br from-white to-slate-50 border mb-2 p-5 rounded-2xl shadow-xl space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                            <Input type="number" label="Amount Received" value={received} onChange={(e) => setReceived(e.target.value)} />
                            {cart_items?.length > 0 && (
                                <Input type="number" label="Discount Amount" value={discountAmount} onChange={getDiscountAmount} />
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                            <div className="flex justify-between items-end w-full">
                                {/* Left Side: Change to Return */}
                                <div className="">
                                    {change > 0 && (
                                        <>
                                            <Typography className="text-sm text-gray-500">Change to Return</Typography>
                                            <Typography className="text-lg font-semibold text-green-600">
                                                UGX {Intl.NumberFormat('en-US').format(change)}
                                            </Typography>
                                        </>
                                    )}
                                </div>

                                {/* Right Side: Total */}
                                <div className="text-right">
                                    <Typography className="text-sm text-gray-500">Total</Typography>
                                    <Typography className="text-xl font-black text-gray-900">
                                        UGX {Intl.NumberFormat('en-US').format(cartTotal)}
                                    </Typography>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto text-right">
                                <Button className='bg-gradient-to-r from-green-500 to-blue-500 hover:from-secondary hover:to-primary' onClick={registerPay}>Record Sale</Button>
                            </div>
                        </div>

                    </div>
                </div>
            )}




            {/* Cart Table */}
            {cart_items?.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex justify-between items-center bg-green-100 px-4 py-3">
                        <h3 className="font-semibold text-lg">Items</h3>
                        <button onClick={viewReceipt} className="bg-green-600 text-white py-1 px-3 rounded flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2" />
                            </svg>
                            Print Bill
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Price (UGX)</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Qty</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold print:hidden">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cart_items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm">{item.product.name}</td>
                                    <td className="px-4 py-3 text-sm">{Intl.NumberFormat('en-US').format(item.product.retail_price)}</td>
                                    <td className="px-4 py-3 text-sm">{item.quantity}</td>
                                    <td className="px-4 py-3 text-right print:hidden">
                                        <button onClick={() => removeItem(item.id, item.product.name)} className="text-red-500 hover:text-red-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end bg-green-100 px-4 py-3 mt-4">
                        <button onClick={emptyCart} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}

            {/* Receipt Dialog */}
            <Dialog open={size === 'xl'} size={size} handler={handleOpen}>
                <DialogHeader>Print Receipt</DialogHeader>
                <DialogBody className="max-h-[30rem] overflow-auto">
                    <div ref={componentRef}>
                        <Receipt company={company} props={receiptProducts} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleOpen}>Close</Button>
                    <Button color="green" onClick={handlePrint}>Print</Button>
                </DialogFooter>
            </Dialog>

            {/* Bill Dialog */}
            <Dialog open={size1 === 'xl'} size={size1} handler={handleOpen1}>
                <DialogHeader>Print Bill</DialogHeader>
                <DialogBody className="max-h-[30rem] overflow-auto">
                    <div ref={componentRef1}>
                        <CustomerBill company={company} props={{ receipts: { sale_id: service_id, sale_total: cartTotal, sales: cart_items, service_name: service.name} }} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleOpen1}>Close</Button>
                    <Button color="green" onClick={handlePrint1}>Print</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

ServiceDetailsScreen.layout = (page) => <Layout children={page} props={page.props.company} />;