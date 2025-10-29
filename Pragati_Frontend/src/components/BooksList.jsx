// src/components/BooksList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const booksData = {
  Math: [
    { title: "Algebra Fundamentals", author: "R.D. Sharma", url: "/books/algebra.pdf" },
    { title: "Calculus Made Easy", author: "Thomas", url: "/books/calculus.pdf" },
  ],
  Physics: [
    { title: "Concepts of Physics", author: "H.C. Verma", url: "/books/hcverma.pdf" },
  ],
  // Add more subjects here
};

const BooksList = () => {
  const { subjectName } = useParams();
  const books = booksData[subjectName] || [];

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">{subjectName} Books</h2>

      {books.length > 0 ? (
        <ul className="list-group">
          {books.map((book, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <b>{book.title}</b> <br />
                <small className="text-muted">by {book.author}</small>
              </span>
              <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                Open PDF
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted">No books found for {subjectName}.</p>
      )}

      <div className="text-center mt-4">
        <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">
          🔙 Back to {subjectName} Resources
        </Link>
      </div>
    </div>
  );
};

export default BooksList;
