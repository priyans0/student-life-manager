import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import { theme } from '../utils/constants';

// Task screens
import AddTaskScreen from '../screens/AddTaskScreen';

// Study screens
import AddSubjectScreen from '../screens/AddSubjectScreen';
import StudyTimerScreen from '../screens/StudyTimerScreen';

// Expense screens
import AddExpenseScreen from '../screens/AddExpenseScreen';

// Stage 5 screens
import TimetableScreen from '../screens/TimetableScreen';
import AddTimetableScreen from '../screens/AddTimetableScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ExamsScreen from '../screens/ExamsScreen';
import AddExamScreen from '../screens/AddExamScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: { fontWeight: 'bold', color: theme.colors.text },
        }}
      >
        {/* Main Tabs */}
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />

        {/* Task Screens */}
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add New Task' }} />

        {/* Study Screens */}
        <Stack.Screen name="AddSubject" component={AddSubjectScreen} options={{ title: 'Add Subject' }} />
        <Stack.Screen name="StudyTimer" component={StudyTimerScreen} options={{ title: 'Pomodoro Timer' }} />

        {/* Expense Screens */}
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />

        {/* Timetable Screens */}
        <Stack.Screen name="Timetable" component={TimetableScreen} options={{ title: 'Timetable' }} />
        <Stack.Screen name="AddTimetable" component={AddTimetableScreen} options={{ title: 'Add Class' }} />

        {/* Attendance */}
        <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: 'Attendance Tracker' }} />

        {/* Exam Screens */}
        <Stack.Screen name="Exams" component={ExamsScreen} options={{ title: 'Exam Tracker' }} />
        <Stack.Screen name="AddExam" component={AddExamScreen} options={{ title: 'Add Exam' }} />

        {/* Profile / Settings */}
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
