// app/api/submit-investor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ServerClient, SendResponse } from "postmark";

// Specify runtime environment
export const runtime = "nodejs";

// Define interfaces for request and response
interface InvestorFormFields {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
}

// Function to sanitize input to prevent XSS attacks
const sanitize = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// POST handler for the API route
export async function POST(req: NextRequest): Promise<NextResponse<SubmitInvestorResponse>> {
  try {
    // Ensure the request has the correct Content-Type
    const contentType = req.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      console.warn("Invalid Content-Type:", contentType);
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    // Parse the incoming JSON data
    let body: any;
    try {
      body = await req.json();
    } catch (parseError) {
      console.warn("JSON parsing error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // Extract and sanitize form fields
    const investorFields: InvestorFormFields = {
      investorName: sanitize(body.investorName || ""),
      investorEmail: sanitize(body.investorEmail || ""),
      investorPhone: sanitize(body.investorPhone || ""),
      investmentAmount: sanitize(body.investmentAmount || ""),
    };

    const { investorName, investorEmail, investorPhone, investmentAmount } = investorFields;

    // Validate required fields
    if (!investorName || !investorEmail || !investorPhone || !investmentAmount) {
      console.warn("Missing required fields:", investorFields);
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }

    // Optional: Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(investorEmail)) {
      console.warn("Invalid email format:", investorEmail);
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني غير صالح." },
        { status: 400 }
      );
    }

    // Initialize Postmark client
    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
    if (!postmarkToken) {
      console.error("POSTMARK_SERVER_TOKEN is not defined in environment variables.");
      return NextResponse.json(
        { success: false, message: "Internal Server Error." },
        { status: 500 }
      );
    }

    const client = new ServerClient(postmarkToken);

    // Send email using Postmark
    let sendResult: SendResponse;
    try {
      sendResult = await client.sendEmail({
        From: "info@syriatech.co", // Ensure this email is verified in Postmark
        To: "habrahllc@gmail.com",  // Replace with your recipient
        Subject: "تقديم مستثمر جديد",
        HtmlBody: `
          <p><strong>اسم المستثمر:</strong> ${investorName}</p>
          <p><strong>البريد الإلكتروني:</strong> ${investorEmail}</p>
          <p><strong>رقم الهاتف:</strong> ${investorPhone}</p>
          <p><strong>مبلغ الاستثمار المتوقع:</strong> ${investmentAmount}</p>
        `,
        TextBody: `
          اسم المستثمر: ${investorName}
          البريد الإلكتروني: ${investorEmail}
          رقم الهاتف: ${investorPhone}
          مبلغ الاستثمار المتوقع: ${investmentAmount}
        `,
        // Optional: Specify MessageStream if required by your Postmark account
        MessageStream: "outbound",
      });
    } catch (postmarkError: any) {
      console.error("Postmark sendEmail error:", postmarkError);
      return NextResponse.json(
        { success: false, message: "فشل في إرسال البريد الإلكتروني. يرجى المحاولة لاحقًا." },
        { status: 500 }
      );
    }

    // Check if the email was sent successfully
    if (sendResult.Message === "OK") {
      console.log("Email sent successfully:", sendResult);
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.error("Postmark send email failed:", sendResult.Message);
      return NextResponse.json(
        { success: false, message: "فشل في إرسال البريد الإلكتروني." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error in submit-investor API:", error);

    // Catch-all for any unexpected errors
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
