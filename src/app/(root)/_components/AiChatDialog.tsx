import React, { useState } from "react";
import { XIcon } from "lucide-react"; // Close Icon
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
      const ans = data?.response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
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
    <div className="fixed inset-0 z-50 flex justify-end items-center bg-black/50">
      <div className="relative w-[40%] h-full bg-[#1e1e2e] p-6 rounded-l-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white text-center">AI Assistant</h2>
          <p className="text-gray-400 text-sm text-center">Ask your questions or get code suggestions!</p>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col gap-4 h-[calc(100vh-120px)]"> {/* Scrollable Chat Area */}
          <div className="flex-1 bg-[#2a2a3a] rounded-lg p-4 overflow-y-auto shadow-inner max-h-[400px]">
            {response ? (
              <div className="text-white">
                <p className="text-gray-300 mb-2">AI Response:</p>
                <div>{parseResponse(response)}</div> {/* Render parsed response */}
              </div>
            ) : (
              <p className="text-gray-500">The AI's response will appear here...</p>
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
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
