import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./ContactCard.css"; // We'll add CSS separately

const ContactCard = () => {
  return (
    <div className="contact-container">
      {/* Location */}
      <div className="contact-card">
        <div className="icon location">
          <FaMapMarkerAlt />
        </div>
        <div>
          <h3>Our Location</h3>
          <p>Anand Nagar, Bhopal, MP India - 462022</p>
        </div>
      </div>

      {/* Phone */}
      <div className="contact-card">
        <div className="icon phone">
          <FaPhoneAlt />
        </div>
        <div>
          <h3>Phone Numbers</h3>
          <p>+91 965xxxxx45 <br /> +91 834xxxxxx14</p>
        </div>
      </div>

      {/* Email */}
      <div className="contact-card">
        <div className="icon email">
          <FaEnvelope />
        </div>
        <div>
          <h3>Email Address</h3>
          <p>pragati.edunet@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
