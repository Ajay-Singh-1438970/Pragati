import React from 'react';
import { Clock, CheckCircle, Calendar, Award, Mail } from 'lucide-react';

// --- USER DATA ---
export const initialUser = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://placehold.co/100x100/6366F1/FFFFFF?text=AJ',
    bio: 'Lifelong learner and aspiring full-stack developer. Passionate about creating intuitive and beautiful user interfaces.',
    joined: 'August 2025',
};

// --- COURSE DATA ---
export const allCourses = [
    { id: 1, title: 'Database Management System', instructor: 'Dr. Angela Yu', progress: 75, category: 'Third Semester', image: 'https://placehold.co/600x400/818CF8/FFFFFF?text=DBMS' },
    { id: 2, title: 'Object Oriented Programing', instructor: 'Jonas Schmedtmann', progress: 45, category: 'Third Semester', image: 'https://placehold.co/600x400/FBBF24/FFFFFF?text=OOPS' },
    { id: 3, title: 'Mathemethics III', instructor: 'Gary Simon', progress: 90, category: 'Third Semester', image: 'https://placehold.co/600x400/F472B6/FFFFFF?text=M III' },
    { id: 4, title: 'Data Structures & Algorithms', instructor: 'Andrei Neagoie', progress: 60, category: 'Third Semester', image: 'https://placehold.co/600x400/34D399/FFFFFF?text=DSA' },
    { id: 5, title: 'Digital System', instructor: 'Jose Portilla', progress: 100, category: 'Third Semester', image: 'https://placehold.co/600x400/60A5FA/FFFFFF?text=DS' },
    { id: 6, title: 'Computer Network', instructor: 'Maximilian Schwarzmüller', progress: 25, category: 'Third Semester', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=CN' },
];

// --- DASHBOARD STATS ---
export const stats = [
    { id: 1, label: 'Courses in Progress', value: 4, icon: <Clock size={24} className="text-primary" /> },
    { id: 2, label: 'Completed Courses', value: 8, icon: <CheckCircle size={24} className="text-success" /> },
    { id: 3, label: 'Upcoming Assignments', value: 3, icon: <Calendar size={24} className="text-warning" /> },
];

// --- DEADLINES ---
export const deadlines = [
    { id: 1, title: 'MST 1', course: 'Data Structures & Algorithms', dueDate: 'Aug 25, 2025', dueTime: '11:59 PM' },
    { id: 2, title: 'MST 2', course: 'Data Structures & Algorithms', dueDate: 'Sep 28, 2025', dueTime: '10:00 AM' },
    { id: 3, title: 'Semester Exam', course: 'Data Structures & Algorithms', dueDate: 'Oct 25, 2025', dueTime: '10:00 AM' },
];

// --- GRADES ---
export const grades = [
    { id: 1, course: 'Database Management System', grade: 'A-', score: 92, instructor: 'Dr. Angela Yu' },
    { id: 2, course: 'Object Oriented Programing', grade: 'A', score: 95, instructor: 'Gary Simon' },
    { id: 3, course: 'Data Structures & Algorithms', grade: 'B+', score: 88, instructor: 'Jose Portilla' },
    { id: 4, course: 'Computer Network', grade: 'A-', score: 91, instructor: 'Dr. Eleanor Vance' },
];

// --- NOTIFICATIONS ---
export const notifications = [
    { id: 1, icon: <Award size={20} className="text-warning"/>, text: 'You earned a new certificate!', time: '5m ago' },
    { id: 2, icon: <Calendar size={20} className="text-danger"/>, text: 'Project deadline is tomorrow.', time: '1h ago' },
    { id: 3, icon: <Mail size={20} className="text-primary"/>, text: 'New message from Dr. Angela Yu.', time: '10d ago' },
];