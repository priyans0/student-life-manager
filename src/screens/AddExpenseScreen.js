import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

const CATEGORIES = ['Food', 'Transport', 'College', 'Shopping', 'Entertainment', 'Other'];

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Simple YYYY-MM-DD
  const [note, setNote] = useState('');

  const handleSaveExpense = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Expense title cannot be empty.');
      return;
    }
    
    if (isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Validation Error', 'Amount must be a valid number greater than 0.');
      return;
    }
    
    if (!date.trim()) {
      Alert.alert('Validation Error', 'Date is required.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date: date.trim(),
      note: note.trim(),
    };

    try {
      const existingExpenses = await getData(STORAGE_KEYS.EXPENSES) || [];
      const updatedExpenses = [newExpense, ...existingExpenses];
      await saveData(STORAGE_KEYS.EXPENSES, updatedExpenses);
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the expense.');
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
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Lunch at Cafeteria"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount (₹) *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 150"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
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
          <Text style={styles.label}>Date (YYYY-MM-DD) *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 2024-10-25"
            value={date}
            onChangeText={setDate}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any extra details..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveExpense}>
          <Text style={styles.saveButtonText}>Save Expense</Text>
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
  textArea: {
    height: 80,
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
