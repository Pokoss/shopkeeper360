<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Received</title>
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
            background: #FFA726;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .info-panel {
            background: #fff3e0;
            border-left: 4px solid #FFA726;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .info-panel h2 {
            margin: 0 0 10px 0;
            color: #F57C00;
            font-size: 18px;
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
        .amount-highlight {
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
            padding: 20px;
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
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
        }
        .payout-details {
            background: #e3f2fd;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #2196F3;
        }
        .payout-details h3 {
            margin: 0 0 10px 0;
            color: #1976D2;
            font-size: 16px;
        }
        .payout-details p {
            margin: 5px 0;
            color: #333;
        }
        .timeline {
            background: #fff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        .timeline h3 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 16px;
        }
        .timeline-item {
            display: flex;
            align-items: flex-start;
            margin: 15px 0;
        }
        .timeline-icon {
            width: 30px;
            height: 30px;
            background: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .timeline-content {
            flex: 1;
        }
        .timeline-content h4 {
            margin: 0 0 5px 0;
            color: #333;
            font-size: 14px;
            font-weight: 600;
        }
        .timeline-content p {
            margin: 0;
            color: #666;
            font-size: 13px;
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
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✓ Withdrawal Request Received</h1>
            <p>We've received your withdrawal request</p>
        </div>

        <div class="content">
            <span class="badge">Pending</span>
            
            <div class="info-panel">
                <h2>📋 Request Confirmation</h2>
                <p>Your withdrawal request has been successfully submitted and is now being processed by our team. You will receive another email once the request has been reviewed and approved.</p>
            </div>

            <div class="amount-highlight">
                <div class="label">Withdrawal Amount</div>
                <div class="amount">UGX {{ number_format($withdrawalRequest->amount, 2) }}</div>
                @if($withdrawalRequest->fee > 0)
                    <div style="color: #666; font-size: 14px; margin-top: 10px;">
                        Processing Fee: UGX {{ number_format($withdrawalRequest->fee, 2) }}
                    </div>
                    <div style="color: #333; font-size: 16px; font-weight: 600; margin-top: 5px;">
                        Total Deduction: UGX {{ number_format($withdrawalRequest->total_amount, 2) }}
                    </div>
                @endif
            </div>

            <div class="details-box">
                <div class="detail-row">
                    <span class="detail-label">Request ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Company</span>
                    <span class="detail-value">{{ $withdrawalRequest->company->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date & Time</span>
                    <span class="detail-value">{{ $withdrawalRequest->created_at->format('M d, Y \a\t h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #FFA726;">Pending Review</span>
                </div>
            </div>

            <div class="payout-details">
                <h3>💳 Payout Destination</h3>
                @if($withdrawalRequest->payoutDetail->type === 'mobile_money')
                    <p><strong>Type:</strong> Mobile Money - {{ $withdrawalRequest->payoutDetail->network }}</p>
                    <p><strong>Account Name:</strong> {{ $withdrawalRequest->payoutDetail->account_name }}</p>
                    <p><strong>Phone Number:</strong> {{ $withdrawalRequest->payoutDetail->formatted_phone }}</p>
                @else
                    <p><strong>Type:</strong> Bank Transfer</p>
                    <p><strong>Bank:</strong> {{ $withdrawalRequest->payoutDetail->bank_name }}</p>
                    <p><strong>Account Name:</strong> {{ $withdrawalRequest->payoutDetail->account_name }}</p>
                    <p><strong>Account Number:</strong> {{ $withdrawalRequest->payoutDetail->account_number }}</p>
                    @if($withdrawalRequest->payoutDetail->branch)
                        <p><strong>Branch:</strong> {{ $withdrawalRequest->payoutDetail->branch }}</p>
                    @endif
                @endif
            </div>

            @if($withdrawalRequest->notes)
                <div class="details-box">
                    <div class="detail-label" style="margin-bottom: 10px;">Additional Notes</div>
                    <p style="margin: 0; color: #666;">{{ $withdrawalRequest->notes }}</p>
                </div>
            @endif

            <div class="timeline">
                <h3>⏱️ What Happens Next?</h3>
                <div class="timeline-item">
                    <div class="timeline-icon">1</div>
                    <div class="timeline-content">
                        <h4>Review & Verification</h4>
                        <p>Our team will review your request and verify all details.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">2</div>
                    <div class="timeline-content">
                        <h4>Processing</h4>
                        <p>Once approved, we'll process the withdrawal to your selected payout method.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">3</div>
                    <div class="timeline-content">
                        <h4>Completion</h4>
                        <p>You'll receive a confirmation email once the funds have been transferred.</p>
                    </div>
                </div>
            </div>

            <div class="info-panel" style="background: #e8f5e9; border-left-color: #4CAF50;">
                <h2>⏰ Processing Time</h2>
                <p>Your withdrawal request will be reviewed and processed within <strong>24 hours</strong> during business days. Please ensure your payout details are correct to avoid any delays.</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Biashari Business Management</strong></p>
            <p>Need help? Contact us at <a href="mailto:info@biashari.com">info@biashari.com</a></p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    </div>
</body>
</html>
