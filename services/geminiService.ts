import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMarketingProposal(websiteUrl: string): Promise<string> {
  const prompt = `
    Analyze the following website for a potential digital marketing audit: ${websiteUrl}
    
    Act as a senior growth strategist at "Zamil.Marketing".
    Provide a concise, high-impact marketing proposal in 3 distinct parts:
    1. CURRENT GAP: Identify a likely weakness (SEO, Speed, or PPC).
    2. THE OPPORTUNITY: A high-impact "low hanging fruit" win.
    3. THE 90-DAY GROWTH ROADMAP: A brief 3-step action plan.
    
    Tone: Professional, expert, slightly aggressive about results, and highly focused on ROI.
    Avoid generic fluff. Mention that Zamil.Marketing uses proprietary search grounding techniques.
    Format with clear headers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Proposal could not be generated at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
