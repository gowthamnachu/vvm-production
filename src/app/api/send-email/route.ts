import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@vagdevidyamandir.com";
    const OWNER_EMAIL = process.env.OWNER_EMAIL || "info@vagdevidyamandir.com";
    const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
    const LOGO_URL = `${WEBSITE_URL}/vvvm_logo.jpg`;

    console.log("Email API called with:", { name, email, subject });
    console.log("Sender (Brevo):", BREVO_SENDER_EMAIL);
    console.log("Recipient (Owner):", OWNER_EMAIL);
    console.log("API key exists:", !!BREVO_API_KEY);

    if (!BREVO_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured", fallbackToWhatsApp: true },
        { status: 503 }
      );
    }

    // Prepare email data
    // Note: Sender must be verified in Brevo, recipient can be anywhere (Zoho, Gmail, etc.)
    const emailData = {
      sender: {
        name: "VVM School Contact Form",
        email: BREVO_SENDER_EMAIL,
      },
      to: [
        { email: OWNER_EMAIL, name: "VVM School Admin" },
      ],
      replyTo: { email: email, name: name },
      subject: `New Contact Form: ${subject || "General Inquiry"}`,
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
              <!-- Logo Header -->
              <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px;">
                <img src="${LOGO_URL}" alt="VVM School Logo" style="max-width: 150px; height: auto;" />
                <h1 style="color: #3e4e3b; margin: 15px 0 0 0; font-size: 24px;">VVM School</h1>
              </div>
              
              <h2 style="color: #3e4e3b; border-bottom: 3px solid #3e4e3b; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong style="color: #3e4e3b;">Name:</strong> ${name}</p>
                <p><strong style="color: #3e4e3b;">Phone:</strong> ${phone}</p>
                <p><strong style="color: #3e4e3b;">Email:</strong> ${email}</p>
                <p><strong style="color: #3e4e3b;">Subject:</strong> ${subject || "Not specified"}</p>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <strong style="color: #3e4e3b;">Message:</strong>
                  <p style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    ${message || "No message provided"}
                  </p>
                </div>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
                This email was sent from the VVM School contact form.
              </p>
            </div>
          </body>
        </html>
      `,
    };

    // Send confirmation email to user
    const userEmailData = {
      sender: {
        name: "VVM School",
        email: BREVO_SENDER_EMAIL,
      },
      to: [{ email: email, name: name }],
      subject: "Thank you for contacting VVM School",
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
              <!-- Logo Header -->
              <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: white; border-radius: 8px;">
                <img src="${LOGO_URL}" alt="VVM School Logo" style="max-width: 150px; height: auto;" />
                <h1 style="color: #3e4e3b; margin: 15px 0 0 0; font-size: 24px;">VVM School</h1>
              </div>
              
              <h2 style="color: #3e4e3b; border-bottom: 3px solid #3e4e3b; padding-bottom: 10px;">
                Thank You for Contacting Us!
              </h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to VVM School. We have received your inquiry and will get back to you as soon as possible.</p>
                <p><strong>Your submitted information:</strong></p>
                <ul style="background-color: #f8fafc; padding: 20px; border-radius: 5px;">
                  <li><strong>Subject:</strong> ${subject || "General Inquiry"}</li>
                  <li><strong>Phone:</strong> ${phone}</li>
                  <li><strong>Email:</strong> ${email}</li>
                </ul>
                <p>If you need immediate assistance, please call us at <strong>9490670461</strong>.</p>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
                VVM School - Nurturing Excellence
              </p>
            </div>
          </body>
        </html>
      `,
    };

    // Send email to owner
    console.log("Attempting to send owner notification to:", OWNER_EMAIL);
    const ownerResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    if (!ownerResponse.ok) {
      const errorData = await ownerResponse.json().catch(() => ({}));
      console.error("Brevo API Error (Owner Email):", {
        status: ownerResponse.status,
        statusText: ownerResponse.statusText,
        error: errorData
      });
      
      // Check if it's a daily limit error
      if (ownerResponse.status === 429 || errorData.code === "daily_limit_reached") {
        return NextResponse.json(
          { error: "Daily email limit reached", fallbackToWhatsApp: true },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to send email", details: errorData, fallbackToWhatsApp: true },
        { status: 500 }
      );
    }

    const ownerResult = await ownerResponse.json();
    console.log("Owner email sent successfully:", ownerResult);

    // Send confirmation email to user
    console.log("Attempting to send confirmation to user:", email);
    const userResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(userEmailData),
    });

    if (userResponse.ok) {
      const userResult = await userResponse.json();
      console.log("User confirmation sent successfully:", userResult);
    } else {
      console.error("Failed to send user confirmation, but continuing...");
    }

    return NextResponse.json(
      { success: true, message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error", fallbackToWhatsApp: true },
      { status: 500 }
    );
  }
}
