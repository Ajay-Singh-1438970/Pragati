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
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
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
      <div className="login-card light-theme">

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
              </div>
    </Modal>
  );
};

export default EditProfileModal;
