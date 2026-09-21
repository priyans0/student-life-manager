import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getData, STORAGE_KEYS } from '../services/storage';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);

  const loadData = async () => {
    const storedTasks = await getData(STORAGE_KEYS.TASKS) || [];
    setTasks(storedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const getTodayDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const renderDashboardCard = (title, value, subtitle, icon, color) => (
    <View style={styles.dashboardCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  const renderQuickAction = (title, icon, route) => (
    <TouchableOpacity 
      style={styles.actionButton}
      onPress={() => route ? navigation.navigate(route) : null}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={24} color={theme.colors.primary} />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning, Student 👋</Text>
          <Text style={styles.subtitle}>Let's make today productive.</Text>
          <Text style={styles.date}>{getTodayDate()}</Text>
        </View>

        {/* Dashboard Grid */}
        <View style={styles.dashboardGrid}>
          {renderDashboardCard(
            "Today's Tasks",
            `${totalTasks} Tasks`,
            `${completedTasks} Completed`,
            'checkmark-circle',
            theme.colors.success
          )}
          {renderDashboardCard(
            "Today's Study",
            "2h 30m",
            "Target: 4h",
            'book',
            theme.colors.primary
          )}
          {renderDashboardCard(
            "Attendance",
            "87%",
            "Good standing",
            'school',
            theme.colors.warning
          )}
          {renderDashboardCard(
            "Expenses",
            "₹450",
            "Today's spending",
            'wallet',
            theme.colors.error
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {renderQuickAction('Add Task', 'add-circle-outline', 'AddTask')}
            {renderQuickAction('Start Study', 'timer-outline', 'Study')}
            {renderQuickAction('Add Expense', 'cash-outline', 'AddExpense')}
            {renderQuickAction('Timetable', 'calendar-outline', 'Timetable')}
          </View>
        </View>

        {/* Today's Schedule Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>09:00</Text>
              <Text style={styles.amPmText}>AM</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={styles.subjectName}>Data Structures</Text>
              <Text style={styles.roomName}>Room 304 • Prof. Smith</Text>
            </View>
          </View>
          <View style={styles.scheduleCard}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>11:00</Text>
              <Text style={styles.amPmText}>AM</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={styles.subjectName}>Java Programming</Text>
              <Text style={styles.roomName}>Lab 1 • Prof. Johnson</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.s,
  },
  greeting: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: theme.spacing.s,
    fontWeight: 'bold',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  dashboardCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  cardInfo: {
    marginTop: 4,
  },
  cardTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  cardValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '23%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 11,
    color: theme.colors.text,
    textAlign: 'center',
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
    alignItems: 'center',
  },
  timeColumn: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingRight: theme.spacing.m,
    marginRight: theme.spacing.m,
    width: 60,
  },
  timeText: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  amPmText: {
    ...theme.typography.caption,
    fontWeight: 'bold',
  },
  scheduleDetails: {
    flex: 1,
  },
  subjectName: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  roomName: {
    ...theme.typography.caption,
  },
});
