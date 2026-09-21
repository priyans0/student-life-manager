// Centralized design tokens for Student Life Manager
// All colors and spacing should come from here — never hardcode in components.

export const lightTheme = {
  colors: {
    primary: '#4f46e5',
    secondary: '#818cf8',
    background: '#f3f4f6',
    card: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#e5e7eb',
  },
};

export const darkTheme = {
  colors: {
    primary: '#818cf8',
    secondary: '#6366f1',
    background: '#0f172a',
    card: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    border: '#334155',
  },
};

// Default export for backward compatibility; components that use ThemeContext
// will receive the live theme object. Direct imports of `theme` will use light.
export const theme = lightTheme;

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16 },
  caption: { fontSize: 14, color: '#6b7280' },
};
