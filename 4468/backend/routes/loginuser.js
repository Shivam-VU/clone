const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Ensure JWT is imported
require("dotenv").config(); // Load environment variables

// Login route
router.post("/loginstudent", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid data" });
        }



        // Ensure email is compared in lowercase
        const user = await User.findOne({email:email});


        if (!user) {
            return res.status(400).json({ message: "no user" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign({ email:email}, process.env.JWT_TOKEN);

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
