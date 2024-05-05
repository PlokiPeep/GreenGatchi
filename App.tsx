/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './HomePage'; 
import NewTripPage from './NewTripPage';
import ProfilePage from './ProfilePage';
import HistoryPage from './HistoryPage';
import ConfirmTripPage from './ConfirmTripPage';
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="NewTripPage" component={NewTripPage} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmTripPage" component={ConfirmTripPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94C8FC', // background colour
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // Add some bottom margin for spacing
  },
});

export default App;