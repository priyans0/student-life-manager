import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { clearAllData, deleteData, STORAGE_KEYS } from '../services/storage';

export default function SettingsScreen({ navigation }) {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();

  const handleClearData = (label, keys) => {
    Alert.alert(
      `Clear ${label}?`,
      `Are you sure you want to delete all ${label.toLowerCase()}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            for (const key of keys) {
              await deleteData(key);
            }
            Alert.alert('Done', `${label} cleared successfully.`);
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Data?',
      'Are you sure you want to delete ALL application data? This includes tasks, subjects, expenses, timetable, exams, and your profile. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            Alert.alert('Done', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  const renderSettingRow = (icon, label, onPress, rightElement, color = null) => (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: (color || theme.colors.primary) + '15' }]}>
        <Ionicons name={icon} size={20} color={color || theme.colors.primary} />
      </View>
      <Text style={[styles.rowLabel, { color: color || theme.colors.text }]}>{label}</Text>
      {rightElement || <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Preferences */}
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>PREFERENCES</Text>
        {renderSettingRow(
          'moon-outline',
          'Dark Mode',
          null,
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
            trackColor={{ false: theme.colors.border, true: theme.colors.secondary }}
          />,
        )}

        {/* Data Management */}
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginTop: 24 }]}>DATA MANAGEMENT</Text>
        {renderSettingRow(
          'checkmark-circle-outline',
          'Clear Task Data',
          () => handleClearData('Task Data', [STORAGE_KEYS.TASKS]),
          null, theme.colors.warning
        )}
        {renderSettingRow(
          'wallet-outline',
          'Clear Expense Data',
          () => handleClearData('Expense Data', [STORAGE_KEYS.EXPENSES]),
          null, theme.colors.warning
        )}
        {renderSettingRow(
          'trash-outline',
          'Clear All Data',
          handleClearAll,
          null, theme.colors.error
        )}

        {/* About */}
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginTop: 24 }]}>ABOUT</Text>
        <View style={[styles.aboutCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.appName, { color: theme.colors.primary }]}>Student Life Manager</Text>
          <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>Organize. Study. Grow.</Text>
          <Text style={[styles.version, { color: theme.colors.textSecondary }]}>Version 1.0.0</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: '500' },
  aboutCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  appName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  tagline: { fontSize: 14, fontStyle: 'italic', marginBottom: 8 },
  version: { fontSize: 12 },
});
