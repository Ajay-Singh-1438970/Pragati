// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// // ✅ STEP 1: Change the props to accept `show` and `handleClose`
// const EditProfileModal = ({ user, setUser, show, handleClose }) => {
//     const [formData, setFormData] = useState(user);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setUser(formData);
//         handleClose(); // Use handleClose to close the modal
//     };
    
//     return (
//         // ✅ STEP 2: Use the `show` prop here
//         <Modal show={show} onHide={handleClose} centered>
//   <Modal.Header closeButton className="bg-white">
//     <Modal.Title as="h2" className="fs-5 fw-bold">Edit Profile</Modal.Title>
//   </Modal.Header>

//   <Form onSubmit={handleSubmit}>
//     <Modal.Body className="bg-white">
//       <Form.Group className="mb-3" controlId="formProfileAvatar">
//         <Form.Label className="fw-medium small">AvatarURL</Form.Label>
//         <Form.Control 
//           type="URL" 
//           name="AvatarURL" 
//           value={formData.AvatarURL} 
//           onChange={handleChange}
//         />
//       </Form.Group>
      
//       <Form.Group className="mb-3" controlId="formProfileName">
//         <Form.Label className="fw-medium small">Name</Form.Label>
//         <Form.Control 
//           type="text" 
//           name="name" 
//           value={formData.name} 
//           onChange={handleChange}
//         />
//       </Form.Group>
      
//       <Form.Group className="mb-3" controlId="formProfileEmail">
//         <Form.Label className="fw-medium small">Email</Form.Label>
//         <Form.Control 
//           type="email" 
//           name="email" 
//           value={formData.email} 
//           onChange={handleChange} 
//         />
//       </Form.Group>
      
//       <Form.Group className="mb-3" controlId="formProfileBio">
//         <Form.Label className="fw-medium small">Bio</Form.Label>
//         <Form.Control 
//           as="textarea" 
//           rows={3}
//           name="bio"
//           value={formData.bio} 
//           onChange={handleChange}
//         />
//       </Form.Group>
//     </Modal.Body>
    
//     <Modal.Footer className="bg-white">
//       <Button variant="secondary" onClick={handleClose}>
//         Cancel
//       </Button>
//       <Button variant="primary" type="submit">
//         Save Changes
//       </Button>
//     </Modal.Footer>
//   </Form>
// </Modal>

//     );
// };

// export default EditProfileModal;

import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify"; // optional for better UX

const EditProfileModal = ({ show, handleClose, user, setUser }) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    password: "",
    avatar: user?.avatar || user?.profileImg || "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // save profile updates
  const handleSave = async () => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setUser(data.updatedUser); // update parent profile
        toast?.success("Profile updated successfully!");
      } else {
        toast?.error("Failed to update profile");
      }

      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      toast?.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </Form.Group>

          {/* Avatar URL */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Image URL</Form.Label>
            <Form.Control
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
            {formData.avatar && (
              <div className="text-center mt-3">
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
