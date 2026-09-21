import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

const CATEGORIES = ['College', 'Assignment', 'Exam', 'Personal', 'Project'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [priority, setPriority] = useState(PRIORITIES[1]); // Default to Medium
  const [dueDate, setDueDate] = useState(''); // Simple string for now

  const handleSaveTask = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingTasks = await getData(STORAGE_KEYS.TASKS) || [];
      const updatedTasks = [newTask, ...existingTasks];
      await saveData(STORAGE_KEYS.TASKS, updatedTasks);
      
      // Navigate back to Tasks list
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the task.');
      console.error(error);
    }
  };

  const renderSelectionButtons = (options, selectedValue, onSelect) => (
    <View style={styles.selectionRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.selectionButton,
            selectedValue === option && styles.selectionButtonActive
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.selectionText,
            selectedValue === option && styles.selectionTextActive
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Complete Math Assignment"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add details here..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderSelectionButtons(CATEGORIES, category, setCategory)}
          </ScrollView>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Priority</Text>
          {renderSelectionButtons(PRIORITIES, priority, setPriority)}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Tomorrow, 25 Oct, etc."
            value={dueDate}
            onChangeText={setDueDate}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
        
        {/* Extra space at bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  formGroup: {
    marginBottom: theme.spacing.l,
  },
  label: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  selectionButton: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectionButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectionText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  selectionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.m,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
