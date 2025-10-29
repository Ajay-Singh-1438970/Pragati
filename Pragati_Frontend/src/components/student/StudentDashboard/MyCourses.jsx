import React, { useState } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
// Make sure CourseCard is imported from its file
import CourseCard from './CourseCard'; 

const MyCourses = ({ courses }) => {
    const [filter, setFilter] = useState('All');

    // The filtering logic remains exactly the same
    const filteredCourses = courses.filter(course => {
        if (filter === 'In Progress') return course.progress > 0 && course.progress < 100;
        if (filter === 'Completed') return course.progress === 100;
        return true; // 'All'
    });

    return (
        <div>
            {/* Header with Title and Filters */}
            <div className="gap-3 mb-4 d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                <h2 className="mb-0 h3 fw-bold text-dark">My Courses</h2>
                
                {/* Filter Buttons */}
                <Nav 
                    variant="pills" 
                    activeKey={filter} 
                    onSelect={(selectedKey) => setFilter(selectedKey)}
                    className="p-1 bg-light rounded-3"
                >
                    {['All', 'In Progress', 'Completed'].map(f => (
                        <Nav.Item key={f}>
                            <Nav.Link eventKey={f} className="fw-semibold small">
                                {f}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
            
            {/* Courses Grid */}
            <Row className="g-4">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <Col key={course.id} md={6} lg={4}>
                            <CourseCard course={course} />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <p className="py-5 text-center text-muted">
                            No courses match your filter.
                        </p>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default MyCourses;