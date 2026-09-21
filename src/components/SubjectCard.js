import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';

export default function SubjectCard({ subject, onPress }) {
  const progressPercentage = subject.targetHours > 0 
    ? Math.min(100, Math.round((subject.completedHours / subject.targetHours) * 100))
    : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{subject.name}</Text>
        <Text style={styles.percentage}>{progressPercentage}%</Text>
      </View>
      
      <Text style={styles.subtitle}>
        {subject.teacher} • Sem {subject.semester}
      </Text>

      <View style={styles.progressInfoRow}>
        <Text style={styles.progressText}>
          {subject.completedHours} / {subject.targetHours} hours
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
  },
  percentage: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
});
