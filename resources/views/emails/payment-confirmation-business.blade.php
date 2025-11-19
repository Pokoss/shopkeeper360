<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Received</title>
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
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
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
        .notification-panel {
            background: #dbeafe;
            border-left: 4px solid #3B82F6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .notification-panel h2 {
            margin: 0 0 10px 0;
            color: #1e40af;
            font-size: 18px;
        }
        .amount-highlight {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #3B82F6;
        }
        .amount-highlight .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .amount-highlight .amount {
            font-size: 36px;
            font-weight: bold;
            color: #3B82F6;
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
            width: 40%;
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
            background: #ecfdf5;
            margin-top: 8px;
            padding: 12px;
            border-radius: 6px;
        }
        .customer-info {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .customer-info h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #1e40af;
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
        .stats-row {
            display: flex;
            gap: 20px;
            margin: 20px 0;
        }
        .stat-box {
            flex: 1;
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-box .label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .stat-box .value {
            font-size: 24px;
            font-weight: bold;
            color: #3B82F6;
            margin-top: 5px;
        }
        .highlight-box {
            background: #ecfdf5;
            border: 2px solid #10B981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .highlight-box .big-number {
            font-size: 32px;
            font-weight: bold;
            color: #10B981;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Payment Received</h1>
            <p>Your account has been credited</p>
        </div>

        <div class="content">
            <div class="notification-panel">
                <h2>🎉 Good News!</h2>
                <p>You've received a payment from <strong>{{ $paymentLink->customer_name }}</strong>. The funds have been added to your wallet.</p>
            </div>

            <div class="highlight-box">
                <div class="label" style="font-size: 14px; color: #059669; margin-bottom: 8px;">Amount Credited to Your Wallet</div>
                <div class="big-number">{{ number_format($paymentLink->amount, 0) }} {{ $paymentLink->currency }}</div>
            </div>

            <div class="customer-info">
                <h3>👤 Customer Information</h3>
                <table class="info-table" style="margin: 0;">
                    <tr>
                        <td>Name</td>
                        <td>{{ $paymentLink->customer_name }}</td>
                    </tr>
                    @if($paymentLink->customer_email)
                    <tr>
                        <td>Email</td>
                        <td>{{ $paymentLink->customer_email }}</td>
                    </tr>
                    @endif
                    @if($paymentLink->customer_phone)
                    <tr>
                        <td>Phone</td>
                        <td>{{ $paymentLink->customer_phone }}</td>
                    </tr>
                    @endif
                    @if($paymentLink->purpose)
                    <tr>
                        <td>Purpose</td>
                        <td>{{ $paymentLink->purpose }}</td>
                    </tr>
                    @endif
                </table>
            </div>

            <table class="info-table">
                <tr>
                    <td>Transaction Reference</td>
                    <td>{{ $paymentLink->link_code }}</td>
                </tr>
                <tr>
                    <td>Payment Date</td>
                    <td>{{ $paymentLink->paid_at ? $paymentLink->paid_at->format('F j, Y g:i A') : now()->format('F j, Y g:i A') }}</td>
                </tr>
                <tr>
                    <td>Payment Method</td>
                    <td>Flutterwave</td>
                </tr>
                @if($paymentLink->flutterwave_transaction_id)
                <tr>
                    <td>Transaction ID</td>
                    <td style="font-family: monospace; font-size: 12px;">{{ $paymentLink->flutterwave_transaction_id }}</td>
                </tr>
                @endif
            </table>

            <div class="fee-breakdown">
                <h3>💳 Payment Breakdown</h3>
                <div class="fee-row">
                    <span>Total Amount Paid by Customer</span>
                    <span>{{ $feeBreakdown[3]['formatted'] ?? '' }}</span>
                </div>
                <div class="fee-row">
                    <span>Platform Fee</span>
                    <span style="color: #ef4444;">-{{ $feeBreakdown[1]['formatted'] ?? '' }}</span>
                </div>
                <div class="fee-row">
                    <span>Gateway Fee</span>
                    <span style="color: #ef4444;">-{{ $feeBreakdown[2]['formatted'] ?? '' }}</span>
                </div>
                <div class="fee-row">
                    <span>Amount Credited to Your Wallet</span>
                    <span style="color: #10B981;">{{ $feeBreakdown[0]['formatted'] ?? '' }}</span>
                </div>
            </div>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-weight: 500;">
                    💡 <strong>Note:</strong> The fees were deducted from the total amount paid by the customer. You received the net amount in your wallet.
                </p>
            </div>

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600;">
                    Access your dashboard to view more details
                </p>
                <a href="{{ url('/company') }}" class="button" style="display: inline-block; padding: 12px 30px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 10px;">
                    View Dashboard
                </a>
            </div>
        </div>

        <div class="footer">
            <p><strong>Questions about this payment?</strong></p>
            <p>Log in to your dashboard to view the full transaction details and download receipts.</p>
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                Powered by <strong>Biashari</strong> - Payment management made simple
            </p>
        </div>
    </div>
</body>
</html>
