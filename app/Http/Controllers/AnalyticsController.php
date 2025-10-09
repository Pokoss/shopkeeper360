<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Receipt;
use App\Models\Expense;
use App\Models\Employee;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index($company, Request $request)
    {
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        if (!$comp) {
            abort(404);
        }

        $companyId = $comp->company_id;
        $startDate = $request->start_date ? Carbon::parse($request->start_date) : Carbon::today();
        $endDate = $request->end_date ? Carbon::parse($request->end_date) : Carbon::today();

        // Check if date range is more than a month for non-premium users
        if ($request->user()->employee->company->plan !== 'premium' && 
            $startDate->diffInDays($endDate) > 31) {
            return Inertia::render('Analytics/UpgradeScreen', [
                'company' => $comp
            ]);
        }

        // Get sales data
        $salesQuery = Sale::where('company_id', $companyId)
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()]);
        
        $receiptQuery = Receipt::where('company_id', $companyId)
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()]);

        // Calculate total sales
        $totalSales = $receiptQuery->sum('sale_total');
        $totalDiscount = $receiptQuery->sum('discount');
        
        // Calculate profits
        $sales = $salesQuery->get();
        $totalProfit = 0;
        foreach ($sales as $sale) {
            $totalProfit += ($sale->sale_price - ($sale->cost_price * $sale->quantity));
        }
        $totalProfit -= $totalDiscount;

        // Get expenses
        $expenses = Expense::where('company_id', $companyId)
            ->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
            ->get();
        $totalExpenses = $expenses->sum('amount');

        // Calculate net profit/loss
        $netProfit = $totalProfit - $totalExpenses;

        // Get employee performance
        $employeePerformance = User::whereHas('employee', function($q) use ($companyId) {
                $q->where('company_id', $companyId);
            })
            ->withCount(['sales' => function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            }])
            ->withSum(['sales' => function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            }], 'sale_price')
            ->orderByDesc('sales_sum_sale_price')
            ->take(10)
            ->get()
            ->map(function($employee) use ($totalSales) {
                return [
                    'name' => $employee->name,
                    'transactions' => $employee->sales_count,
                    'total_sales' => $employee->sales_sum_sale_price,
                    'contribution' => $totalSales > 0 ? 
                        round(($employee->sales_sum_sale_price / $totalSales) * 100, 2) : 0
                ];
            });

        // Get daily sales trend
        $salesTrend = [];
        $currentDate = clone $startDate;
        while ($currentDate <= $endDate) {
            $dailyTotal = Receipt::where('company_id', $companyId)
                ->whereDate('created_at', $currentDate)
                ->sum('sale_total');
            
            $salesTrend[] = [
                'date' => $currentDate->format('Y-m-d'),
                'total' => $dailyTotal
            ];
            
            $currentDate->addDay();
        }

        // Get expense categories breakdown
        $expenseBreakdown = $expenses->groupBy('name')
            ->map(function($items) {
                return $items->sum('amount');
            });

        return Inertia::render('Analytics/IndexScreen', [
            'company' => $comp,
            'summary' => [
                'total_sales' => $totalSales,
                'total_profit' => $totalProfit,
                'total_expenses' => $totalExpenses,
                'net_profit' => $netProfit,
                'total_discount' => $totalDiscount
            ],
            'employee_performance' => $employeePerformance,
            'sales_trend' => $salesTrend,
            'expense_breakdown' => $expenseBreakdown,
            'date_range' => [
                'start' => $startDate->format('Y-m-d'),
                'end' => $endDate->format('Y-m-d')
            ],
            'previous_day_comparison' => $this->getPreviousDayComparison($companyId)
        ]);
    }

    private function getPreviousDayComparison($companyId)
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $todaySales = Receipt::where('company_id', $companyId)
            ->whereDate('created_at', $today)
            ->sum('sale_total');

        $yesterdaySales = Receipt::where('company_id', $companyId)
            ->whereDate('created_at', $yesterday)
            ->sum('sale_total');

        if ($yesterdaySales > 0) {
            $percentageChange = (($todaySales - $yesterdaySales) / $yesterdaySales) * 100;
            return [
                'percentage' => round($percentageChange, 1),
                'direction' => $percentageChange >= 0 ? 'up' : 'down'
            ];
        }

        return null;
    }
}
