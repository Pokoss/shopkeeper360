# Admin Analytics & Reports

## Overview
A comprehensive analytics dashboard designed for sales and marketing teams to track company registrations, user activity, active subscriptions, and transaction volumes across the platform.

**Access Level**: Admin 1+ (Sales & Marketing)

## Features Implemented

### 1. Statistics Overview (Top Cards)

Four key metrics displayed prominently at the top:

#### Total Companies
- **Icon**: Building icon (blue gradient)
- **Metric**: Count of all registered companies
- **Purpose**: Overall platform growth indicator

#### Active Subscriptions
- **Icon**: Check circle (green gradient)
- **Metric**: Companies with valid (non-expired) subscriptions
- **Purpose**: Revenue health indicator

#### Total Users
- **Icon**: Users group (purple gradient)
- **Metric**: Count of all registered users
- **Purpose**: User base size indicator

#### This Month's Transactions
- **Icon**: Calculator (orange gradient)
- **Metric**: Count of distinct companies that made transactions this month
- **Purpose**: Current month activity level
- **Note**: Uses DISTINCT company_id from sales table

### 2. Recently Created Companies

**Purpose**: Track new company registrations and onboarding

#### Features
- **Date Range Filter**: Month and year dropdowns
- **Default**: Current month/year
- **Limit**: 50 most recent companies
- **Apply Button**: Updates results based on selected date range

#### Columns
| Column | Description |
|--------|-------------|
| Company Name | Company name and slug |
| Owner | Owner's name (from users table) |
| Plan | Badge showing plan tier (basic/standard/premium) |
| Status | Badge showing active/inactive status |
| Created Date | Registration date |

#### Plan Badges
- **Basic**: Gray badge
- **Standard**: Blue badge
- **Premium**: Purple badge

### 3. Registered Users Activity

**Purpose**: Monitor user engagement and identify inactive users

#### Features
- **Sorting**: Most recent registrations first
- **Limit**: 50 most recent users
- **Activity Status**: Automatic classification based on last login

#### Columns
| Column | Description |
|--------|-------------|
| User Name | Full name of user |
| Email | User's email address |
| Registered | Account creation date |
| Last Login | How many days ago they last logged in |
| Activity Status | Badge indicating engagement level |

#### Activity Status Logic
```
Today/Yesterday = Active (Green badge)
1-7 days ago = Inactive (Yellow badge)
8+ days ago = Dormant (Red badge)
Never logged in = Never (Gray badge)
```

#### Last Login Display
- "Today" - Logged in today
- "Yesterday" - Logged in yesterday
- "X days ago" - Number of days since last login
- "Never" - No login recorded

### 4. Active Subscriptions

**Purpose**: Monitor subscription health and upcoming renewals

#### Features
- **Filter**: Only shows companies with active subscriptions
- **Sorting**: Ordered by expiry date (soonest first)
- **Time Remaining**: Automatic calculation

#### Columns
| Column | Description |
|--------|-------------|
| Company Name | Name of subscribed company |
| Plan | Plan tier badge |
| Started | Subscription start date |
| Expires | Subscription end date |
| Time Remaining | Days until expiry with status badge |

#### Time Remaining Logic
```
Expired = Red badge
1-7 days left = Yellow badge (Expiring Soon)
8+ days left = Green badge
```

#### Display Formats
- "Expired" - Past expiry date
- "Expires today" - Expires on current date
- "1 day left" - Singular form
- "X days left" - Plural form

### 5. Company Transactions

**Purpose**: Track transaction volume by company for sales analysis

#### Features
- **Date Range Filter**: Month and year dropdowns
- **Default**: Current month/year
- **Grouping**: Distinct count by company_id
- **Sorting**: Highest transaction count first
- **Apply Button**: Updates results based on selected date range

#### Columns
| Column | Description | Alignment |
|--------|-------------|-----------|
| Company Name | Name of company | Left |
| Plan | Plan tier badge | Left |
| Transaction Count | Number of distinct transactions | Right (bold) |

#### Data Source
- **Table**: `sale`
- **Count Method**: COUNT(DISTINCT sale.id)
- **Grouping**: By company_id
- **Join**: With company table for name and plan

## Controller Method

**Location**: `app/Http/Controllers/Admin/AdminDashboardController.php`

### `analytics(Request $request)`

```php
public function analytics(Request $request)
{
    // Access check
    if (auth()->user()->admin < 1) {
        abort(403);
    }

    // Get filter parameters
    $companiesMonth = $request->get('companies_month', currentMonth);
    $companiesYear = $request->get('companies_year', currentYear);
    $transactionsMonth = $request->get('transactions_month', currentMonth);
    $transactionsYear = $request->get('transactions_year', currentYear);

    // Calculate stats
    // Query recent companies
    // Query recent users
    // Query active subscriptions
    // Query transactions

    return Inertia::render('Admin/Analytics/Index', [...]);
}
```

## Frontend Component

**Location**: `resources/js/Pages/Admin/Analytics/Index.jsx`

### State Management
```javascript
const [companiesMonth, setCompaniesMonth] = useState(currentMonth);
const [companiesYear, setCompaniesYear] = useState(currentYear);
const [transactionsMonth, setTransactionsMonth] = useState(currentMonth);
const [transactionsYear, setTransactionsYear] = useState(currentYear);
```

### Helper Functions

#### `getDaysAgo(dateString)`
Calculates how many days ago a date was:
- Returns: "Today", "Yesterday", "X days ago", or "Never"

#### `getDaysLeft(expiryDate)`
Calculates days remaining until expiry:
- Returns: "Expired", "Expires today", "1 day left", "X days left", or "N/A"

#### `getPlanBadge(plan)`
Returns CSS classes for plan badge styling:
- basic: Gray
- standard: Blue
- premium: Purple

### Filter Handlers

#### `handleCompaniesFilter()`
Updates recently created companies list based on selected month/year

#### `handleTransactionsFilter()`
Updates transactions list based on selected month/year

## Routes

**Location**: `routes/web.php`

```php
Route::get('/analytics', [AdminDashboardController::class, 'analytics'])
    ->name('admin.analytics');
```

**Access**: Requires `auth` and `admin:1` middleware

## Database Queries

### Stats Queries

```php
// Total Companies
Company::count()

// Active Subscriptions
Company::whereNotNull('subscription_expiry')
    ->where('subscription_expiry', '>=', now())
    ->count()

// Total Users
User::count()

// Month Transactions (distinct companies)
DB::table('sale')
    ->whereYear('created_at', $currentYear)
    ->whereMonth('created_at', $currentMonth)
    ->distinct('company_id')
    ->count('company_id')
```

### Recent Companies Query

```php
Company::with('owner')
    ->whereYear('created_at', $companiesYear)
    ->whereMonth('created_at', $companiesMonth)
    ->orderBy('created_at', 'desc')
    ->limit(50)
    ->get()
```

### Recent Users Query

```php
User::orderBy('created_at', 'desc')
    ->limit(50)
    ->get()
```

### Active Subscriptions Query

```php
Company::whereNotNull('subscription_expiry')
    ->where('subscription_expiry', '>=', now())
    ->orderBy('subscription_expiry', 'asc')
    ->get()
```

### Transactions Query

```php
DB::table('sale')
    ->join('company', 'sale.company_id', '=', 'company.id')
    ->select(
        'company.id as company_id',
        'company.name as company_name',
        'company.plan',
        DB::raw('COUNT(DISTINCT sale.id) as transaction_count')
    )
    ->whereYear('sale.created_at', $transactionsYear)
    ->whereMonth('sale.created_at', $transactionsMonth)
    ->groupBy('company.id', 'company.name', 'company.plan')
    ->orderBy('transaction_count', 'desc')
    ->get()
```

## UI/UX Design

### Color Scheme
- **Stats Cards**: Gradient backgrounds (blue, green, purple, orange)
- **Tables**: Clean white background with gray headers
- **Badges**: Color-coded for status (green=good, yellow=warning, red=critical, gray=neutral)

### Responsive Design
- **Stats Cards**: 1 column mobile, 4 columns desktop
- **Tables**: Horizontal scroll on mobile
- **Filters**: Stack vertically on mobile

### Interactive Elements
- **Hover Effects**: Table rows highlight on hover
- **Dropdowns**: Month and year selectors with custom styling
- **Apply Buttons**: Purple gradient matching admin theme

## Use Cases

### Sales Team
1. **Track New Signups**: Monitor monthly company registrations
2. **Identify Active Customers**: See which companies are transacting
3. **Revenue Forecasting**: View subscription status and renewal dates
4. **Lead Qualification**: Check user registration trends

### Marketing Team
1. **Campaign Performance**: Track signups by month
2. **User Engagement**: Identify inactive users for re-engagement campaigns
3. **Churn Prevention**: Monitor expiring subscriptions
4. **Market Penetration**: Analyze plan distribution

### Management
1. **Growth Metrics**: Overall platform health via stat cards
2. **Revenue Health**: Active subscription count
3. **User Retention**: Last login patterns
4. **Product Usage**: Transaction volumes by company

## Example Workflows

### Monthly Review Process
1. Access Analytics & Reports from sidebar
2. Review stat cards for high-level metrics
3. Check recently created companies for onboarding
4. Review user activity for engagement issues
5. Check active subscriptions for upcoming renewals
6. Analyze transaction volumes for sales trends

### Subscription Management
1. Navigate to Active Subscriptions section
2. Identify subscriptions expiring soon (yellow/red badges)
3. Contact companies proactively for renewal
4. Track renewal patterns by plan tier

### Sales Analysis
1. Go to Company Transactions section
2. Select desired month/year
3. Click Apply to filter
4. Review top performing companies
5. Identify low-activity companies for outreach
6. Compare transaction volumes across plan tiers

## Performance Considerations

### Optimizations
- Limit queries to 50 records for quick loading
- Use indexed columns (created_at, subscription_expiry)
- Eager load relationships (owner for companies)
- Use DB query builder for complex aggregations

### Future Enhancements
- Pagination for large datasets
- Export to CSV/Excel
- Date range picker (instead of just month/year)
- Charts and graphs for visual representation
- Comparison with previous periods
- Filters for plan type, status, etc.

## Troubleshooting

### Common Issues

**Issue**: "No transactions found for this period"
- **Solution**: Check if sale table has data for selected month/year
- **Verify**: Ensure company_id exists in sale records

**Issue**: Last login shows "Never" for all users
- **Solution**: Verify last_login_at column is being updated on login
- **Check**: AuthenticatedSessionController, RegisteredUserController, SocialAuthController

**Issue**: Active subscriptions showing expired companies
- **Solution**: Verify subscription_expiry dates are correct
- **Check**: Company model fillable array includes subscription_expiry

**Issue**: Transaction count seems incorrect
- **Solution**: Query uses DISTINCT count, check for duplicate sale IDs
- **Verify**: sale.id is unique primary key

## Security

### Access Control
- **Minimum Level**: Admin 1+ required
- **Check**: Every controller method verifies admin status
- **Middleware**: `auth` and `admin:1` applied to route

### Data Privacy
- **User Data**: Only admins can see user activity
- **Company Data**: Only admins can see transaction details
- **Email Display**: Full email addresses visible to admins

## Related Documentation
- [ADMIN_PANEL_README.md](./ADMIN_PANEL_README.md) - Main admin panel overview
- [ADMIN_COMPANY_MANAGEMENT.md](./ADMIN_COMPANY_MANAGEMENT.md) - Company management features

## Testing Checklist

- [ ] Admin level 1 can access analytics page
- [ ] Non-admin users get 403 error
- [ ] Stat cards display correct counts
- [ ] Companies filter works (month/year)
- [ ] Transactions filter works (month/year)
- [ ] Last login displays correctly
- [ ] Days left calculation accurate
- [ ] Plan badges show correct colors
- [ ] Activity status badges accurate
- [ ] Tables show "no data" message when empty
- [ ] Filters persist across requests
- [ ] Current month selected by default
- [ ] Responsive design works on mobile
