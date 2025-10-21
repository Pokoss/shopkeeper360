<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Approved</title>
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
            background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
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
            background: #4CAF50;
            color: white;
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .success-panel {
            background: #e8f5e9;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .success-panel h2 {
            margin: 0 0 10px 0;
            color: #2E7D32;
            font-size: 18px;
        }
        .amount-highlight {
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.1) 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #4CAF50;
        }
        .amount-highlight .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .amount-highlight .amount {
            font-size: 36px;
            font-weight: bold;
            color: #4CAF50;
        }
        .details-box {
            background: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 12px 0;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #666;
        }
        .detail-value {
            color: #333;
            font-weight: 500;
        }
        .payout-details {
            background: #e3f2fd;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #2196F3;
        }
        .payout-details h3 {
            margin: 0 0 15px 0;
            color: #1976D2;
            font-size: 16px;
        }
        .payout-details .payout-item {
            margin: 8px 0;
            color: #333;
        }
        .payout-details .payout-label {
            font-weight: 600;
            color: #666;
            display: inline-block;
            min-width: 120px;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .footer p {
            margin: 10px 0;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Withdrawal Approved</h1>
            <p>Your withdrawal request has been approved</p>
        </div>

        <div class="content">
            <span class="badge">Approved</span>
            
            <div class="success-panel">
                <h2>🎉 Great News!</h2>
                <p>Your withdrawal request has been reviewed and approved by our team. Your funds are now being processed and will be transferred to your designated account shortly.</p>
            </div>

            <div class="amount-highlight">
                <div class="label">Approved Amount</div>
                <div class="amount">UGX {{ number_format($withdrawalRequest->amount, 2) }}</div>
                @if($withdrawalRequest->fee > 0)
                    <div style="color: #666; font-size: 14px; margin-top: 10px;">
                        Processing Fee: UGX {{ number_format($withdrawalRequest->fee, 2) }}
                    </div>
                    <div style="color: #333; font-size: 18px; font-weight: 600; margin-top: 5px;">
                        Total Transfer: UGX {{ number_format($withdrawalRequest->total_amount, 2) }}
                    </div>
                @endif
            </div>

            <div class="details-box">
                <div class="detail-row">
                    <span class="detail-label">Request ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Approval Date</span>
                    <span class="detail-value">{{ $withdrawalRequest->processed_at->format('M d, Y \a\t h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #4CAF50;">Approved - Processing Payment</span>
                </div>
            </div>

            <div class="payout-details">
                <h3>💳 Funds Will Be Sent To</h3>
                @if($withdrawalRequest->payoutDetail->type === 'mobile_money')
                    <div class="payout-item">
                        <span class="payout-label">Method:</span>
                        <span>Mobile Money - {{ $withdrawalRequest->payoutDetail->network }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Account Name:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->account_name }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Phone Number:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->formatted_phone }}</span>
                    </div>
                @else
                    <div class="payout-item">
                        <span class="payout-label">Method:</span>
                        <span>Bank Transfer</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Bank:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->bank_name }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Account Name:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->account_name }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Account Number:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->account_number }}</span>
                    </div>
                @endif
            </div>

            @if($withdrawalRequest->admin_notes)
                <div class="details-box">
                    <div class="detail-label" style="margin-bottom: 10px;">Admin Notes</div>
                    <p style="margin: 0; color: #666;">{{ $withdrawalRequest->admin_notes }}</p>
                </div>
            @endif

            <div class="success-panel">
                <h2>⏱️ Next Steps</h2>
                <p>Your payment is now being processed. You will receive another email confirmation once the funds have been successfully transferred to your account. This typically takes a few hours to complete.</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Biashari Business Management</strong></p>
            <p>Questions? Contact us at <a href="mailto:info@biashari.com">info@biashari.com</a></p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    </div>
</body>
</html>
