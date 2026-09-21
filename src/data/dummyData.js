/**
 * dummyData.js
 * Realistic sample data loaded on the app's first launch.
 * This gives the app a "lived-in" look right from the start.
 */

export const dummyTasks = [
  {
    id: '1',
    title: 'Complete Java Assignment',
    description: 'Implement a binary search tree with insert, delete, and search operations.',
    category: 'Assignment',
    priority: 'High',
    dueDate: 'Tomorrow',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Prepare DBMS Notes',
    description: 'Cover normalization and ER diagrams for the upcoming internal exam.',
    category: 'Exam',
    priority: 'High',
    dueDate: 'This week',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Finish React Native Practice',
    description: 'Complete the navigation and state management exercises.',
    category: 'Project',
    priority: 'Medium',
    dueDate: 'Next week',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Submit Lab Record',
    description: 'Write up the OS lab record for experiments 5 and 6.',
    category: 'College',
    priority: 'Medium',
    dueDate: 'Friday',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Buy stationery',
    description: 'Pen, highlighters, and a new notebook.',
    category: 'Personal',
    priority: 'Low',
    dueDate: 'Weekend',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export const dummySubjects = [
  {
    id: 's1',
    name: 'Java Programming',
    teacher: 'Prof. Ramesh',
    semester: '4',
    targetHours: 40,
    completedHours: 28,
    attendedClasses: 36,
    absentClasses: 4,
  },
  {
    id: 's2',
    name: 'Data Structures',
    teacher: 'Prof. Kavitha',
    semester: '4',
    targetHours: 35,
    completedHours: 18,
    attendedClasses: 30,
    absentClasses: 2,
  },
  {
    id: 's3',
    name: 'Database Management',
    teacher: 'Prof. Anand',
    semester: '4',
    targetHours: 30,
    completedHours: 22,
    attendedClasses: 28,
    absentClasses: 6,
  },
  {
    id: 's4',
    name: 'Computer Networks',
    teacher: 'Prof. Priya',
    semester: '4',
    targetHours: 30,
    completedHours: 10,
    attendedClasses: 18,
    absentClasses: 2,
  },
  {
    id: 's5',
    name: 'Web Development',
    teacher: 'Prof. Suresh',
    semester: '4',
    targetHours: 25,
    completedHours: 20,
    attendedClasses: 22,
    absentClasses: 0,
  },
];

export const dummyExpenses = [
  { id: 'e1', title: 'Lunch at Cafeteria', amount: 120, category: 'Food', date: new Date().toISOString().split('T')[0], note: '' },
  { id: 'e2', title: 'Bus Ticket', amount: 50, category: 'Transport', date: new Date().toISOString().split('T')[0], note: 'Round trip' },
  { id: 'e3', title: 'Lab Manual Printing', amount: 80, category: 'College', date: new Date().toISOString().split('T')[0], note: '' },
  { id: 'e4', title: 'Evening Snacks', amount: 60, category: 'Food', date: new Date().toISOString().split('T')[0], note: '' },
  { id: 'e5', title: 'Notebook & Pens', amount: 150, category: 'College', date: new Date().toISOString().split('T')[0], note: 'Semester supplies' },
  { id: 'e6', title: 'Movie Ticket', amount: 200, category: 'Entertainment', date: new Date().toISOString().split('T')[0], note: 'Weekend outing' },
];

export const dummyTimetable = [
  { id: 't1', subject: 'Data Structures', teacher: 'Prof. Kavitha', room: 'Room 301', startTime: '09:00 AM', endTime: '10:30 AM', day: 'Monday' },
  { id: 't2', subject: 'Java Programming', teacher: 'Prof. Ramesh', room: 'Lab 1', startTime: '11:00 AM', endTime: '12:30 PM', day: 'Monday' },
  { id: 't3', subject: 'Database Management', teacher: 'Prof. Anand', room: 'Room 305', startTime: '02:00 PM', endTime: '03:30 PM', day: 'Monday' },
  { id: 't4', subject: 'Computer Networks', teacher: 'Prof. Priya', room: 'Room 302', startTime: '09:00 AM', endTime: '10:30 AM', day: 'Tuesday' },
  { id: 't5', subject: 'Web Development', teacher: 'Prof. Suresh', room: 'Lab 2', startTime: '11:00 AM', endTime: '12:30 PM', day: 'Tuesday' },
  { id: 't6', subject: 'Java Programming', teacher: 'Prof. Ramesh', room: 'Room 301', startTime: '09:00 AM', endTime: '10:30 AM', day: 'Wednesday' },
  { id: 't7', subject: 'Data Structures', teacher: 'Prof. Kavitha', room: 'Room 301', startTime: '11:00 AM', endTime: '12:30 PM', day: 'Wednesday' },
  { id: 't8', subject: 'Database Management', teacher: 'Prof. Anand', room: 'Lab 3', startTime: '09:00 AM', endTime: '12:30 PM', day: 'Thursday' },
  { id: 't9', subject: 'Computer Networks', teacher: 'Prof. Priya', room: 'Room 302', startTime: '02:00 PM', endTime: '03:30 PM', day: 'Thursday' },
  { id: 't10', subject: 'Web Development', teacher: 'Prof. Suresh', room: 'Lab 2', startTime: '09:00 AM', endTime: '10:30 AM', day: 'Friday' },
  { id: 't11', subject: 'Java Programming', teacher: 'Prof. Ramesh', room: 'Lab 1', startTime: '11:00 AM', endTime: '01:00 PM', day: 'Friday' },
];

export const dummyExams = [
  {
    id: 'ex1',
    subject: 'Java Programming',
    date: '2026-10-15',
    time: '09:00 AM',
    type: 'Internal',
    syllabusProgress: 75,
  },
  {
    id: 'ex2',
    subject: 'Data Structures',
    date: '2026-10-20',
    time: '10:00 AM',
    type: 'Internal',
    syllabusProgress: 60,
  },
  {
    id: 'ex3',
    subject: 'Database Management',
    date: '2026-11-05',
    time: '09:00 AM',
    type: 'Semester',
    syllabusProgress: 40,
  },
];

export const dummyProfile = {
  name: 'Student',
  college: 'College of Engineering',
  course: 'B.Tech Computer Science',
  year: '4th Year',
  email: 'student@college.edu',
};
