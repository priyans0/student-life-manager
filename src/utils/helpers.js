/**
 * helpers.js
 * Utility functions used across the application.
 * Centralizing these avoids code duplication.
 */

/**
 * Format a date string or Date object to a human-readable format.
 * @param {string|Date} date
 * @returns {string} E.g. "20 Sep 2026"
 */
export const formatDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return String(date); // Return as-is if not a valid date
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * Get today's date as a YYYY-MM-DD string.
 * @returns {string}
 */
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get the number of days remaining until a given date.
 * @param {string} dateStr - YYYY-MM-DD format
 * @returns {number}
 */
export const getDaysRemaining = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

/**
 * Get a greeting based on the current hour.
 * @returns {string}
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Clamp a number between a min and max value.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Calculate attendance percentage.
 * @param {number} attended
 * @param {number} total
 * @returns {number} 0-100
 */
export const getAttendancePercentage = (attended, total) => {
  if (!total || total === 0) return 100;
  return Math.round((attended / total) * 100);
};

/**
 * Get today's day name (e.g., "Monday").
 * @returns {string}
 */
export const getTodayDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};
