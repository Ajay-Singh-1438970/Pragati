import React from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Home, BookOpen, BarChart2, User, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';

// --- REUSABLE COMPONENT (CONVERTED TO BOOTSTRAP) ---

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'My Courses', icon: <BookOpen size={20} /> },
    { name: 'Grades', icon: <BarChart2 size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
  ];

  const handleClose = () => setIsOpen(false);
  
  const {logout} = useContext(AuthContext);
  
  const sidebarContent = (
    <>
      {/* Sidebar Header */}
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fs-5 fw-bold text-primary">
          Pragati Dashboard
        </Offcanvas.Title>
      </Offcanvas.Header>

      {/* Sidebar Body */}
      <Offcanvas.Body className="p-2 d-flex flex-column">
        {/* Navigation Links */}
        <Nav
          variant="pills"
          className="flex-column"
          activeKey={activeTab}
          onSelect={(selectedKey) => {
            setActiveTab(selectedKey);
            handleClose();
          }}
        >
          {navItems.map((item) => (
            <Nav.Item key={item.name}>
              <Nav.Link eventKey={item.name} className="p-3 my-1 d-flex align-items-center">
                {item.icon}
                <span className="ms-3">{item.name}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Logout Link (pushed to the bottom) */}
        <Nav className="mt-auto flex-column" >
           <Nav.Link href="/" className="p-3 my-1 d-flex align-items-center text-dark" >
             <LogOut size={20} />
             <span onClick={logout} className="ms-3" >Logout</span>
           </Nav.Link>
        </Nav>

      </Offcanvas.Body>
    </>
  );

  return (
    <>
      <Offcanvas show={isOpen} onHide={handleClose} responsive="lg" placement="start" className="shadow-lg" style={{ width: '260px' }}>
        {sidebarContent}
      </Offcanvas>
    </>
  );
};

export default Sidebar; // Assuming you export it