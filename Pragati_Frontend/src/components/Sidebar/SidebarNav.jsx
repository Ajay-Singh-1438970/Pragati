import React from "react";
import { BsHouse, BsPerson, BsShare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SidebarNav = ({ active, setActive }) => {
  const navigate = useNavigate();

  // Try to read role and token
  const role = sessionStorage.getItem("role");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
  const handleProfileClick = () => {
    setActive("Profile");
    if (role === "admin") {
      navigate("/admin/profile");
    } else if (token) {
      navigate("/student/profile");
    } else {
      alert("⚠️ Please login first!");
    }
  };

  const handleDashboardClick = () => {
    setActive("Dashboard");

    if (role === "admin") {
      navigate("/admin");
    } else if (token) {
      // ✅ If user is logged in but no role, assume "user"
      navigate("/student");
    } else {
      alert("⚠️ Please login first!");
    }
  };

  const handleShareClick = () => {
    setActive("share");
    if (navigator.share) {
      navigator.share({
        title: "Check out Pragati Platform!",
        text: "I found this awesome educational website.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("🔗 Link copied to clipboard!");
    }
  };

  return (
    <nav className="p-3 flex-grow-1">
      <ul className="gap-2 nav nav-pills flex-column">
        <li className="nav-item">
          <a
            href="/"
            className={`btn w-100 d-flex align-items-center gap-2 ${
              active === "Home" ? "btn-primary text-white" : "btn-outline-light text-dark"
            }`}
            onClick={() => setActive("Home")}
          >
            <BsHouse /> Home
          </a>
        </li>

        <li className="nav-item">
          <button
            className={`btn w-100 d-flex align-items-center gap-2 ${
              active === "Profile" ? "btn-primary text-white" : "btn-outline-light text-dark"
            }`}
            onClick={handleProfileClick}
          >
            <BsPerson /> Profile
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`btn w-100 d-flex align-items-center gap-2 ${
              active === "Dashboard" ? "btn-primary text-white" : "btn-outline-light text-dark"
            }`}
            onClick={handleDashboardClick}
          >
            <BsPerson /> Dashboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`btn w-100 d-flex align-items-center gap-2 ${
              active === "share" ? "btn-primary text-white" : "btn-outline-light text-dark"
            }`}
            onClick={handleShareClick}
          >
            <BsShare /> Share
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
