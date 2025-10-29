import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { grades } from './mockData'; // Import mock data

// const grades = [
//     { id: 1, course: 'Introduction to React', grade: 'A-', score: 92, instructor: 'Dr. Angela Yu' },
//     { id: 2, course: 'UI/UX Design Fundamentals', grade: 'A', score: 95, instructor: 'Gary Simon' },
//     { id: 3, course: 'Python for Data Science', grade: 'B+', score: 88, instructor: 'Jose Portilla' },
//     { id: 4, course: 'History of Ancient Art', grade: 'A-', score: 91, instructor: 'Dr. Eleanor Vance' },
// ];

const Grades = () => (
    <Card className="overflow-hidden border-0 shadow-sm rounded-4">
        <Card.Header as="h2" className="p-4 bg-white border-0 h3 fw-bold">
            My Grades
        </Card.Header>
        <Card.Body className="p-0">
            {/* The 'responsive' prop makes the table horizontally scrollable on small screens.
                The 'hover' prop adds a hover effect to table rows.
                'align-middle' vertically centers content in cells.
            */}
            <Table responsive hover className="mb-0 align-middle small">
                <thead className="table-light text-uppercase">
                    <tr>
                        <th className="p-3 fw-semibold">Course</th>
                        <th className="p-3 fw-semibold">Instructor</th>
                        <th className="p-3 text-center fw-semibold">Score</th>
                        <th className="p-3 text-center fw-semibold">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(grade => (
                        <tr key={grade.id}>
                            <td className="p-3 fw-medium text-dark">{grade.course}</td>
                            <td className="p-3">{grade.instructor}</td>
                            <td className="p-3 text-center">{grade.score}%</td>
                            <td className="p-3 text-center fw-bold text-primary">{grade.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
);

export default Grades;