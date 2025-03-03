
const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Student = require('../../models/InternationalStudentInfo');

// Create new student
router.post('/internationalstudentinfo', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/internationalstudentinfo/', async (req, res) => {
  try {
    const useremail = req.email;
    const student = await Student.findOne({ email: useremail });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
