import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./adminPage/AdminSidebar";
import AdminContent from "./adminPage/AdminContent";
import AdminActions from "./adminPage/AdminActions";
import Header from "../Header";

const AdminPanel = () => {
  const [selectedAction, setSelectedAction] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column flex-grow-1" style={{ height: '100vh', overflow: 'hidden' }}>
      <Header
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="d-flex" style={{ overflow: "auto" }}>
        
        {/* Left Sidebar */}
        <div
          style={{
          width: "250px",
          background: "#f8f9fa",
          borderRight: "1px solid #ddd",
          // overflowY: "auto",
        }}
        className="no-scrollbar"
      >
        <AdminSidebar setSelectedAction={setSelectedAction} />
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          // overflowY: "auto",
          background: "#fff",
        }}
        className="no-scrollbar"
      >
        <AdminContent
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: "315px",
          background: "#f1f1f1",
          borderLeft: "1px solid #ddd",
          padding: "10px",
          // overflowY: "auto",
        }}
        className="no-scrollbar"
      >
        <AdminActions setSelectedAction={setSelectedAction} />
        <p>Some extra details can go here.</p>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
     </div>
  );
};

export default AdminPanel;
