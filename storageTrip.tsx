// storageTrip.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDistance = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const getStoredDistance = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};
