import Layout from '@/Layouts/components/Layout'
import { router } from '@inertiajs/react';
import { Button, Input, Option, Select } from '@material-tailwind/react';

import React,{useState} from 'react'
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

function SalesScreen({ company, sales, sales_today,profit }) {
  console.log(profit)

  const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(sales.current_page);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(startDate==''){
        toast.error('The first date is required')
      }
      else if(endDate!='' && startDate>endDate){
        toast.error('the First Date cannot be greater than the end date')
      }
      else{

        router.get(`/dashboard/${company.company.slug}/sales`, {page ,start_date: startDate, end_date: endDate }, { preserveState: true });
      }
  };

    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/sales`, { page,start_date: startDate, end_date: endDate }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
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
      name: 'Product Name',
      selector: row => row.product.name,
    },
    {
      name: 'Receipt Number',
      selector: row => row.sale_id,
    },
    {
      name: 'Quantity',
      selector: row => Intl.NumberFormat('en-US').format(row.quantity),
    },
    {
      name: 'Total (UGX)',
      selector: row => Intl.NumberFormat('en-US').format(row.sale_price),
    },
    {
      name: 'Sold On',
      selector: row => new Date(row.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
    },
    // {
    //   selector: row => <div className='flex gap-4'>
    //     <button
    //       // onClick={() => editSupplier(row.name,row.phone,row.address) } 
    //       className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    //       </svg>

    //     </button>

    //   </div>
    // },
  ];
  return (
    <div>
      <DataTable
        title={'Sales' &&
          <div className='w-full border-b-2 border-primary pb-3 pt-2'>
            <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between mb-3'>
              <span className='text-lg font-bold'>{'Sales: ' +'UGX ' + Intl.NumberFormat('en-US').format(sales_today)}</span>

              <div className='font-bold flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden text-lg'>
                { 'Profit: UGX ' + Intl.NumberFormat('en-US').format(profit)}

              </div>

            </div>
            <form onSubmit={handleSubmit}>
            <div className='w-full mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-3 place-items-center class justify-center'>
              {/* <Select className='md:w-full' label="Employee"
                // value={measurement} onChange={(e) => setMeasurement(e)}
              >
               
                  <Option >OPOKA</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
                  <Option >Jude</Option>
               

              </Select> */}

              <Input type='date' label='From'
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className='md:w-full' />
              <Input type='date' label='To'
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className='md:w-full' />
              <Button type="submit" label='To'
                className='w-full bg-primary'>
                  Search
                </Button>
            </div>
            </form>
            
          </div>



        }
        columns={columns}
        data={sales.data}
        customStyles={customStyles}
        pointerOnHover
        onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
        // progressPending={loading}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={sales.total}
        paginationPerPage={sales.per_page}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[]}

      // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
      // expandableRows={ExpandableComponent}
      // expandableRowsComponent={ExpandableComponent}
      // expandableRowExpanded={row=>true}
      />
      <ToastContainer/>
    </div>
  )
}
SalesScreen.layout = page => <Layout children={page} props={page.props.company} />
export default SalesScreen