// src/components/NotesList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const NotesList = () => {
  const { subjectName } = useParams();

  // Dummy notes data (you can replace with API later)
  const notesData = [
    { id: 1, title: "Unit 1 Notes", author: "Prof. Sharma", url: "/pdfs/unit1_notes.pdf" },
    { id: 2, title: "Unit 2 Notes", author: "Dr. Verma", url: "/pdfs/unit2_notes.pdf" },
    { id: 3, title: "Unit 3 Notes", author: "Prof. Khan", url: "/pdfs/unit3_notes.pdf" },
  ];

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">{subjectName} - Notes</h2>
      <div className="row">
        {notesData.map((note) => (
          <div className="col-md-4 mb-3" key={note.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                  <small className="text-muted">By {note.author}</small>
                </Card.Text>
                <Button
                  variant="success"
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Notes
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">
          🔙 Back to {subjectName}
        </Link>
      </div>
    </div>
  );
};

export default NotesList;
