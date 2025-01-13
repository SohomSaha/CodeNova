import React, { useState } from "react";
import { Blocks, XIcon } from "lucide-react"; // Close Icon
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import CodeBlock from "@/app/snippets/[id]/_components/CodeBlock"; // Import your CodeBlock component
interface AiChatDialogProps {
  onClose: () => void;
}

export default function AiChatDialog({ onClose }: AiChatDialogProps) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { getCode } = useCodeEditorStore();

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const msg = input + " @ " + getCode();
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msg }),
      });
      const data = await res.json();
      const ans =
        data?.response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(ans);
    } catch (error) {
      setResponse("Error connecting to AI");
      console.error("Error calling Gemini API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Split the AI response into parts (code blocks and non-code blocks)
  const parseResponse = (response: string) => {
    const parts = response.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        // Match for language and code block content
        const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);
        if (match) {
          const [, language, code] = match;
          return <CodeBlock language={language} code={code} key={index} />;
        }
      }

      // Render regular text parts
      return part.split("\n").map((line, lineIdx) => (
        <p key={lineIdx} className="mb-4 text-gray-300 last:mb-0">
          {line}
        </p>
      ));
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center bg-black/50 h-screen">
      <div className="relative w-[40%] min-h-screen bg-[#1e1e2e] p-6 rounded-l-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="relative mt-4">
          <div className="mb-2 ml-2  flex justify-center">
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all flex w-auto">
              <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 flex justify-center" />
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                Nova AI
              </span>
            </div>
          </div>
          <span className="flex text-sm bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text font-medium justify-center mb-6">
            Ask any question or code suggestion
          </span>
        </div>
        {/* Chat Area */}
        <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">
          {" "}
          {/* Scrollable Chat Area */}
          <div className="flex-1 bg-[#2a2a3a] rounded-lg p-4 overflow-y-auto shadow-inner max-h-[400px]">
            {response ? (
              <div className="text-white">
                <p className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text mb-2">
                  Nova AI :
                </p>
                <div>{parseResponse(response)}</div>{" "}
                {/* Render parsed response */}
              </div>
            ) : (
              <p className="text-gray-500">The response will appear here...</p>
            )}
          </div>
          {/* Input Area */}
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full p-3 rounded-lg bg-[#333346] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={4}
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="relative flex justify-center">              
              <button
                onClick={handleSend}
                disabled={loading}
                className={`relative z-10 w-[360px] flex justify-center py-3 font-semibold rounded-lg ${
                  loading
                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-purple-700 opacity-90 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 opacity-90 hover:opacity-100 transition-opacity text-black"
                }`}
              >
                 {loading?(<div className="flex items-center gap-2">
        {/* Spinner */}
        <div
          className=" w-5 h-5 bg-white opacity-50 rounded-full animate-pulse-ring"
          aria-label="Loading Spinner"
        ></div>
          Thinking...
      </div>):(<div>Send</div>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
