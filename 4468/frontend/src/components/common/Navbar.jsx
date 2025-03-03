import React from "react";
import logo from "../../../public/images/vignanlogo.svg"

export default function Navbar() {
  return (
    <>
      {/* Green Bar with Tilted Left Edge */}
      <div className="d-flex" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div className="py-2 w-50 position-relative mx-auto">
          <p className="ps-4">విజ్ఞాన శాస్త్ర సాంకేతిక పరిశోధనా సంస్థ / विज्ञान शास्त्र प्रौद्योगिकी और परिशोधन संगठन</p>
        </div>
        <div className="py-2 w-50 ms-auto position-relative mx-auto" 
        style={{
          backgroundColor: "#98F600",
          clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)"
        }}>
        <div className="container d-flex justify-content-end">
          <a href="#" className="text-dark mx-2 text-decoration-none">International Students</a>
          <a href="#" className="text-dark mx-2 text-decoration-none">New Student</a>
          <a href="#" className="text-dark mx-2 text-decoration-none">Parent</a>
          <a href="#" className="text-dark mx-2 text-decoration-none">Alumni</a>
        </div>
      </div>
      </div>
      

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div className="container">
          <a className="navbar-brand text-danger fw-bold" href="/" style={{ fontFamily: "DM Serif Display, serif", fontSize: "28px" }}>
            <img src={logo} alt="Vignan's Logo" width="200" className="me-2" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">News</a></li>

              {/* Academics Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="academicsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Academics
                </a>
                <ul className="dropdown-menu" aria-labelledby="academicsDropdown">
                  <li><a className="dropdown-item" href="#">Programs</a></li>
                  <li><a className="dropdown-item" href="#">Faculties</a></li>
                  <li><a className="dropdown-item" href="#">Departments</a></li>
                  <li><a className="dropdown-item" href="#">Academic Calendar</a></li>
                </ul>
              </li>

              <li className="nav-item"><a className="nav-link" href="#">Admission</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Research</a></li>
              
              {/* People Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="peopleDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  People
                </a>
                <ul className="dropdown-menu" aria-labelledby="peopleDropdown">
                  <li><a className="dropdown-item" href="#">Faculty</a></li>
                  <li><a className="dropdown-item" href="#">Staff</a></li>
                  <li><a className="dropdown-item" href="#">Students</a></li>
                  <li><a className="dropdown-item" href="#">Leadership</a></li>
                </ul>
              </li>

              <li className="nav-item"><a className="nav-link" href="#">University Life</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
