import { NextRequest, NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "../../../node_modules/pdfjs-dist/build/pdf.worker.js";

const extractPdfData = async (file: File) => {
    const pdfData = new Uint8Array(await file.arrayBuffer());
    const pdfDoc = pdfjsLib.getDocument({ data: pdfData });

    const extractedText = pdfDoc.promise.then(async (pdfDoc) => {
        const numPages = pdfDoc.numPages;
        let extractedText = "";

        for (let i = 1; i <= 1; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            // console.log(content);
            const text = content.items
                .map((item) => (item as any).str)
                .join("");
            extractedText += text;
        }

        return extractedText;
    });

    return extractedText;
};

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
        return new Response("No file uploaded", { status: 400 });
    }

    const extractedText = await extractPdfData(file as File);
    console.log(extractedText);
    return NextResponse.json({ extractedText: extractedText }, { status: 200 });
}
