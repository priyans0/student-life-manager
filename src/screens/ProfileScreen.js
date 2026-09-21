import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Alert, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    college: '',
    course: '',
    year: '',
    email: '',
  });

  const loadProfile = async () => {
    const stored = await getData(STORAGE_KEYS.PROFILE);
    if (stored) {
      setProfile(stored);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleSave = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return;
    }
    await saveData(STORAGE_KEYS.PROFILE, profile);
    setIsEditing(false);
    Alert.alert('Saved', 'Profile updated successfully!');
  };

  const renderField = (label, field, icon, placeholder, keyboardType = 'default') => (
    <View style={[styles.fieldCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.fieldRow}>
        <Ionicons name={icon} size={20} color={theme.colors.primary} style={styles.fieldIcon} />
        <View style={styles.fieldContent}>
          <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
          {isEditing ? (
            <TextInput
              style={[styles.fieldInput, { color: theme.colors.text }]}
              value={profile[field]}
              onChangeText={(val) => setProfile(prev => ({ ...prev, [field]: val }))}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType={keyboardType}
            />
          ) : (
            <Text style={[styles.fieldValue, { color: theme.colors.text }]}>
              {profile[field] || placeholder}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Avatar Section */}
          <View style={[styles.avatarSection, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>
                {profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
              </Text>
            </View>
            <Text style={[styles.profileName, { color: theme.colors.text }]}>
              {profile.name || 'Your Name'}
            </Text>
            <Text style={[styles.profileCourse, { color: theme.colors.textSecondary }]}>
              {profile.course ? `${profile.course}${profile.year ? ` • ${profile.year}` : ''}` : 'Your Course'}
            </Text>
          </View>

          {/* Profile Fields */}
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personal Info</Text>

          {renderField('Full Name', 'name', 'person-outline', 'Enter your name')}
          {renderField('College', 'college', 'school-outline', 'Your college name')}
          {renderField('Course', 'course', 'book-outline', 'E.g., B.Tech Computer Science')}
          {renderField('Year', 'year', 'calendar-outline', 'E.g., 4th Year')}
          {renderField('Email', 'email', 'mail-outline', 'your@email.com', 'email-address')}

          {/* Action Buttons */}
          {isEditing ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.border }]}
                onPress={() => { setIsEditing(false); loadProfile(); }}
              >
                <Text style={[styles.buttonText, { color: theme.colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Save Profile</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={18} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}

          {/* Settings Link */}
          <TouchableOpacity
            style={[styles.settingsLink, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color={theme.colors.text} />
            <Text style={[styles.settingsLinkText, { color: theme.colors.text }]}>Settings</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  avatarSection: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  profileName: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  profileCourse: { fontSize: 14 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  fieldCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  fieldRow: { flexDirection: 'row', alignItems: 'center' },
  fieldIcon: { marginRight: 12 },
  fieldContent: { flex: 1 },
  fieldLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.5 },
  fieldValue: { fontSize: 16 },
  fieldInput: { fontSize: 16, padding: 0 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {},
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  editButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  settingsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
  },
  settingsLinkText: { flex: 1, fontSize: 16, fontWeight: '500', marginLeft: 12 },
});
