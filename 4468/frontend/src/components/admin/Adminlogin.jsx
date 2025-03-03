import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import serverurl from "../../constants/serverurl";

// Include Google Fonts (DM Serif Display & Roboto)
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto:wght@400;500&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    const response = await fetch(`${serverurl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      console.log(data);
      localStorage.setItem("token",data.token);
      localStorage.setItem("isAdmin",true);
      window.location.href = "/";
    } else {
      console.log(data.msg);
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
            Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-3 row align-items-center">
            <label
              className="col-md-4 col-form-label fw-semibold text-end"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
            >
              Email
            </label>
            <div className="col-md-6">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Password
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

