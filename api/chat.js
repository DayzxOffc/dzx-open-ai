const { GoogleGenerativeAI } = require('@google/generative-ai');

// TEMPAT API KEY ANDA
const MY_API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // <--- GANTI DENGAN API KEY ANDA

// Inisialisasi GoogleGenerativeAI dengan API key yang hard-coded
const genAI = new GoogleGenerativeAI(MY_API_KEY);

// Fungsi handler yang akan diekspor
module.exports = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ text: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};
