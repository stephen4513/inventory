import OpenAIApi from 'openai';

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log("API Key:", process.env.OPENAI_API_KEY); // Ensure the key is loaded

  const { pantryItems, message } = req.body;
  console.log("Request Body:", req.body);

  if (!process.env.OPENAI_API_KEY) {
    const errorMessage = "API key is not set";
    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }

  if (!pantryItems || !Array.isArray(pantryItems) || pantryItems.length === 0 || !message) {
    const errorMessage = "Invalid request: pantryItems and message are required.";
    console.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const prompt = `Based on the following pantry items: ${pantryItems.join(', ')}. ${message}`;
    console.log("Prompt:", prompt);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    console.log("OpenAI Response:", response);

    if (!response.choices || response.choices.length === 0) {
      throw new Error("No response choices from OpenAI");
    }

    const botMessage = response.choices[0].message.content.trim();
    console.log("Bot Message:", botMessage);

    res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
