// src/components/SubjectDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const SubjectDetails = () => {
  const { subjectName} = useParams(); // Get subject name from URL

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">{subjectName}</h2>
      <p className="text-center text-muted">
        Explore resources for <b>{subjectName}</b>
      </p>

      <div className="row justify-content-center">
        {/* Books */}
        <div className="col-md-3 mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>📚 Books</Card.Title>
              <Link to={`/resources/${subjectName}/books`}>
                <Button
                  as={Link}
                  to={`/subjects/${subjectName}/books`}
                  variant="primary"
                  className="mt-3"
                >
                  View Books
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* Notes */}
        <div className="col-md-3 mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>📝 Notes</Card.Title>
              <Link to={`/resources/${subjectName}/notes`}>
                <Button
                  as={Link}
                  to={`/subjects/${subjectName}/notes`}
                  variant="success"
                  className="mt-3"
                >
                  View Notes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* Question Papers */}
        <div className="col-md-3 mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>📄 Question Papers</Card.Title>
              <Link to={`/resources/${subjectName}/papers`}>
                <Button
                  as={Link}
                  to={`/subjects/${subjectName}/papers`}
                  variant="warning"
                  className="mt-3"
                >
                  View Papers
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <Link to="/resource" className="btn btn-outline-secondary">
          🔙 Back to Subjects
        </Link>
      </div>
    </div>
  );
};

export default SubjectDetails;
