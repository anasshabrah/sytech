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
  try {
    const contentType = req.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format." },
        { status: 400 }
      );
    }

    const investorFields: InvestorFormFields = {
      investorName: sanitize(body.investorName || ""),
      investorEmail: sanitize(body.investorEmail || ""),
      investorPhone: sanitize(body.investorPhone || ""),
      investmentAmount: sanitize(body.investmentAmount || ""),
    };

    const { investorName, investorEmail, investorPhone, investmentAmount } = investorFields;

    if (!investorName || !investorEmail || !investorPhone || !investmentAmount) {
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(investorEmail)) {
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني غير صالح." },
        { status: 400 }
      );
    }

    const phoneRegex = /^\+?\d{7,14}$/;
    if (!phoneRegex.test(investorPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "رقم الهاتف غير صالح. يجب أن يتألف من 7-14 رقم، مع السماح بعلامة + اختيارياً.",
        },
        { status: 400 }
      );
    }

    const investmentNum = parseFloat(investmentAmount);
    if (isNaN(investmentNum) || investmentNum < 100) {
      return NextResponse.json(
        { success: false, message: "مبلغ الاستثمار غير صالح (الحد الأدنى 100 دولار)." },
        { status: 400 }
      );
    }

    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
    if (!postmarkToken) {
      return NextResponse.json(
        { success: false, message: "Internal Server Error." },
        { status: 500 }
      );
    }

    const client = new ServerClient(postmarkToken);

    const sendResult = await client.sendEmail({
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
    });

    if (sendResult.Message === "OK") {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "فشل في إرسال البريد الإلكتروني." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
