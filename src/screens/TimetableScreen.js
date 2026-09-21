import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';
import { getData, STORAGE_KEYS } from '../services/storage';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TimetableScreen({ navigation }) {
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const loadTimetable = async () => {
    const data = await getData(STORAGE_KEYS.TIMETABLE) || [];
    setTimetable(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTimetable();
      
      // Auto-select today
      const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
      if (todayIndex >= 1 && todayIndex <= 6) {
        setSelectedDay(DAYS[todayIndex - 1]);
      }
    }, [])
  );

  const getFilteredClasses = () => {
    return timetable
      .filter(item => item.day === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)); // basic string sort for HH:MM
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timetable</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTimetable')}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DAYS.map(day => (
            <TouchableOpacity 
              key={day}
              style={[styles.dayButton, selectedDay === day && styles.dayButtonActive]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>
                {day.substring(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1, paddingHorizontal: theme.spacing.m }}>
        {getFilteredClasses().length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>No classes on {selectedDay}.</Text>
            <TouchableOpacity 
              style={styles.emptyAddButton}
              onPress={() => navigation.navigate('AddTimetable', { day: selectedDay })}
            >
              <Text style={styles.emptyAddButtonText}>Add Class</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={getFilteredClasses()}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.classCard}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeText}>{item.startTime}</Text>
                  <Text style={styles.timeToText}>to</Text>
                  <Text style={styles.timeText}>{item.endTime}</Text>
                </View>
                <View style={styles.classDetails}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <Text style={styles.teacherName}>
                    <Ionicons name="person-outline" size={12} /> {item.teacher}
                  </Text>
                  <Text style={styles.roomName}>
                    <Ionicons name="location-outline" size={12} /> {item.room}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="pencil" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
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
  daysContainer: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  dayButton: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dayButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  dayTextActive: {
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeColumn: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingRight: theme.spacing.m,
    marginRight: theme.spacing.m,
    width: 70,
  },
  timeText: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.primary,
  },
  timeToText: {
    ...theme.typography.caption,
    fontSize: 10,
    marginVertical: 2,
  },
  classDetails: {
    flex: 1,
  },
  subjectName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 4,
  },
  teacherName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  roomName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  editButton: {
    padding: theme.spacing.xs,
  },
});
