<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Payment Receipt</title>
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
        .receipt-row {
            margin: 10px 0;
            font-size: 14px;
        }
        .receipt-row strong {
            color: #4CAF50;
        }
        .payment-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e9ecef;
        }
        .payment-table th {
            background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        .payment-table td {
            padding: 12px;
            border-bottom: 1px solid #e9ecef;
        }
        .payment-table tr:last-child td {
            border-bottom: none;
        }
        .amount-highlight {
            font-size: 24px;
            font-weight: bold;
            color: #10b981;
        }
        .features-section {
            margin: 30px 0;
        }
        .features-section h3 {
            color: #4CAF50;
            margin-bottom: 15px;
        }
        .features-list {
            list-style: none;
            padding: 0;
        }
        .features-list li {
            padding: 8px 0;
            padding-left: 30px;
            position: relative;
        }
        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 18px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
            color: #ffffff;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .cta-button:hover {
            color: #ffffff;
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
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e9ecef, transparent);
            margin: 30px 0;
        }
        .alert-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Payment Received!</h1>
            <p>Thank You for Your Subscription</p>
        </div>
        
        <div class="content">
            <span class="badge">✓ Payment Successful</span>
            
            <p style="font-size: 16px; color: #666;">
                Dear <strong>{{ $payment->company->name }}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #666;">
                Thank you for your subscription payment. Your payment has been successfully processed and your subscription is now active!
            </p>
            
            <div class="receipt-panel">
                <h2>Receipt Details</h2>
                <div class="receipt-row">
                    <strong>Receipt Number:</strong> {{ $payment->receipt_number }}
                </div>
                <div class="receipt-row">
                    <strong>Date:</strong> {{ $payment->created_at->format('F d, Y - h:i A') }}
                </div>
                <div class="receipt-row">
                    <strong>Status:</strong> <span style="color: #10b981;">✓ {{ ucfirst($payment->status) }}</span>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Plan</strong></td>
                        <td>{{ $payment->plan_name }} Plan</td>
                    </tr>
                    <tr>
                        <td><strong>Subscription Period</strong></td>
                        <td>{{ $payment->subscription_start->format('M d, Y') }} - {{ $payment->subscription_end->format('M d, Y') }}</td>
                    </tr>
                    <tr>
                        <td><strong>Amount Paid</strong></td>
                        <td class="amount-highlight">{{ $payment->currency }} {{ number_format($payment->amount, 0) }}</td>
                    </tr>
                    @if($payment->transaction_reference && $payment->transaction_reference !== 'N/A')
                    <tr>
                        <td><strong>Transaction Reference</strong></td>
                        <td>{{ $payment->transaction_reference }}</td>
                    </tr>
                    @endif
                </tbody>
            </table>
            
            <div class="divider"></div>
            
            <div class="features-section">
                <h3>What's Included in Your {{ $payment->plan_name }} Plan</h3>
                <ul class="features-list">
                    @if($payment->pricingPlan && $payment->pricingPlan->features)
                        @foreach($payment->pricingPlan->features as $feature)
                            <li>{{ $feature }}</li>
                        @endforeach
                    @else
                        @switch($payment->plan_type)
                            @case('basic')
                                <li>Retail functions only</li>
                                <li>Point of Sale</li>
                                <li>Up to 3 Employees</li>
                                <li>Query 1 Month Range</li>
                                @break
                            @case('standard')
                                <li>Retail & Service Functions</li>
                                <li>Print Receipts & Reports</li>
                                <li>QR Product Display Page</li>
                                <li>Up to 10 Employees</li>
                                <li>Customer Bookings & Appointments</li>
                                @break
                            @case('premium')
                                <li>All Standard Features</li>
                                <li>Business Analytics Dashboard</li>
                                <li>Unlimited Queries</li>
                                <li>Unlimited Staff Accounts</li>
                                <li>Send SMS Campaigns</li>
                                @break
                        @endswitch
                    @endif
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ url('/company') }}" class="cta-button">Access Your Dashboard</a>
            </div>
            
            <div class="alert-box">
                <strong>💡 Need Help?</strong>
                <p style="margin: 5px 0 0 0;">If you have any questions about your subscription or need assistance, please don't hesitate to contact our support team.</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Biashari - Business Management System</strong></p>
            <p>Thank you for choosing Biashari to manage your business!</p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                This is an automated receipt for your subscription payment. Please keep this for your records.
            </p>
            <p style="color: #999; font-size: 12px;">
                If you did not make this payment, please contact us immediately.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                {{ $payment->created_at->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
