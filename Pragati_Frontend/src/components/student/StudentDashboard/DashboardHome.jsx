import React from "react";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Clock, CheckCircle, Calendar } from "lucide-react";

// 👇 IMPORT FOR THE CHILD COMPONENT IS ADDED HERE
import ContinueLearningItem from "./ContinueLearningItem";
import { stats, deadlines, allCourses } from "./mockData"; // Import mock data
import RecentFiles from "./recentFiles";

// MOCK DATA (needs to be available in this file or imported)
// const stats = [
//     { id: 1, label: 'Courses in Progress', value: 4, icon: <Clock size={24} className="text-primary" /> },
//     { id: 2, label: 'Completed Courses', value: 8, icon: <CheckCircle size={24} className="text-success" /> },
//     { id: 3, label: 'Upcoming Assignments', value: 3, icon: <Calendar size={24} className="text-warning" /> },
// ];

// const deadlines = [
//     { id: 1, title: 'React Hooks Project', course: 'Introduction to React', dueDate: 'Aug 25, 2025', dueTime: '11:59 PM' },
//     { id: 2, title: 'Async/Await Quiz', course: 'Advanced JavaScript', dueDate: 'Aug 28, 2025', dueTime: '10:00 AM' },
//     { id: 3, title: 'Final Design Prototype', course: 'UI/UX Design Fundamentals', dueDate: 'Sep 02, 2025', dueTime: '5:00 PM' },
// ];

// // This mock data is also used by the ContinueLearningItem component
// const allCourses = [
//     { id: 1, title: 'Introduction to React', instructor: 'Dr. Angela Yu', progress: 75, category: 'Web Development', image: 'https://placehold.co/600x400/818CF8/FFFFFF?text=React' },
//     { id: 2, title: 'Advanced JavaScript', instructor: 'Jonas Schmedtmann', progress: 45, category: 'Web Development', image: 'https://placehold.co/600x400/FBBF24/FFFFFF?text=JS' },
//     // ...other courses
// ];

const DashboardHome = ({ user }) => {
  return (
    <>
      {/* Welcome Banner */}

      <div className="p-5 mb-4 text-white shadow-lg rounded-4">
        <h2 className="display-5 fw-bold">Welcome back, {user.fullName}!</h2>
        <p className="col-md-8 fs-5" style={{ opacity: 0.8 }}>
          Ready to continue your learning journey? Let's make today productive.
        </p>
      </div>

      {/* Stats Grid */}
      <Row className="mb-4 g-4">
        {stats.map((stat) => (
          <Col md={6} lg={4} key={stat.id}>
            <div className="gap-3 p-4 bg-white shadow-sm d-flex align-items-center rounded-4">
              <div className="p-3 bg-light rounded-circle">{stat.icon}</div>
              <div>
                <p className="mb-0 small text-muted">{stat.label}</p>
                <p className="mb-0 h3 fw-bold text-dark">{stat.value}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Main Content Grid */}
      <Row className="g-4">
        {/* Left Column: Continue Learning */}
        {/* <Col lg={8}>
                <h3 className="mb-3 h4 fw-semibold text-dark">Continue Learning</h3>
                <div className="gap-3 d-grid">
                    {allCourses.filter(c => c.progress < 100).slice(0, 2).map(course => (
                        <ContinueLearningItem key={course.id} course={course} />
                    ))}
                </div>
            </Col> */}

        {/* Left Column: Recent Files  */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Header as="h3" className="p-4 bg-white h5 fw-semibold">
              Recently Opened Files
            </Card.Header>
              <RecentFiles currentUser={user} />
            <Card.Footer className="p-3 bg-white border-0">
              {/* <Button variant="link" className="w-100 text-decoration-none fw-semibold">
                            View All
                        </Button> */}
            </Card.Footer>
          </Card>
        </Col>

        {/* Right Column: Upcoming Deadlines */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Header as="h3" className="p-4 bg-white h5 fw-semibold">
              Upcoming Deadlines
            </Card.Header>
            <ListGroup variant="flush">
              {deadlines.map((deadline) => (
                <ListGroup.Item
                  key={deadline.id}
                  className="gap-3 p-3 d-flex align-items-start"
                >
                  <div className="p-3 bg-warning-subtle rounded-circle">
                    <Calendar size={20} className="text-warning" />
                  </div>
                  <div>
                    <h4 className="mb-0 small fw-semibold text-dark">
                      {deadline.title}
                    </h4>
                    <p
                      className="mb-1 small text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {deadline.course}
                    </p>
                    <p className="mb-0 small fw-medium text-danger">
                      {deadline.dueDate} at {deadline.dueTime}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer className="p-3 bg-white border-0">
              <Button
                variant="link"
                className="w-100 text-decoration-none fw-semibold"
              >
                View All
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardHome;
