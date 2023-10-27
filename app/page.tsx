"use client";
import { useState } from "react";
import { load } from "js-yaml";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>("");

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
        const response = await fetch("/api/qgen", {
            method: "POST",
            body: JSON.stringify({ extractedText: extractedText }),
        });

        const body = await response.json();
        console.log(body.message);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {file && <p>Selected file: {file.name}</p>}
            <button
                className="p-2 bg-black  rounded-lg text-white"
                onClick={sendFile}
            >
                Send File
            </button>
            <button onClick={parseQuestions}>Parse Questions</button>
        </div>
    );
}
