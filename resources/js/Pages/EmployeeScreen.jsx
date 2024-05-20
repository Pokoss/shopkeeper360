import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Select,
    Option
} from "@material-tailwind/react";
import React, { useState, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import { Link, router } from '@inertiajs/react'
import Layout from "@/Layouts/components/Layout";

function EmployeeScreen({company,employees}) {
    console.log(employees)
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
            name: 'Name',
            selector: row => row.user.name,
        },
        {
            name: 'Position',
            selector: row => row.position,
        },
        {
            name: 'Email',
            selector: row => row.user.email,
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <Link href={`/dashboard/events/`}><Button className='h-8 flex bg-primary items-center'>Details</Button></Link>
        },
        
      ];
      const data = [
        {
            id: 1,
            product: 'Insect Juice',
            brand: 'Beetlejuice',
            measurement: 'Bottle',
            
        },
      ]


    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
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
                       Add a employee
                   </Typography>
               </DialogHeader>

               <form 
               // onSubmit={handleSubmit}
               >
                   <DialogBody divider className="grid place-items-center gap-4">
                       {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}




                       <Input label='Email'
                           // value={employeeEmail} onChange={(event) => setEmployeeEmail(event.target.value)} size='sm' 
                           />
                       <Select color='deep-orange' label="Position"
                           // value={position} onChange={(e) => setPosition(e)}
                           >
                           <Option value='admin'>Owner (Has all previlages)</Option>
                           <Option value='admin'>Admin</Option>
                           <Option value='admin'>Accountant</Option>
                           <Option value='admin'>Human Resource</Option>
                           <Option value='admin'>Manager</Option>
                           <Option value='admin'>Cashier</Option>
                       </Select>

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
           title={'Employee' &&
               <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                   <span>{'Employee'}</span>
                   <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                       <Input type='text' label='Search'
                           // onChange={e => setSearchValue(e.target.value)}
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
           data={employees.data}
           customStyles={customStyles}
           pointerOnHover
           onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
           // progressPending={loading}
           highlightOnHover


       // expandOnRowClicked={expandOnRowClicked && ExpandableComponent}
       // expandableRows={ExpandableComponent}
       // expandableRowsComponent={ExpandableComponent}
       // expandableRowExpanded={row=>true}
       />
</div>
  )
}
EmployeeScreen.layout = page => <Layout children={page} props={page.props.company} />
export default EmployeeScreen