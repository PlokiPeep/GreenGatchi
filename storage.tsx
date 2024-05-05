import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Data exists, parse it if needed
        return JSON.parse(value);
      } else {
        console.log('No data found for key:', key);
        return null;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  };