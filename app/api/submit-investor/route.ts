import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";

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
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Ensure the request has the correct Content-Type
    const contentType = req.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    // Parse the incoming JSON data
    const body = await req.json();

    // Extract and sanitize form fields
    const investorFields = body as InvestorFormFields;
    const { investorName, investorEmail, investorPhone, investmentAmount } = investorFields;

    // Validate required fields
    if (!investorName || !investorEmail || !investorPhone || !investmentAmount) {
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }

    // Optional: Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(investorEmail)) {
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
    const sendResult = await client.sendEmail({
      From: "info@syriatech.co", // Ensure this email is verified in Postmark
      To: "habrahllc@gmail.com",  // Replace with your recipient
      Subject: "تقديم مستثمر جديد",
      HtmlBody: `
        <p><strong>اسم المستثمر:</strong> ${sanitize(investorName)}</p>
        <p><strong>البريد الإلكتروني:</strong> ${sanitize(investorEmail)}</p>
        <p><strong>رقم الهاتف:</strong> ${sanitize(investorPhone)}</p>
        <p><strong>مبلغ الاستثمار المتوقع:</strong> ${sanitize(investmentAmount)}</p>
      `,
      TextBody: `
        اسم المستثمر: ${sanitize(investorName)}
        البريد الإلكتروني: ${sanitize(investorEmail)}
        رقم الهاتف: ${sanitize(investorPhone)}
        مبلغ الاستثمار المتوقع: ${sanitize(investmentAmount)}
      `,
    });

    // Check if the email was sent successfully
    if (sendResult.Message === "OK") {
      return NextResponse.json({ success: true });
    } else {
      console.error("Postmark send email failed:", sendResult.Message);
      return NextResponse.json(
        { success: false, message: "فشل في إرسال البريد الإلكتروني." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in submit-investor API:", error);
    // Handle JSON parsing errors separately
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
