import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

export default function AttendanceScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);

  const loadSubjects = async () => {
    const data = await getData(STORAGE_KEYS.SUBJECTS) || [];
    setSubjects(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadSubjects();
    }, [])
  );

  const updateAttendance = async (subjectId, type) => {
    const updatedSubjects = subjects.map(sub => {
      if (sub.id === subjectId) {
        const attended = sub.attendedClasses || 0;
        const absent = sub.absentClasses || 0;
        return {
          ...sub,
          attendedClasses: type === 'present' ? attended + 1 : attended,
          absentClasses: type === 'absent' ? absent + 1 : absent
        };
      }
      return sub;
    });

    setSubjects(updatedSubjects);
    await saveData(STORAGE_KEYS.SUBJECTS, updatedSubjects);
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage < 75) return { color: theme.colors.error, message: '⚠️ Below 75%' };
    if (percentage <= 80) return { color: theme.colors.warning, message: 'Caution' };
    return { color: theme.colors.success, message: 'Safe' };
  };

  const renderAttendanceCard = ({ item }) => {
    const attended = item.attendedClasses || 0;
    const absent = item.absentClasses || 0;
    const total = attended + absent;
    const percentage = total === 0 ? 100 : Math.round((attended / total) * 100);
    const status = getAttendanceStatus(percentage);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.subjectName}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{percentage}%</Text>
          </View>
        </View>

        {percentage < 75 && total > 0 && (
          <Text style={styles.warningText}>{status.message}</Text>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{total}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Attended</Text>
            <Text style={styles.statValue}>{attended}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Absent</Text>
            <Text style={styles.statValue}>{absent}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.success + '20' }]}
            onPress={() => updateAttendance(item.id, 'present')}
          >
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
            <Text style={[styles.actionButtonText, { color: theme.colors.success }]}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.error + '20' }]}
            onPress={() => updateAttendance(item.id, 'absent')}
          >
            <Ionicons name="close-circle" size={20} color={theme.colors.error} />
            <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>Absent</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
      </View>

      {subjects.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="school-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No subjects found.</Text>
          <Text style={styles.emptySubText}>Add subjects in the Study tab first.</Text>
        </View>
      ) : (
        <FlatList
          data={subjects}
          keyExtractor={item => item.id}
          renderItem={renderAttendanceCard}
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
    padding: theme.spacing.m,
    paddingTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  listContent: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  subjectName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.m,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    gap: theme.spacing.xs,
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginTop: theme.spacing.m,
    marginBottom: 4,
  },
  emptySubText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
