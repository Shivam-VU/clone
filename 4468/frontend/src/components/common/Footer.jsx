import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer d-flex px-4 justify-content-between" style={{ backgroundColor: "#98F600", padding: "10px", textAlign: "center", fontSize: "14px" }}>
      <p className="mb-0 py-4">COPYRIGHTS © 2024 VISTR. ALL RIGHTS RESERVED.</p>
      <div className="d-flex align-items-center justify-content-center bg-lime text-black py-2">
        <span className="fw-bold me-3">FOLLOW US ON</span>
        <a href="#" className="text-black mx-2 p-2 bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
          <FaFacebookF />
        </a>
        <a href="#" className="text-black mx-2 p-2 bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
          <FaLinkedinIn color="none" />
        </a>
        <a href="#" className="text-black mx-2 p-2 bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
          <FaXTwitter />
        </a>
        <a href="#" className="text-black mx-2 p-2 bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
}
