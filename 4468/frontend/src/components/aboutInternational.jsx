import React, { useEffect,useState } from "react";
import serverurl from "../constants/serverurl";
import { useNavigate } from "react-router-dom";


export default function About() {
  const nav = useNavigate();
    const [formData, setFormData] = useState({
        studentName: "",
        studentPhone: "",
        fatherName: "",
        fatherPhone: "",
        motherName: "",
        motherPhone: "",
        currentCountry: "",
        permanentCountry: "",
        passportNumber: "",
        visaNumber: "",
        email: "",
        visaIssuedCountry: "",
        visaIssuedPlace: "",
    });
  useEffect(() => {
    const getdata = async () => {
    const response = await fetch(`${serverurl}/api/internationalstudentinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    setFormData(data);
    }
    getdata();

    }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Student Registration Details</h2>
      <div className="card p-4" style={{ border: "2px solid black", borderRadius: "10px" }}>
        <ul className="list-group">
          <li className="list-group-item"><strong>Student Name:</strong> {formData.studentName}</li>
          <li className="list-group-item"><strong>Student Phone:</strong> {formData.studentPhone}</li>
          <li className="list-group-item"><strong>Father Name:</strong> {formData.fatherName}</li>
          <li className="list-group-item"><strong>Father Phone:</strong> {formData.fatherPhone}</li>
          <li className="list-group-item"><strong>Mother Name:</strong> {formData.motherName}</li>
          <li className="list-group-item"><strong>Mother Phone:</strong> {formData.motherPhone}</li>
          <li className="list-group-item"><strong>Current Country:</strong> {formData.currentCountry}</li>
          <li className="list-group-item"><strong>Permanent Country:</strong> {formData.permanentCountry}</li>
          <li className="list-group-item"><strong>Passport Number:</strong> {formData.passportNumber}</li>
          <li className="list-group-item"><strong>Visa Number:</strong> {formData.visaNumber}</li>
          <li className="list-group-item"><strong>Email:</strong> {formData.email}</li>
          <li className="list-group-item"><strong>Visa Issued Country:</strong> {formData.visaIssuedCountry}</li>
          <li className="list-group-item"><strong>Visa Issued Place:</strong> {formData.visaIssuedPlace}</li>
        </ul>
      </div>
      <div className="text-center mt-4">
        {/* button to route to cetificate page */}
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
              onClick={() => {
                nav("/certificates");
              }}
            >
              Upload Certificates
            </button>
          </div>
      </div>
    </div>
  );
}
