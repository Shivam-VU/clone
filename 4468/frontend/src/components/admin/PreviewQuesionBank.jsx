import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import serverurl from "../../constants/serverurl";

const PreviewQuestionBankPage = () => {
  const { id } = useParams();
  const [questionBank, setQuestionBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [imageUrl,setImageUrl] = useState({})

  useEffect(() => {
    axios
      .get(`${serverurl}/api/admin/question-banks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setQuestionBank(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch question bank");
        setLoading(false);
      });
  }, [id]);

   useEffect(() => {
    if (questionBank) {
      const fetchImages = async () => {
        let images = {};
        for (let key in currentQuestion) {
          if (typeof currentQuestion[key] === "object" && currentQuestion[key]?.ref) {
            const imageUrl = await handleViewImage(currentQuestion[key]);
            images[key] = imageUrl;
          }
        }
        setImageUrl(images);
        console.log(images);
      };
      fetchImages();
    }
  }, [questionBank, currentQuestionIndex]);
  

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!questionBank || questionBank.questions.length === 0)
    return <div className="alert alert-warning text-center">No Questions Found</div>;

  const questions = questionBank.questions;
  const currentQuestion = questions[currentQuestionIndex];

  



  const getDisplayText =  (field) => {
    if(field === "manual_image"){
      return "manual_image";
    }

    if(typeof field === "object" && field !== null ){

    }
    return typeof field === "object" && field !== null ? field.originalName : field;
  };


  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

 const handleViewImage = async (value) => {
    if (!value?.ref) return;
    try {
      const response = await fetch(`${serverurl}/api/admin/question-banks/image/${value.ref}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.blob();
        return URL.createObjectURL(data);
      }
    } catch (error) {
      console.error("View error:", error);
    }
  };

  const renderImage = (field) => {
    console.log("field",typeof currentQuestion[field] === "object" && currentQuestion[field] !== null );
    if(typeof currentQuestion[field] === "object" && currentQuestion[field] !== null ){
      
    return imageUrl[field] ? <img src={imageUrl[field]} alt="Uploaded" fluid className="mt-2" style={{width:"100vh",height:"200px"}} /> : null;
    }
  };

  const handleFileChange = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("field", field);
    formData.append("questionId", currentQuestion.qno);

    try {
      await axios.post(`${serverurl}/api/admin/question-banks/upload-image/${currentQuestion._id}/${field}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to upload file");
    }
  };

  const handleDeleteImage = async (field) => {
    try {
      await axios.delete(`${serverurl}/api/admin/question-banks/delete-image/${currentQuestion._id}/${field}`, {
        data: { field },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Image deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to delete image");
    }
  };

  const renderImageActions = (field, value) => {

    return value.ref!=null || value === "manual_image"  ? (
      <div className="d-flex gap-2">
        <Form.Group>
          <Form.Control
            type="file"
            className="d-none"
            accept="image/*"
            id={`file-upload-${field}`}
            onChange={(event) => handleFileChange(event, field)}
          />
          <Button variant="light" size="sm" className="shadow-sm" onClick={() => document.getElementById(`file-upload-${field}`).click()}>
            <FaUpload className="text-success" />
          </Button>
        </Form.Group>

        <Button variant="light" size="sm" className="shadow-sm" onClick={() => document.getElementById(`file-upload-${field}`).click()}>
          <FaEdit className="text-warning" />
        </Button>
        <Button variant="light" size="sm" className="shadow-sm" onClick={() => handleDeleteImage(field)}>
          <FaTrash className="text-danger" />
        </Button>
      </div>
    ) : null;
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm rounded-4 border-0">
        <h4 className="fw-bold text-primary mb-3">Question {currentQuestion.qno}</h4>
        <Card className="p-3 mb-4 shadow-sm rounded-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-dark">{getDisplayText(currentQuestion.questiondesc)}</h5>
            {renderImageActions("questiondesc", currentQuestion.questiondesc)}
          </div>
          {renderImage("questiondesc")}
        </Card>
        <Row>
          <Col md={8}>
            <Card className="p-3 mb-3 shadow-sm rounded-3 border-0">
              {["option1", "option2", "option3", "option4"].map((opt, index) => (
                <div key={opt} className="d-flex justify-content-between align-items-center mb-2">
                  <span >
                    <strong>{String.fromCharCode(97 + index)}.</strong> {getDisplayText(currentQuestion[opt])}
                    {renderImage(opt)}
                    {renderImageActions(opt, currentQuestion[opt])}
                  </span>
                </div>
              ))}
              <p className="mt-3">
                <strong className="text-success">Answer:</strong> {currentQuestion.answer}
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm rounded-3 border-0 bg-light">
              <p className="mb-2"><strong>Exam:</strong> {currentQuestion.examtype}</p>
              <p className="mb-2"><strong>Subject:</strong> {currentQuestion.quesubject}</p>
              <p className="mb-2"><strong>Question Level:</strong> {currentQuestion.que_level}</p>
              <p className="mb-2"><strong>Marks:</strong> {currentQuestion.qmarks} m</p>
              <p className="mb-0"><strong>Time:</strong> {currentQuestion.qtimesec} sec</p>
            </Card>
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-primary" onClick={handleBack} disabled={currentQuestionIndex === 0} className="px-4 py-2">
            Back
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="px-4 py-2">
            Next
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default PreviewQuestionBankPage;
