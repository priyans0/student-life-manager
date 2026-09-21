import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from '../utils/constants';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

// Create the context
export const ThemeContext = createContext();

// Provider component — wrap your entire app with this
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved dark mode preference on startup
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getData(STORAGE_KEYS.SETTINGS);
      if (settings?.darkMode !== undefined) {
        setIsDarkMode(settings.darkMode);
      }
    };
    loadSettings();
  }, []);

  // Toggle dark mode and persist the setting
  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    const currentSettings = await getData(STORAGE_KEYS.SETTINGS) || {};
    await saveData(STORAGE_KEYS.SETTINGS, { ...currentSettings, darkMode: newValue });
  };

  const activeTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — use this in every screen/component instead of importing `theme` directly
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
