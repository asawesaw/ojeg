
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly for initialization as per the updated coding guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartResponse = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Anda adalah NusaBot, asisten virtual yang ramah untuk NusaApp (super app seperti Gojek/Grab di Indonesia). 
      Pengguna bertanya: "${query}". 
      Jawablah dengan singkat, jelas, dan membantu dalam Bahasa Indonesia. Jika mereka bertanya tentang layanan, sebutkan Ojeg (motor), Mobil, Makanan, Belanja, dan Saldo. 
      Gunakan gaya bahasa yang profesional dan sopan.`,
    });
    // Use .text property instead of .text() method
    return response.text || "Maaf, saya tidak dapat memproses permintaan tersebut saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terputus dari NusaBot. Silakan periksa koneksi Anda.";
  }
};
