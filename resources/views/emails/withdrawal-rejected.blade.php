<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Rejected</title>
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
            background: linear-gradient(135deg, #F44336 0%, #E53935 100%);
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
            background: #F44336;
            color: white;
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .error-panel {
            background: #ffebee;
            border-left: 4px solid #F44336;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .error-panel h2 {
            margin: 0 0 10px 0;
            color: #C62828;
            font-size: 18px;
        }
        .reason-box {
            background: #fff3e0;
            border-left: 4px solid #FF9800;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .reason-box h3 {
            margin: 0 0 10px 0;
            color: #F57C00;
            font-size: 16px;
        }
        .reason-box p {
            margin: 0;
            color: #333;
            font-size: 15px;
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
        .action-box {
            background: #e3f2fd;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
        }
        .action-box h3 {
            margin: 0 0 10px 0;
            color: #1976D2;
            font-size: 16px;
        }
        .action-box p {
            margin: 10px 0;
            color: #666;
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
            color: #F44336;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>❌ Withdrawal Request Rejected</h1>
            <p>We're unable to process your withdrawal request</p>
        </div>

        <div class="content">
            <span class="badge">Rejected</span>
            
            <div class="error-panel">
                <h2>Request Could Not Be Processed</h2>
                <p>After reviewing your withdrawal request, we're unable to process it at this time. Please review the reason below and contact us if you have any questions.</p>
            </div>

            <div class="reason-box">
                <h3>📋 Reason for Rejection</h3>
                <p>{{ $withdrawalRequest->rejection_reason }}</p>
            </div>

            <div class="details-box">
                <div class="detail-row">
                    <span class="detail-label">Request ID</span>
                    <span class="detail-value">#{{ $withdrawalRequest->id }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Requested Amount</span>
                    <span class="detail-value">UGX {{ number_format($withdrawalRequest->amount, 2) }}</span>
                </div>
                @if($withdrawalRequest->fee > 0)
                <div class="detail-row">
                    <span class="detail-label">Processing Fee</span>
                    <span class="detail-value">UGX {{ number_format($withdrawalRequest->fee, 2) }}</span>
                </div>
                @endif
                <div class="detail-row">
                    <span class="detail-label">Rejection Date</span>
                    <span class="detail-value">{{ $withdrawalRequest->processed_at->format('M d, Y \a\t h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #F44336;">Rejected</span>
                </div>
            </div>

            @if($withdrawalRequest->admin_notes)
                <div class="details-box">
                    <div class="detail-label" style="margin-bottom: 10px;">Additional Notes</div>
                    <p style="margin: 0; color: #666;">{{ $withdrawalRequest->admin_notes }}</p>
                </div>
            @endif

            <div class="action-box">
                <h3>💡 What Can You Do?</h3>
                <p>If you believe this rejection was made in error or would like more information, please contact our support team. You can also submit a new withdrawal request after addressing the issues mentioned above.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; margin-bottom: 10px;"><strong>Important Note:</strong></p>
                <p style="color: #666; font-size: 14px;">Your wallet balance remains unchanged. No funds have been deducted from your account.</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Biashari Business Management</strong></p>
            <p>Need assistance? Contact us at <a href="mailto:info@biashari.com">info@biashari.com</a></p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    </div>
</body>
</html>
