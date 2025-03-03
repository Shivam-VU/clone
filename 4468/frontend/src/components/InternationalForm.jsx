import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import serverurl from "../constants/serverurl";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    studentPhone: "",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    currentCountry: "",
    religion: "",
    studentHeight: "",
    address: "",
    permanentCountry: "",
    passportNumber: "",
    visaNumber: "",
    studentMoles: "",
    bloodGroup: "",
    email: "",
    visaIssuedCountry: "",
    visaIssuedPlace: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${serverurl}/api/internationalstudentinfo`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",

      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      nav("/personal-information");
      setFormData({ ...initialState }); // Clear form data
    } else {
      alert("Failed to submit form!");
    }

  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4" style={{ border: "2px solid black", borderRadius: "10px" }}>
            <h2 className="text-center mb-4">Personal Details Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Student Name *</label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Student Phone Number *</label>
                  <input type="tel" name="studentPhone" value={formData.studentPhone} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Father Name *</label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Father Phone Number *</label>
                  <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mother Name *</label>
                  <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Mother Phone Number *</label>
                  <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Current Country *</label>
                  <input type="text" name="currentCountry" value={formData.currentCountry} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Religion *</label>
                  <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Student Height *</label>
                  <input type="text" name="studentHeight" value={formData.studentHeight} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Permanent Country *</label>
                  <input type="text" name="permanentCountry" value={formData.permanentCountry} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Passport Number *</label>
                  <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Visa Number *</label>
                  <input type="text" name="visaNumber" value={formData.visaNumber} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Student Moles *</label>
                  <input type="text" name="studentMoles" value={formData.studentMoles} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Blood Group *</label>
                  <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Student Email ID *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Visa Issued Country *</label>
                  <input type="text" name="visaIssuedCountry" value={formData.visaIssuedCountry} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Visa Issued Place *</label>
                  <input type="text" name="visaIssuedPlace" value={formData.visaIssuedPlace} onChange={handleChange} className="form-control" required />
                </div>
              </div>

              <div className="text-center">
            <button
              type="submit"
              className="btn w-25"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                backgroundColor: "#FF3C00",
                color: "white",
              }}
            >
              Submit
            </button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
