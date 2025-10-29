import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// ✅ STEP 1: Change the props to accept `show` and `handleClose`
const EditProfileModal = ({ user, setUser, show, handleClose }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData);
        handleClose(); // Use handleClose to close the modal
    };
    
    return (
        // ✅ STEP 2: Use the `show` prop here
        <Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton className="bg-white">
    <Modal.Title as="h2" className="fs-5 fw-bold">Edit Profile</Modal.Title>
  </Modal.Header>

  <Form onSubmit={handleSubmit}>
    <Modal.Body className="bg-white">
      <Form.Group className="mb-3" controlId="formProfileAvatar">
        <Form.Label className="fw-medium small">AvatarURL</Form.Label>
        <Form.Control 
          type="URL" 
          name="AvatarURL" 
          value={formData.AvatarURL} 
          onChange={handleChange}
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formProfileName">
        <Form.Label className="fw-medium small">Name</Form.Label>
        <Form.Control 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formProfileEmail">
        <Form.Label className="fw-medium small">Email</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formProfileBio">
        <Form.Label className="fw-medium small">Bio</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          name="bio"
          value={formData.bio} 
          onChange={handleChange}
        />
      </Form.Group>
    </Modal.Body>
    
    <Modal.Footer className="bg-white">
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Modal.Footer>
  </Form>
</Modal>

    );
};

export default EditProfileModal;