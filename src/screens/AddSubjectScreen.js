import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

export default function AddSubjectScreen({ navigation }) {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [semester, setSemester] = useState('');
  const [targetHours, setTargetHours] = useState('');

  const handleSaveSubject = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Subject name cannot be empty.');
      return;
    }
    
    if (isNaN(targetHours) || Number(targetHours) <= 0) {
      Alert.alert('Validation Error', 'Target hours must be a valid number greater than 0.');
      return;
    }

    const newSubject = {
      id: Date.now().toString(),
      name: name.trim(),
      teacher: teacher.trim(),
      semester: semester.trim(),
      targetHours: Number(targetHours),
      completedHours: 0,
    };

    try {
      const existingSubjects = await getData(STORAGE_KEYS.SUBJECTS) || [];
      const updatedSubjects = [newSubject, ...existingSubjects];
      await saveData(STORAGE_KEYS.SUBJECTS, updatedSubjects);
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the subject.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Java Programming"
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Teacher / Professor</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Prof. Smith"
            value={teacher}
            onChangeText={setTeacher}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Semester</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 4"
            value={semester}
            onChangeText={setSemester}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Target Study Hours *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 40"
            value={targetHours}
            onChangeText={setTargetHours}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubject}>
          <Text style={styles.saveButtonText}>Save Subject</Text>
        </TouchableOpacity>
        
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
