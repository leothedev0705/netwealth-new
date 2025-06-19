import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBQ329Kp7NaFzlsj8IVuPlDKeS4Avwdf7o");

const SYSTEM_PROMPT = `You are an AI Financial Advisor for NetWealth India owned by Mr.Shrikant Aggarwal, a comprehensive wealth management platform. 
You have deep knowledge of:
- Indian stock markets (NSE, BSE)
- Mutual funds and investment strategies
- Tax planning and wealth management
- Insurance and protection products
- Personal finance and budgeting

Provide clear, accurate, and actionable advice. Use examples and data when relevant.
Keep responses concise but informative. If you're unsure about something, be honest about limitations.
Use markdown formatting: Use **bold** for emphasis and important terms.

Current capabilities:
- Real-time market insights
- Investment recommendations
- Portfolio analysis
- Financial planning guidance
- Risk assessment`;

export async function getChatResponse(userMessage: string, chatHistory: { content: string; isUser: boolean }[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // Combine system prompt with user message
    const prompt = `${SYSTEM_PROMPT}\n\nPrevious conversation:\n${
      chatHistory.map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')
    }\n\nUser: ${userMessage}\n\nAssistant:`;

    // Get response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
  }
} 