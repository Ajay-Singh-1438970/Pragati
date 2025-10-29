import React, { useState } from 'react';
import { Navbar, Container, Form, InputGroup, Nav, Dropdown, Image, Button, Badge } from 'react-bootstrap';
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut, Award, Calendar, Mail } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

// NOTE: The 'notifications' array from your first snippet must be available in this component's scope.
const notifications = [
    { id: 1, icon: <Award size={20} className="text-warning"/>, text: 'You earned a new certificate!', time: '5m ago' },
    { id: 2, icon: <Calendar size={20} className="text-danger"/>, text: 'Project deadline is tomorrow.', time: '1h ago' },
    { id: 3, icon: <Mail size={20} className="text-primary"/>, text: 'New message from Dr. Angela Yu.', time: '1d ago' },
];

const Header = ({ user, setIsSidebarOpen, searchTerm, setSearchTerm }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const {logout} = useContext(AuthContext);

  console.log(user);
  


  // Custom Toggle for the Profile Dropdown to include the user avatar and name
  const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center text-decoration-none text-dark"
    >
      <Image src={user?.avatar} alt={user.fullName} roundedCircle style={{ width: '36px', height: '36px' }} />
      <div className="d-none d-sm-block ms-2 text-start">
        <div className="fw-semibold small">{user.fullName}</div>
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>Student</div>
      </div>
      <ChevronDown size={18} className="ms-2 text-muted" />
    </a>
  ));

  return (
    <Navbar bg="white" expand="lg" className="p-3 shadow-sm w-100" style={{ zIndex: 1020 }}>
      <Container fluid>
        {/* Hamburger Menu Button for Mobile */}
        <Button variant="link" className="p-0 d-lg-none text-secondary me-3" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </Button>

        {/* Search Bar */}
        <Form className="d-none d-md-block">
          <InputGroup>
            <InputGroup.Text>
              <Search size={18} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </Form>

        {/* Right-aligned Nav Items */}
        <Nav className="flex-row ms-auto d-flex align-items-center" style={{ gap: '1.25rem' }}>
          
          
          
          {/* Notifications Dropdown */}

          {/* <Dropdown show={isNotificationsOpen} onToggle={() => setNotificationsOpen(!isNotificationsOpen)} align="end">
            <Dropdown.Toggle as={Nav.Link} className="p-0 position-relative">
              <Bell size={22} />
              <Badge pill bg="danger" className="top-0 position-absolute start-100 translate-middle" style={{ padding: '0.2em 0.3em', fontSize: '0.5rem' }}>
                <span className="visually-hidden">New notifications</span>
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-2 shadow-lg" style={{ width: '320px' }}>
              <div className="p-3 fw-bold border-bottom">Notifications</div>
                {notifications.map(n => (
                  <Dropdown.Item key={n.id} className="gap-3 p-3 d-flex align-items-center">
                    {n.icon}
                    <div className="flex-grow-1">
                      <p className="mb-0 small">{n.text}</p>
                    </div>
                    <small className="text-muted">{n.time}</small>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown> */}

          {/* Profile Dropdown */}
          <Dropdown show={isProfileOpen} onToggle={() => setProfileOpen(!isProfileOpen)} align="end">
            <Dropdown.Toggle as={ProfileToggle} />
            <Dropdown.Menu className="mt-2 shadow-lg">
              <Dropdown.Item href="#" className="py-2 d-flex align-items-center">
                <User onClick={() => setActiveTab('Profile')} size={16} className="me-2" /> Profile 

                
                    
              </Dropdown.Item>
              <Dropdown.Item href="#" className="py-2 d-flex align-items-center">
                <Settings size={16} className="me-2" /> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  onClick={logout} href="/" className="py-2 d-flex align-items-center">
                <LogOut size={16} className="me-2"  /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;