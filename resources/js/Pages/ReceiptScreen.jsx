import Layout from '@/Layouts/components/Layout'
import { Head, router } from '@inertiajs/react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import React,{useState,Fragment} from 'react'
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import DataTable from 'react-data-table-component';
import Receipt from '@/Components/Receipt';

function ReceiptScreen({company, receipts}) {
    console.log(receipts)

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
            name: 'Receipt Number',
            selector: row => row.sale_id,
        },
        {
            name: 'Amount Paid(UGX)',
            selector: row =>Intl.NumberFormat('en-US').format( getTotal(row.sales)),
        },
        {
            name: 'Sold On',
            selector: row => new Date(row.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <div className='flex gap-4'>
                <button 
                onClick={() => openReceipt(row) } 
                className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                </button>
               
            </div>
        },

    ];
    function getTotal(amount){

        var total = 0;
        amount && amount.map((item) => {
            total = parseFloat(item.sale_price) +total
        })

        return total;

    }

    const [page, setPage] = useState(receipts.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/accounting/receipts`, { page,search }, { preserveState: true });
    };
    const handlePageChange = (page) => {
        setPage(page);
        fetchData(page)
    };


    const [search, setSearch] = useState('');
    const handleSearch = e => {
        e.preventDefault();
        setSearch(e.target.value)
        setPage(1)
        var search = e.target.value
        router.get(`/dashboard/${company.company.slug}/accounting/receipts`, {
            search,page:1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {

            }
        });
    }
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [receiptProducts, setReceiptProducts] = useState(null);
    const [rece,setRece] = useState(null);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

      function openReceipt(row){
        // toast.success(emeasurement)
        handleOpen("xl")
        var receipts ={ 'receipts': row}
        setReceiptProducts(receipts)
        console.log(receipts)
      }

  return (
    <div>
        <Head>
                <title>
                    Receipts
                </title>
            </Head>
          <DataTable
                title={'Receipts' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Receipts'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                // onChange={(event) => setName(event.target.value)}
                                onChange={handleSearch}
                                className='md:w-full' />
                            
                        </div>
                    </div>
                }
                columns={columns}
                data={receipts.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationTotalRows={receipts.total}
                paginationPerPage={receipts.per_page}
                paginationServer
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
    </div>
  )
}
ReceiptScreen.layout = page => <Layout children={page} props={page.props.company} />

export default ReceiptScreen