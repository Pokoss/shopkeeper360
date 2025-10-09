<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry</title>
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
        .content {
            padding: 40px 30px;
        }
        .badge {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .info-section {
            background: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .info-row {
            margin: 15px 0;
        }
        .info-label {
            font-weight: bold;
            color: #4CAF50;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            color: #333333;
            font-size: 16px;
        }
        .message-box {
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            line-height: 1.8;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New Inquiry Received</h1>
        </div>
        <div class="content">
            <span class="badge">New Message</span>
            <p style="font-size: 16px; color: #666;">You have received a new inquiry from your website. Please review the details below and respond promptly.</p>
            
            <div class="divider"></div>
            
            <div class="info-section">
                <div class="info-row">
                    <span class="info-label">👤 Name</span>
                    <span class="info-value">{{ $data['name'] }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📧 Email</span>
                    <span class="info-value"><a href="mailto:{{ $data['email'] }}" style="color: #2196F3; text-decoration: none;">{{ $data['email'] }}</a></span>
                </div>
                
                @if(!empty($data['phone']))
                <div class="info-row">
                    <span class="info-label">📱 Phone</span>
                    <span class="info-value"><a href="tel:{{ $data['phone'] }}" style="color: #2196F3; text-decoration: none;">{{ $data['phone'] }}</a></span>
                </div>
                @endif
                
                <div class="info-row">
                    <span class="info-label">📝 Subject</span>
                    <span class="info-value">{{ $data['subject'] }}</span>
                </div>
            </div>
            
            <div class="info-row">
                <span class="info-label">💬 Message</span>
                <div class="message-box">
                    {{ $data['message'] }}
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                <strong style="color: #856404;">⚡ Quick Action:</strong>
                <p style="margin: 10px 0 0 0; color: #856404;">Reply to <a href="mailto:{{ $data['email'] }}" style="color: #856404; font-weight: bold;">{{ $data['email'] }}</a> to continue this conversation.</p>
            </div>
        </div>
        <div class="footer">
            <p><strong>Biashari - Business Management System</strong></p>
            <p>This email was sent from your website inquiry form</p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                {{ now()->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
