import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsList } from "react-icons/bs";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div>
      {/* Hamburger Button (only visible when sidebar is closed) */}
      {!isOpen && (
        <button
          className="btn"
          style={{ zIndex: 1100 }}
          onClick={openSidebar}
        >
          <BsList size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className="position-fixed top-0 end-0 h-100"
        style={{
          width: "250px",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          backgroundColor: "#e9ecef", 
        }}
      >
        <SidebarHeader onClose={closeSidebar} />
        <SidebarNav active={active} setActive={setActive} />
        <SidebarFooter />
      </div>

      {/* Overlay Background */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
