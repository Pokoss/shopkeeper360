<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Inquiry</title>
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
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .success-icon {
            text-align: center;
            font-size: 64px;
            margin: 20px 0;
        }
        .info-box {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #4CAF50;
        }
        .info-box h3 {
            margin: 0 0 15px 0;
            color: #4CAF50;
            font-size: 18px;
        }
        .info-row {
            margin: 12px 0;
            padding: 8px 0;
        }
        .info-label {
            font-weight: bold;
            color: #666;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            color: #333;
            margin-top: 5px;
            font-size: 15px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
        }
        .highlight-box p {
            margin: 0;
            font-size: 16px;
            color: #333;
        }
        .contact-section {
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        .contact-section h3 {
            margin: 0 0 20px 0;
            color: #333;
            font-size: 18px;
            text-align: center;
        }
        .contact-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .contact-item:last-child {
            border-bottom: none;
        }
        .contact-icon {
            font-size: 24px;
            margin-right: 15px;
        }
        .contact-details a {
            color: #2196F3;
            text-decoration: none;
            font-weight: 500;
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
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #666;
            text-decoration: none;
            font-size: 12px;
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
            <h1>✅ Inquiry Received!</h1>
            <p>We'll get back to you soon</p>
        </div>
        <div class="content">
            <div class="success-icon">🎉</div>
            
            <p style="font-size: 18px; text-align: center; color: #333; margin-bottom: 10px;">
                <strong>Thank you, {{ $data['name'] }}!</strong>
            </p>
            <p style="text-align: center; color: #666; font-size: 16px;">
                Your inquiry has been successfully submitted. Our team will review your message and respond within 24-48 hours.
            </p>
            
            <div class="divider"></div>
            
            <div class="info-box">
                <h3>📋 Your Inquiry Summary</h3>
                <div class="info-row">
                    <div class="info-label">Subject</div>
                    <div class="info-value">{{ $data['subject'] }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email</div>
                    <div class="info-value">{{ $data['email'] }}</div>
                </div>
                @if(!empty($data['phone']))
                <div class="info-row">
                    <div class="info-label">Phone</div>
                    <div class="info-value">{{ $data['phone'] }}</div>
                </div>
                @endif
                <div class="info-row">
                    <div class="info-label">Message</div>
                    <div class="info-value" style="background: white; padding: 15px; border-radius: 6px; margin-top: 10px;">
                        {{ $data['message'] }}
                    </div>
                </div>
            </div>
            
            <div class="highlight-box">
                <p><strong>⏱️ Expected Response Time:</strong> 24-48 hours</p>
            </div>
            
            <div class="contact-section">
                <h3>Need Immediate Assistance?</h3>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <div class="contact-details">
                        <strong>Email:</strong> <a href="mailto:info@biashari.com">info@biashari.com</a>
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <div class="contact-details">
                        <strong>Phone:</strong> <a href="tel:+256752553236">+256 752 553 236</a>
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">🏢</span>
                    <div class="contact-details">
                        <strong>Office:</strong> Kati House, Level 3, Kampala
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">⏰</span>
                    <div class="contact-details">
                        <strong>Hours:</strong> Mon-Fri: 9am-6pm, Sat: 10am-2pm
                    </div>
                </div>
            </div>
            
            <p style="text-align: center; color: #666; margin-top: 30px;">
                In the meantime, feel free to explore our <a href="{{ url('/') }}" style="color: #2196F3; text-decoration: none; font-weight: bold;">website</a> to learn more about our services.
            </p>
        </div>
        <div class="footer">
            <p><strong>Biashari - Business Management System</strong></p>
            <p>Smart ERP for Retail & Services</p>
            <div class="divider" style="margin: 20px auto; max-width: 200px;"></div>
            <p style="font-size: 12px; color: #999; margin-top: 15px;">
                This is an automated confirmation email. Please do not reply to this message.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
                Sent on {{ now()->format('F d, Y \a\t h:i A') }}
            </p>
        </div>
    </div>
</body>
</html>
