const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // extract token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password"); // find user and exclude password
      next(); // proceed to the next middleware or route handler
    } else {
      res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

module.exports = { protect };
