import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AddTimetableScreen({ route, navigation }) {
  const initialDay = route.params?.day || 'Monday';
  
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState(initialDay);

  const handleSaveClass = async () => {
    if (!subject.trim() || !startTime.trim() || !endTime.trim()) {
      Alert.alert('Validation Error', 'Subject, Start Time, and End Time are required.');
      return;
    }

    const newClass = {
      id: Date.now().toString(),
      subject: subject.trim(),
      teacher: teacher.trim() || 'TBA',
      room: room.trim() || 'TBA',
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      day,
    };

    try {
      const existingTimetable = await getData(STORAGE_KEYS.TIMETABLE) || [];
      const updatedTimetable = [...existingTimetable, newClass];
      await saveData(STORAGE_KEYS.TIMETABLE, updatedTimetable);
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the class.');
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
          <Text style={styles.label}>Subject Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Data Structures"
            value={subject}
            onChangeText={setSubject}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderSelectionButtons(DAYS, day, setDay)}
          </ScrollView>
        </View>

        <View style={styles.timeRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: theme.spacing.s }]}>
            <Text style={styles.label}>Start Time *</Text>
            <TextInput
              style={styles.input}
              placeholder="09:00 AM"
              value={startTime}
              onChangeText={setStartTime}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.s }]}>
            <Text style={styles.label}>End Time *</Text>
            <TextInput
              style={styles.input}
              placeholder="10:30 AM"
              value={endTime}
              onChangeText={setEndTime}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Room / Location</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Lab 1"
            value={room}
            onChangeText={setRoom}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Teacher</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Prof. Smith"
            value={teacher}
            onChangeText={setTeacher}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveClass}>
          <Text style={styles.saveButtonText}>Save Class</Text>
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
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: theme.spacing.s,
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
