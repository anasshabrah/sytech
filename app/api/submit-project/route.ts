// app/api/submit-project/route.ts

import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Fields, Files, File as FormidableFile } from "formidable";
import { promises as fs } from "fs";
import { ServerClient } from "postmark";

interface ProjectFormFields {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
}

interface SubmitProjectResponse {
  success: boolean;
  message?: string;
}

const parseForm = async (req: NextRequest): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm();

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    form.parse(req as any, (err: any, fields: Fields, files: Files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export async function POST(req: NextRequest): Promise<NextResponse<SubmitProjectResponse>> {
  try {
    const { fields, files } = await parseForm(req);

    const projectFields = fields as ProjectFormFields;
    const { fullName, email, phone, linkedin, website } = projectFields;

    if (!fullName || !email || !phone || !linkedin || !website) {
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة." },
        { status: 400 }
      );
    }

    const pitchDeckCandidate = files.pitchDeck;
    let pitchDeckFile: FormidableFile | undefined;

    if (Array.isArray(pitchDeckCandidate)) {
      pitchDeckFile = pitchDeckCandidate[0];
    } else {
      pitchDeckFile = pitchDeckCandidate;
    }

    if (!pitchDeckFile) {
      return NextResponse.json(
        { success: false, message: "لم يتم تحميل ملف عرض المشروع." },
        { status: 400 }
      );
    }

    const allowedMimeTypes = ["application/pdf"];
    if (!allowedMimeTypes.includes(pitchDeckFile.mimetype || "")) {
      return NextResponse.json(
        { success: false, message: "نوع الملف غير مسموح به. يرجى تحميل ملف PDF." },
        { status: 400 }
      );
    }

    const maxFileSize = 5 * 1024 * 1024;
    if ((pitchDeckFile.size || 0) > maxFileSize) {
      return NextResponse.json(
        { success: false, message: "حجم الملف كبير جداً. الحد الأقصى هو 5MB." },
        { status: 400 }
      );
    }

    const fileBuffer = await fs.readFile(pitchDeckFile.filepath);
    const base64File = fileBuffer.toString("base64");

    const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
    if (!postmarkToken) {
      console.error("POSTMARK_SERVER_TOKEN is not defined in environment variables.");
      return NextResponse.json(
        { success: false, message: "Internal Server Error." },
        { status: 500 }
      );
    }

    const client = new ServerClient(postmarkToken);

    const sendResult = await client.sendEmail({
      From: "info@syriatech.co",
      To: "info@syriatech.co",
      Subject: "تقديم عرض مشروع جديد",
      HtmlBody: `
        <p><strong>الاسم الكامل:</strong> ${sanitize(fullName)}</p>
        <p><strong>البريد الإلكتروني:</strong> ${sanitize(email)}</p>
        <p><strong>رقم الهاتف:</strong> ${sanitize(phone)}</p>
        <p><strong>ملف لينكدإن:</strong> <a href="${sanitize(linkedin)}">${sanitize(linkedin)}</a></p>
        <p><strong>الموقع الإلكتروني أو موقع الشركة:</strong> <a href="${sanitize(website)}">${sanitize(website)}</a></p>
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
          Name: pitchDeckFile.originalFilename || "pitch-deck.pdf",
          Content: base64File,
          ContentType: pitchDeckFile.mimetype || "application/pdf",
          ContentID: "pitch-deck"
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

const sanitize = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
