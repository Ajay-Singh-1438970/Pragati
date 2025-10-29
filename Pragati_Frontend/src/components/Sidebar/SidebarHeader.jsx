import React from "react";
import Logo from "../../assets/Logo.png";
import { BsX } from "react-icons/bs";

const SidebarHeader = ({ onClose }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
      <span className="fs-4 fw-bold"><img className='mx-3' style={{ width: '50px', height: '50px' }} src={Logo} alt="logo" /></span>
      <button className="btn btn-sm btn-outline-dark" onClick={onClose}>
        <BsX size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
