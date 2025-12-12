import React, { useEffect, useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import SubjectModal from "../adminPanel/SubjectModel"; // Admin add/edit modal
import "./Subjects.css";

const Subjects = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({
    semester: "",
    name: "",
    type: "",
    fileUrl: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  // Fetch materials from backend
  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/materials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMaterials();
  }, [token]);

  // Handle change in modal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMaterial((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for editing
  const handleEdit = (material) => {
    setIsEdit(true);
    setSelectedMaterial({
      _id: material._id,
      semester: material.semester || "",
      name: material.title || material.name || "",
      type: material.type || "",
      fileUrl: material.fileUrl || "",
    });
    setShowModal(true);
  };

  // Save changes (edit or add)
  const handleSave = async () => {
    if (
      !selectedMaterial.semester ||
      !selectedMaterial.name ||
      !selectedMaterial.type ||
      !selectedMaterial.fileUrl
    ) {
      alert("Please fill all fields including the file link.");
      return;
    }

    try {
      const payload = {
        title: selectedMaterial.name,
        subject: selectedMaterial.name,
        semester: selectedMaterial.semester,
        type: selectedMaterial.type,
        fileUrl: selectedMaterial.fileUrl,
      };

      if (isEdit) {
        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/materials/${selectedMaterial._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMaterials((prev) =>
          prev.map((mat) =>
            mat._id === selectedMaterial._id ? data.updatedMaterial : mat
          )
        );
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/materials/add`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMaterials((prev) => [...prev, data.newMaterial]);
      }

      setShowModal(false);
      setIsEdit(false);
      setSelectedMaterial({
        semester: "",
        name: "",
        type: "",
        fileUrl: "",
      });
    } catch (error) {
      console.error("Error saving material:", error.response?.data || error);
      alert("Failed to save changes. Check console for details.");
    }
  };

  const handleView = async (material) => {
  const userId = JSON.parse(sessionStorage.getItem("user"));
  if (!userId.id) {
    alert("User not logged in");
    return;
  }

  // 1️⃣ Update recent files in backend
  try {    
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recentFiles`, {
      userId: userId.id,
      fileId: material._id,
      fileName: material.title,
      fileUrl: material.fileUrl,
    });
  } catch (error) {
    console.error("Error updating recent files:", error);
  }

  // 2️⃣ Open the file
  window.open(
    material.fileUrl.startsWith("http")
      ? material.fileUrl
      : `${import.meta.env.VITE_BACKEND_URL}${material.fileUrl}`,
    "_blank"
  );
};


  // Group materials by semester
  const groupedBySemester = materials.reduce((acc, mat) => {
    if (!acc[mat.semester]) acc[mat.semester] = [];
    acc[mat.semester].push(mat);
    return acc;
  }, {});

  // Filter subjects
  const filterSubjects = (subjects) =>
    subjects.filter((sub) => {
      const matchesTitle = sub.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? sub.type === typeFilter : true;
      return matchesTitle && matchesType;
    });

  if (loading) {
    return (
      <div className="text-center">
        <div className="d-flex vh-100 vw-100 justify-content-center align-items-center text-center flex-column">
          <div className="p-4 border border-danger rounded mb-3">
            <div className="spinner-border text-brown" role="status">
              <span> ☢️</span>
            </div>
            Checking Authentication
            <div className="spinner-border text-brown" role="status">
              <span> ☢️</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3 " >
      {/* Header + Filters */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h2>Subjects / Resources</h2>
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px" }}
        />
        <Form.Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ width: "150px" }}
        >
          <option value="">All Types</option>
          <option value="Notes">Notes</option>
          <option value="Book">Book</option>
          <option value="Paper">Paper</option>
        </Form.Select>
      </div>

      {/* Semester-wise cards */}
      {Object.keys(groupedBySemester).map((sem, index) => {
        const filtered = filterSubjects(groupedBySemester[sem]);
        if (filtered.length === 0) return null;

        return (
          <div key={index} className="mb-4">
            <h4 className="text-start mb-3">Semester {sem}</h4>
            <div className="scroll-container d-flex pb-4 flex-wrap gap-3">
              {filtered.map((mat) => (
                <Card
                  key={mat._id}
                  className="shadow-sm text-center"
                  style={{ width: "200px", cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="mb-2">{mat.title}</Card.Title>
                      <p className="text-muted small mb-2">{mat.type}</p>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(mat)}
                      >
                        View File
                      </Button>
                      {role === "admin" && (
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(mat)}
                        >
                          ✏️ Edit
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Admin Modal */}
      {role === "admin" && (
        <SubjectModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
          subjectData={selectedMaterial}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default Subjects;
