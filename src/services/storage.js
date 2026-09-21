import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TASKS: '@student_life_tasks',
  SUBJECTS: '@student_life_subjects',
  EXPENSES: '@student_life_expenses',
  TIMETABLE: '@student_life_timetable',
  EXAMS: '@student_life_exams',
  PROFILE: '@student_life_profile',
  SETTINGS: '@student_life_settings',
};

/**
 * Save data to local storage
 * @param {string} key Storage key
 * @param {object|array} value Data to store
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error saving data for key ${key}:`, e);
  }
};

/**
 * Retrieve data from local storage
 * @param {string} key Storage key
 * @returns {object|array|null} Retrieved data or null
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Error getting data for key ${key}:`, e);
    return null;
  }
};

/**
 * Update existing data in local storage
 * @param {string} key Storage key
 * @param {function} updaterCallback Callback that receives current data and returns new data
 */
export const updateData = async (key, updaterCallback) => {
  try {
    const currentData = await getData(key);
    const updatedData = updaterCallback(currentData);
    await saveData(key, updatedData);
  } catch (e) {
    console.error(`Error updating data for key ${key}:`, e);
  }
};

/**
 * Remove data from local storage
 * @param {string} key Storage key
 */
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error deleting data for key ${key}:`, e);
  }
};

/**
 * Clear all app data
 */
export const clearAllData = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.error('Error clearing all data:', e);
  }
};
