import React from 'react';
import { Image, ProgressBar } from 'react-bootstrap';

const ContinueLearningItem = ({ course }) => (
  <a href="#" className="gap-4 p-3 bg-white shadow-sm d-flex align-items-center rounded-4 text-dark text-decoration-none learning-item">
    
    {/* Image */}
    <Image 
      src={course.image} 
      alt={course.title} 
      className="flex-shrink-0 rounded-3 learning-item-img" 
    />

    {/* Content */}
    <div className="flex-grow-1">
      <p className="mb-1 small fw-semibold text-primary text-uppercase">
        {course.category}
      </p>
      <h4 className="mt-1 mb-0 fs-6 fw-semibold">
        {course.title}
      </h4>
      
      {/* Progress Bar */}
      <div className="mt-2">
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <span className="small text-muted">Progress</span>
          <span className="small fw-semibold text-primary">{course.progress}%</span>
        </div>
        <ProgressBar now={course.progress} style={{ height: '8px' }} />
      </div>
    </div>
  </a>
);

export default ContinueLearningItem;