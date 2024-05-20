import Layout from '@/Layouts/components/Layout'
import React from 'react'
import { Line, Pie } from 'react-chartjs-2';
import { Link, router } from '@inertiajs/react'
import { Typography } from '@material-tailwind/react';
Chart.register(...registerables);
import { Chart, registerables } from 'chart.js';

function DashboardHomeScreen({ company, sales_today, customer_visits, out_of_stock }) {
  console.log(company)
  const options = {
    responsive: true,
    plugins: {
      legend: {
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1000, 20, 5000, 3420, 580, 3000, 120],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
      },
      {
        label: 'Dataset 2',

        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
      },

    ],
  };
  const data1 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div>
      <div className='px-3 md:px-5 py-5 overflow-y-auto'>
        <div className="grid gap-3 md:gap-6 mb-8 grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between py-2 px-4 bg-white rounded shadow-xs dark:bg-gray-800">
            <div>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
                UGX {Intl.NumberFormat('en-US').format(sales_today)}
              </p>
              <p className="text-lg font-semibold text-red-700 dark:text-gray-400">
                Sales today
              </p>
            </div>
            <div className="hidden md:block p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </div>
          </div>
          <Link href='/medical/records' as='button' className="flex items-center text-left justify-between py-2 px-4 bg-white rounded shadow-xs dark:bg-gray-800">
            <div>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
                {Intl.NumberFormat('en-US').format(customer_visits)}
              </p>
              <p className="text-lg font-semibold text-red-700 dark:text-gray-400">
                Customers today
              </p>
            </div>
            <div className="p-3 hidden md:block mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
            </div>
          </Link>
          <Link href='/inventory/stock/expired/' as='button' className="flex items-center text-left justify-between py-2 px-4 bg-white rounded shadow-xs dark:bg-gray-800">
            <div>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
                {Intl.NumberFormat('en-US').format(out_of_stock)}
              </p>
              <p className="text-lg font-semibold text-red-700 dark:text-gray-400">
                Out of Stock
              </p>
            </div>
            <div className="p-3 hidden md:block text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
          </Link>
          <Link href={`/inventory/stock/expired/?expiryDate`} as='button' className="flex items-center text-left justify-between py-2 px-4 bg-white rounded shadow-xs dark:bg-gray-800">
            <div>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
                0
                {/* {Intl.NumberFormat('en-US').format(company.company.account_balance)} */}
              </p>
              <p className="text-lg font-semibold text-red-700 dark:text-gray-400">
                Online Orders
              </p>
            </div>
            <div className="p-3 hidden md:block text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className='w-full'>
          <div className='py-2 px-5 font-semibold text-base text-gray-800 border-b-2 border-primary'>
            Quick Access
          </div>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 p-2'>
            <Link href={`/dashboard/${company.company.slug}/pos`} className='w-full bg-white rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/cart.png' alt="" className='w-14' />
              <span className='text-base'>Point of Sale</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/sales`} className='w-full  rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/pay.png' alt="" className='w-14' />
              <span className='text-base'>Sales</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/inventory/stock`} className='w-full bg-white rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/todo.png' alt="" className='w-14' />
              <span className='text-base'>Stock Items</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/inventory/product`} className='w-full  rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/product.png' alt="" className='w-14' />
              <span className='text-base'>Products</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/hr/employee`} className='w-full bg-white rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/company.png' alt="" className='w-14' />
              <span className='text-base'>Employees</span>
            </Link>
            <Link className='w-full  rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/department.png' alt="" className='w-14' />
              <span className='text-base'>Customers</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/accounting/income`} className='w-full bg-white rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/income.png' alt="" className='w-14' />
              <span className='text-base'>Income</span>
            </Link>
            <Link href={`/dashboard/${company.company.slug}/accounting/expenses`} className='w-full  rounded m-1 flex flex-col items-center space-y-3 py-3 border-b-4 border-transparent hover:border-tertiary cursor-pointer'>
              <img src='/images/access/expense.png' alt="" className='w-14' />
              <span className='text-base'>Expenses</span>
            </Link>
          </div>
        </div>
        <div className='container mx-auto flex flex-wrap justify-evenly  sm:h-full'>
          <main className="w-full p-1 md:w-2/4 flex flex-col items-center h-full">
            <Typography className='bg-red-300 w-full text-center text-white' variant='h5'>Weekly Sales (UGX)</Typography>
            <div className='mt-3 w-full'>
              <Line className='w-full' options={options} data={data} />
            </div>
          </main>
          <aside className="p-1 w-full md:w-2/4 flex flex-col items-center">
            <Typography className='bg-yellow-700 w-full text-center text-white' variant='h5'>Most Sold Product</Typography>
            <div className='mt-3'>
              <Pie data={data1} />
            </div>
          </aside>
        </div>

      </div>
    </div>
  )
}
DashboardHomeScreen.layout = page => <Layout children={page} props={page.props.company} />
export default DashboardHomeScreen