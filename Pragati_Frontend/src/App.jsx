import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './components/student/StudentDashboard';
import Resource from './pages/Resource';
import SubjectDetails from './components/subjects/SubjectsDetails';
import ResourceList from './components/ResourceList';
import BooksList from "./components/BooksList";
import NotesList from './components/NotesList';
import PapersList from './components/PapersList';
import AdminPanel from './components/adminPanel/AdminPanel';
import Login from './components/Login';
import VerifyEmail from './components/verifyEmail';
import Profile from "./components/student/StudentDashboard/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ()=> {
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // ⬅️ added

  const handleLogin = async (email, password) => {   // ⬅️ added login handler
    try {
      const res = await fetch("https://pragati-2-0.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.data.status === 201) {
        localStorage.setItem("token", data.token); // save token
        // setIsLoggedIn(true);
        navigate("/student"); // redirect after login ⬅️ change route if needed

      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      // console.error(err);
      console.log("Please Sign Up!! , You are not a registered user");
    }
  };

  const handleLogout = () => {   // ⬅️ added logout handler
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/resource' element={<Resource />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ⬅️ Added Login route */}
        <Route path="/login" element={<Login/>} />
        <Route path="/verify/:token" element={<VerifyEmail />} />


        {/* Protected routes example */}
        {/* <Route path="/student" element={isLoggedIn ? <StudentDashboard /> : <Login />} />
       */}
       <Route path='/student' element={<StudentDashboard/>}/>

        <Route path="/subjects/:subjectName" element={<SubjectDetails />} />
        <Route path="/subjects/:subjectName/:type" element={<ResourceList />} />
        <Route path="/subjects/:subjectName/books" element={<BooksList />} />
        <Route path="/subjects/:subjectName/notes" element={<NotesList />} />
        <Route path="/subjects/:subjectName/papers" element={<PapersList />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
