import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, pdfBuffer, assessmentData } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Create transporter with Gmail configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "trucred.india@gmail.com",
        pass: "jope dzoz wgzd hqmz", // App password
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Verify connection configuration
    await transporter.verify()

    // Email content with professional HTML template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your TruCred Financial Report</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f8fafc; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff; 
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
                background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); 
                color: white; 
                padding: 30px; 
                text-align: center; 
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .header p {
                margin: 5px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
            }
            .content { 
                padding: 30px; 
            }
            .score-section {
                background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%);
                border-radius: 12px;
                padding: 25px;
                text-align: center;
                margin: 25px 0;
                border: 1px solid #e0f2fe;
            }
            .score-badge { 
                background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); 
                color: white; 
                padding: 15px 25px; 
                border-radius: 50px; 
                display: inline-block; 
                font-size: 20px; 
                font-weight: bold; 
                margin: 10px 0; 
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            .features-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 25px 0;
            }
            .feature-item {
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #3b82f6;
            }
            .feature-item h4 {
                margin: 0 0 5px 0;
                color: #1e40af;
                font-size: 14px;
            }
            .feature-item p {
                margin: 0;
                font-size: 12px;
                color: #64748b;
            }
            .cta-section {
                background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%);
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                margin: 25px 0;
            }
            .button { 
                background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 8px; 
                display: inline-block; 
                margin: 15px 0; 
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            .footer { 
                background-color: #f1f5f9; 
                padding: 25px; 
                text-align: center; 
                font-size: 14px; 
                color: #64748b; 
                border-top: 1px solid #e2e8f0;
            }
            .footer a {
                color: #3b82f6;
                text-decoration: none;
            }
            .verification-badge {
                background: #ecfdf5;
                border: 1px solid #10b981;
                color: #065f46;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 12px;
                margin: 15px 0;
                display: inline-block;
            }
            @media (max-width: 600px) {
                .features-grid {
                    grid-template-columns: 1fr;
                }
                .container {
                    margin: 0 10px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ TruCred Financial Report</h1>
                <p>Your Alternative Credit Score Assessment</p>
            </div>
            <div class="content">
                <h2 style="color: #1e40af; margin-bottom: 10px;">Hello ${assessmentData.name},</h2>
                <p style="font-size: 16px; margin-bottom: 20px;">
                    Congratulations! Your financial assessment has been completed and verified by our team. 
                    Your TruCred report is now ready for use.
                </p>
                
                <div class="score-section">
                    <h3 style="color: #1e40af; margin-top: 0;">Your Trust Score</h3>
                    <div class="score-badge">
                        ${assessmentData.score}/100 (Grade ${assessmentData.grade})
                    </div>
                    <p style="margin-bottom: 0; color: #64748b;">
                        ${
                          assessmentData.score >= 85
                            ? "Excellent financial behavior!"
                            : assessmentData.score >= 75
                              ? "Very good financial profile!"
                              : assessmentData.score >= 65
                                ? "Good financial standing!"
                                : "Fair financial behavior with room for improvement."
                        }
                    </p>
                </div>
                
                <h3 style="color: #1e40af;">What's Included in Your Report:</h3>
                <div class="features-grid">
                    <div class="feature-item">
                        <h4>📊 Complete Score Breakdown</h4>
                        <p>Detailed analysis of all scoring components</p>
                    </div>
                    <div class="feature-item">
                        <h4>💳 UPI Transaction Analysis</h4>
                        <p>Spending patterns and financial behavior insights</p>
                    </div>
                    <div class="feature-item">
                        <h4>📈 Personalized Recommendations</h4>
                        <p>Tips to improve your financial profile</p>
                    </div>
                    <div class="feature-item">
                        <h4>✅ Verification Certificate</h4>
                        <p>Official document for institutional use</p>
                    </div>
                </div>
                
                <div class="verification-badge">
                    ✓ VERIFIED REPORT - This assessment has been reviewed and verified by TruCred's team
                </div>
                
                <h3 style="color: #1e40af;">How to Use Your Report:</h3>
                <ul style="color: #4b5563; line-height: 1.8;">
                    <li><strong>🏠 Rental Applications:</strong> Share with landlords to demonstrate financial responsibility</li>
                    <li><strong>🏦 Loan Applications:</strong> Present to lenders as alternative credit proof</li>
                    <li><strong>💼 Employment Verification:</strong> Use for background checks requiring financial credibility</li>
                    <li><strong>🤝 Business Partnerships:</strong> Establish trust in professional relationships</li>
                </ul>
                
                <div class="cta-section">
                    <h4 style="color: #1e40af; margin-top: 0;">Report Validity & Support</h4>
                    <p style="margin-bottom: 15px; color: #64748b;">
                        <strong>Valid until:</strong> ${new Date(
                          Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}<br>
                        <strong>Report ID:</strong> ${assessmentData.name.replace(/\s+/g, "")}-${Date.now().toString().slice(-6)}
                    </p>
                    <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">
                        Need help or have questions? Our support team is here to assist you.
                    </p>
                </div>
                
                ${
                  assessmentData.score < 70
                    ? `
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h4 style="color: #92400e; margin-top: 0;">💡 Want to improve your score?</h4>
                    <p style="color: #92400e; margin-bottom: 0; font-size: 14px;">
                        Check the detailed recommendations in your PDF report for personalized tips to enhance your financial profile. 
                        You can retake the assessment after 3 months to see your improved score.
                    </p>
                </div>
                `
                    : ""
                }
            </div>
            <div class="footer">
                <p style="margin-bottom: 10px;"><strong>TruCred Alternative Credit Scoring System</strong></p>
                <p style="margin-bottom: 10px;">
                    For support: <a href="mailto:trucred.india@gmail.com">trucred.india@gmail.com</a> | 
                    Verify report: <a href="https://verify.trucred.com">verify.trucred.com</a>
                </p>
                <p style="margin-bottom: 0; font-size: 12px;">
                    © 2024 TruCred. Empowering India's financial inclusion. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `

    // Convert base64 PDF to buffer
    const pdfBufferFromBase64 = Buffer.from(pdfBuffer, "base64")

    // Send email with professional configuration
    const info = await transporter.sendMail({
      from: {
        name: "TruCred Support Team",
        address: "trucred.india@gmail.com",
      },
      to: to,
      subject: `🛡️ Your TruCred Financial Report - Score: ${assessmentData.score}/100 (Grade ${assessmentData.grade})`,
      html: htmlContent,
      attachments: [
        {
          filename: `TruCred-Financial-Report-${assessmentData.name.replace(/\s+/g, "-")}-${Date.now().toString().slice(-6)}.pdf`,
          content: pdfBufferFromBase64,
          contentType: "application/pdf",
        },
      ],
      // Email headers for better deliverability
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    })

    console.log("Email sent successfully:", {
      messageId: info.messageId,
      to: to,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${to}`,
      emailId: info.messageId,
      timestamp: new Date().toISOString(),
      from: "trucred.india@gmail.com",
    })
  } catch (error) {
    console.error("Email service error:", error)

    // Provide specific error messages
    let errorMessage = "Failed to send email. "
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        errorMessage += "Email authentication failed. Please check credentials."
      } else if (error.message.includes("Network")) {
        errorMessage += "Network connection issue. Please try again."
      } else if (error.message.includes("Recipient")) {
        errorMessage += "Invalid recipient email address."
      } else {
        errorMessage += error.message
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: error instanceof Error ? error.message : "Unknown error",
        suggestion: "You can download the PDF report instead.",
      },
      { status: 500 },
    )
  }
}
