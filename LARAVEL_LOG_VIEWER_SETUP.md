# 🔍 Laravel Log Viewer Setup

## Overview
A secure Laravel Log Viewer has been implemented for Level 2+ administrators to view, search, and analyze application logs.

---

## 📦 Package Installed
**Package:** `rap2hpoutre/laravel-log-viewer`  
**Version:** ^2.5  
**Documentation:** https://github.com/rap2hpoutre/laravel-log-viewer

---

## 🔐 Security Implementation

### Access Control
- **Middleware:** `admin:2` (Super Admin only)
- **Route:** `/admin/logs`
- **Protection:** Only users with `admin >= 2` can access the log viewer

### Route Configuration
Located in `routes/web.php`:
```php
Route::middleware(['admin:2'])->group(function () {
    // Other admin routes...
    
    // Laravel Log Viewer - accessible at /admin/logs
    Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LaravelLogViewerController::class, 'index'])
        ->name('admin.logs');
});
```

---

## 🎯 Features

### 1. **View Logs**
- View all Laravel log files from `storage/logs/`
- View today's logs by default
- Switch between different log files (by date)

### 2. **Filter by Log Level**
- ✅ Emergency
- ❌ Alert
- ⚠️ Critical
- ⚠️ Error
- ⚠️ Warning
- ℹ️ Notice
- ℹ️ Info
- 🔍 Debug

### 3. **Search Functionality**
- Search through log entries
- Filter by specific text
- Quick navigation

### 4. **Log Details**
- View complete stack traces
- See timestamps
- View context data
- Examine error details

### 5. **Download Logs**
- Download log files for offline analysis
- Export specific date ranges

---

## 🚀 Usage

### Accessing the Log Viewer

1. **Login as Super Admin**
   - Your user account must have `admin >= 2`

2. **Navigate to Logs**
   - Go to Admin Panel → **Activity Logs** (in sidebar)
   - Or directly visit: `http://your-domain.com/admin/logs`
   - Opens in a new tab

3. **View Recent Logs**
   - By default, shows today's logs
   - Click on different dates to view older logs

### Sidebar Navigation
The "Activity Logs" menu item in the admin sidebar has been updated:
- **Icon:** Document icon with external link indicator
- **Behavior:** Opens log viewer in new tab
- **Visibility:** Only visible to Level 2+ admins

---

## 📂 Log File Location

Laravel stores logs in:
```
storage/logs/laravel-YYYY-MM-DD.log
```

Example:
```
storage/logs/laravel-2025-10-17.log
```

---

## 🛠️ Configuration (Optional)

### Publish Configuration
To customize the log viewer, publish the config file:
```bash
php artisan vendor:publish --tag=log-viewer-config
```

This creates: `config/log-viewer.php`

### Available Options
```php
return [
    'pattern' => ['.log'],  // File patterns to match
    'storage_path' => storage_path('logs'),  // Log storage path
];
```

---

## 🔒 Security Best Practices

### 1. **Access Control**
✅ Only Level 2+ admins can access logs
✅ Protected by Laravel middleware
✅ Opens in new tab to prevent accidental navigation

### 2. **Production Environment**
```env
# Ensure proper logging configuration
LOG_CHANNEL=daily
LOG_LEVEL=error  # In production, only log errors and above
```

### 3. **Log Rotation**
Laravel automatically rotates daily logs. To configure:
```php
// config/logging.php
'daily' => [
    'driver' => 'daily',
    'path' => storage_path('logs/laravel.log'),
    'level' => env('LOG_LEVEL', 'debug'),
    'days' => 14,  // Keep logs for 14 days
],
```

### 4. **Hide Sensitive Data**
Never log sensitive information:
- ❌ Passwords
- ❌ API keys
- ❌ Personal identification numbers
- ❌ Credit card details

---

## 📊 Log Levels Explained

| Level | Code | Usage |
|-------|------|-------|
| **Emergency** | 600 | System is unusable |
| **Alert** | 550 | Action must be taken immediately |
| **Critical** | 500 | Critical conditions (e.g., DB down) |
| **Error** | 400 | Runtime errors that don't require immediate action |
| **Warning** | 300 | Exceptional occurrences that are not errors |
| **Notice** | 250 | Normal but significant events |
| **Info** | 200 | Interesting events (user login, SQL logs) |
| **Debug** | 100 | Detailed debug information |

---

## 💡 Common Use Cases

### 1. **Debugging Errors**
When users report issues:
1. Navigate to `/admin/logs`
2. Filter by **Error** or **Critical** level
3. Search for relevant error messages
4. Check stack trace for root cause

### 2. **Monitoring Performance**
1. Enable query logging in development
2. View logs to identify slow queries
3. Optimize based on findings

### 3. **Security Auditing**
1. Check for failed login attempts
2. Monitor suspicious activities
3. Review access patterns

### 4. **Troubleshooting API Issues**
1. Log API requests/responses
2. View logs to debug integration issues
3. Identify API failures

---

## 🎨 UI Features

The log viewer interface includes:

### Navigation
- **Sidebar:** Browse log files by date
- **Top Bar:** Filter by log level
- **Search:** Find specific entries

### Display
- **Color Coding:** Different colors for each log level
- **Stack Traces:** Expandable error details
- **Timestamps:** Precise time information
- **Context:** Additional metadata for each log entry

### Actions
- **Download:** Export log files
- **Share:** Copy log URLs
- **Refresh:** Real-time updates

---

## 🧪 Testing

### Generate Test Logs
```php
// In any controller or tinker
use Illuminate\Support\Facades\Log;

// Test different log levels
Log::emergency('This is an emergency!');
Log::alert('Alert! Something needs attention');
Log::critical('Critical system failure');
Log::error('An error occurred');
Log::warning('This is a warning');
Log::notice('Notable event occurred');
Log::info('Informational message');
Log::debug('Debug information');
```

### View in Browser
1. Run the above code
2. Navigate to `/admin/logs`
3. You should see all the test log entries

---

## 🆘 Troubleshooting

### Issue: Can't Access Log Viewer

**Solution:**
1. Check user admin level: `auth()->user()->admin >= 2`
2. Clear route cache: `php artisan route:clear`
3. Verify middleware is applied

### Issue: Logs Not Showing

**Solution:**
1. Check log file permissions:
   ```bash
   chmod -R 775 storage/logs
   ```
2. Ensure logs exist:
   ```bash
   ls -la storage/logs/
   ```
3. Generate test logs (see Testing section)

### Issue: 404 Error

**Solution:**
1. Clear all caches:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   ```
2. Check if package is installed:
   ```bash
   composer show rap2hpoutre/laravel-log-viewer
   ```

---

## 📝 Changelog

### Version 1.0 (2025-10-17)
- ✅ Installed `rap2hpoutre/laravel-log-viewer`
- ✅ Added route `/admin/logs` with `admin:2` middleware
- ✅ Updated Admin Sidebar with external link
- ✅ Added external link icon indicator
- ✅ Opens in new tab for better UX

---

## 🔄 Alternative Packages

If you need more features, consider:

1. **Laravel Telescope** (Full debugging suite)
   ```bash
   composer require laravel/telescope
   ```

2. **Laravel Debugbar** (Development tool)
   ```bash
   composer require barryvdh/laravel-debugbar --dev
   ```

3. **Sentry** (Production monitoring)
   ```bash
   composer require sentry/sentry-laravel
   ```

---

## 📞 Support

For issues with the log viewer package:
- **GitHub:** https://github.com/rap2hpoutre/laravel-log-viewer/issues
- **Documentation:** https://github.com/rap2hpoutre/laravel-log-viewer

For Biashari-specific issues:
- Check admin user level permissions
- Verify route middleware configuration
- Review Laravel logs for errors

---

## 🎯 Next Steps

1. ✅ Log viewer is installed and working
2. ⏭️ Configure log retention period (optional)
3. ⏭️ Set up log aggregation service (optional)
4. ⏭️ Configure alerts for critical errors (optional)
5. ⏭️ Implement custom logging for business events (optional)

---

## ⚡ Quick Reference

**Access URL:** `/admin/logs`  
**Required Level:** Admin >= 2  
**Package:** rap2hpoutre/laravel-log-viewer  
**Log Location:** `storage/logs/`  
**Opens in:** New tab  

---

**Happy Logging! 🚀**
