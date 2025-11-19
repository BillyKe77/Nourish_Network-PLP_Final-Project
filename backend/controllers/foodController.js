const FoodItem = require("../models/foodItem");
const cloudinary = require("../config/cloudinary");

// ---------------------------
// CREATE - donor posts food
// ---------------------------
const createFoodItem = async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors can post food items." });
    }

    const { title, description, location, contactInfo, expiresAt } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Food image is required" });
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "food_items" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Failed to upload image", error });

        const food = await FoodItem.create({
          donor: req.user._id,
          title,
          description,
          location,
          contactInfo,
          imageUrl: result.secure_url,
          expiresAt: expiresAt || null,
        });

        res.status(201).json(food);
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ message: "Failed to create food item", error });
  }
};

// ---------------------------
// GET ALL AVAILABLE FOOD
// ---------------------------
const getAvailableFood = async (req, res) => {
  try {
    const foods = await FoodItem.find({
      isClaimed: false,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food items" });
  }
};

// ---------------------------
// GET SINGLE FOOD ITEM BY ID
// ---------------------------
const getFoodItemById = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate("donor", "name email");
    if (!food) return res.status(404).json({ message: "Food item not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food item" });
  }
};

// ---------------------------
// UPDATE FOOD ITEM - donor only
// ---------------------------
const updateFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    if (food.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = {
      title: req.body.title ?? food.title,
      description: req.body.description ?? food.description,
      location: req.body.location ?? food.location,
      contactInfo: req.body.contactInfo ?? food.contactInfo,
      expiresAt: req.body.expiresAt ?? food.expiresAt,
    };

    if (req.file) {
      // Upload new image to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "food_items" },
        async (error, result) => {
          if (error) return res.status(500).json({ message: "Failed to upload image", error });
          updates.imageUrl = result.secure_url;
          const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
          res.json(updatedFood);
        }
      );
      return uploadStream.end(req.file.buffer);
    }

    const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedFood);

  } catch (error) {
    res.status(500).json({ message: "Failed to update food item" });
  }
};

// ---------------------------
// DELETE FOOD ITEM - donor only
// ---------------------------
const deleteFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    if (food.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await food.deleteOne();
    res.json({ message: "Food item deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete food item" });
  }
};

// ---------------------------
// CLAIM FOOD - recipient only
// ---------------------------
const claimFood = async (req, res) => {
  try {
    if (req.user.role !== "recipient") {
      return res.status(403).json({ message: "Only recipients can claim food." });
    }

    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    if (food.isClaimed) return res.status(400).json({ message: "Food already claimed" });

    food.isClaimed = true;
    food.claimedBy = req.user._id;
    food.claimedAt = new Date();

    await food.save();

    res.json({ message: "Food claimed successfully", food });
  } catch (error) {
    res.status(500).json({ message: "Failed to claim food" });
  }
};

// ---------------------------
// DONOR: view own posted items
// ---------------------------
const getMyDonations = async (req, res) => {
  try {
    const foods = await FoodItem.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your donations" });
  }
};

// ---------------------------
// RECIPIENT: view claimed items
// ---------------------------
const getMyClaims = async (req, res) => {
  try {
    const foods = await FoodItem.find({ claimedBy: req.user._id }).sort({ claimedAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your claimed items" });
  }
};

module.exports = {
  createFoodItem,
  getAvailableFood,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
  claimFood,
  getMyDonations,
  getMyClaims,
};
