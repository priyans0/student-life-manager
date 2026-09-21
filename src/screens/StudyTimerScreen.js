import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/constants';

const DURATIONS = [
  { label: '25 min', minutes: 25 },
  { label: '45 min', minutes: 45 },
  { label: '60 min', minutes: 60 },
];

export default function StudyTimerScreen({ navigation }) {
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(selectedDuration * 60);
    }
  }, [selectedDuration]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    Alert.alert('🎉 Study session completed', 'Great job! Take a short break now.', [
      { text: 'OK', onPress: () => setTimeLeft(selectedDuration * 60) }
    ]);
    // In a real app, update Today's study time in AsyncStorage here
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercentage = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Timer</Text>
      
      {!isRunning && (
        <View style={styles.durationSelector}>
          {DURATIONS.map((d) => (
            <TouchableOpacity
              key={d.minutes}
              style={[
                styles.durationButton,
                selectedDuration === d.minutes && styles.durationButtonActive
              ]}
              onPress={() => setSelectedDuration(d.minutes)}
            >
              <Text style={[
                styles.durationText,
                selectedDuration === d.minutes && styles.durationTextActive
              ]}>
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.timerSubtitle}>
          {isRunning ? 'Focus time' : 'Ready to start'}
        </Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButtonPrimary} onPress={handleStartPause}>
          <Ionicons 
            name={isRunning ? "pause" : "play"} 
            size={32} 
            color="#fff" 
          />
        </TouchableOpacity>
        
        {timeLeft !== selectedDuration * 60 && (
          <TouchableOpacity style={styles.controlButtonSecondary} onPress={handleStop}>
            <Ionicons name="stop" size={28} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  durationSelector: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 30,
    padding: 4,
    marginBottom: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  durationButton: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderRadius: 26,
  },
  durationButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  durationText: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  durationTextActive: {
    color: '#fff',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 8,
    borderColor: theme.colors.primary + '30', // Semi-transparent primary
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 2,
  },
  timerSubtitle: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginTop: theme.spacing.s,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.l,
  },
  controlButtonPrimary: {
    backgroundColor: theme.colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButtonSecondary: {
    backgroundColor: theme.colors.card,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
