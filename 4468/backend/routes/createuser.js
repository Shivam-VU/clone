const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/createuser", async (req, res) => {
  try {


    // Validate request body
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    // Check if user already exists
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create and save new user
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    return res.status(201).json({ msg: "User created successfully" });

  } catch (error) {
    console.error("Error in /createuser:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
