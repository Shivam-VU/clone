import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import serverurl from "../constants/serverurl";
import { useNavigate } from "react-router-dom";

// Include the Google Fonts for DM Serif Display and Roboto
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto:wght@400;500&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

export default function StudentRegistration() {
  const nav  = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    country: "",
    category: "",
    program: "",
    course: "",
    specialization: "",
  });

  const courses = {
    "B.Tech": ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
    "M.Tech": ["Data Science", "Robotics", "Power Systems", "Structural Engineering"],
    "MBA": ["Finance", "Marketing", "Human Resources", "Operations Management"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset specialization when course changes
    if (name === "course") {
      setFormData({ ...formData, [name]: value, specialization: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    // check if all fields are filled
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please "+ key + " field");
        return false;
      }
    }
    if(formData.mobile.length !== 10) {
      alert("Mobile number should be 10 digits");
      return false;
    }
    return true;
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const response = await fetch( `${serverurl}/api/studentregistaionform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if(response.status==201 || response.status==200){
      alert(data.msg);
      // reset form
      // setFormData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   mobile: "",
      //   dob: "",
      //   country: "",
      //   category: "",
      //   program: "",
      //   course: "",
      //   specialization: "",
      // });
      localStorage.setItem("userToBeCreated", formData.email);
      nav("/setpassword");
    }
    else{
      alert(data.msg);
    }

  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4" style={{ border: "2px solid black", borderRadius: "10px" }}>
            <div className="mx-auto w-full">
              <h2
                className="text-center text-dark"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "28px",
                  display: "inline-block",
                  borderBottom: "4px solid red",
                }}
              >
                Student Registration
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
              {/* First and Last Name */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                </div>
              </div>

              {/* Email and Mobile */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Mobile Number
                  </label>
                  <input
                    maxLength={10}
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    }}
                    pattern="\d*"
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                </div>
              </div>

              {/* Date of Birth and Country */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Country
                  </label>
                  <select
                    className="form-select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">Sudan</option>
                    <option value="UK">Singapore</option>
                  </select>
                </div>
              </div>

              {/* Category and Program */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Category
                  </label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC/ST">SC/ST</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Select Program
                  </label>
                  <select
                    className="form-select"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  >
                    <option value="">Select Program</option>
                    <option value="Undergraduation">Undergraduation</option>
                    <option value="PostGraduation">Graduation</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>
              </div>

              {/* Course and Specialization */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Select Course
                  </label>
                  <select
                    className="form-select"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  >
                    <option value="">Select Course</option>
                    {Object.keys(courses).map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                    Select Specialization
                  </label>
                  <select
                    className="form-select"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    disabled={!formData.course}
                    style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
                  >
                    <option value="">Select Specialization</option>
                    {formData.course &&
                      courses[formData.course].map((specialization) => (
                        <option key={specialization} value={specialization}>
                          {specialization}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="row justify-content-center mt-4">
                <div className="col-6 text-center">
                  <button
                    type="submit"
                    className="btn w-50"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "20px",
                      backgroundColor: "#FF3C00",
                      color: "white",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>

              <p
                className="text-center mt-3"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
              >
                Already have an account?{" "}
                <a href="/login" style={{ color: "#FF3C00" }}>
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
