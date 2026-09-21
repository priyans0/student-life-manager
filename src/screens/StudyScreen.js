import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getData, STORAGE_KEYS } from '../services/storage';
import SubjectCard from '../components/SubjectCard';

export default function StudyScreen({ navigation }) {
  const { theme } = useTheme();
  const [subjects, setSubjects] = useState([]);
  
  // Dummy stats for now, later could be fetched from storage
  const stats = {
    today: '2h 30m',
    weekly: '14h 45m',
    goal: '20h',
    streak: '5 Days'
  };

  const loadData = async () => {
    const storedSubjects = await getData(STORAGE_KEYS.SUBJECTS) || [];
    setSubjects(storedSubjects);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const renderStatCard = (title, value, icon, color) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Study Dashboard</Text>
          <TouchableOpacity 
            style={styles.timerButton}
            onPress={() => navigation.navigate('StudyTimer')}
          >
            <Ionicons name="timer-outline" size={20} color="#fff" />
            <Text style={styles.timerButtonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard("Today", stats.today, "today-outline", theme.colors.primary)}
          {renderStatCard("This Week", stats.weekly, "calendar-outline", theme.colors.secondary)}
          {renderStatCard("Weekly Goal", stats.goal, "flag-outline", theme.colors.warning)}
          {renderStatCard("Streak", stats.streak, "flame-outline", theme.colors.error)}
        </View>

        {/* Quick Access Row */}
        <View style={styles.quickAccessRow}>
          <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Timetable')}>
            <Ionicons name="calendar" size={20} color={theme.colors.primary} />
            <Text style={styles.quickAccessText}>Timetable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Attendance')}>
            <Ionicons name="checkmark-done" size={20} color={theme.colors.success} />
            <Text style={styles.quickAccessText}>Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Exams')}>
            <Ionicons name="document-text" size={20} color={theme.colors.warning} />
            <Text style={styles.quickAccessText}>Exams</Text>
          </TouchableOpacity>
        </View>

        {/* Subjects Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Subjects</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddSubject')}>
            <Ionicons name="add-circle" size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {subjects.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>No subjects added yet.</Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('AddSubject')}
            >
              <Text style={styles.emptyStateButtonText}>Add a Subject</Text>
            </TouchableOpacity>
          </View>
        ) : (
          subjects.map(subject => (
            <SubjectCard 
              key={subject.id} 
              subject={subject}
              onPress={() => {}} 
            />
          ))
        )}

        <View style={{ height: 40 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.s,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    gap: 4,
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 2,
  },
  statTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  emptyState: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  quickAccessButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    marginHorizontal: 4,
    padding: theme.spacing.m,
    borderRadius: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessText: { fontSize: 12, fontWeight: '600', color: theme.colors.text, marginTop: 4 },
});
