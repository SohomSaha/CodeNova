import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input. Prompt is required." });
  }
  const message = `Attached the context and question separated by ' @ '. Answer the question based only on the given context, and if code is requested, provide the code from the given context. ${prompt}`;

    const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await model.generateContent(message);
    return res.status(200).json({ response: data });
  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
