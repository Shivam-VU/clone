const mongoose = require('mongoose');

const internationalStudentInfo = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentPhone: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  motherName: { type: String, required: true },
  motherPhone: { type: String, required: true },
  currentCountry: { type: String, required: true },
  religion: { type: String, required: true },
  studentHeight: { type: String, required: true },
  address: { type: String, required: true },
  permanentCountry: { type: String, required: true },
  passportNumber: { type: String, required: true },
  visaNumber: { type: String, required: true },
  studentMoles: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  visaIssuedCountry: { type: String, required: true },
  visaIssuedPlace: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('internationalStudentInfo', internationalStudentInfo);