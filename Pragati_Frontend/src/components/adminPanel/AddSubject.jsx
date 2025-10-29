import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import SubjectModal from "./SubjectModel";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

const AddSubject = () => {
  const { token } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({
    semester: "",
    name: "",
    type: "",
    fileUrl: "", // now using link instead of file object
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("All");

  // Fetch subjects from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get("https://pragati-ifax.onrender.com/api/materials", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching materials:", error.response?.data || error.message);
      }
    };
    if (token) fetchMaterials();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((s) => ({ ...s, [name]: value }));
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setNewSubject({ semester: "", name: "", type: "", fileUrl: "" });
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const subjectToEdit = subjects.find((sub) => sub._id === id);
    if (!subjectToEdit) return;
    setIsEdit(true);
    setEditId(id);
    setNewSubject({
      semester: subjectToEdit.semester || "",
      name: subjectToEdit.title || subjectToEdit.name || "",
      type: subjectToEdit.type || "",
      fileUrl: subjectToEdit.fileUrl || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!newSubject.semester || !newSubject.name || !newSubject.type || !newSubject.fileUrl) {
      alert("Please fill all fields including the file link.");
      return;
    }

    try {
      const payload = {
        title: newSubject.name,
        subject: newSubject.name,
        semester: newSubject.semester,
        type: newSubject.type,
        fileUrl: newSubject.fileUrl, // directly send link
      };

      let response;
      if (isEdit) {
        response = await axios.put(
          `https://pragati-ifax.onrender.com/api/materials/${editId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubjects((prev) =>
          prev.map((sub) =>
            sub._id === editId ? response.data.updatedMaterial : sub
          )
        );
      } else {
        response = await axios.post(
          "https://pragati-ifax.onrender.com/api/materials/add",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubjects((prev) => [...prev, response.data.newMaterial]);
      }

      setShowModal(false);
      setNewSubject({ semester: "", name: "", type: "", fileUrl: "" });
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving material:", error.response?.data || error.message);
      alert("Failed to save material! See console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material?")) return;
    try {
      await axios.delete(`https://pragati-ifax.onrender.com/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error deleting material:", error.response?.data || error.message);
      alert("Failed to delete material!");
    }
  };

  const filteredSubjects =
    selectedSemester === "All"
      ? subjects
      : subjects.filter((sub) => sub.semester === selectedSemester);

  return (
    <Container className="mt-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>📚 Resources</h2>
        </Col>
        <Col md="4">
          <Form.Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="All">All Semesters</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}st`}>
                {i + 1} Semester
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAddClick}>
            ➕ Add Subject / Link
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Semester</th>
                <th>Subject Name</th>
                <th>Type</th>
                <th>File Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub, index) => (
                  <tr key={sub._id || index}>
                    <td>{index + 1}</td>
                    <td>{sub.semester || "-"}</td>
                    <td>{sub.title || sub.name}</td>
                    <td>{sub.type || "N/A"}</td>
                    <td>
                      {sub.fileUrl ? (
                        <a
                          href={sub.fileUrl.startsWith("http") ? sub.fileUrl : `https://pragati-ifax.onrender.com${sub.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(sub._id)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(sub._id)}
                      >
                        ❌ Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No subjects found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <SubjectModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        subjectData={newSubject}
        handleChange={handleChange}
        isEdit={isEdit}
      />
    </Container>
  );
};

export default AddSubject;
