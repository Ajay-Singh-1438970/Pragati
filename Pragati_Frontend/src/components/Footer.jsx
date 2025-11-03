import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import axios from "axios";


const Footer = () => {
const [userCount, setUserCount] = useState(null);

useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data } = await axios.get("https://pragati-2-0.onrender.com/api/users/count");
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUserCount();
  }, []);


return (
<footer className="footer-custom pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="small text-light">
              We provide well-organized, semester-wise notes for B.Tech students
              to make learning easier and effective.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/resource" className="footer-link">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4 text-light">
            <h5 className="fw-bold mb-3 text-light">Contact</h5>
            <p className="small mb-1 text-light">📍 Bhopal, India</p>
            <p className="small mb-1 text-light">📧 pragati.edunet@gmail.com</p>
            <p className="small text-light">📞 +91 9876543210</p>
          </div>

          {/* Social Links */}
          <div className="col-md-3 mb-4 text-light">
            <h5 className="fw-bold mb-3 text-light">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="fs-4 footer-icon">
                <FaFacebook />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaTwitter />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaLinkedin />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaInstagram />
              </a>
            </div>

            {/* Registered User Count */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <p className="text-center mb-2 small text-light pt-3">
                👥 Registered Users:{" "}
                <strong>{userCount !== null ? userCount : "Loading..."}</strong>
              </p>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom Line */}
        <p className="text-center mb-1 small text-light">
          © {new Date().getFullYear()} <strong>Pragati</strong>. All rights
          reserved.
        </p>
        <p className="text-center mb-0 small text-light">
          Designed with <span style={{ color: "red" }}>❤️</span> by{" "}
          <strong className="text-gradient">Pragati Team</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
