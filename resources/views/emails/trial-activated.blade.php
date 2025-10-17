<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Biashari - Free Trial Activated</title>
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
        .welcome-panel {
            background: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .welcome-panel h2 {
            margin: 0 0 15px 0;
            color: #4CAF50;
            font-size: 20px;
        }
        .trial-details {
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 2px solid #4CAF50;
        }
        .trial-details .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .trial-details .detail-row:last-child {
            border-bottom: none;
        }
        .trial-details .detail-row strong {
            color: #4CAF50;
        }
        .trial-details .detail-row .value {
            font-weight: bold;
            color: #2196F3;
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
            color: #4CAF50;
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
        .tip-box {
            background: #e8f5e9;
            border-left: 4px solid #4CAF50;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .tip-box strong {
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Biashari!</h1>
            <p>Your Free Trial is Now Active</p>
        </div>
        
        <div class="content">
            <span class="badge">✓ Trial Activated</span>
            
            <p style="font-size: 16px; color: #666;">
                Dear <strong>{{ $company->name }}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #666;">
                Congratulations! Your free trial has been successfully activated. You now have full access to Biashari's powerful business management features for the next 30 days!
            </p>
            
            <div class="trial-details">
                <div class="detail-row">
                    <strong>Trial Started:</strong>
                    <span class="value">{{ $company->subscription_date->format('F d, Y') }}</span>
                </div>
                <div class="detail-row">
                    <strong>Trial Expires:</strong>
                    <span class="value">{{ $company->subscription_expiry->format('F d, Y') }}</span>
                </div>
                <div class="detail-row">
                    <strong>Days Remaining:</strong>
                    <span class="value">30 Days</span>
                </div>
                <div class="detail-row">
                    <strong>Account Status:</strong>
                    <span class="value" style="color: #4CAF50;">✓ Active</span>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="welcome-panel">
                <h2>Getting Started with Biashari</h2>
                <p style="margin: 5px 0; color: #666;">
                    We're excited to have you on board! During your free trial, you'll have access to all features to help you manage your business efficiently.
                </p>
            </div>
            
            <div class="features-section">
                <h3>What You Can Do During Your Trial</h3>
                <ul class="features-list">
                    <li>Manage your inventory and products</li>
                    <li>Track sales and expenses</li>
                    <li>Generate business reports</li>
                    <li>Add employees and manage permissions</li>
                    <li>Process customer orders</li>
                    <li>Monitor your business performance</li>
                    <li>Access customer support</li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ url('/company') }}" class="cta-button">Access Your Dashboard</a>
            </div>
            
            <div class="tip-box">
                <strong>💡 Pro Tip:</strong>
                <p style="margin: 5px 0 0 0;">
                    Make the most of your free trial! Explore all features and see how Biashari can transform your business operations. Need help? Our support team is here for you!
                </p>
            </div>
            
            <div class="divider"></div>
            
            <p style="font-size: 14px; color: #666; text-align: center;">
                <strong>Remember:</strong> Your trial will expire on <strong>{{ $company->subscription_expiry->format('F d, Y') }}</strong>. 
                After that, you can choose a subscription plan that best fits your business needs.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>Biashari - Business Management System</strong></p>
            <p>Thank you for choosing Biashari to manage your business!</p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 15px;">
                {{ now()->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
