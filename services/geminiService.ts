import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePortfolioContent = async (): Promise<GeneratedContent | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Genera contenido creativo para un portafolio de arte digital llamado 'Bonialeart'. El estilo es moderno, minimalista y oscuro. Necesito:\n1. Un tagline corto.\n2. Una biografía muy breve para el hero (max 20 palabras).\n3. Un texto 'Sobre Mí' más detallado (aprox 60 palabras) hablando de pasión por el diseño y experiencia profesional.\n4. 3 cualidades artísticas (título, descripción breve, y un nombre de icono sugerido entre 'brush', 'eye', 'dimension').",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            bio: { type: Type.STRING },
            aboutMe: { type: Type.STRING },
            qualities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    const parsed = JSON.parse(text);
    
    // Validate structure to prevent runtime errors
    if (!parsed.qualities || !Array.isArray(parsed.qualities)) {
        parsed.qualities = [];
    }
    if (!parsed.tagline) parsed.tagline = "";
    if (!parsed.bio) parsed.bio = "";
    if (!parsed.aboutMe) parsed.aboutMe = "";

    return parsed as GeneratedContent;

  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return null;
  }
};