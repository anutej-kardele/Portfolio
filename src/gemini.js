import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAtMtZQe8LaolpK-5Sr8WM-RzM4Jyem0ic';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getGeminiResponse = async (prompt) => {
    try {
        // Switch to "gemini-2.0-flash-lite" which is the valid free model in 2026
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to get response from AI.");
    }
};