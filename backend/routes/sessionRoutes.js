const express = require("express");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMIddleware");

const router = express.Router();

// Create a new session
router.post("/", protect, createSession);

// Get a session by ID
router.get("/:id", protect, getSessionById);

// Get all sessions for the authenticated user
router.get("/my-sessions", protect, getMySessions);

// Delete a session by ID
router.delete("/:id", protect, deleteSession);

module.exports = router;
