"use client";
import { useEffect, useState } from "react";
import { parseXLSX } from "@/utils/parser";

const QuestionsTable = ({
    questions,
    fileName,
}: {
    questions: any;
    fileName: string;
}) => {
    const downloadXLSX = async () => {
        if (fileName) parseXLSX(fileName, questions);
        else console.error("No file or textId provided");
    };

    return (
        <div className="flex flex-col p-10">
            <table className=" border-black border-collapse ">
                <thead>
                    <tr>
                        <th className="border-black border">No</th>
                        <th className="border-black border">Question</th>
                        <th className="border-black border">Option 1</th>
                        <th className="border-black border">Option 2</th>
                        <th className="border-black border">Option 3</th>
                        <th className="border-black border">Option 4</th>
                        <th className="border-black border">Option 5</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question: any, index: number) => (
                        <tr key={index}>
                            <td className="border-black border">
                                {question.QuestionNumber}
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
    );
};

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>("");
    const [questionJSON, setQuestionJSON] = useState<string>("");
    const [files, setFiles] = useState<any[]>([]);
    const [textIds, setTextIds] = useState<string[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [activeExtract, setActiveExtract] = useState<File | string | null>(
        null
    );
    // const textareaRef = useRef(null);

    async function sendFile(): Promise<void> {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_ENDPOINT + "file",
                {
                    method: "POST",
                    body: formData,
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                    }),
                }
            );

            console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
            const body = await response.json();
            // console.log(loaded["FileId"]);

            setFiles((files) => [
                ...files,
                [file.name, body["fileId"], "scheduled"],
            ]);

            // setExtractedText(body["extractedText"]);
            // alert("File uploaded successfully!");

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

    // const parseQuestions = async () => {
    //     setLoading(true);
    //     setQuestionJSON("");
    //     setQuestions([]);

    //     try {
    //         const response = await fetch("/api/qgen", {
    //             method: "POST",
    //             body: JSON.stringify({ extractedText: extractedText }),
    //         });

    //         const body = await response.json();

    //         console.log(body.message);

    //         setQuestionJSON(body.message);
    //         setQuestions(load(body.message) as any);
    //     } catch {
    //         console.error("Error parsing questions");
    //     }
    //     // alert("Questions generated successfully!");
    //     setLoading(false);
    // };

    // const parseText = async () => {
    //     if (!textareaRef || !textareaRef.current) return;

    //     const response = await fetch("/api/qgen", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             extractedText: (textareaRef.current as HTMLTextAreaElement)
    //                 .value,
    //         }),
    //     });

    //     const body = await response.json();

    //     console.log(body.textId);
    //     setTextIds((textIds) => [...textIds, body["textId"]]);
    // };

    // const fetchQuestionsFromText = async (textId: string) => {
    //     const response = await fetch(`/api/qgen?textId=${textId}`);

    //     const body = await response.json();

    //     if (!body) {
    //         console.warn("Questions have not been parsed");
    //         return;
    //     }

    //     console.log(body["questions"]);
    //     setQuestionJSON(body["questions"]);
    //     setQuestions(load(body["questions"]) as any);
    //     setActiveExtract(textId);
    // };

    const refreshFileStatuses = async () => {
        let newfiles = [];
        for (let file of files) {
            let fileId = file[0];

            const response = await fetch(
                process.env.NEXT_PUBLIC_API_ENDPOINT +
                    `file_status?fileId=${fileId}`,
                {
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                    }),
                }
            );

            const body = await response.json();
            file[2] = body["status"];
            newfiles.push(file);
        }

        setFiles(newfiles);
    };

    const getResults = async (fileName: string, fileId: string) => {
        setQuestionJSON("");
        setQuestions([]);
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_ENDPOINT + `file?fileId=${fileId}`,
                {
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                    }),
                }
            );

            const body = await response.json();
            console.log("Sending request");
            console.log(body);
            if (body["status_code"] == 404 || body["status_code"] == 100) {
                alert(body["detail"]);
                return;
            }

            if (body.length == 0) {
                alert("File parsing incomplete, please try again");
                return;
            }

            const tempquestions: any[] = [];
            for (const singlePageQuestions of body) {
                setQuestionJSON((jsonbody) => jsonbody + singlePageQuestions);
                // console.log(singlePageQuestions);
                if (Array.isArray(singlePageQuestions)) {
                    tempquestions.push(...singlePageQuestions);
                } else {
                    tempquestions.push(singlePageQuestions);
                }
                console.log(tempquestions);
            }

            setQuestions(tempquestions);
            setActiveExtract(file);
            setSelectedFileName(fileName);
        } catch (err) {
            console.log(err);
            console.error("Error parsing questions");
        }
        // alert("Questions generated successfully!");
        setLoading(false);
    };

    return (
        <div className="p-10 items-center flex flex-col gap-8">
            <h3 className="font-bold text-4xl">
                &ge; PDF TO QUESTION SET CONVERTER
            </h3>
            <div className="flex items-center">
                <input type="file" onChange={handleFileChange} />
                {file && <p>Selected file: {file.name}</p>}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5 focus:outline-none"
                    onClick={sendFile}
                >
                    Schedule Extraction
                </button>
                {/* {extractedText.length > 0 && (
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
                )} */}
            </div>
            {files.length > 0 && (
                <div className="flex flex-col p-10">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold mb-4">
                            Uploaded Files
                        </h1>
                        <button
                            onClick={refreshFileStatuses}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 focus:outline-none"
                        >
                            Refresh
                        </button>
                    </div>
                    <div>
                        {files.map((file) => (
                            <div
                                key={file[0]}
                                className="flex justify-center items-center gap-4"
                            >
                                <div className="font-semibold">
                                    Filename :{" "}
                                    <span className="font-normal">
                                        {file[0]}
                                    </span>
                                </div>
                                <div className="font-semibold">
                                    File ID :{" "}
                                    <span className="font-normal">
                                        {file[1]}
                                    </span>
                                </div>
                                <div className="font-semibold">
                                    Status :{" "}
                                    <span className="font-normal">
                                        {file[2]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => getResults(file[0], file[1])}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 focus:outline-none"
                                >
                                    Get file data
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* {textIds.length > 0 && (
                <div className="flex flex-col p-10">
                    <h1 className="text-lg font-semibold mb-4">
                        Uploaded Files
                    </h1>
                    <ul className="list-disc list-inside">
                        {textIds.map((textId) => (
                            <div
                                key={textId}
                                className="flex justify-between items-center"
                            >
                                <li>{textId}</li>
                                <button
                                    onClick={(e) =>
                                        fetchQuestionsFromText(textId)
                                    }
                                    className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 focus:outline-none"
                                >
                                    Get text data
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
            )} */}
            {questions.length > 0 && (
                <QuestionsTable
                    fileName={selectedFileName}
                    questions={questions}
                />
            )}

            {/* <div>
                <textarea ref={textareaRef} />
                <button onClick={parseText}>Test Timeout</button>
            </div> */}
        </div>
    );
}
