import Layout from '@/Layouts/components/Layout'
import { Input } from '@material-tailwind/react'
import React from 'react'
import Select from 'react-select'

function ServiceDetailsScreen({company, service, service_id}) {
  return (
    <div>
      Service id <span className='text-red-800'>{service_id}</span>

      <div className='px-5 pt-1'>
      
      
      
                      <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center">
                          <div className='w-full space-y-2 mt-2'>
      
                          <Input type='number' label='Amount received' 
                          // value={received} onChange={getChange}
                          >

                          </Input>
                          {/* {cart_items && cart_items.length == 0 ?<></>:
                          
                          <Input type='number' label='Discount Amount' value={discountAmount} onChange={getDiscountAmount}></Input>
                      } */}
                          </div>
                          <div className='font-bold text-xl'>
                              {/* {cart_items && cart_items.length == 0 ?
                                  <></>
                                  :
      
                                  <span className='text-base font-semibold'>
                                      Change: UGX {Intl.NumberFormat('en-US').format(change)}
                                  </span>
                              } */}
                          </div>
                          <div>
                              <div className='font-bold text-xl mb-1'>
                                  UGX
                                   {/* {Intl.NumberFormat('en-US').format(cartTotal)}<br /> */}
      
                              </div>
                              <button 
                              // onClick={() => registerPay()} 
                              className='py-2 px-10 rounded-md font-semibold text-base text-gray-100 bg-primary hover:bg-red-700'>Record Sale</button>
                          </div>
                      </div>
      
                      <div className='bg-gray-400 p-2 mt-7 w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center'>
                          <Select
                              // value={selectedOption} // Set the value prop to the selected option state
                              // onChange={handleSelectChange} // Call handleSelectChange when an option is selected
                              // formatOptionLabel={formatOptionLabel}
                              // options={options}
                              isClearable
                              placeholder="Search for service / item..."
                              // onInputChange={filterOptions}
                              noOptionsMessage={() => 'No product found'}
                              // inputValue={inputVal}
                              className='w-full' styles={{
                                  control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderColor: state.isFocused ? 'brown' : 'brown',
                                  }),
                              }} 
                              />
      
                          <div className='flex gap-1'>
                              <button 
                              // onClick={subtractNumber} 
                              className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                              </svg>
                              </button>
                              <input type="number" required placeholder='' form='stock_item_form' className='rounded-md w-16 flex [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                              // value={number} onChange={(event) => setNumber(event.target.value)}
                               />
                              <button 
                              // onClick={addNumber} 
                              className='bg-primary h-10 w-10 rounded-full flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              </button>
                          </div>
      
                          <button 
                          // onClick={addToCart} 
                          className='rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg> Add</button>
                      </div>
      
                      {/* {cart_items && cart_items.length == 0 ? */}
                          <></>
                          :
                          <div>
                              <div className="flex justify-between items-center bg-tertiary px-5 py-2 mt-5">
                                  <span className='font-semibold text-base'>Cart</span>
                                  <button 
                                  // onClick={() => emptyCart()} 
                                  className='bg-red-400 py-1 px-5 rounded-md text-white hover:bg-primary md:mr-28'>Clear all</button>
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
      
                                          // cart_items && cart_items.map((item => (
      
                                              <tr 
                                              // key={item.id} 
                                              
                                              className='w-full justify-end'>
                                                  <td 
                                                  // onClick={() => toast.success(item.product.name)} 
                                                  className="cursor-pointer sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 w-1/3">
                                                      {/* {item.product.name} */}
                                                  </td>
                                                  <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 ">
                                                      {/* {Intl.NumberFormat('en-US').format(item.product.retail_price)} */}
                                                  </td>
                                                  <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                     10 {/* {item.quantity} */}
                                                  </td>
                                                  <td className="sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                      <button 
                                                      // onClick={() => removeItem(item.id, item.product.name)} 
                                                      className='bg-red-400 rounded-md p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                      </svg>
                                                      </button>
                                                  </td>
                                              </tr>
      
      
                                          // )))
                                      }
                                  </tbody>
                              </table>
                          </div>
                      {/* } */}
      
      
                  </div>
    </div>
  )
}
ServiceDetailsScreen.layout = page => <Layout children={page} props={page.props.company} />
export default ServiceDetailsScreen