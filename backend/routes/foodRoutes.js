const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  createFoodItem,
  getAvailableFood,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
  claimFood,
  getMyDonations,
  getMyClaims,
} = require("../controllers/foodController");

// ---------------------------
// Food Routes
// ---------------------------

// POST /api/food - donor posts food
router.post("/", protect, requireRole("donor"), upload.single("image"), createFoodItem);

// GET /api/food - list all available food (unclaimed + not expired)
router.get("/", protect, getAvailableFood);

// GET /api/food/:id - get single food item by ID
router.get("/:id", protect, getFoodItemById);

// PUT /api/food/:id - update food (donor only, own items)
router.put("/:id", protect, requireRole("donor"), upload.single("image"), updateFoodItem);

// DELETE /api/food/:id - delete food (donor only, own items)
router.delete("/:id", protect, requireRole("donor"), deleteFoodItem);

// POST /api/food/:id/claim - recipient claims food
router.post("/:id/claim", protect, requireRole("recipient"), claimFood);

// GET /api/food/donor/my-items - donor sees own donations
router.get("/donor/my-items", protect, requireRole("donor"), getMyDonations);

// GET /api/food/recipient/my-claims - recipient sees what they claimed
router.get("/recipient/my-claims", protect, requireRole("recipient"), getMyClaims);

module.exports = router;
