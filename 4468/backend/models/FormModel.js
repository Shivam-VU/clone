const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["General", "OBC", "SC", "ST"], // Adjust the enum values as per your requirements
  },
  country: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, 
  },
  program: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
});

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
