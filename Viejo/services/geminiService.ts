import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  // In a real scenario, this comes from process.env.API_KEY
  // Handling the case where it might be undefined in this demo context
  const apiKey = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export const generateMatchDescription = async (
  location: string,
  type: string,
  missingPlayers: number
): Promise<string> => {
  try {
    const ai = getClient();
    if (!process.env.API_KEY) {
      return "⚠️ Error: API Key faltante. Configura tu clave para usar la IA.";
    }

    const prompt = `
      Escribe una descripción corta, emocionante y urgente para un partido de fútbol amateur (estilo aplicación de fútbol).
      
      Detalles:
      - Lugar: ${location}
      - Tipo: ${type} (ej. Futbol 5, Futbol 7)
      - Faltan: ${missingPlayers} jugadores
      
      Usa emojis de fútbol. El tono debe ser motivador, buscando "cracks" o "guerreros". 
      Máximo 2 oraciones. No uses hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "¡Faltan jugadores! Únete a nosotros.";
  } catch (error) {
    console.error("Error generating match description:", error);
    return "¡Partido imperdible! Necesitamos refuerzos urgentes.";
  }
};

export const getTacticalAdvice = async (position: string): Promise<string> => {
  try {
    const ai = getClient();
    if (!process.env.API_KEY) return "Consejo táctico no disponible sin API Key.";

    const prompt = `Dame un consejo táctico breve y profesional para un jugador de fútbol en la posición: ${position}. Máximo 20 palabras.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Mantén la posición y comunícate con tu equipo.";
  } catch (error) {
    return "Juega simple y diviértete.";
  }
};