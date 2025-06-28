const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplanationPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// @desc Generate interview questions and answers
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicToFocus || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicToFocus,
      numberOfQuestions
    );

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash-001",
    //   prompt: prompt,
    // });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      // contents: [{ role: "user", parts: [{ text: prompt }] }],
      contents: prompt,
    });

    let rawText = response.text;

    // clean it: remove ```json and ``` from the start and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove ```json at the start
      .replace(/```$/, "") // remove ``` at the end
      .trim(); // remove extra whitespace

    // now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

// @desc Generate concept explanation
// @route POST /api/ai/generate-explanation
// @access Private

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = conceptExplanationPrompt(question);

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash-001",
    //   prompt: prompt,
    // });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      // contents: [{ role: "user", parts: [{ text: prompt }] }],
      contents: prompt,
    });

    let rawText = response.text;

    // clean it: remove ```json and ``` from the start and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove ```json at the start
      .replace(/```$/, "") // remove ``` at the end
      .trim(); // remove extra whitespace

    // now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      message: "Concept explanation generated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
