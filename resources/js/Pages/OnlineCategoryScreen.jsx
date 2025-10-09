import Layout from '@/Layouts/components/Layout'
import { Head, router } from '@inertiajs/react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component'

function OnlineCategoryScreen({company,category}) {
  console.log(category)

  const [search, setSearch] = useState('');
  const [categoryName, setCategoryName] = useState('');
  
  // Edit states
  const [editId, setEditId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [page, setPage] = useState(category.current_page);
    const fetchData = (page) => {
        router.get(`/dashboard/${company.company.slug}/online-portal/category`, { page,search }, { preserveState: true });
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
        router.get(`/dashboard/${company.company.slug}/online-portal/category`, {
            search,page:1
        }, {
            preserveState: true, preserveScroll: true, onSuccess: () => {
            }
        });
    }
    const editCategory = (row) => {
        setEditId(row.id);
        setEditCategoryName(row.name);
        handleOpenEdit("xl");
    };

    const updateCategory = async (event) => {
        event.preventDefault();
        toast.loading('Updating category...');
        var companyId = company.company_id;
        
        if (editCategoryName == '') {
            toast.dismiss();
            toast.error('Category name is required');
            return;
        }
        
        try {
            router.post(`/update-online-category/${editId}`, 
                { companyId, categoryName: editCategoryName },
                {
                    onSuccess: () => {
                        toast.dismiss();
                        toast.success('Category updated successfully');
                        setEditCategoryName('');
                        setEditId(null);
                        handleOpenEdit(null);
                    },
                    onError: (errors) => {
                        toast.dismiss();
                        toast.error('Failed to update category');
                    }
                }
            );
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || 'An error occurred');
        }
    };

    const postCategory = async (event) => {
      event.preventDefault();
      toast.loading('Adding category...');
      var companyId = company.company_id;
      if (categoryName == '') {
          toast.dismiss()
          toast.error('The category name is required');
          return;
      }
     
      try {
          router.post('/add-online-category', { companyId, categoryName},
              {
                  onSuccess: () => {
                      toast.dismiss();
                      toast.success('Category added successfully');
                      setCategoryName('');
                      handleOpen(null);
                  },
                  onError: (errors) => {
                      toast.dismiss();
                      toast.error('Failed to add category');
                  }
              }
          )
      } catch (error) {
          toast.dismiss()
          toast.error(error.message || 'An error occurred');
      }
  }


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
          name: 'Name',
          selector: row => row.name,
      },
      ,
      {
          name: 'Added On',
          selector: row => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
      },
      {
        name: 'Action',
          selector: row => <button onClick={() => editCategory(row)} className='p-2 bg-green-600 rounded hover:bg-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          </button>
      },]

  return (
    <div>
        <Head>
                <title>
                    Categories
                </title>
            </Head>
       <DataTable
                title={
                    <div className="p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary pb-3">
                        <span className="text-lg font-medium">Online Category</span>
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
                data={category.data}
                customStyles={customStyles}
                pointerOnHover
                onRowClicked={(row, event) => !children && ExpandableComponent ? null : editRow(row, event)}
                // progressPending={loading}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={category.total}
                paginationPerPage={category.per_page}
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
                        onSubmit={postCategory}
                    >
                        <DialogBody divider className="">
                            <Input label='Category'
                                value={categoryName} onChange={(event) => setCategoryName(event.target.value)} size='sm'
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

            {/* Edit Category Dialog */}
            <Fragment>
                <Dialog
                    open={sizeEdit === "xl"}
                    size={sizeEdit}
                    handler={handleOpenEdit}
                >
                    <DialogHeader>
                        <Typography variant="h5" color="blue-gray">
                            Edit Category
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={updateCategory}>
                        <DialogBody divider className="">
                            <Input 
                                label='Category'
                                value={editCategoryName} 
                                onChange={(event) => setEditCategoryName(event.target.value)} 
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

            <ToastContainer/>
    </div>
  )
}
OnlineCategoryScreen.layout = page => <Layout children={page} props={page.props.company} />

export default OnlineCategoryScreen