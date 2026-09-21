import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';
import ExpenseCard from '../components/ExpenseCard';

export default function ExpensesScreen({ navigation }) {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadExpenses = async () => {
    setIsLoading(true);
    const storedExpenses = await getData(STORAGE_KEYS.EXPENSES);
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const deleteExpense = async (expenseId) => {
    const updatedExpenses = expenses.filter(e => e.id !== expenseId);
    setExpenses(updatedExpenses);
    await saveData(STORAGE_KEYS.EXPENSES, updatedExpenses);
  };

  // Compute summaries
  const totalSpending = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // Dummy logic for today's and week's spending (assuming all loaded for now are recent for simplicity)
  // In a real app, we'd filter by Date object comparisons
  const todaySpending = expenses.length > 0 ? expenses[0].amount : 0; 
  
  const renderSummaryCard = (title, amount, icon, color) => (
    <View style={styles.summaryCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryAmount}>₹{amount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddExpense')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.summariesContainer}>
        {renderSummaryCard("Today", todaySpending, "today-outline", theme.colors.warning)}
        {renderSummaryCard("Total Spending", totalSpending, "wallet-outline", theme.colors.error)}
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {isLoading ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>Loading expenses...</Text>
        </View>
      ) : expenses.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="receipt-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No expenses tracked yet.</Text>
          <TouchableOpacity 
            style={styles.emptyAddButton}
            onPress={() => navigation.navigate('AddExpense')}
          >
            <Text style={styles.emptyAddButtonText}>Add an Expense</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExpenseCard 
              expense={item} 
              onDelete={deleteExpense}
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
  summariesContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    width: '48%',
    padding: theme.spacing.m,
    borderRadius: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },
  summaryTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  summaryAmount: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  sectionTitle: {
    ...theme.typography.h3,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  listContent: {
    padding: theme.spacing.m,
    paddingTop: 0,
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
