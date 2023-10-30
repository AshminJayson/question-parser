import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
import { getPrompt } from "../qgen/utils/langchain";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { extractedText } = body;

    console.time("openai call");
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
            {
                role: "system",
                content: "You are a useful chatbot.",
            },
            { role: "user", content: getPrompt(extractedText) },
        ],
        max_tokens: 10000,
    });

    console.timeEnd("openai call");
    return NextResponse.json(
        { message: response.choices[0].message.content },
        { status: 200 }
    );
};
