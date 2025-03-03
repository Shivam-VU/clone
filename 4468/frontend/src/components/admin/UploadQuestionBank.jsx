import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import serverurl from "../../constants/serverurl";
import { useNavigate } from "react-router-dom";


const UploadQuestionBank = () => {
  const nav = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

const handleUpload = async () => {
  if (!file) {
    setMessage("Please select an Excel file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${serverurl}/api/admin/upload-question-bank`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file.");
    }

    const result = await response.json();
    setMessage(result.message || "File uploaded successfully!");
  } catch (error) {
    setMessage("Error uploading file. Please try again.");
  }

  setFile(null);
  nav("/viewquestionbank");
};


  return (
    <div className="container mt-4 vh-100">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">Guidelines</h3>
        <ul className="list-unstyled">
          <li><strong>Download Sample Format:</strong> Provide a sample question paper format file for download. <a href="./question_paper_sample.xlsx" download="sample.xlsx" className="ms-1">Click here</a></li>
          <li><strong>Upload Excel:</strong> All objective questions should be in the same cell.</li>
          <li>If a question contains an image, write the word "image" in that cell and upload the image separately.</li>
          <li><strong>Save to Database:</strong> Once the Excel file is uploaded, store the questions in the database.</li>
          <li><strong>Redirect to Image Upload Page:</strong> After uploading, redirect the user to an image upload screen.</li>
          <li><strong>Question Preview:</strong> Display all questions serial number-wise.</li>
          <li><strong>Image Upload:</strong> If a question contains the word "image," enable an upload option beside it.</li>
          <li><strong>Admin Verification:</strong> Allow the admin to verify and save the question after uploading the required images.</li>
          <li><strong>Navigation:</strong> Provide a "Next" button to go through all questions one by one.</li>
          <li><strong>Structured Excel Input:</strong> Ensure all serial numbers are in a specific column, avoiding empty cells.</li>
        </ul>

        <div className="mt-3">
          <h5 className="mb-3">Upload question bank</h5>
          <input type="file" className="form-control mb-2" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button className="btn " onClick={handleUpload}
          style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                backgroundColor: "#FF3C00",
                color: "white",
              }}
          >Upload</button>
          {message && <p className="mt-2 text-success">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadQuestionBank;
