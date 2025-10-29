import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminActions = ({ selectedAction }) => {
  const [date, setDate] = useState(new Date());
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch admin info from backend
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("SignIn Required");
      navigate("/");
      return;
    }

    try {
      const res = await axios.get("https://your-backend.onrender.com/api/auth/getuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ The backend returns admin object with fullName, email, role
      setAdmin(res.data.user);
      console.log("Fetched admin:", res.data.user);
    } catch (error) {
      alert("Failed to Fetch Admin Profile");
      console.error("Fetch admin error:", error.response?.data || error.message);
    }
  };

  // 🗓 Example schedule data
  const schedules = {
    "2025-08-18": ["Team Meeting - 10:00 AM", "Student Review - 2:00 PM"],
    "2025-08-19": ["Subject Allocation - 11:00 AM", "Admin Report - 4:00 PM"],
  };

  const formattedDate = date.toISOString().split("T")[0];
  const todaySchedules =
    schedules[formattedDate] || ["No schedules for this day"];

  // 🧩 Render main content
  const renderContent = () => {
    switch (selectedAction) {
      case "dashboard":
      case "manageResources":
      case "logout":
      default:
        return (
          <div>
            {/* 👤 Admin Profile */}
            <div className="d-flex align-items-center mb-4">
              <img
                src={admin?.avatar || "https://via.placeholder.com/60"}
                alt={admin?.fullName || "Admin"}
                className="rounded-circle me-3"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h5 className="mb-0 fw-bold">{admin?.fullName || "Admin"}</h5>
                <p className="text-muted mb-0">{admin?.role || "Administrator"}</p>
                {/* <small className="text-muted">{admin?.email}</small> */}
              </div>
            </div>

            {/* 📅 Calendar */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Select Date</h6>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* 🗓 Daily Schedules */}
            <div>
              <h6 className="fw-semibold mb-2">
                Schedules for {date.toDateString()}
              </h6>
              <ul className="list-group">
                {todaySchedules.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
    }
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default AdminActions;
