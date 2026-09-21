import React from 'react';
import { ThemeProvider } from './src/utils/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // ThemeProvider wraps the whole app so every screen can access dark/light mode
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
