// app/api/submit-project/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";

interface SubmitProjectResponse {
  success: boolean;
  message?: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<SubmitProjectResponse>> {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const linkedin = formData.get("linkedin")?.toString().trim() || "";
    const website = formData.get("website")?.toString().trim() || "";
    const pitchDeck = formData.get("pitchDeck") as File | null;

    // Basic required fields check
    if (!fullName || !email || !phone || !linkedin || !website || !pitchDeck) {
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "البريد الإلكتروني غير صالح." },
        { status: 400 }
      );
    }

    // Phone format check (7-14 digits, optional +)
    const phoneRegex = /^\+?\d{7,14}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "رقم الهاتف غير صالح. يجب أن يتألف من 7-14 رقم، مع السماح بعلامة + اختيارياً.",
        },
        { status: 400 }
      );
    }

    // Allowed file types and size checks
    if (pitchDeck.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "نوع الملف غير مسموح به. يرجى تحميل ملف PDF.",
        },
        { status: 400 }
      );
    }

    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (pitchDeck.size > maxFileSize) {
      return NextResponse.json(
        {
          success: false,
          message: "حجم الملف كبير جداً. الحد الأقصى هو 10MB.",
        },
        { status: 400 }
      );
    }

    // Convert file to Base64 so we can attach it to an email
    const arrayBuffer = await pitchDeck.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString("base64");

    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
    if (!postmarkToken) {
      console.error(
        "POSTMARK_SERVER_TOKEN is not defined in environment variables."
      );
      return NextResponse.json(
        { success: false, message: "Internal Server Error." },
        { status: 500 }
      );
    }

    const client = new ServerClient(postmarkToken);

    const sanitize = (input: string): string => {
      return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sendResult = await client.sendEmail({
      From: "info@syriatech.co",
      To: "habrahllc@gmail.com",
      Subject: "تقديم عرض مشروع جديد",
      HtmlBody: `
        <p><strong>الاسم الكامل:</strong> ${sanitize(fullName)}</p>
        <p><strong>البريد الإلكتروني:</strong> ${sanitize(email)}</p>
        <p><strong>رقم الهاتف:</strong> ${sanitize(phone)}</p>
        <p><strong>ملف لينكدإن:</strong> <a href="${sanitize(
          linkedin
        )}">${sanitize(linkedin)}</a></p>
        <p><strong>الموقع الإلكتروني أو موقع الشركة:</strong> <a href="${sanitize(
          website
        )}">${sanitize(website)}</a></p>
      `,
      TextBody: `
        الاسم الكامل: ${sanitize(fullName)}
        البريد الإلكتروني: ${sanitize(email)}
        رقم الهاتف: ${sanitize(phone)}
        ملف لينكدإن: ${sanitize(linkedin)}
        الموقع الإلكتروني أو موقع الشركة: ${sanitize(website)}
      `,
      Attachments: [
        {
          Name: pitchDeck.name || "pitch-deck.pdf",
          Content: base64File,
          ContentType: pitchDeck.type || "application/pdf",
          ContentID: "pitch-deck",
        },
      ],
    });

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
    console.error("Error in submit-project API:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
