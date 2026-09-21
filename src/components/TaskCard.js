import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const isCompleted = task.completed;

  // Determine priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return theme.colors.error;
      case 'Medium': return theme.colors.warning;
      case 'Low': return theme.colors.success;
      default: return theme.colors.primary;
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onToggleComplete(task.id)}
      >
        <Ionicons 
          name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'} 
          size={28} 
          color={isCompleted ? theme.colors.success : theme.colors.border} 
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) }]}>
            <Text style={[styles.badgeText, { color: '#fff' }]}>{task.priority}</Text>
          </View>
        </View>
        {task.dueDate && (
          <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
        <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: theme.spacing.m,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  },
  badge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    ...theme.typography.caption,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dueDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  deleteButton: {
    padding: theme.spacing.s,
  },
});
