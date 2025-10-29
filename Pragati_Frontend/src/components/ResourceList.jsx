// src/components/ResourceList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const ResourceList = ({ subjectName, type }) => {
  // const { subjectName, type } = useParams();

  console.log(subjectName, type);
  
  // Dummy Data (replace later with API or DB)
  // const resources = {
  //   books: [
  //     { title: "Computer Networks", author: "Andrew Tanenbaum", link: "/pdfs/computer-networks.pdf" },
  //     { title: "Operating System Concepts", author: "Silberschatz", link: "/pdfs/os-concepts.pdf" }
  //   ],
  //   notes: [
  //     { title: "DBMS Notes", link: "/pdfs/dbms-notes.pdf" },
  //     { title: "Compiler Notes", link: "/pdfs/compiler-notes.pdf" }
  //   ],
  //   papers: [
  //     { title: "CN Question Paper 2022", link: "/pdfs/cn-paper.pdf" },
  //     { title: "OS Question Paper 2021", link: "/pdfs/os-paper.pdf" }
  //   ]
  // };

  return (
    <div className="container my-5">
      {/* <h3 className="fw-bold text-center mb-4">
        {type.charAt(0).toUpperCase() + type.slice(1)} for {subjectName}
      </h3> */}

      <div className="row">
        {resources[type]?.map((item, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {type === "books" && <p className="text-muted">Author: {item.author}</p>}
                <Button
                  variant="primary"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  Open PDF
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">🔙 Back to {subjectName}</Link>
      </div>
    </div>
  );
};

export default ResourceList;
