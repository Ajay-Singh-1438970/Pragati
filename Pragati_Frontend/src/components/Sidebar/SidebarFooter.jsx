import React, { useContext } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // <-- import
import { AuthContext } from "../../AuthProvider";

const SidebarFooter = () => {
  const navigate = useNavigate();

  const {logout} = useContext(AuthContext);

  // const handleLogout = () => {
  //   // clear user session if needed (e.g. localStorage.clear())
  //   // localStorage.removeItem("token"); 
  //   navigate("/"); // <-- redirects to main home page
  // };

  return (
    <div className="p-3 border-top border-secondary">
      <button
        className="btn btn-outline-light text-dark w-100 d-flex align-items-center gap-2"
        onClick={logout}
      >
        <BsBoxArrowRight /> Logout
      </button>
    </div>
  );
};

export default SidebarFooter;
