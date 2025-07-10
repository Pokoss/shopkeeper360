import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Select,
    Option,
    Spinner
} from "@material-tailwind/react";
import React, { useState, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import { Head, Link, router } from '@inertiajs/react'
import Layout from "@/Layouts/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EmployeeScreen({ company, employees }) {

    console.log(employees)

    const [position, setPosition] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');

    const [editName, setEditName] = useState('');
    const [editEmployeeEmail, setEditEmployeeEmail] = useState('');
    const [editPosition, setEditPosition] = useState('');
    const [editEmployeeId, setEditEmployeeId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(employees.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/hr/employee`, { page, search }, { preserveState: true });
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
        router.get(`/dashboard/${company.company.slug}/hr/employee`, {
            search, page: 1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }


    const postDelete = async (event) => {
        event.preventDefault();

        try {
            router.post('/delete-employee', { editEmployeeId },
                {
                    onSuccess: () => {
                        toast.success('Deleted Successfully');
                        handleOpenEdit();
                    }
                }
            )
        } catch (error) {
            toast.dismiss()
            toast.error(error);
            console.log('Error checking username:', error);
        }
    }
    const postEdit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
        try {
            router.post('/edit-employee', { editEmployeeId, editPosition },
                {
                    onSuccess: () => {
                        toast.success('Edited Successfully');
                        handleOpenEdit();
                    },
                    onFinish: () => {
                        setIsSubmitting(false); // Re-enable the button
                    },
                }
            )
        } catch (error) {
            toast.dismiss()
            toast.error(error);
            setIsSubmitting(false);
            console.log('Error checking username:', error);
        }


    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        var company_id = company.company_id;
        if (employeeEmail == '') {
            toast.dismiss()
            toast.error('Write the email of the employee');
        }
        else if (position == '') {
            toast.dismiss()
            toast.error('State the position')
        }
        else {
            if (isSubmitting) return; // Prevent multiple submissions
            setIsSubmitting(true);
            try {
                router.post('/add-employee', { company_id, employeeEmail, position },
                    {
                        onSuccess: () => {
                            toast.success('registered successfully');
                            setEmployeeEmail('');
                            setPosition('');
                            handleOpen();
                        },
                        onFinish: () => {
                            setIsSubmitting(false); // Re-enable the button
                        },
                    }
                )
            } catch (error) {
                toast.dismiss()
                toast.error(error);
                setEmployeeEmail('');
                setPosition('');
                console.log('Error checking username:', error);
                handleOpen();
                setIsSubmitting(false);
            }

        }
    }

    function editEmployee(user, email, position, employee_id) {
        handleOpenEdit("xl")
        setEditName(user);
        setEditEmployeeEmail(email);
        setEditPosition(position);
        setEditEmployeeId(employee_id);
    }

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
            selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            name: 'Action',
            selector: row => <button onClick={() => editEmployee(row.user.name, row.user.email, row.position, row.id)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
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
    const [sizeEdit, setSizeEdit] = useState(null);
    const handleOpenEdit = (value) => setSizeEdit(value);
    return (
        <div>
            <Head>
                <title>
                    Staff
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
                            Add a employee
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-primary">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                   </svg> */}




                            <Input label='Email' color='deep-orange'
                                value={employeeEmail} onChange={(event) => setEmployeeEmail(event.target.value)} size='sm'
                            />
                            <Select color='deep-orange' label="Position"
                                value={position} onChange={(e) => setPosition(e)}
                            >
                                <Option value='owner'>owner</Option>
                                <Option value='admin'>admin</Option>
                                <Option value='accountant'>accountant</Option>
                                <Option value='hr'>hr</Option>
                                <Option value='dispenser'>dispenser</Option>
                                <Option value='cashier'>cashier</Option>
                            </Select>

                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button onClick={handleOpen} variant="gradient" color="blue-gray">
                                Close
                            </Button>


                            {isSubmitting ? <Spinner size="sm" /> : 'Add'}


                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>
            <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Employees</span>
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
                data={employees.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={employees.total}
                paginationPerPage={employees.per_page}
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
                        sizeEdit === "xl"
                    }
                    size={sizeEdit}
                    handler={handleOpenEdit}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Edit Employee
                        </Typography>
                    </DialogHeader>
                    <form
                        onSubmit={postEdit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">


                            <Input color='deep-orange' label='Name' disabled
                                value={editName} onChange={(event) => setEditName(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Email' disabled
                                value={editEmployeeEmail} onChange={(event) => setEditEmployeeEmail(event.target.value)} size='sm'
                            />
                            <Select color='deep-orange' label="Position"
                                value={editPosition} onChange={(e) => setEditPosition(e)}
                            >
                                <Option value='owner'>owner</Option>
                                <Option value='admin'>admin</Option>
                                <Option value='accountant'>accountant</Option>
                                <Option value='hr'>hr</Option>
                                <Option value='dispenser'>dispenser</Option>
                                <Option value='cashier'>cashier</Option>
                            </Select>

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
            <ToastContainer />
        </div>
    )
}
EmployeeScreen.layout = page => <Layout children={page} props={page.props.company} />
export default EmployeeScreen