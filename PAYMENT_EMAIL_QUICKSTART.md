# Payment Email Notifications - Quick Start Guide

## ✅ What's Been Set Up

Your payment system now automatically sends email confirmations to both customers and businesses when payments are successfully processed!

## 📧 Email Types

### 1. Customer Confirmation Email
**Sent to:** Customer who made the payment  
**Includes:**
- ✅ Success confirmation message
- 💰 Total amount paid with breakdown
- 🏢 Business information and logo
- 📋 Payment reference number
- 📅 Date and time of payment

### 2. Business Notification Email
**Sent to:** Business receiving the payment  
**Includes:**
- 💰 Amount credited to wallet (after fees)
- 👤 Customer information (name, email, phone)
- 💵 Detailed fee breakdown
- 📊 Transaction reference
- 🔗 Link to dashboard

## 🚀 Quick Setup (3 Steps)

### Step 1: Configure Mail Settings

Add to your `.env` file:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourbusiness.com
MAIL_FROM_NAME="Biashari Payments"
```

**For Gmail:** Create an App Password at: https://myaccount.google.com/apppasswords

### Step 2: Set Up Queue

```bash
php artisan queue:table
php artisan migrate
```

Update `.env`:
```env
QUEUE_CONNECTION=database
```

### Step 3: Start Queue Worker

```bash
php artisan queue:work
```

Keep this running in a terminal or use supervisor for production.

## 🧪 Testing Emails

### Test with real payment:
```bash
# 1. Create a payment link from dashboard
# 2. Make a test payment
# 3. Check both email inboxes
```

### Test with command:
```bash
php artisan test:payment-emails \
  --customer-email=customer@example.com \
  --business-email=business@example.com
```

### Test with specific payment link:
```bash
php artisan test:payment-emails \
  --customer-email=customer@example.com \
  --business-email=business@example.com \
  --link-code=plk_AJWGRY5
```

## 📝 How It Works

### Automatic Sending
Emails are automatically sent when:

1. **Direct Payment:** Customer completes payment → verify() method → Emails sent
2. **Webhook:** Flutterwave webhook → verification → Emails sent

### Email Queueing
- Emails are queued for better performance
- Queue worker processes them in background
- Payment still succeeds even if email fails
- Email errors are logged but don't affect payment

### Error Handling
- Payment processing never fails due to email errors
- All email errors are logged in `storage/logs/laravel.log`
- You can monitor and retry failed emails if needed

## 📂 Files Created

### Mailable Classes
- `app/Mail/PaymentConfirmationCustomer.php`
- `app/Mail/PaymentConfirmationBusiness.php`

### Email Templates
- `resources/views/emails/payment-confirmation-customer.blade.php`
- `resources/views/emails/payment-confirmation-business.blade.php`

### Test Command
- `app/Console/Commands/TestPaymentEmails.php`

### Documentation
- `PAYMENT_EMAIL_SETUP.md` (detailed setup guide)

## 🎨 Customizing Emails

### Change Colors
Edit the email template files and modify the CSS:

**Customer Email (Green theme):**
```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
```

**Business Email (Blue theme):**
```css
background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
```

### Change Content
Edit the blade template files:
- `resources/views/emails/payment-confirmation-customer.blade.php`
- `resources/views/emails/payment-confirmation-business.blade.php`

### Add Company Logo
Make sure each company has a `logo` field in the database. The email will automatically show it.

## 🔧 Troubleshooting

### Emails not sending?

1. **Check config:**
   ```bash
   php artisan config:clear
   ```

2. **Check queue worker:**
   ```bash
   php artisan queue:work --verbose
   ```

3. **Check logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

4. **Test mail config:**
   ```bash
   php artisan tinker
   ```
   Then:
   ```php
   Mail::raw('Test', function($m) { $m->to('your@email.com')->subject('Test'); });
   ```

### Emails going to spam?

1. Use a professional email service (SendGrid, Mailgun, AWS SES)
2. Set up SPF and DKIM records for your domain
3. Use your own domain email address in MAIL_FROM_ADDRESS

### Gmail specific issues?

- Enable 2-Step Verification
- Create App Password: https://myaccount.google.com/apppasswords
- Use App Password in MAIL_PASSWORD (not your regular password)

## 🔐 Production Recommendations

### Use Professional Email Service

**SendGrid** (Recommended):
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
MAIL_ENCRYPTION=tls
```

**Mailgun**:
```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=your-domain.com
MAILGUN_SECRET=your-mailgun-api-key
```

### Set Up Queue Worker with Supervisor

Create `/etc/supervisor/conf.d/shopkeeper-worker.conf`:
```ini
[program:shopkeeper-worker]
command=php /path/to/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
```

Then:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start shopkeeper-worker:*
```

## 📊 Monitoring

### View Queue Jobs
```bash
php artisan queue:work --verbose
```

### Check Failed Jobs
```bash
php artisan queue:failed
```

### Retry Failed Jobs
```bash
php artisan queue:retry all
```

### Monitor Logs
```bash
tail -f storage/logs/laravel.log | grep -i mail
```

## 💡 Tips

1. **Test thoroughly** before going live
2. **Monitor email delivery** in the first few days
3. **Keep queue worker running** always in production
4. **Check spam folders** during testing
5. **Use real email service** for production (not Gmail)

## 🆘 Need Help?

- Check detailed guide: `PAYMENT_EMAIL_SETUP.md`
- Laravel docs: https://laravel.com/docs/10.x/mail
- Check logs: `storage/logs/laravel.log`

## ✅ Checklist

Before deploying to production:

- [ ] Mail credentials configured in `.env`
- [ ] Queue configured (`QUEUE_CONNECTION=database`)
- [ ] Queue tables migrated
- [ ] Queue worker running (with supervisor)
- [ ] Test emails sent successfully
- [ ] Emails not going to spam
- [ ] SPF/DKIM records configured (for custom domain)
- [ ] Professional email service set up (SendGrid/Mailgun)
- [ ] Error monitoring in place
- [ ] Email logs reviewed

---

**Ready to test?**
```bash
php artisan test:payment-emails --customer-email=your@email.com --business-email=business@email.com
```

Good luck! 🚀
