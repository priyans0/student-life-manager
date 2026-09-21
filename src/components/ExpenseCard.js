import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';

export default function ExpenseCard({ expense, onDelete }) {
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Food': return { name: 'restaurant', color: '#f59e0b' };
      case 'Transport': return { name: 'bus', color: '#3b82f6' };
      case 'College': return { name: 'school', color: '#8b5cf6' };
      case 'Shopping': return { name: 'bag-handle', color: '#ec4899' };
      case 'Entertainment': return { name: 'game-controller', color: '#10b981' };
      default: return { name: 'cash', color: '#64748b' };
    }
  };

  const iconInfo = getCategoryIcon(expense.category);

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconInfo.color + '20' }]}>
        <Ionicons name={iconInfo.name} size={24} color={iconInfo.color} />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{expense.title}</Text>
        <Text style={styles.date}>{expense.date} • {expense.category}</Text>
        {expense.note ? (
          <Text style={styles.note} numberOfLines={1}>{expense.note}</Text>
        ) : null}
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.amount}>₹{expense.amount}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(expense.id)}>
          <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  details: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  note: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    ...theme.typography.h3,
    color: theme.colors.error,
    marginBottom: theme.spacing.s,
  },
  deleteButton: {
    padding: theme.spacing.xs,
  },
});
