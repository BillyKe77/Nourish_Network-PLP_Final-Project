const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/register 
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

//GET /api/auth/me - get current user info
router.get("/profile", getProfile);

module.exports = router;
