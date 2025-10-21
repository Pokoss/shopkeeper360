<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Withdrawal Request - Action Required</title>
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
            background: linear-gradient(135deg, #FF5722 0%, #F44336 100%);
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
            background: #FF5722;
            color: white;
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .alert-panel {
            background: #fff3e0;
            border-left: 4px solid #FF9800;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .alert-panel h2 {
            margin: 0 0 10px 0;
            color: #F57C00;
            font-size: 18px;
        }
        .alert-panel p {
            margin: 5px 0;
            color: #666;
        }
        .amount-box {
            background: linear-gradient(135deg, rgba(255, 87, 34, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #FF5722;
        }
        .amount-box .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .amount-box .amount {
            font-size: 36px;
            font-weight: bold;
            color: #FF5722;
        }
        .details-grid {
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
            flex: 1;
        }
        .detail-value {
            color: #333;
            font-weight: 500;
            flex: 2;
            text-align: right;
        }
        .company-info {
            background: #e3f2fd;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #2196F3;
        }
        .company-info h3 {
            margin: 0 0 15px 0;
            color: #1976D2;
            font-size: 18px;
        }
        .company-info .info-item {
            margin: 10px 0;
            color: #333;
        }
        .company-info .info-label {
            font-weight: 600;
            color: #666;
            display: inline-block;
            min-width: 120px;
        }
        .payout-section {
            background: #fff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 2px solid #4CAF50;
        }
        .payout-section h3 {
            margin: 0 0 15px 0;
            color: #4CAF50;
            font-size: 18px;
        }
        .payout-section .payout-item {
            margin: 8px 0;
            color: #333;
        }
        .payout-section .payout-label {
            font-weight: 600;
            color: #666;
            display: inline-block;
            min-width: 140px;
        }
        .action-required {
            background: #ffebee;
            border: 2px solid #f44336;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
        }
        .action-required h3 {
            margin: 0 0 10px 0;
            color: #d32f2f;
            font-size: 18px;
        }
        .action-required p {
            margin: 10px 0;
            color: #666;
            font-size: 14px;
        }
        .action-button {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 15px;
        }
        .action-button:hover {
            background: #45a049;
        }
        .notes-section {
            background: #fafafa;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #9E9E9E;
        }
        .notes-section h4 {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 14px;
        }
        .notes-section p {
            margin: 0;
            color: #333;
            font-style: italic;
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
            color: #FF5722;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Withdrawal Request</h1>
            <p>Action Required - Review & Process</p>
        </div>

        <div class="content">
            <span class="badge">Action Required</span>
            
            <div class="alert-panel">
                <h2>⚡ Immediate Attention Required</h2>
                <p>A new withdrawal request has been submitted and requires your review and approval. Please process this request within 24 hours as per our service level agreement.</p>
            </div>

            <div class="amount-box">
                <div class="label">Requested Withdrawal Amount</div>
                <div class="amount">UGX {{ number_format($withdrawalRequest->amount, 2) }}</div>
                @if($withdrawalRequest->fee > 0)
                    <div style="color: #666; font-size: 14px; margin-top: 10px;">
                        Processing Fee: UGX {{ number_format($withdrawalRequest->fee, 2) }}
                    </div>
                    <div style="color: #333; font-size: 18px; font-weight: 600; margin-top: 5px;">
                        Total Amount: UGX {{ number_format($withdrawalRequest->total_amount, 2) }}
                    </div>
                @endif
            </div>

            <div class="company-info">
                <h3>🏢 Business Information</h3>
                <div class="info-item">
                    <span class="info-label">Company Name:</span>
                    <span>{{ $withdrawalRequest->company->name }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Company ID:</span>
                    <span>#{{ $withdrawalRequest->company->id }}</span>
                </div>
                @if($withdrawalRequest->company->email)
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span>{{ $withdrawalRequest->company->email }}</span>
                    </div>
                @endif
                @if($withdrawalRequest->company->phone)
                    <div class="info-item">
                        <span class="info-label">Phone:</span>
                        <span>{{ $withdrawalRequest->company->phone }}</span>
                    </div>
                @endif
                <div class="info-item">
                    <span class="info-label">Requested By:</span>
                    <span>{{ $withdrawalRequest->requestedBy->name ?? 'N/A' }}</span>
                </div>
            </div>

            <div class="details-grid">
                <div class="detail-row">
                    <span class="detail-label">Request ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Wallet ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->wallet_id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Submission Date</span>
                    <span class="detail-value">{{ $withdrawalRequest->created_at->format('M d, Y \a\t h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #FF9800;">Pending</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Wallet Balance</span>
                    <span class="detail-value">UGX {{ number_format($withdrawalRequest->wallet->balance ?? 0, 2) }}</span>
                </div>
            </div>

            <div class="payout-section">
                <h3>💳 Payout Destination Details</h3>
                @if($withdrawalRequest->payoutDetail->type === 'mobile_money')
                    <div class="payout-item">
                        <span class="payout-label">Payment Method:</span>
                        <span>Mobile Money - {{ $withdrawalRequest->payoutDetail->network }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Account Holder Name:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->account_name }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Phone Number:</span>
                        <span>{{ $withdrawalRequest->payoutDetail->formatted_phone }}</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Processing Fee:</span>
                        <span>UGX 0 (Free)</span>
                    </div>
                @else
                    <div class="payout-item">
                        <span class="payout-label">Payment Method:</span>
                        <span>Bank Transfer</span>
                    </div>
                    <div class="payout-item">
                        <span class="payout-label">Bank Name:</span>
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
                    @if($withdrawalRequest->payoutDetail->branch)
                        <div class="payout-item">
                            <span class="payout-label">Branch:</span>
                            <span>{{ $withdrawalRequest->payoutDetail->branch }}</span>
                        </div>
                    @endif
                    <div class="payout-item">
                        <span class="payout-label">Processing Fee:</span>
                        <span>UGX 6,000</span>
                    </div>
                @endif
                <div class="payout-item">
                    <span class="payout-label">Payout Label:</span>
                    <span>{{ $withdrawalRequest->payoutDetail->label ?? 'N/A' }}</span>
                </div>
            </div>

            @if($withdrawalRequest->notes)
                <div class="notes-section">
                    <h4>📝 Additional Notes from Business</h4>
                    <p>{{ $withdrawalRequest->notes }}</p>
                </div>
            @endif

            <div class="action-required">
                <h3>⚠️ Required Actions</h3>
                <p><strong>1.</strong> Verify the wallet has sufficient balance</p>
                <p><strong>2.</strong> Confirm payout destination details</p>
                <p><strong>3.</strong> Process the payment to the specified account</p>
                <p><strong>4.</strong> Update the request status in the admin dashboard</p>
                <p style="margin-top: 20px; font-size: 16px; color: #d32f2f;">
                    <strong>⏰ SLA: 24 Hours Processing Time</strong>
                </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; margin-bottom: 15px;">Login to the admin dashboard to review and process this request:</p>
                <a href="{{ config('app.url') }}/admin/withdrawal-requests" class="action-button">
                    Review Withdrawal Request
                </a>
            </div>
        </div>

        <div class="footer">
            <p><strong>Biashari Admin Team</strong></p>
            <p>This notification was sent to <a href="mailto:info@biashari.com">info@biashari.com</a></p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                This is an automated system notification for withdrawal request processing.
            </p>
        </div>
    </div>
</body>
</html>
