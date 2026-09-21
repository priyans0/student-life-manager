import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';
import { getData, STORAGE_KEYS } from '../services/storage';

export default function ExamsScreen({ navigation }) {
  const [exams, setExams] = useState([]);

  const loadExams = async () => {
    const data = await getData(STORAGE_KEYS.EXAMS) || [];
    setExams(data.sort((a, b) => new Date(a.date) - new Date(b.date))); // Sort chronologically
  };

  useFocusEffect(
    useCallback(() => {
      loadExams();
    }, [])
  );

  const calculateDaysRemaining = (examDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(examDateStr);
    examDate.setHours(0, 0, 0, 0);
    
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Finished';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days remaining`;
  };

  const getDaysColor = (daysRemainingText) => {
    if (daysRemainingText === 'Today!' || daysRemainingText === 'Tomorrow') return theme.colors.error;
    if (daysRemainingText.includes('days') && parseInt(daysRemainingText) <= 7) return theme.colors.warning;
    if (daysRemainingText === 'Finished') return theme.colors.textSecondary;
    return theme.colors.primary;
  };

  const renderExamCard = ({ item }) => {
    const daysRemaining = calculateDaysRemaining(item.date);
    const color = getDaysColor(daysRemaining);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.subjectName}>{item.subject}</Text>
          <View style={[styles.badge, { backgroundColor: theme.colors.secondary + '20' }]}>
            <Text style={[styles.badgeText, { color: theme.colors.secondary }]}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Syllabus: {item.syllabusProgress}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.syllabusProgress}%` }]} />
            </View>
          </View>
          <Text style={[styles.daysRemaining, { color }]}>{daysRemaining}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exams</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddExam')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {exams.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No upcoming exams.</Text>
          <TouchableOpacity 
            style={styles.emptyAddButton}
            onPress={() => navigation.navigate('AddExam')}
          >
            <Text style={styles.emptyAddButtonText}>Add an Exam</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={exams}
          keyExtractor={item => item.id}
          renderItem={renderExamCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    paddingTop: theme.spacing.l,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  listContent: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  subjectName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    ...theme.typography.caption,
    fontWeight: 'bold',
    fontSize: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    gap: theme.spacing.m,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressContainer: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  progressLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  daysRemaining: {
    ...theme.typography.h3,
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  emptyAddButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.spacing.m,
  },
  emptyAddButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
