# Payment Email Notifications Setup

This guide explains how to configure email notifications for payment confirmations in your Shopkeeper360 application.

## Overview

When a payment is successfully processed, the system automatically sends two emails:

1. **Customer Confirmation Email** - Sent to the customer who made the payment
2. **Business Notification Email** - Sent to the business receiving the payment

## What's Included

### Email Classes
- `app/Mail/PaymentConfirmationCustomer.php` - Customer email handler
- `app/Mail/PaymentConfirmationBusiness.php` - Business email handler

### Email Templates
- `resources/views/emails/payment-confirmation-customer.blade.php` - Customer email design
- `resources/views/emails/payment-confirmation-business.blade.php` - Business email design

### Features

#### Customer Email Includes:
- ✅ Success confirmation message
- 💰 Total amount paid
- 📋 Payment breakdown (base amount, platform fee, gateway fee)
- 📝 Customer information
- 🏢 Business information with logo
- 🔢 Transaction reference number
- 📅 Payment date and time
- 💳 Payment method

#### Business Email Includes:
- 💰 Amount credited to wallet
- 👤 Customer information (name, email, phone)
- 💵 Payment breakdown showing fees deducted
- 🔢 Transaction reference
- 📅 Payment date and time
- 🔗 Link to dashboard
- 📊 Clear visualization of fees vs. amount received

## Email Configuration

### 1. Configure Mail Settings in .env

Add or update these settings in your `.env` file:

```env
# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourbusiness.com
MAIL_FROM_NAME="Biashari Payments"
```

### 2. Recommended Mail Services

#### Option 1: Gmail (Development/Testing)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
MAIL_ENCRYPTION=tls
```

**Note:** You need to create an App Password in your Google Account:
1. Go to Google Account Settings
2. Security → 2-Step Verification → App Passwords
3. Generate a new app password
4. Use that password in MAIL_PASSWORD

#### Option 2: Mailtrap (Development/Testing)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_ENCRYPTION=tls
```

#### Option 3: SendGrid (Production)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
MAIL_ENCRYPTION=tls
```

#### Option 4: Mailgun (Production)
```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=your-domain.com
MAILGUN_SECRET=your-mailgun-api-key
MAILGUN_ENDPOINT=api.mailgun.net
```

#### Option 5: AWS SES (Production)
```env
MAIL_MAILER=ses
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=us-east-1
```

### 3. Configure Queue for Email Delivery

For better performance, emails are queued. Configure your queue:

```env
QUEUE_CONNECTION=database
```

Then run migrations for the queue tables:

```bash
php artisan queue:table
php artisan migrate
```

### 4. Start Queue Worker

Run the queue worker to process emails:

```bash
php artisan queue:work
```

For production, use supervisor or systemd to keep queue worker running.

## Testing Emails

### Test Email Configuration

```bash
php artisan tinker
```

Then in the tinker console:

```php
Mail::raw('Test email', function($message) {
    $message->to('test@example.com')->subject('Test Email');
});
```

### Test Payment Confirmation Emails

After configuring mail settings, test by completing a payment:

1. Create a payment link from the dashboard
2. Make a test payment using Flutterwave test cards
3. Check both customer and business email inboxes

### View Email Logs

Check Laravel logs for email sending status:

```bash
tail -f storage/logs/laravel.log
```

## Email Triggers

Emails are automatically sent in two scenarios:

### 1. Direct Payment Verification
When a customer completes payment and the `verify()` method is called:
- Customer receives confirmation email
- Business receives notification email

### 2. Webhook Payment
When Flutterwave sends a webhook notification:
- Same emails are sent after successful verification

## Email Error Handling

The system includes robust error handling:
- If email sending fails, the payment still processes successfully
- Email errors are logged but don't affect payment processing
- You can monitor email failures in `storage/logs/laravel.log`

## Customizing Email Templates

### Customer Email Template
Edit: `resources/views/emails/payment-confirmation-customer.blade.php`

Available variables:
- `$paymentLink` - Payment link object with customer info
- `$feeBreakdown` - Array with base_amount, platform_fee, gateway_fee, total_amount

### Business Email Template
Edit: `resources/views/emails/payment-confirmation-business.blade.php`

Same variables available as customer template.

### Styling Tips
- Emails use inline CSS for maximum compatibility
- Color scheme can be changed by modifying the CSS variables
- Logo size and position can be adjusted in the template
- Add your brand colors in the gradient backgrounds

## Production Checklist

Before going live:

- [ ] Configure production mail service (SendGrid, Mailgun, AWS SES)
- [ ] Set up queue worker with supervisor/systemd
- [ ] Update `MAIL_FROM_ADDRESS` to your domain email
- [ ] Update `MAIL_FROM_NAME` to your business name
- [ ] Test emails with real addresses
- [ ] Set up email monitoring/tracking
- [ ] Configure SPF and DKIM records for your domain
- [ ] Enable email logging for debugging
- [ ] Test email delivery to different email providers (Gmail, Outlook, Yahoo)

## Troubleshooting

### Emails Not Sending

1. **Check Mail Configuration**
   ```bash
   php artisan config:clear
   php artisan config:cache
   ```

2. **Check Queue Worker**
   ```bash
   php artisan queue:work --verbose
   ```

3. **Check Logs**
   ```bash
   tail -f storage/logs/laravel.log | grep mail
   ```

### Emails Going to Spam

1. Set up SPF record for your domain
2. Set up DKIM signing
3. Use a reputable email service
4. Avoid spam trigger words
5. Include unsubscribe link (for marketing emails)

### Gmail Specific Issues

1. Enable "Less secure app access" (not recommended) OR
2. Use App Passwords (recommended)
3. Check Google Admin console if using G Suite

## Queue Configuration for Production

Create a supervisor configuration file:

```bash
sudo nano /etc/supervisor/conf.d/shopkeeper-worker.conf
```

Add:

```ini
[program:shopkeeper-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/shopkeeper360/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/shopkeeper360/storage/logs/worker.log
stopwaitsecs=3600
```

Then:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start shopkeeper-worker:*
```

## Support

If you encounter issues with email notifications:

1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify mail configuration in `.env`
3. Test with a simple email first
4. Check queue worker is running
5. Verify customer email addresses are valid

## Advanced Configuration

### Custom Email Address per Company

If you want to send business notifications to different addresses per company:

1. Make sure each company has an email set in the database
2. The system automatically uses `$paymentLink->company->email`
3. If no email is set, notifications won't be sent to the business

### Email Queueing Delays

To delay email sending (e.g., 5 minutes after payment):

Edit the Mailable classes and add:

```php
public function __construct(PaymentLink $paymentLink, array $feeBreakdown)
{
    $this->paymentLink = $paymentLink;
    $this->feeBreakdown = $feeBreakdown;
    $this->delay(now()->addMinutes(5));
}
```

### Multiple Recipients

To send business notifications to multiple email addresses:

```php
// In PublicPaymentController.php
$businessEmails = [
    $paymentLink->company->email,
    'accounts@yourbusiness.com',
    'notifications@yourbusiness.com'
];

Mail::to($businessEmails)->send(
    new PaymentConfirmationBusiness($paymentLink, $feeBreakdown)
);
```

---

**Need Help?** Check the Laravel mail documentation: https://laravel.com/docs/10.x/mail
