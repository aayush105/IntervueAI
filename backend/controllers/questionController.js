const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc add question to session
// @route POST /api/questions/add
// @access Private

exports.addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Session ID and question are required",
      });
    }
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // create new questions
    const questionDocs = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer || "",
      }))
    );

    // update session to include new questions IDs
    session.questions.push(...questionDocs.map((q) => q._id));
    await session.save();

    res.status(201).json({
      success: true,
      message: "Questions added to session successfully",
      questions: questionDocs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc toggle pin question
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // toggle the pinned status
    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({
      success: true,
      message: `Question ${
        question.isPinned ? "pinned" : "unpinned"
      } successfully`,
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc update question note
// @route POST /api/questions/:id/note
// @access Private

exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({
      success: true,
      message: "Question note updated successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
