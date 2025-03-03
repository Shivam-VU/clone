import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHome = () => {
  return (
    <div className="container mt-5 vh-100">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted">Manage question banks efficiently</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body text-center">
              <h5 className="card-title text-dark fw-semibold">View Question Bank</h5>
              <p className="text-muted">Browse and manage existing question banks.</p>
              <a href="/viewquestionbank" className="btn btn-primary w-100">View</a>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body text-center">
              <h5 className="card-title text-dark fw-semibold">Upload Question Bank</h5>
              <p className="text-muted">Add new question banks easily.</p>
              <a href="/uploadquestionbank" className="btn btn-success w-100">Upload</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;