// app/api/submit-investor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";

// Replace deprecated config with runtime
export const runtime = "nodejs";

// Interface for the expected JSON body
interface InvestorFormFields {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

// Interface for the API response
interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
}

// Sanitization function to prevent XSS attacks
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

    // Optional: Additional validation (e.g., email format, phone number)

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
      From: "info@syriatech.co", // Replace with your verified sender
      To: "habrahllc@gmail.com",   // Replace with your recipient
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
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
