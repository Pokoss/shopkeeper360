<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Completed</title>
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
            background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
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
            background: #2196F3;
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
            background: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .success-panel h2 {
            margin: 0 0 10px 0;
            color: #1565C0;
            font-size: 18px;
        }
        .amount-highlight {
            background: linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #2196F3;
        }
        .amount-highlight .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .amount-highlight .amount {
            font-size: 36px;
            font-weight: bold;
            color: #2196F3;
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
            background: #e8f5e9;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
        }
        .payout-details h3 {
            margin: 0 0 15px 0;
            color: #2E7D32;
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
        .checkmark {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: block;
            stroke-width: 3;
            stroke: #4CAF50;
            stroke-miterlimit: 10;
            margin: 20px auto;
            box-shadow: inset 0px 0px 0px #4CAF50;
            animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        }
        .checkmark-circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 3;
            stroke-miterlimit: 10;
            stroke: #4CAF50;
            fill: #e8f5e9;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark-check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
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
            color: #2196F3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Withdrawal Completed</h1>
            <p>Your funds have been successfully transferred</p>
        </div>

        <div class="content">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>

            <span class="badge">Completed</span>
            
            <div class="success-panel">
                <h2>🎉 Payment Successfully Sent!</h2>
                <p>Great news! Your withdrawal has been completed and the funds have been successfully transferred to your designated account. You should receive the funds shortly depending on your payment method.</p>
            </div>

            <div class="amount-highlight">
                <div class="label">Amount Transferred</div>
                <div class="amount">UGX {{ number_format($withdrawalRequest->amount, 2) }}</div>
                @if($withdrawalRequest->fee > 0)
                    <div style="color: #666; font-size: 14px; margin-top: 10px;">
                        Processing Fee Deducted: UGX {{ number_format($withdrawalRequest->fee, 2) }}
                    </div>
                    <div style="color: #333; font-size: 16px; font-weight: 600; margin-top: 5px;">
                        Total Deducted from Wallet: UGX {{ number_format($withdrawalRequest->total_amount, 2) }}
                    </div>
                @endif
            </div>

            <div class="details-box">
                <div class="detail-row">
                    <span class="detail-label">Transaction ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Completion Date</span>
                    <span class="detail-value">{{ $withdrawalRequest->completed_at->format('M d, Y \a\t h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #2196F3;">Completed</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">New Wallet Balance</span>
                    <span class="detail-value">UGX {{ number_format($withdrawalRequest->wallet->balance ?? 0, 2) }}</span>
                </div>
            </div>

            <div class="payout-details">
                <h3>💰 Funds Sent To</h3>
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

            <div class="success-panel" style="background: #fff3e0; border-left-color: #FF9800;">
                <h2>⏱️ When Will I Receive the Funds?</h2>
                <p><strong>Mobile Money:</strong> Funds are typically received within a few minutes.<br>
                <strong>Bank Transfer:</strong> Funds may take 1-3 business days to appear in your account.</p>
            </div>

            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #fafafa; border-radius: 8px;">
                <p style="color: #666; margin: 5px 0;">Keep this email as a record of your transaction.</p>
                <p style="color: #999; font-size: 13px; margin: 5px 0;">Transaction Reference: WR-{{ $withdrawalRequest->id }}-{{ $withdrawalRequest->completed_at->format('YmdHis') }}</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Biashari Business Management</strong></p>
            <p>Questions about this transaction? Contact us at <a href="mailto:info@biashari.com">info@biashari.com</a></p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    </div>
</body>
</html>
