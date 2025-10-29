import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import student from "../../../assets/images/student.png";
import Subjects from "../../subjects/Subjects";
import AddSubject from "../AddSubject";

const AdminContent = ({ selectedAction, setSelectedAction }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("SignIn Required");
        navigate("/");
        return;
      }
      try {
        const res = await axios.get("https://pragati-ifax.onrender.com/api/auth/getuser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(res.data.user);
        console.log("Fetched admin:", res.data.user);
      } catch (error) {
        alert("Failed to Fetch Admin Profile");
        console.error("Fetch admin error:", error.response?.data || error.message);
      }
    };
    fetchAdmin();
  }, [navigate]);

  // ✅ Handle Logout
  useEffect(() => {
    if (selectedAction === "logout") {
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/");
      }, 1000); // delay for UX (show "Logging out..." briefly)
    }
  }, [selectedAction, navigate]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-3" style={{ height: "100%", overflow: "hidden" }}>
      {selectedAction === "dashboard" && (
        <>
          <h4
            className="fw-bold text-primary mb-3"
            style={{
              display: "inline-block",
              paddingBottom: "6px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              borderBottom: "3px solid #667eea",
            }}
          >
            Dashboard
          </h4>

          <p className="text-secondary">{currentDate}</p>

          <div
            className="d-flex justify-content-between align-items-center p-4 mt-3"
            style={{
              // background: "linear-gradient(135deg, #6a6c79ff, #544ba2ff)",
              // color: "white",
              // borderRadius: "15px",
              // boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ maxWidth: "60%" }}>
              <h2>Hello, {admin.fullName || "Admin"} 👋</h2>
              <p className="mt-2">
                Welcome back! Hope you're having a great day. Here you can
                manage your resources and keep track of everything easily.
              </p>
            </div>

            <div>
              <img
                src={student}
                alt="Student at desk"
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </div>
          </div>
        </>
      )}

      {selectedAction === "resources" && (
        <div style={{ overflowY: "auto", background: "#fff", height: "100%", scrollbarWidth : "none" }}>
          <Subjects />
        </div>
      )}

      {selectedAction === "manageResources" && (
        <div style={{ overflowY: "auto", background: "#fff", height: "100%", scrollbarWidth : "none" }}>
          <AddSubject />
        </div>
      )}


      {selectedAction === "logout" && (
        <div className="text-center mt-5">
          <h3>Logging out...</h3>
          <p className="text-muted">Please wait a moment.</p>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
