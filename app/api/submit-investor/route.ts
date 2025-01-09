// app/api/submit-investor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";
import { SubmitInvestorResponse } from "@/app/types";

export const runtime = "nodejs";

interface InvestorFormFields {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

const sanitize = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<SubmitInvestorResponse>> {
  console.log("Received POST request to /api/submit-investor");

  try {
    const contentType = req.headers.get("Content-Type") || "";
    console.log(`Content-Type header: ${contentType}`);

    if (!contentType.includes("application/json")) {
      console.warn("Invalid Content-Type received");
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    let body: any;
    try {
      body = await req.json();
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Error parsing JSON body:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON format." },
        { status: 400 }
      );
    }

    console.log("Original request body:", body);

    const investorFields: InvestorFormFields = {
      investorName: sanitize(body.investorName || ""),
      investorEmail: sanitize(body.investorEmail || ""),
      investorPhone: sanitize(body.investorPhone || ""),
      investmentAmount: sanitize(body.investmentAmount || ""),
    };

    console.log("Sanitized investor fields:", investorFields);

    const { investorName, investorEmail, investorPhone, investmentAmount } = investorFields;

    // Validate required fields
    if (!investorName || !investorEmail || !investorPhone || !investmentAmount) {
      console.warn("Validation failed: Missing required fields");
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }
    console.log("All required fields are present");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(investorEmail)) {
      console.warn("Validation failed: Invalid email format");
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني غير صالح." },
        { status: 400 }
      );
    }
    console.log("Email format is valid");

    // Validate phone number format
    const phoneRegex = /^\+?\d{7,14}$/;
    if (!phoneRegex.test(investorPhone)) {
      console.warn("Validation failed: Invalid phone number format");
      return NextResponse.json(
        {
          success: false,
          message: "رقم الهاتف غير صالح. يجب أن يتألف من 7-14 رقم، مع السماح بعلامة + اختيارياً.",
        },
        { status: 400 }
      );
    }
    console.log("Phone number format is valid");

    // Validate investment amount
    const investmentNum = parseFloat(investmentAmount);
    if (isNaN(investmentNum) || investmentNum < 100) {
      console.warn("Validation failed: Invalid investment amount");
      return NextResponse.json(
        { success: false, message: "مبلغ الاستثمار غير صالح (الحد الأدنى 100 دولار)." },
        { status: 400 }
      );
    }
    console.log(`Investment amount is valid: ${investmentNum}`);

    // Check for Postmark token
    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
    if (!postmarkToken) {
      console.error("Postmark server token is missing in environment variables");
      return NextResponse.json(
        { success: false, message: "Internal Server Error." },
        { status: 500 }
      );
    }
    console.log("Postmark server token retrieved successfully");

    // Log the Postmark token for debugging (ensure this is removed or secured in production)
    console.log("Postmark Token:", postmarkToken);

    // Initialize Postmark client
    const client = new ServerClient(postmarkToken);
    console.log("Postmark client initialized");

    // Prepare email content
    const emailContent = {
      From: "info@syriatech.co",
      To: "habrahllc@gmail.com",
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
      MessageStream: "outbound",
    };
    console.log("Email content prepared:", {
      From: emailContent.From,
      To: emailContent.To,
      Subject: emailContent.Subject,
      // Omitting HtmlBody and TextBody for brevity and security
    });

    // Send email via Postmark
    console.log("Sending email via Postmark");
    const sendResult = await client.sendEmail(emailContent);
    console.log("Email sent result:", sendResult);

    if (sendResult.Message === "OK") {
      console.log("Email sent successfully");
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.error("Failed to send email via Postmark");
      return NextResponse.json(
        { success: false, message: "فشل في إرسال البريد الإلكتروني." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
