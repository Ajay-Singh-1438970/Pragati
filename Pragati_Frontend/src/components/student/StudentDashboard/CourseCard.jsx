import React from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import "./CourseCard.css";  // Import the custom CSS file

const CourseCard = ({ course }) => (
  <Card className="border-0 shadow-sm rounded-4 course-card">
    <Card.Img 
      variant="top" 
      src={course.image} 
      alt={course.title} 
      className="course-card-img" 
    />
    <Card.Body className="p-4 d-flex flex-column">
      <p className="text-primary fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>
        {course.category}
      </p>
      
      {/* This div makes the title/instructor section grow, pushing content below it to the bottom */}
      <div className="flex-grow-1">
        <Card.Title as="h3" className="mt-2 fs-6 fw-semibold">
          {course.title}
        </Card.Title>
        <Card.Text className="mt-1 text-muted small">
          {course.instructor}
        </Card.Text>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <span className="text-muted small">Progress</span>
          <span className="text-primary fw-semibold small">{course.progress}%</span>
        </div>
        <ProgressBar now={course.progress} style={{ height: '8px' }} />
      </div>

      <Button variant="primary" className="mt-4 w-100 fw-semibold">
        {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
      </Button>
    </Card.Body>
  </Card>
);

export default CourseCard;