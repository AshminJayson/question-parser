import { NextRequest, NextResponse } from "next/server";
import { getQuestions } from "./utils/langchain";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { extractedText } = body;
    const questions = await getQuestions(extractedText);

    return NextResponse.json({ message: questions }, { status: 200 });
}
