/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import IconButton from './Button';
import styles from './NewTripPageStyles';
import { getBestRoute } from './NewTripPageHandler';
import DistanceCalculator from './DistancePage';  // Import DistanceCalculator
import {getCoordinates, calculateDistance, getWeatherForecast} from './MapUtils';  // Import DistanceCalculator
import { storeDistance } from './storageTrip';
import { Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


function NewTripPage({ navigation }) {
  const [info, setInfo] = useState({
    cheapestOption: '',
    cheapestPrice: null,
    distance: '',
    duration: '',
  });

  const [showWeather, setShowWeather] = useState(false); // New state for toggling weather display

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [peakHour, setPeakHour] = useState('no');
  const [commuterType, setCommuterType] = useState('adult');

  const handleToggleWeather = () => {
    setShowWeather(!showWeather); // Toggle the showWeather state
  };

  const handleFormSubmit = async () => {
    try {
      const isPeak = peakHour === "yes";
      const routeInfo = await getBestRoute(startLocation, endLocation, isPeak, commuterType);
      const distanceInfo = await calculateDistance(startLocation, endLocation);
      const weatherData = await getWeatherForecast(endLocation);
      console.log('Weather Forecast:', weatherData);
      console.log('Distance and Time:', distanceInfo);

      
      if (distanceInfo) {
        await storeDistance('@distance', distanceInfo.distance);
        await storeDistance('@duration', distanceInfo.duration);
        setInfo({
          ...info,
          cheapestOption: routeInfo.cheapestOption,
          cheapestPrice: routeInfo.cheapestPrice,
          distance: distanceInfo.distance,
          duration: distanceInfo.duration,
          weather: weatherData  // Store the complete weather data object
        });
      }
    } catch (error) {
      console.error('Error getting route info:', error);
      setInfo({ ...info, cheapestOption: null, cheapestPrice: null, distance: null, duration: null });
    }
  };

  return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.container}>
      <ImageBackground
        source={require('./assets/backgrounds/Sky_green.png')}
        style={styles.background}>
        <View style={styles.formContainer}>
          <View style={styles.newTripContainer}>
              <Text style={styles.header}>New Trip</Text>
              <Icon name="time-outline" size={25} color="white" />
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Icon name="location-outline" size={25} color="#434343" />
              <TextInput 
                style={styles.input} 
                placeholder="Start Location" 
                value={startLocation} 
                onChangeText={setStartLocation} 
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="location-outline" size={25} color="#434343" />
              <TextInput 
                style={styles.input} 
                placeholder="End Location" 
                value={endLocation} 
                onChangeText={setEndLocation} 
              />
            </View>
          </View>
          <Text style={styles.label}>Is this during peak hours?</Text>
          <Picker selectedValue={peakHour} onValueChange={setPeakHour} style={styles.picker}>
            <Picker.Item style={styles.pickerValue} label="Yes" value="yes" />
            <Picker.Item style={styles.pickerValue} label="No" value="no" />
          </Picker>
          <Text style={styles.label}>Commuter Type</Text>
          <Picker selectedValue={commuterType} onValueChange={setCommuterType} style={styles.picker}>
            <Picker.Item label="Adult" value="adult" />
            <Picker.Item label="Child" value="child" />
            <Picker.Item label="Concession" value="concession" />
            <Picker.Item label="Senior" value="senior" />
          </Picker>
          <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Submit Trip</Text>
          </TouchableOpacity>
          {info.distance && (
            <View style={styles.resultContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.resultText}>Transport Mode:</Text>
                <Text style={styles.resultText}>{info.cheapestOption}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.resultText}>Cheapest Price: </Text>
                <Text style={styles.resultText}>${info.cheapestPrice ? info.cheapestPrice.toFixed(2) : "Unavailable"}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.resultText}>Total Distance: </Text>
                <Text style={styles.resultText}>{info.distance ? info.distance : "Unavailable"}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.resultText}>Journey Trip Time: </Text>
                <Text style={styles.resultText}>{info.duration ? info.duration : "Unavailable"}</Text>
              </View>
              {/* <Button title="Toggle Weather Details" onPress={handleToggleWeather} color="#193654" /> */}
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showWeather}
                  onRequestClose={() => {
                    setShowWeather(!showWeather);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      {info.weather && (
                        <>
                          <Text style={styles.weatherHeader}>Weather Overview at {endLocation}</Text>
                          <View style={styles.textContainer}>
                            <Text style={styles.weatherText}>Condition:</Text>
                            <Text style={styles.weatherText}>{info.weather.current.condition.text}</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.weatherText}>Temperature:</Text>
                            <Text style={styles.weatherText}>{info.weather.current.temp_c}°C</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.weatherText}>Feels Like: </Text>
                            <Text style={styles.weatherText}>{info.weather.current.feelslike_c}°C</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.weatherText}>Precipitation:</Text>
                            <Text style={styles.weatherText}>{info.weather.current.precip_mm} mm</Text>
                          </View>
                          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowWeather(!showWeather)}>
                            <Text style={styles.toggleText}>Close</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity style={styles.toggleButton} onPress={handleToggleWeather}>
                  <Text style={styles.toggleText}>Toggle Weather Details</Text>
                </TouchableOpacity>
            </View>
          )}
          

          {!info.distance && (
            <Text style={styles.infoText}>
              No trip information available. Please submit the form to get results.
            </Text>
          )}
        </View>
      </ImageBackground>
      
      <View style={styles.buttonContainer}>
        <IconButton iconName="add-outline" onPress={() => navigation.navigate('NewTripPage')} style={styles.currentNav}/>
        <IconButton iconName="checkmark-outline" onPress={() => navigation.navigate('ConfirmTripPage')} />
        <IconButton iconName="home-outline" onPress={() => navigation.navigate('HomePage')} />
        <IconButton iconName="stats-chart-outline" onPress={() => navigation.navigate('HistoryPage')} />
        <IconButton iconName="person-outline" onPress={() => navigation.navigate('ProfilePage')} />
      </View>
    </View>
    </ScrollView>
  );
}

export default NewTripPage;