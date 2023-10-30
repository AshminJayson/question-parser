"use client";
import { useState } from "react";
import { load } from "js-yaml";
import { parseXLSX } from "@/utils/parser";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>("");
    const [questionJSON, setQuestionJSON] = useState<string>("");
    const [questions, setQuestions] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    async function sendFile(): Promise<void> {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/file", {
                method: "POST",
                body: formData,
            });

            const body = await response.json();
            console.log(body["extractedText"]);
            setExtractedText(body["extractedText"]);
            alert("File uploaded successfully!");

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const parseQuestions = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/qgen", {
                method: "POST",
                body: JSON.stringify({ extractedText: extractedText }),
            });

            const body = await response.json();
            console.log(body.message);

            setQuestionJSON(body.message);
            setQuestions(load(body.message) as any);
        } catch {
            console.error("Error parsing questions");
        }
        // alert("Questions generated successfully!");
        setLoading(false);
    };

    const downloadXLSX = async () => {
        if (!file) return;
        parseXLSX(file.name, questions);
    };

    return (
        <div className="p-10">
            <div className="flex items-center">
                <input type="file" onChange={handleFileChange} />
                {file && <p>Selected file: {file.name}</p>}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5 focus:outline-none"
                    onClick={sendFile}
                >
                    Extract Text
                </button>
                {extractedText.length > 0 && (
                    <button
                        onClick={parseQuestions}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none "
                    >
                        {!loading ? (
                            <span>Parse Questions</span>
                        ) : (
                            <div className="flex">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Parsing Questions...
                            </div>
                        )}
                    </button>
                )}
            </div>
            {questions && (
                <div className="flex flex-col p-10">
                    <table className=" border-black border-collapse ">
                        <thead>
                            <tr>
                                <th className="border-black border">No</th>
                                <th className="border-black border">
                                    Question
                                </th>
                                <th className="border-black border">
                                    Option 1
                                </th>
                                <th className="border-black border">
                                    Option 2
                                </th>
                                <th className="border-black border">
                                    Option 3
                                </th>
                                <th className="border-black border">
                                    Option 4
                                </th>
                                <th className="border-black border">
                                    Option 5
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question: any, index: number) => (
                                <tr key={index}>
                                    <td className="border-black border">
                                        {index + 1}
                                    </td>
                                    <td className="border-black border">
                                        {question.Question}
                                    </td>
                                    <td className="border-black border">
                                        {question.Option1}
                                    </td>
                                    <td className="border-black border">
                                        {question.Option2}
                                    </td>
                                    <td className="border-black border">
                                        {question.Option3}
                                    </td>
                                    <td className="border-black border">
                                        {question.Option4}
                                    </td>
                                    <td className="border-black border">
                                        {question.Option5}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 focus:outline-none"
                        onClick={downloadXLSX}
                    >
                        Download as XLSX
                    </button>
                </div>
            )}
        </div>
    );
}
