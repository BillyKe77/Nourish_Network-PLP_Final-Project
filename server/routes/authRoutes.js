const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, getCurrentUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/register 
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// protected routes
router.get("/profile", protect, getProfile);
router.get("/me", protect, getCurrentUser);


module.exports = router;
