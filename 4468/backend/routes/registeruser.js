const express = require("express");
const router = express.Router();
const FormModel = require("../models/FormModel");
const User = require("../models/User");

router.post("/studentregistaionform", async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body || !req.body.email) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    // Check if the user already exists
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Check if the form exists
    const existingForm = await FormModel.findOne({ email: req.body.email });

    if (existingForm) {
      // Update the existing form
      await FormModel.findOneAndUpdate({ email: req.body.email }, req.body, {
        new: true, // Return the updated document
      });
      return res.status(200).json({ msg: "Form updated successfully" });
    } else {
      // Create a new form
      const form = new FormModel(req.body);
      await form.save();
      return res.status(201).json({ msg: "Form submitted successfully" });
    }
  } catch (error) {
    console.error("Error in /studentregistaionform:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
