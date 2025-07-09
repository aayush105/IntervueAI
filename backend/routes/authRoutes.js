const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMIddleware");
const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// auth routes
router.post("/register", registerUser); // register a new user
router.post("/login", loginUser); // login an existing user
router.get("/profile", protect, getUserProfile); // get user profile

router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pics" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});

module.exports = router;
