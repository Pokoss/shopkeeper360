import Layout from '@/Layouts/components/Layout'
import { Head, router, useForm } from '@inertiajs/react';
import React, { Fragment } from 'react'
import { useState } from 'react';
import DataTable from 'react-data-table-component'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
} from "@material-tailwind/react";

function ExpenseScreen({ expenses, company }) {
    console.log(expenses)
    const { data, setData, processing, post, reset, errors } = useForm();
    const { editData, setEditData } = useForm();

    const [editName, setEditName] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editId, setEditId] = useState('');

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/accounting/expenses`, { page, search }, { preserveState: true });
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
        router.get(`/dashboard/${company.company.slug}/accounting/expenses`, {
            search, page: 1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        data.company_id = company.company_id;
        post('/accounting/expense', {
            preserveScroll: true, preserveState: true,
            onSuccess: () => {
                // toast.success('We have received you request, we shall contact you shortly')
                reset();
                setData({})
                handleOpen()
            }
        });

    }

    function editExpense(name, amount, description, date, expense_id) {
        handleOpenEdit("xl")
        setEditName(name);
        setEditAmount(amount);
        setEditDate(date);
        setEditDescription(description);
        setEditId(expense_id);

    }

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
                color: '#4CAF50',
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
            selector: row => row.name,
        },
        {
            name: 'Amount (UGX)',
            selector: row => Intl.NumberFormat('en-US').format(row.amount),
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', }),
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        ,
        {
            name: 'Added On',
            selector: row => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        },
        {
            selector: row => <button onClick={() => editExpense(row.name, row.amount, row.description, row.date, row.id)} className='bg-green-600 rounded-md p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
        },]

    return (
        <div>
            <Head>
                <title>
                    Expenses
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
                            Add an expense
                        </Typography>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">
                            <Input label='Name' size='sm' value={data.name ?? ''} onChange={e => setData('name', e.target.value)} error={errors.name} />
                            <Input label='Amount' size='sm' value={data.amount ?? ''} onChange={e => setData('amount', e.target.value)} error={errors.amount} />
                            <Input label='Date' type='date' size='sm' value={data.date ?? ''} onChange={e => setData('date', e.target.value)} error={errors.date} />
                            <Input label='Description' size='sm' value={data.description ?? ''} onChange={e => setData('description', e.target.value)} error={errors.description} />
                            {/* <Input label='Status' size='sm' value={data.status ?? ''} onChange={e => setData('status', e.target.value)} error={errors.status}/> */}

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
                title={'Expenses' &&
                    <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2'>
                        <span>{'Expenses'}</span>
                        <div className='flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden'>

                            <Input type='text' label='Search'
                                value={search}
                                onChange={handleSearch}
                                className='md:w-full' />
                            <span>
                                <Button size='sm' color='success' type='submit' className='flex h-10 items-center bg-gradient-to-r from-primary to-secondary'
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
                data={expenses.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={expenses.total}
                paginationPerPage={expenses.per_page}
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
                            Edit Expense
                        </Typography>
                    </DialogHeader>
                    <form
                    // onSubmit={postEdit}
                    >
                        <DialogBody divider className="grid place-items-center gap-4">


                            <Input color='deep-orange' label='Name'
                                value={editName} onChange={(event) => setEditName(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Amount'
                                value={editAmount} onChange={(event) => setEditAmount(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Date' type='date'
                                value={editDate} onChange={(event) => setEditDate(event.target.value)} size='sm'
                            />
                            <Input color='deep-orange' label='Description'
                                value={editDescription} onChange={(event) => setEditDescription(event.target.value)} size='sm'
                            />




                        </DialogBody>
                        <DialogFooter>
                            <div className='flex w-full justify-between'>
                                <Button
                                    // onClick={postDelete} 
                                    variant="gradient" color="red">
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
        </div>


    )
}
ExpenseScreen.layout = page => <Layout children={page} props={page.props.company} />

export default ExpenseScreen