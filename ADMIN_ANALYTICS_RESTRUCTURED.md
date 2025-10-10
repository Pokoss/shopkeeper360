# Admin Analytics & Reports - Restructured

## Overview
The Analytics & Reports section has been completely restructured to provide better organization and performance. Each analytics section now has its own dedicated page with pagination (20 results per page).

## Changes Made

### 1. Dashboard Home Page Enhancement
**File:** `resources/js/Pages/Admin/AdminDashboard.jsx`
- Added "Business Insights" section with 4 gradient stat cards:
  - Total Companies (Purple gradient)
  - Active Subscriptions (Indigo gradient)
  - Total Users (Blue gradient)
  - Companies with Transactions This Month (Green gradient)

**Controller:** `AdminDashboardController::index()`
- Added `activeSubscriptions` stat: Companies with active subscription_expiry >= now()
- Added `monthTransactions` stat: Distinct count of companies from `sales` table for current month

### 2. Analytics Navigation Page
**File:** `resources/js/Pages/Admin/Analytics/AnalyticsIndex.jsx`
- Created navigation hub with 4 large gradient cards
- Each card links to its respective analytics page
- Information banner explaining features

**Route:** `/admin/analytics`

### 3. Companies Analytics Page
**File:** `resources/js/Pages/Admin/Analytics/Companies.jsx`
- Displays recently created companies with pagination (20 per page)
- Filters: Month and Year dropdowns (defaults to current month/year)
- Columns: Company Name, Owner, Plan, Status, Location, Created Date
- Color-coded badges for plan and status

**Route:** `/admin/analytics/companies`
**Controller:** `companiesAnalytics(Request $request)`
```php
Company::with('owner')
    ->whereYear('created_at', $year)
    ->whereMonth('created_at', $month)
    ->orderBy('created_at', 'desc')
    ->paginate(20);
```

### 4. Users Activity Page
**File:** `resources/js/Pages/Admin/Analytics/Users.jsx`
- Displays all registered users with pagination (20 per page)
- Columns: User Name (with avatar), Email, Admin Level, Registered Date, Last Login, Activity Status
- Helper functions:
  - `getDaysAgo()`: Shows "Today", "Yesterday", "X days ago", "Never"
  - `getActivityBadge()`: Color-coded badges (Green=today, Blue=<7 days, Yellow=<30 days, Red=>30 days)

**Route:** `/admin/analytics/users`
**Controller:** `usersAnalytics()`
```php
User::orderBy('created_at', 'desc')
    ->paginate(20);
```

### 5. Subscriptions Analytics Page
**File:** `resources/js/Pages/Admin/Analytics/Subscriptions.jsx`
- Displays companies with active subscriptions, pagination (20 per page)
- Columns: Company Name, Plan, Subscription Start, Expiry Date, Days Remaining, Location
- Helper functions:
  - `getDaysLeft()`: Calculates days until expiry
  - `getExpiryBadge()`: Color-coded (Red=expired, Orange=<7 days, Yellow=<30 days, Green=>30 days)

**Route:** `/admin/analytics/subscriptions`
**Controller:** `subscriptionsAnalytics()`
```php
Company::whereNotNull('subscription_expiry')
    ->where('subscription_expiry', '>=', now())
    ->orderBy('subscription_expiry', 'asc')
    ->paginate(20);
```

### 6. Transactions Analytics Page
**File:** `resources/js/Pages/Admin/Analytics/Transactions.jsx`
- Displays transaction counts by company with pagination (20 per page)
- Filters: Month and Year dropdowns (defaults to current month/year)
- Columns: Rank (with medals for top 3), Company Name, Plan, Transaction Count, Performance
- Performance badges: Excellent (>=100), Good (>=50), Average (>=20), Low (<20)
- Medals: 🥇 Gold (#1), 🥈 Silver (#2), 🥉 Bronze (#3)

**Route:** `/admin/analytics/transactions`
**Controller:** `transactionsAnalytics(Request $request)`
```php
DB::table('sales')
    ->join('company', 'sales.company_id', '=', 'company.id')
    ->select(
        'company.id as company_id',
        'company.name as company_name',
        'company.plan',
        DB::raw('COUNT(DISTINCT sales.id) as transaction_count')
    )
    ->whereYear('sales.created_at', $year)
    ->whereMonth('sales.created_at', $month)
    ->groupBy('company.id', 'company.name', 'company.plan')
    ->orderBy('transaction_count', 'desc')
    ->paginate(20);
```

## Routes Added
```php
// Analytics & Reports
Route::get('/analytics', [AdminDashboardController::class, 'analytics'])->name('admin.analytics');
Route::get('/analytics/companies', [AdminDashboardController::class, 'companiesAnalytics'])->name('admin.analytics.companies');
Route::get('/analytics/users', [AdminDashboardController::class, 'usersAnalytics'])->name('admin.analytics.users');
Route::get('/analytics/subscriptions', [AdminDashboardController::class, 'subscriptionsAnalytics'])->name('admin.analytics.subscriptions');
Route::get('/analytics/transactions', [AdminDashboardController::class, 'transactionsAnalytics'])->name('admin.analytics.transactions');
```

## Controller Methods Added
```php
public function analytics() // Navigation page
public function companiesAnalytics(Request $request) // Companies with filters
public function usersAnalytics() // Users activity
public function subscriptionsAnalytics() // Active subscriptions
public function transactionsAnalytics(Request $request) // Transactions with filters
```

## Performance Improvements
- **Pagination:** All lists limited to 20 results per page instead of loading 50+ at once
- **Lazy Loading:** Data only loaded when user navigates to specific analytics page
- **Indexing:** Queries use indexed columns (created_at, subscription_expiry)
- **Efficient Joins:** Transaction query uses single JOIN with GROUP BY

## Color Coding System

### Plan Badges
- **Basic:** Blue (bg-blue-100 text-blue-800)
- **Standard:** Purple (bg-purple-100 text-purple-800)
- **Premium:** Yellow (bg-yellow-100 text-yellow-800)

### Status Badges
- **Active:** Green (bg-green-100 text-green-800)
- **Inactive:** Gray (bg-gray-100 text-gray-800)
- **Suspended:** Red (bg-red-100 text-red-800)

### Activity Badges (Users)
- **Today:** Green (Active)
- **< 7 days:** Blue (Recent)
- **< 30 days:** Yellow (Inactive)
- **> 30 days / Never:** Red/Gray (Dormant)

### Expiry Badges (Subscriptions)
- **Expired:** Red
- **< 7 days:** Orange
- **< 30 days:** Yellow
- **> 30 days:** Green

### Performance Badges (Transactions)
- **Excellent:** >= 100 transactions (Green)
- **Good:** >= 50 transactions (Blue)
- **Average:** >= 20 transactions (Yellow)
- **Low:** < 20 transactions (Gray)

## Navigation Flow
1. Admin Dashboard → Click "Analytics & Reports" in sidebar
2. Analytics Hub → Select one of 4 analytics cards
3. Specific Analytics Page → View paginated results with filters
4. Use filters to narrow down by month/year (where applicable)
5. Navigate between pages using pagination controls

## Access Control
- All routes protected by `auth` and `admin:1` middleware
- Minimum admin level: 1
- Access checks in every controller method

## Future Enhancements
- Export to CSV/Excel functionality
- Date range pickers instead of just month/year
- Charts and graphs visualization
- Real-time updates with WebSockets
- Advanced filtering options
- Comparison between periods
- Email reports scheduling
