import { NextRequest, NextResponse } from "next/server";
import { getQuestions } from "./utils/langchain";
import { v4 as uuidv4 } from "uuid";

import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    const client = await clientPromise;

    const textId = uuidv4();
    const collection = client.db("Questions").collection("questions");
    const body = await req.json();
    const { extractedText } = body;

    getQuestions(extractedText).then((questions) => {
        console.log("Inserting questions to mongodb");
        collection.insertOne({
            textId: textId,
            text: extractedText,
            questions: questions,
        });
    });

    return NextResponse.json({ textId: textId }, { status: 200 });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const textId = searchParams.get("textId");

    const client = await clientPromise;
    const collection = client.db("Questions").collection("questions");

    const record = await collection.findOne({ textId: textId });

    console.log(record);

    return NextResponse.json(record, { status: 200 });
}
