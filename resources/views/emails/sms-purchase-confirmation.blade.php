<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMS Credits Purchase Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .receipt-panel {
            background: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .receipt-panel h2 {
            margin: 0 0 15px 0;
            color: #4CAF50;
            font-size: 20px;
        }
        .details-box {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
            font-size: 14px;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #4CAF50;
        }
        .detail-value {
            color: #333333;
            font-weight: 500;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e9ecef, transparent);
            margin: 30px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666666;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
        }
        h1 {
            margin: 0;
            font-size: 28px;
        }
        h2 {
            color: #4CAF50;
            font-size: 20px;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 SMS Credits Purchased!</h1>
            <p>Thank You for Your Purchase</p>
        </div>
        
        <div class="content">
            <span class="badge">✓ Payment Successful</span>
            
            <p style="font-size: 16px; color: #666;">
                Dear <strong>{{ $user->name }}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #666;">
                Thank you for purchasing SMS credits for <strong>{{ $company->name }}</strong>. Your payment has been successfully processed and your SMS credits are now available!
            </p>
            
            <div class="receipt-panel">
                <h2>Purchase Details</h2>
                <div class="detail-row">
                    <span class="detail-label">Bundle Name:</span>
                    <span class="detail-value">{{ $bundle->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">SMS Credits:</span>
                    <span class="detail-value">{{ number_format($bundle->sms_count) }} SMS</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Paid:</span>
                    <span class="detail-value" style="font-size: 18px; font-weight: bold; color: #10b981;">UGX {{ number_format($bundle->price, 0) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">{{ ucfirst($topup->payment_method) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Transaction Ref:</span>
                    <span class="detail-value">{{ $topup->transaction_reference }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Purchase Date:</span>
                    <span class="detail-value">{{ $topup->created_at->format('F d, Y - h:i A') }}</span>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="details-box" style="background: #f0fdf4; border: 2px solid #10b981;">
                <div class="detail-row" style="border: none;">
                    <span class="detail-label" style="font-size: 16px;">New SMS Balance:</span>
                    <span class="detail-value" style="font-size: 24px; font-weight: bold; color: #10b981;">
                        {{ number_format($company->sms_balance) }} SMS
                    </span>
                </div>
            </div>
            
            <p style="font-size: 16px; color: #666; margin-top: 20px;">
                Your SMS credits are now available and ready to use. You can start sending messages to your customers right away!
            </p>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 8px;">
                <strong>💡 Need Help?</strong>
                <p style="margin: 5px 0 0 0;">If you have any questions about your purchase or using SMS credits, please don't hesitate to contact our support team.</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Biashari - Business Management System</strong></p>
            <p>Thank you for choosing Biashari to manage your business!</p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                This is an automated confirmation for your SMS credits purchase. Please keep this for your records.
            </p>
            <p style="color: #999; font-size: 12px;">
                If you did not make this purchase, please contact us immediately.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                {{ $topup->created_at->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
