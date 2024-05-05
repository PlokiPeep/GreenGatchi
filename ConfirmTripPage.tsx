import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import IconButton from './Button';
import { getLatestTrip, getAccountData, getInitialData, getCardData } from './opalerHandler';
import { greenGotchiAPI } from './opalerHandler';

import { handleAddButton, handleHomeButton, handleProfileButton, handleStatsButton, handleWaterButton } from './buttonHandler';
import { saveData, getData } from './storage'

function ConfirmTripPage({ navigation }) {

  const [Info, setInfo] = useState<any>(null);
  const [currentCredit, setCurrentCredit] = useState(0);


  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);

  const handleButtonPress = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('Error fetching user data:', error);
      setInfo(null);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toUTCString(); // or any other date formatting method
  };
  
  useEffect(() => {
    if (userEmail !== null && userPassword !== null && cardNumber !== null) {
      const fetchDataAndTrip = async () => {
        try {
          const tripInfo = await getLatestTrip(userEmail, userPassword);
          setInfo(tripInfo);
          saveData('currentCredit', 460)

          const test = await getData('currentCredit');
          console.log(test)

          console.log(cardNumber)
          const greenGotchi = await greenGotchiAPI(cardNumber, null, tripInfo, null)
          console.log("trip added to s3") 
        } catch (error) {
          console.error('Error getting user info:', error);
          setInfo(null);
        }
      };
      
      fetchDataAndTrip();
    }
  }, [userEmail, userPassword, cardNumber]);
  
  const fetchData = async () => {
    try {
      const username = await getData('username');
      const password = await getData('password');
      const cardNumber = await getData('cardNumber');
      const currentCredit = await getData('currentCredit');
      setUserEmail(username);
      setUserPassword(password);
      setCardNumber(cardNumber);
      setCurrentCredit(currentCredit);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setInfo(null);
    }
  };

return (
  <View style={styles.container}>
    <ImageBackground
      source={require('./assets/backgrounds/Sky_green.png')}
      style={styles.background}>
      <TouchableOpacity style={styles.toggleButton} onPress={handleButtonPress}>
        <Text style={styles.toggleText}>Confirm My Trip</Text>
      </TouchableOpacity>
      <View style={styles.tripContainer}>
        {Info && (
          <View>
            <Text style={styles.header}>Your trip has been confirmed!</Text>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
            </View>
            <Text style={styles.infoText}>Summary: {Info.summary || 'N/A'}</Text>
            <Text style={styles.infoText}>Timestamp: {formatTimestamp(Info.timestamp)}</Text>
            <Text style={styles.infoText}>Mode: {Info.mode || 'N/A'}</Text>
            {Info.journey && (
              <View>
                <Text style={styles.infoText}>Journey Start: {Info.journey.start}</Text>
                <Text style={styles.infoText}>Journey End: {Info.journey.end}</Text>
              </View>
            )}
            {Info.fare && (
              <Text style={styles.infoText}>Fare Paid: {Info.fare.paid}</Text>
            )}
            <Text style={styles.infoText}>
              CO₂ Reduced: 1.125kg/km/CO₂</Text>
            <Text style={styles.infoText}>Credits Saved: 112</Text>
          </View>
        )}
        {!Info && (
          <Text style={styles.header}>Your trip details will appear here</Text>
        )}
        <View style={styles.creditsButtonContainer}>
        </View>
      </View>
    </ImageBackground>
    <View style={styles.buttonContainer}>
      <IconButton iconName="add-outline" onPress={() => navigation.navigate('NewTripPage')} />
      <IconButton iconName="checkmark-outline" onPress={() => navigation.navigate('ConfirmTripPage')} style={styles.currentNav}/>
      <IconButton iconName="home-outline" onPress={() => navigation.navigate('HomePage')} />
      <IconButton iconName="stats-chart-outline" onPress={() => navigation.navigate('HistoryPage')} />
      <IconButton iconName="person-outline" onPress={() => navigation.navigate('ProfilePage')} />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B191B',
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' to keep aspect ratio
    padding: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  creditsButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  creditsButton: {
    paddingVertical: 10,
    paddingHorizontal: 300,
    borderRadius: 20,
  },
  tripContainer: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'flex-start',
    height: 300,
    borderColor: 'black',
    borderWidth: 2,
  },
  header: {
    fontSize: 18,
    fontFamily: 'AnonymousPro-Bold',
    marginBottom: 20,
    alignItems: 'center',
    height: 40,
    textAlign: 'center',
    color: '#434343',
  },
  currentNav: { // override button style
    width: 50,
    height: 50,
    borderRadius: 25, // Make it a circle
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  toggleButton: {
    backgroundColor: '#89C07D',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 120,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  toggleText: {
    color: '#434343',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'AnonymousPro-Bold',
  },
  infoText: {
    color: '#434343',
    fontSize: 15,
    fontFamily: 'AnonymousPro-Bold',
  },
  separatorContainer: {
    alignItems: 'center', // Center the separator horizontally
  },
  separator: {
    borderBottomColor: '#434343',
    borderBottomWidth: 1,
    width: '95%', // Adjust the width to make the separator shorter
    marginBottom: 20,
    marginTop: 3,
  },
});

export default ConfirmTripPage;