const express = require('express');
const User = require("../../models/User");
const FormModel = require("../../models/FormModel");

const router = express.Router();

// Route to get user form values
router.get('/getuser', async (req, res) => {
    try {
        const useremail = req.email;
        const regform = await FormModel.findOne({ email: useremail });
        res.json(regform);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;