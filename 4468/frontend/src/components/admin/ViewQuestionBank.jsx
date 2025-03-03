import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Card, Container } from "react-bootstrap";
import serverurl from "../../constants/serverurl";

const ViewQuestionBank = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${serverurl}/api/admin/question-banks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setQuestionBanks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch question banks");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4 vh-100">
      <h2 className="mb-3 text-center">Question Banks</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && questionBanks.length === 0 && (
        <div className="alert alert-warning text-center">No Question Banks Found</div>
      )}

      {!loading && !error && questionBanks.length > 0 && (
        <div className="d-flex flex-column gap-3">
          {questionBanks.map((bank, index) => (
            <Card key={bank._id} className="p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
              <div>
                <h5 className="mb-1">{bank.name}</h5>
                <p className="text-muted mb-0">Total Questions: {bank.questions.length}</p>
              </div>
              <Button style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                backgroundColor: "#FF3C00",
                color: "white",
              }} 
              variant="btn"
                onClick={() => window.location.href = `/previewquestionbank/${bank._id}`}
              >View Preview</Button>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ViewQuestionBank;
