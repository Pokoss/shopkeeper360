// Updated and polished PointOfSaleScreen.jsx
import Layout from '@/Layouts/components/Layout';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router, Link, Head } from '@inertiajs/react';
import Receipt from '@/Components/Receipt';
import { useReactToPrint } from 'react-to-print';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';

function PointOfSaleScreen({ company, products, cart_items }) {
  const [options, setOptions] = useState([]);
  const [receiptProducts, setReceiptProducts] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const [change, setChange] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [received, setReceived] = useState();
  const [number, setNumber] = useState(1);
  const [inputVal, setInputVal] = useState('');
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      handleOpen();
    },
    onPrintError: () => {
      handleOpen();
    },
  });

  const buttonClass = "bg-gradient-to-r from-green-500 to-blue-500 hover:from-secondary hover:to-primary text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md";

  useEffect(() => {
    const initialOptions = products.data.map((prod) => ({
      value: prod.id,
      label: prod.name,
      price: `UGX ${Intl.NumberFormat('en-US').format(prod.retail_price)} / ${prod.measurement.abbriviation}`,
      available: prod.available
    }));
    setOptions(initialOptions);
  }, [products]);

  useEffect(() => {
    if (!received) setChange(0);
    if (cart_items.length === 0) return setCartTotal(0);

    let total = 0, tot_profit = 0;
    cart_items.forEach(item => {
      total += item.quantity * parseFloat(item.product.retail_price);
      tot_profit += item.quantity * (parseFloat(item.product.retail_price) - parseFloat(item.product.cost_price));
    });

    setCartTotal(total);
    setProfit(tot_profit);
  }, [cart_items, received]);

  const getChange = e => {
    const val = e.target.value;
    setReceived(val);
    setChange(val - cartTotal);
  };

  const getDiscountAmount = e => {
    const val = e.target.value;
    setDiscountAmount(val);
    setChange(parseFloat(val) + (parseFloat(received) - parseFloat(cartTotal)));
  };

  const formatOptionLabel = ({ label, price, available }) => (
    <div>
      <div className='text-sm font-semibold'>{label}</div>
      <div className='flex justify-between text-xs'>
        <span className='text-red-600'>{price}</span>
        <span className='text-gray-400'>Ex: Not specified</span>
        <span className='text-green-600'>{available} left</span>
      </div>
    </div>
  );

  const filterOptions = async (inputValue) => {
    setInputVal(inputValue);
    const company_id = company.company_id;
    if (!inputValue) return setOptions(products.data.map(prod => ({
      value: prod.id,
      label: prod.name,
      price: `UGX ${Intl.NumberFormat('en-US').format(prod.retail_price)} / ${prod.measurement.abbriviation}`,
      available: prod.available
    })));

    try {
      const res = await axios.get(`/search_stock?q=${inputValue}&company_id=${company_id}`);
      const data = res?.data?.product?.data || [];
      const filtered = data.map(prod => ({
        value: prod.id,
        label: prod.name,
        price: `UGX ${Intl.NumberFormat('en-US').format(prod.retail_price)} / ${prod.measurement.abbriviation}`,
        available: prod.available
      }));
      setOptions(filtered);
    } catch (err) {
      console.error(err);
      setOptions([]);
    }
  };

  const addToCart = () => {
    if (number < 1 || !selectedOption) return toast.error('Select item and quantity > 0');
    const payload = {
      quantity: number,
      product_id: selectedOption.value,
      company_id: company.company.id,
      user_id: company.user.id
    };

    router.post('/addtocart', payload, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`${selectedOption.label} added to cart`);
        setSelectedOption(null);
        setNumber(1);
        setInputVal('');
      }
    });
  };

  const removeItem = (itemId, itemName) => {
    router.post('/delete_cart_item', { itemId, company_id: company.company.id }, {
      preserveScroll: true,
      onSuccess: () => toast.success(`${itemName} removed`)
    });
  };

  const emptyCart = () => {
    router.post('/empty_cart_item', { company_id: company.company.id }, {
      preserveScroll: true,
      onSuccess: () => toast.success('Cart Cleared')
    });
  };

  function registerPay() {
    var company_id = company.company.id;
    if (cart_items.length == 0) {
      toast.error('You cant sale nothing')
    }
    else {
      var sale_total = cartTotal;
      var discount = discountAmount;
      router.post('/register_pay', { company_id, sale_total, discount }, {
        preserveScroll: true,
        onSuccess: async () => {
          toast.success('Success');
          try {
            const response = await axios.get(`/getlastsale?company_id=${company_id}`);
            if (response.data && response.data) {
              setReceiptProducts(response.data);
              handleOpen("xl")
              setReceived('');
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


  return (
    <div className='p-4'>
      <Head><title>Point of Sale</title></Head>
      <div className='bg-white shadow-xl rounded-2xl p-5 mb-2 grid grid-cols-1 md:grid-cols-3 gap-6 items-end'>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          formatOptionLabel={formatOptionLabel}
          options={options}
          placeholder='Search for a product...'
          onInputChange={filterOptions}
          noOptionsMessage={() => 'No product found'}
          inputValue={inputVal}
        />
        <div className='flex gap-2 items-center justify-center'>
          <button onClick={() => setNumber(prev => Math.max(0, prev - 1))} disabled={number <= 1} className="bg-blue-600 text-white rounded-full w-10 h-10 flex justify-center items-center disabled:opacity-50">
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
            className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => setNumber(prev => Math.min(1000, prev + 1))} className="bg-blue-600 text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
            </svg>
          </button>
        </div>
        <Button onClick={addToCart} className={buttonClass}>Add to Cart</Button>
      </div>

      {!!cart_items.length && (
        <div className="bg-gradient-to-br from-white to-slate-50 border mb-2 p-5 rounded-2xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
              <Input
                label="Amount Received"
                value={received}
                onChange={getChange}
                type="number"
              />
              <Input
                label="Discount Amount"
                value={discountAmount}
                onChange={getDiscountAmount}
                type="number"
              />
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
                <Button onClick={registerPay} className={buttonClass}>Record Sale</Button>
              </div>
            </div>

          </div>
        </div>
      )}


      {!!cart_items.length && (
        <div className='bg-white p-5 rounded-2xl shadow-xl'>
          <div className='flex justify-between items-center mb-1'>
            <Typography variant='h6'>Cart</Typography>
            <Button color='red' size='sm' onClick={emptyCart}>Clear All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price (UGX)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold print:hidden">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart_items.map(item => (
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
          </div>
        </div>
      )}
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

              <Button onClick={handleOpen} variant="gradient" color="red">
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
    </div>
  );
}

PointOfSaleScreen.layout = page => <Layout children={page} props={page.props.company} />;
export default PointOfSaleScreen;