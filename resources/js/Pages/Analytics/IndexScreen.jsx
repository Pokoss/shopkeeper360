import { Head, router } from '@inertiajs/react';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import Layout from '@/Layouts/components/Layout';
import { Line, Bar } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsScreen({ company, summary, employee_performance, sales_trend, expense_breakdown, date_range, previous_day_comparison }) {
    const [startDate, setStartDate] = useState(date_range.start);
    const [endDate, setEndDate] = useState(date_range.end);

    const handleDateFilter = (e) => {
        e.preventDefault();
        router.get(`/dashboard/${company.company.slug}/analytics`, {
            start_date: startDate,
            end_date: endDate
        }, {
            onError: (errors) => {
                Object.keys(errors).forEach(key => {
                    toast.error(errors[key]);
                });
            }
        });
    };

    const salesTrendData = {
        labels: sales_trend.map(item => item.date),
        datasets: [
            {
                label: 'Daily Sales',
                data: sales_trend.map(item => item.total),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const expenseBreakdownData = {
        labels: Object.keys(expense_breakdown),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expense_breakdown),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="p-6">
            <Head title="Business Analytics" />
            
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Business Analytics</Typography>
                <form onSubmit={handleDateFilter} className="flex gap-4 items-center">
                    <Input
                        type="date"
                        label="From"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Input
                        type="date"
                        label="To"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button type="submit">Filter</Button>
                </form>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="p-4">
                    <Typography variant="h6" color="blue-gray">Total Sales</Typography>
                    <Typography variant="h4">
                        UGX {Intl.NumberFormat().format(summary.total_sales)}
                    </Typography>
                    {previous_day_comparison && (
                        <Typography variant="small" color={previous_day_comparison.direction === 'up' ? 'green' : 'red'}>
                            {previous_day_comparison.percentage}% from yesterday
                        </Typography>
                    )}
                </Card>
                <Card className="p-4">
                    <Typography variant="h6" color="blue-gray">Total Profit</Typography>
                    <Typography variant="h4">
                        UGX {Intl.NumberFormat().format(summary.total_profit)}
                    </Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6" color="blue-gray">Total Expenses</Typography>
                    <Typography variant="h4">
                        UGX {Intl.NumberFormat().format(summary.total_expenses)}
                    </Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6" color="blue-gray">Net Profit/Loss</Typography>
                    <Typography variant="h4" color={summary.net_profit >= 0 ? 'green' : 'red'}>
                        UGX {Intl.NumberFormat().format(Math.abs(summary.net_profit))}
                    </Typography>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="p-4">
                    <Typography variant="h6" className="mb-4">Sales Trend</Typography>
                    <Line data={salesTrendData} />
                </Card>
                <Card className="p-4">
                    <Typography variant="h6" className="mb-4">Expense Breakdown</Typography>
                    <Bar data={expenseBreakdownData} />
                </Card>
            </div>

            {/* Employee Performance */}
            <Card className="p-4">
                <Typography variant="h6" className="mb-4">Employee Performance</Typography>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Employee</th>
                                <th className="text-right p-2">Transactions</th>
                                <th className="text-right p-2">Total Sales</th>
                                <th className="text-right p-2">Contribution %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee_performance.map((employee, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{employee.name}</td>
                                    <td className="text-right p-2">{employee.transactions}</td>
                                    <td className="text-right p-2">
                                        UGX {Intl.NumberFormat().format(employee.total_sales)}
                                    </td>
                                    <td className="text-right p-2">
                                        {employee.contribution}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <ToastContainer />
        </div>
    );
}

AnalyticsScreen.layout = page => <Layout children={page} props={page.props.company} />
export default AnalyticsScreen;
