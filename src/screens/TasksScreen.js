import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';
import TaskCard from '../components/TaskCard';

export default function TasksScreen({ navigation }) {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // All, Pending, Completed, High Priority
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    setIsLoading(true);
    const storedTasks = await getData(STORAGE_KEYS.TASKS);
    if (storedTasks) {
      setTasks(storedTasks);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const toggleTaskComplete = async (taskId) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updatedTasks);
    await saveData(STORAGE_KEYS.TASKS, updatedTasks);
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    await saveData(STORAGE_KEYS.TASKS, updatedTasks);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Pending':
        return tasks.filter(t => !t.completed);
      case 'Completed':
        return tasks.filter(t => t.completed);
      case 'High Priority':
        return tasks.filter(t => t.priority === 'High');
      default:
        return tasks;
    }
  };

  const renderFilterButton = (filterName) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterName && styles.filterButtonActive]}
      onPress={() => setFilter(filterName)}
    >
      <Text style={[styles.filterText, filter === filterName && styles.filterTextActive]}>
        {filterName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        {renderFilterButton('All')}
        {renderFilterButton('Pending')}
        {renderFilterButton('Completed')}
        {renderFilterButton('High Priority')}
      </View>

      {isLoading ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>Loading tasks...</Text>
        </View>
      ) : getFilteredTasks().length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="checkmark-done-circle-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>You're all caught up! 🎉</Text>
          <TouchableOpacity 
            style={styles.emptyAddButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.emptyAddButtonText}>Add a Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={getFilteredTasks()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard 
              task={item} 
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          )}
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
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: theme.spacing.m,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
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
    fontSize: 16,
  },
});
