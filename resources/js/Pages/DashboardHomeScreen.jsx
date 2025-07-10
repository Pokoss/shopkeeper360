// Redesigned DashboardHomeScreen.jsx with improved chart responsiveness using Tailwind
import React from 'react';
import Layout from '@/Layouts/components/Layout';
import { Line, Pie } from 'react-chartjs-2';
import { Head, Link } from '@inertiajs/react';
import { Chart, registerables } from 'chart.js';
import { Typography } from '@material-tailwind/react';

Chart.register(...registerables);

function DashboardHomeScreen({ company, sales_today, customer_visits, out_of_stock, top_products, sales_data, orders }) {
  const salesChartData = {
    labels: sales_data.map(s => s.day),
    datasets: [{
      label: 'Sales',
      data: sales_data.map(s => s.total_sales),
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderWidth: 2,
    }],
  };

  const productChartData = {
    labels: top_products.map(p => p.product.name),
    datasets: [{
      label: 'Quantity',
      data: top_products.map(p => p.total_quantity),
      backgroundColor: [
        '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'
      ],
      borderWidth: 1,
    }],
  };

  const Card = ({ title, value, icon, link, color }) => (
    <Link href={link} className={`flex items-center gap-4 p-4 rounded-xl shadow-md bg-white hover:shadow-xl transition-all border-l-4 ${color}`}>
      <div className="text-gray-700">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="hidden md:block ml-auto text-2xl">{icon}</div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head><title>Dashboard</title></Head>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Today's Sales" value={`UGX ${Intl.NumberFormat().format(sales_today)}`} link="#" icon="💰" color="border-blue-500" />
          <Card title="Customers Today" value={customer_visits} link="/medical/records" icon="👥" color="border-green-500" />
          <Card title="Out of Stock" value={out_of_stock} link="/inventory/stock/expired" icon="⚠️" color="border-red-500" />
          <Card title="Online Orders" value={orders} link={`/dashboard/${company.company.slug}/online-portal/orders`} icon="📦" color="border-yellow-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(company.position === 'dispenser' || company.position === 'admin' || company.position === 'owner') && (
              <Link href={`/dashboard/${company.company.slug}/pos`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/cart.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Point of Sale</span>
              </Link>
            )}
            {(company.position === 'admin' || company.position === 'owner' || company.position === 'accountant') && (
              <Link href={`/dashboard/${company.company.slug}/sales`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/pay.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Sales</span>
              </Link>
            )}
            {(company.position === 'admin' || company.position === 'owner') && (
              <Link href={`/dashboard/${company.company.slug}/inventory/stock`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/todo.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Stock</span>
              </Link>
            )}
            {(company.position === 'admin' || company.position === 'owner') && (
              <Link href={`/dashboard/${company.company.slug}/inventory/product`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/product.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Products</span>
              </Link>
            )}
            {(company.position === 'admin' || company.position === 'owner' || company.position === 'hr') && (
              <Link href={`/dashboard/${company.company.slug}/hr/employee`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/company.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Employees</span>
              </Link>
            )}
            {(company.position === 'admin' || company.position === 'owner' || company.position === 'cashier' || company.position === 'dispenser') && (
              <Link href={`/dashboard/${company.company.slug}/accounting/receipts`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/income.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Receipts</span>
              </Link>
            )}
            {/* {(company.position === 'admin' || company.position === 'owner' || company.position === 'accountant') && (
              <Link href={`/dashboard/${company.company.slug}/accounting/expenses`} className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center">
                <img src="/images/access/expense.png" alt="" className="w-10" />
                <span className="text-sm mt-2">Expenses</span>
              </Link>
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow w-full h-[350px] flex flex-col">
            <Typography variant="h6" className="text-center text-indigo-700 mb-2">Weekly Sales</Typography>
            <div className="flex-1">
              <Line data={salesChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow w-full h-[350px] flex flex-col">
            <Typography variant="h6" className="text-center text-indigo-700 mb-2">Top Products</Typography>
            <div className="flex-1">
              <Pie data={productChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardHomeScreen.layout = page => <Layout children={page} props={page.props.company} />;
export default DashboardHomeScreen;
