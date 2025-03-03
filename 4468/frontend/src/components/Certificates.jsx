import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaTrash, FaDownload, FaUpload, FaEdit } from "react-icons/fa";
import serverurl from "../constants/serverurl";

const fileOptionsOrder = [
  "Photo",
  "Signature",
  "10th",
  "Inter",
  "Diploma",
  "Ug1",
  "Ug2",
  "Pg1",
  "Pg2",
];

const FileUploadComponent = () => {
  const [selectedFileType, setSelectedFileType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [studentDetails, setStudentDetails] = useState({
    name: "John Doe",
    branch: "Computer Science",
    phone: "+1 234 567 890",
    programme: "B.Tech",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await fetch(`${serverurl}/api/getuser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();

        setStudentDetails({
          name: data.firstName + " " + data.lastName || "Unknown User",
          branch: data.specialization,
          phone: data.mobile,
          programme: data.program,
        });
        fetchUploadedFiles();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getuser();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`${serverurl}/api/certificates`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();

        setUploadedFiles(data.certificates);
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const validateFile = (file, type) => {
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Only JPG/PNG images are allowed");
      return false;
    }
    if (file.size > 1048576) {
      alert("File size exceeds 1MB limit");
      return false;
    }
    return true;
  };

 const getAllowedFiles = () => {
  const allowedFiles = ["Photo", "Signature","10th", "Inter"];
  const hasPhoto = uploadedFiles["photo"];
  const hasSignature = uploadedFiles["signature"];

  if (studentDetails.programme === "Undergraduation") {
    allowedFiles.push( "Diploma");
  } else if (studentDetails.programme === "Postgraduation") {
    allowedFiles.push( "Diploma", "Ug1", "Ug2");
  } else if (studentDetails.programme === "PHD") {
    allowedFiles.push( "Diploma", "Ug1", "Ug2", "Pg1", "Pg2");
  }

  // If both Photo and Signature are uploaded, return all allowed files
  if (hasPhoto && hasSignature) {
    return allowedFiles;
  }
  // Otherwise, only return Photo and Signature
  return allowedFiles.filter((file) => file === "Photo" || file === "Signature");
};

  const handleFileUpload = async (event) => {
    if (event.target.files.length > 0 && selectedFileType) {
      const file = event.target.files[0];
      if (!validateFile(file, selectedFileType)) return;

      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(`${serverurl}/api/certificates/upload/${selectedFileType.toLowerCase()}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        });

        if (response.ok) {
          alert(`${selectedFileType} uploaded successfully!`);
          fetchUploadedFiles();
          setSelectedFileType("");
        } else {
          alert("Error uploading file");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading file");
      }
    }
  };

  const handleFileEdit = async (event) => {
    if (event.target.files.length > 0 && editingIndex !== null) {
      const file = event.target.files[0];
      if (!validateFile(file, editingIndex)) return;

      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(`${serverurl}/api/certificates/${editingIndex}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        });

        if (response.ok) {
          alert(`${editingIndex} updated successfully!`);
          fetchUploadedFiles();
          setEditingIndex(null);
        } else {
          alert("Error updating file");
        }
      } catch (error) {
        console.error("Update error:", error);
        alert("Error updating file");
      }
    }
  };

  const handleDelete = async (fileType) => {
    try {
      const response = await fetch(`${serverurl}/api/certificates/${fileType}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        alert(`${fileType} deleted successfully!`);
        fetchUploadedFiles();
      } else {
        alert("Error deleting file");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting file");
    }
  };

  const handleEdit = (fileType) => {
    setEditingIndex(fileType);
    if (editInputRef.current) {
      editInputRef.current.click();
    }
  };

  const handleViewFile = async (fileType) => {
    try {
      const response = await fetch(`${serverurl}/api/certificates/${fileType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        const data = await response.blob();
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL, "_blank");


        // Clean up the URL
        setTimeout(() => URL.revokeObjectURL(fileURL), 3000);
      } else {
        alert("Error viewing file");
      }
    } catch (error) {
      console.error("View error:", error);
      alert("Error viewing file");
    }
  };

  const handleDownloadFile = async (fileType) => {
    try {
      const response = await fetch(`${serverurl}/api/certificates/${fileType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        const data = await response.blob();
        const fileURL = URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = `${fileType}.jpg`;
        a.click();

        // Clean up the URL
        setTimeout(() => URL.revokeObjectURL(fileURL), 3000);
      } else {
        alert("Error downloading file");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading file");
    }
  };

  return (
    <div className="container my-4 vh-100">
      {/* Student Details Section */}
      <h3 className="mb-3">Student Details</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-control-plaintext mb-3">
            <strong>Name:</strong> {studentDetails.name}
          </div>
          <div className="form-control-plaintext mb-3">
            <strong>Branch:</strong> {studentDetails.branch}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-control-plaintext mb-3">
            <strong>Phone:</strong> {studentDetails.phone}
          </div>
          <div className="form-control-plaintext">
            <strong>Programme:</strong> {studentDetails.programme}
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <h3 className="mb-3">Photo, Signature, & Certificates Uploads</h3>
      <div className="row mb-3">
  <div className="col-md-6">
    <select
      className="form-control"
      value={selectedFileType}
      onChange={(e) => setSelectedFileType(e.target.value)}
    >
      <option value="">Select File Type</option>
      {getAllowedFiles()
        .filter((option) => !uploadedFiles[option.toLowerCase()])
        .map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  </div>
</div>

{!uploadedFiles["photo"] || !uploadedFiles["signature"] ? (
  <div className="alert alert-warning mt-3">
    Please upload both <strong>Photo</strong> and <strong>Signature</strong> before uploading other files.
  </div>
) : null}

      {selectedFileType && (
        <div className="row mb-3">
          <div className="col-md-6 d-flex align-items-center">
            <strong className="me-3">
              {selectedFileType} (.jpg, .png, 1MB)
            </strong>
            <label className="btn btn-danger d-flex align-items-center mb-0">
              <FaUpload className="me-2" />
              Upload
              <input
                type="file"
                accept="image/jpeg, image/png"
                className="d-none"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      )}

      {Object.keys(uploadedFiles).length > 0 && (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>File Type</th>
                  <th>File Name</th>
                  <th style={{ width: "200px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fileOptionsOrder.map((fileType) =>
                  uploadedFiles[fileType.toLowerCase()] ? (
                    <tr key={fileType.toLowerCase()}>
                      <td>{fileType.toLowerCase()}</td>
                      <td>{uploadedFiles[fileType.toLowerCase()].originalName}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleViewFile(fileType.toLowerCase())}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(fileType.toLowerCase())}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-danger me-2"
                          onClick={() => handleDelete(fileType.toLowerCase())}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleDownloadFile(fileType.toLowerCase())}
                        >
                          <FaDownload />
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hidden file input for editing/reupload */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={editInputRef}
        onChange={handleFileEdit}
        accept="image/jpeg, image/png"
      />
    </div>
  );
};

export default FileUploadComponent;