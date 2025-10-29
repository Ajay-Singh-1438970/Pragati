// src/components/PapersList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const PapersList = () => {
  const { subjectName } = useParams();

  // Dummy papers data (replace with API later)
  // const papersData = [
  //   { id: 1, title: "Midterm 2023", author: "University", url: "/pdfs/midterm2023.pdf" },
  //   { id: 2, title: "Endterm 2022", author: "University", url: "/pdfs/endterm2022.pdf" },
  //   { id: 3, title: "Previous Year 2021", author: "University", url: "/pdfs/prevyear2021.pdf" },
  // ];

  return (
    <div className="container my-5">
      {/* <h2 className="fw-bold text-center mb-4">{subjectName} - Question Papers</h2>
      <div className="row">
        {papersData.map((paper) => (
          <div className="col-md-4 mb-3" key={paper.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{paper.title}</Card.Title>
                <Card.Text>
                  <small className="text-muted">Source: {paper.author}</small>
                </Card.Text>
                <Button
                  variant="warning"
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Paper
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div> */}

      {/* Back Button */}
      <div className="text-center mt-4">
        <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">
          🔙 Back to {subjectName}
        </Link>
      </div>
    </div>
  );
};

export default PapersList;
