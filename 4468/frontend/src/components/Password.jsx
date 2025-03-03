import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import serverurl from "../constants/serverurl";

// Include Google Fonts (DM Serif Display & Roboto)
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto:wght@400;500&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

export default function PasswordSetup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("userToBeCreated")){
      window.location.href = "/";
    }
    const email = localStorage.getItem("userToBeCreated");
    setEmail(email);
    console.log(email);
  }, []);

  const validateForm = () => {
    if (password === "" || confirmPassword === "") {
      setError("Please fill all the fields!");
      return false;
    }
    // Email validation, and Password should be minimum 8 characters, at least one upper case, at least one lower case, at least one number and at least one Special characters which includes ~@#$%&*
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(emailRegex.test(email)){
    //   setError("Invalid Email");
    //   console.log(email)
    //   return false;
    // } 
    if (password === "" || confirmPassword === "") {
      setError("Please fill all the fields!");
      return false;
    }
    // validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password should be minimum 8 characters, at least one upper case, at least one lower case, at least one number and at least one Special characters which includes ~@#$%&*");
      return false
    }

    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }

    // Call the API to create a new user
    const response = await fetch(`${serverurl}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      localStorage.removeItem("userToBeCreated");
      window.location.href = "/";
    } else {

      setError("Error in creating user!");
    }

  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "28px",
              display: "inline-block",
              borderBottom: "4px solid red",
            }}
          >
            Password Setup
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-3 row align-items-center">
            <label
              className="col-md-4 col-form-label fw-semibold text-end"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
            >
              Password :
            </label>
            <div className="col-md-6">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
              />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label
              className="col-md-4 col-form-label fw-semibold text-end"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
            >
              Confirm Password :
            </label>
            <div className="col-md-6">
              <input
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                required
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
              />
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

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
  );
}
