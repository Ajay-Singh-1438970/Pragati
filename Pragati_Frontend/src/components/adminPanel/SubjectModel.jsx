import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SubjectModal = ({
  show,
  handleClose,
  handleSave,
  subjectData,
  handleChange,
  isEdit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-white">
        <Modal.Title>{isEdit ? "Edit Subject" : "Add Subject"}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-white">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Semester</Form.Label>
            <Form.Select
              name="semester"
              value={subjectData.semester || ""}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title / Name</Form.Label>
            <Form.Control
              name="name"
              value={subjectData.name || ""}
              onChange={handleChange}
              placeholder="Enter subject name"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={subjectData.type || ""}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Book">Book</option>
              <option value="Notes">Notes</option>
              <option value="Paper">Paper</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>File Link (Google Drive / URL)</Form.Label>
            <Form.Control
              type="text"
              name="fileUrl"
              value={subjectData.fileUrl || ""}
              onChange={handleChange}
              placeholder="Paste your Google Drive or file link here"
            />
            <Form.Text className="text-muted">
              Make sure your Google Drive link is public or set to “Anyone with the link can view.”
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="bg-white">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isEdit ? "Save Changes" : "Add Subject"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubjectModal;
