import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { HouseDoorFill, BookFill, BoxArrowRight, CollectionFill } from "react-bootstrap-icons"; // Added CollectionFill for Resources
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";

const AdminSidebar = ({ setSelectedAction }) => {

  const { logout } = useContext(AuthContext)

  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-3"
      style={{
        background: "linear-gradient(180deg, #3f3d3dc4, #555656ba)",
        color: "white",
        width: "250px",
      }}
    >
      {/* Sidebar Header */}
      {/* <div className="mb-4 text-center fw-bold border-bottom pb-2 d-flex align-items-center justify-content-center">
        <h4 className="mb-0 admin-title" onClick={()=> navigate('/')}>Admin Panel</h4>
      </div> */}

      {/* Sidebar Menu */}
      <ListGroup variant="flush" className="flex-grow-1">
        <ListGroup.Item
          action
          className="d-flex align-items-center sidebar-item"
          onClick={() => {setSelectedAction("dashboard")}}
        >
          <HouseDoorFill className="me-2" size={18} /> Dashboard
        </ListGroup.Item>

        <ListGroup.Item
          action
          className="d-flex align-items-center sidebar-item"
          onClick={() => setSelectedAction("resources")}
        >
          <CollectionFill className="me-2" size={18} /> Resources
        </ListGroup.Item>

        <ListGroup.Item
          action
          className="d-flex align-items-center sidebar-item"
          onClick={() => setSelectedAction("manageResources")}
        >
          <BookFill className="me-2" size={18} /> Manage Resources
        </ListGroup.Item>

        <ListGroup.Item
          action
          className="d-flex align-items-center sidebar-item mt-auto"
          onClick={()=> handleLogout()}
        >
          <BoxArrowRight className="me-2" size={18}/> Logout
        </ListGroup.Item>
      </ListGroup>

      {/* Footer */}
      <div className="text-center mt-3 small" style={{ opacity: 0.8 }}>
        © 2025 Admin
      </div>

      {/* Custom CSS */}
      <style>{`
        .sidebar-item {
          background: transparent;
          color: white;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          margin-bottom: 8px;
          transition: all 0.3s ease-in-out;
        }

        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .admin-title {
          color: #ffdd57;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;
