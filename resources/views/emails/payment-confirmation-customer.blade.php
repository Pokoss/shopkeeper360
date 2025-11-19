<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
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
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
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
        .success-icon {
            text-align: center;
            margin-bottom: 20px;
        }
        .success-icon svg {
            width: 60px;
            height: 60px;
        }
        .success-panel {
            background: #d1fae5;
            border-left: 4px solid #10B981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .success-panel h2 {
            margin: 0 0 10px 0;
            color: #065F46;
            font-size: 18px;
        }
        .amount-highlight {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #10B981;
        }
        .amount-highlight .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .amount-highlight .amount {
            font-size: 36px;
            font-weight: bold;
            color: #10B981;
            margin: 0;
        }
        .info-table {
            width: 100%;
            margin: 25px 0;
            border-collapse: collapse;
        }
        .info-table tr {
            border-bottom: 1px solid #e5e7eb;
        }
        .info-table td {
            padding: 15px 0;
        }
        .info-table td:first-child {
            color: #6b7280;
            font-weight: 500;
        }
        .info-table td:last-child {
            text-align: right;
            color: #111827;
            font-weight: 600;
        }
        .fee-breakdown {
            background: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .fee-breakdown h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #374151;
        }
        .fee-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .fee-row:last-child {
            border-bottom: none;
            padding-top: 12px;
            font-weight: bold;
            font-size: 16px;
        }
        .company-info {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .company-logo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto 10px;
        }
        .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .footer p {
            margin: 5px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: #10B981;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Payment Successful!</h1>
            <p>Your payment has been processed successfully</p>
        </div>

        <div class="content">
            <div class="success-panel">
                <h2>Thank you for your payment!</h2>
                <p>This email confirms that your payment has been received and processed.</p>
            </div>

            <div class="amount-highlight">
                <div class="label">Total Amount Paid</div>
                <div class="amount">{{ $paymentLink->formatted_amount }}</div>
            </div>

            <table class="info-table">
                <tr>
                    <td>Reference Number</td>
                    <td>{{ $paymentLink->link_code }}</td>
                </tr>
                <tr>
                    <td>Customer Name</td>
                    <td>{{ $paymentLink->customer_name }}</td>
                </tr>
                @if($paymentLink->purpose)
                <tr>
                    <td>Payment Purpose</td>
                    <td>{{ $paymentLink->purpose }}</td>
                </tr>
                @endif
                <tr>
                    <td>Transaction Date</td>
                    <td>{{ $paymentLink->paid_at ? $paymentLink->paid_at->format('F j, Y g:i A') : now()->format('F j, Y g:i A') }}</td>
                </tr>
                <tr>
                    <td>Payment Method</td>
                    <td>Flutterwave</td>
                </tr>
            </table>

            <div class="fee-breakdown">
                <h3>💰 Payment Breakdown</h3>
                @foreach($feeBreakdown as $item)
                    <div class="fee-row">
                        <span>{{ $item['label'] }}</span>
                        <span>{{ $item['formatted'] }}</span>
                    </div>
                @endforeach
            </div>

            <div class="company-info">
                @if($paymentLink->company && $paymentLink->company->logo)
                    <img src="{{ $paymentLink->company->logo }}" alt="{{ $paymentLink->company->name }}" class="company-logo">
                @endif
                <h3 style="margin: 10px 0 5px 0; color: #111827;">Payment Made To</h3>
                <p style="margin: 0; font-size: 18px; font-weight: 600; color: #10B981;">
                    {{ $paymentLink->company ? $paymentLink->company->name : 'Business' }}
                </p>
                @if($paymentLink->company && $paymentLink->company->email)
                <p style="margin: 5px 0 0 0; color: #6b7280;">
                    {{ $paymentLink->company->email }}
                </p>
                @endif
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-weight: 500;">
                    📧 Please keep this email for your records
                </p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Need help?</strong></p>
            <p>If you have any questions about this payment, please contact {{ $paymentLink->company ? $paymentLink->company->name : 'the business' }} directly.</p>
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                Powered by <strong>Biashari</strong> - Simplifying payments for businesses
            </p>
        </div>
    </div>
</body>
</html>
