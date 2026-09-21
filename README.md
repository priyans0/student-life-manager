# 🎓 Student Life Manager

A comprehensive, modern React Native & Expo application designed to help students track and organize their academic life, study routines, schedules, attendance, and daily expenses all in one place.

---

## 🌟 Key Modules & Features

### 1. 🏠 Home Dashboard
- **Daily Schedule Overview:** Live view of today's timetable classes and lectures.
- **Priority Tasks:** Quick glance at urgent upcoming assignments and deadlines.
- **Attendance & Spend Stats:** Summary metrics for quick daily monitoring.
- **Quick Action Buttons:** Fast shortcuts to add tasks, log study time, or record expenses.

### 2. 📋 Tasks & Assignments Manager
- **Status Filtering:** View All, Pending, or Completed tasks.
- **Priority Badges:** Categorize tasks into High, Medium, and Low priorities.
- **Due Date Tracker:** Never miss homework, assignment, or project deadlines.
- **Interactive Checkboxes:** Mark tasks as complete with real-time UI updates.

### 3. 📚 Subject & Study Tracker
- **Subject Catalog:** Organize all enrolled university or school courses.
- **Credit & Grade Goals:** Record credits, instructor names, and target grades.
- **Study Notes:** Keep quick revision notes per subject.

### 4. ⏱️ Pomodoro Study Timer
- **Interval Focused Sessions:** 25-minute focus intervals designed for maximum productivity.
- **Rest Breaks:** 5-minute break timers.
- **Session Controls:** Play, Pause, and Reset controls with intuitive visual indicators.

### 5. 💰 Expense & Budget Tracker
- **Category Logging:** Track daily student expenditures (Food, Books, Travel, Bills, Entertainment).
- **Total Expense Summaries:** Clear visual breakdown of spending habits.
- **Transaction History:** Detailed chronological list of all recent payments.

### 6. 📅 Timetable & Schedule
- **Weekly Schedule:** Day-by-day (Mon–Sun) breakdown of classes.
- **Room & Professor Details:** Never get lost looking for classrooms or lecture halls.

### 7. 📊 Attendance Tracker
- **One-Tap Logging:** Mark attendance (Present / Absent / Cancelled) per subject.
- **Percentage Calculator:** Automatically tracks your attendance percentage.
- **Threshold Warnings:** Visual indicators to keep you above the required attendance criteria (e.g. 75%).

### 8. 📝 Exam Tracker & Profile Customization
- **Exam Countdown:** Track exam dates, timings, venues, and seat numbers.
- **Dark & Light Mode:** Seamless theme switcher tailored for day and night study sessions.
- **Local Persistence:** Powered by `@react-native-async-storage/async-storage` so all your student data stays private and safe on your device.

---

## 🚀 Getting Started & Running Locally

### Prerequisites
- [Node.js (v18+)](https://nodejs.org)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/priyans0/student-life-manager.git
cd student-life-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
- **In Web Browser (Laptop/Desktop):**
  ```bash
  npm run web
  ```
- **On Mobile (via Expo Go on Android / iOS):**
  ```bash
  npm start
  ```
- **Build Standalone Android APK:**
  ```bash
  npm run build:apk
  ```

---

## 🛠️ Tech Stack
- **Framework:** [React Native](https://reactnative.dev/) (v0.86.3) & [Expo](https://expo.dev/) (SDK 57)
- **Navigation:** [React Navigation v7](https://reactnavigation.org/) (Stack & Bottom Tabs)
- **Icons:** `@expo/vector-icons` (Ionicons)
- **Local Storage:** `@react-native-async-storage/async-storage`
- **Web Support:** `react-native-web` & `react-dom`

---

## 📄 License
MIT License. Free for all students to use, fork, and improve!
