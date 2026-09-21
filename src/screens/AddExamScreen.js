import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

const EXAM_TYPES = ['Internal', 'Model Exam', 'Semester', 'Practical'];

export default function AddExamScreen({ navigation }) {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [examType, setExamType] = useState(EXAM_TYPES[0]);
  const [syllabusProgress, setSyllabusProgress] = useState('0');

  const handleSaveExam = async () => {
    if (!subject.trim() || !date.trim() || !time.trim()) {
      Alert.alert('Validation Error', 'Subject, Date, and Time are required.');
      return;
    }

    const progress = parseInt(syllabusProgress) || 0;

    const newExam = {
      id: Date.now().toString(),
      subject: subject.trim(),
      date: date.trim(),
      time: time.trim(),
      type: examType,
      syllabusProgress: Math.min(100, Math.max(0, progress)),
    };

    try {
      const existingExams = await getData(STORAGE_KEYS.EXAMS) || [];
      const updatedExams = [...existingExams, newExam];
      await saveData(STORAGE_KEYS.EXAMS, updatedExams);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the exam.');
      console.error(error);
    }
  };

  const renderSelectionButtons = (options, selectedValue, onSelect) => (
    <View style={styles.selectionRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.selectionButton, selectedValue === option && styles.selectionButtonActive]}
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.selectionText, selectedValue === option && styles.selectionTextActive]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Java Programming"
            value={subject}
            onChangeText={setSubject}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Exam Type</Text>
          {renderSelectionButtons(EXAM_TYPES, examType, setExamType)}
        </View>

        <View style={styles.timeRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: theme.spacing.s }]}>
            <Text style={styles.label}>Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.s }]}>
            <Text style={styles.label}>Time *</Text>
            <TextInput
              style={styles.input}
              placeholder="09:00 AM"
              value={time}
              onChangeText={setTime}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Syllabus Progress (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 60"
            value={syllabusProgress}
            onChangeText={setSyllabusProgress}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveExam}>
          <Text style={styles.saveButtonText}>Save Exam</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.m },
  formGroup: { marginBottom: theme.spacing.l },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { ...theme.typography.h3, fontSize: 16, color: theme.colors.text, marginBottom: theme.spacing.s },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    fontSize: 16,
  },
  selectionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.s },
  selectionButton: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectionButtonActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  selectionText: { color: theme.colors.textSecondary, fontWeight: '500' },
  selectionTextActive: { color: '#fff', fontWeight: 'bold' },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.s,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
