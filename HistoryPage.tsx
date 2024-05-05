import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, ImageBackground } from 'react-native';
import IconButton from './Button';
import { greenGotchiAPI } from './opalerHandler';
import { getData } from './storage';

function HistoryPage({ navigation }) {
  const [trips, setTrips] = useState<any>([]);
  const [totalC02, setTotalC02] = useState(null);
  const [currentCredit, setCurrentCredit] = useState(null);
  const [totalSaved, setTotalSaved] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardNumber = await getData('cardNumber');
        const totalC02 = await getData('totalC02');
        const currentCredit = await getData('currentCredit');
        const totalSaved = await getData('totalSaved');
        const tripInfo = await greenGotchiAPI(cardNumber, null, null, "yes");
        setTrips(tripInfo.confirmedTrips || []);
        setTotalC02(totalC02);
        setCurrentCredit(currentCredit);
        setTotalSaved(totalSaved);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setTrips([]);
      }
    };

    fetchData();
  }, []);

  const C02 = 11.19
  const saved = 15.24
  const credit = 360

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toUTCString(); // or any other date formatting method
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/backgrounds/Sky_green.png')}
        style={styles.background}>
        <View style={styles.summary}>
          <View style={styles.tripItem}>
            <Text style={styles.summaryText}>Total CO₂ Reduced: {C02}kg/km</Text>
            <Text style={styles.summaryText}>Total Fare Saved: {saved}</Text>
            <Text style={styles.summaryText}>Current Credits: {credit}</Text>
          </View> 
        </View>
        <View style={styles.TripTitle}>
          <Text style={styles.TripTitleText}>Trips you have made</Text>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separator2} />
        </View>
        <View style={styles.tripContainer}>
          <ScrollView>
            {trips.map((trip, index) => (
              <View key={index}>
                <View style={styles.tripItem}>
                  <Text style={styles.summaryText}>{trip.summary || 'N/A'}</Text>
                  <Text style={styles.text}>{formatTimestamp(trip.timestamp)}</Text>
                  <Text style={styles.text}>{trip.mode ? trip.mode.charAt(0).toUpperCase() + trip.mode.slice(1).toLowerCase() : 'N/A'}</Text>
                  {trip.fare && (
                    <Text style={styles.text}>${trip.fare.paid / 100}</Text>
                  )}
                </View>
                {index !== trips.length - 1 && <View style={styles.separatorContainer}>
    <View style={styles.separator} />
  </View>}
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <IconButton iconName="add-outline" onPress={() => navigation.navigate('NewTripPage')} />
        <IconButton iconName="checkmark-outline" onPress={() => navigation.navigate('ConfirmTripPage')} />
        <IconButton iconName="home-outline" onPress={() => navigation.navigate('HomePage')} />
        <IconButton iconName="stats-chart-outline" onPress={() => navigation.navigate('HistoryPage')} style={styles.currentNav}/>
        <IconButton iconName="person-outline" onPress={() => navigation.navigate('ProfilePage')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B191B', // background colour
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' to keep aspect ratio
  },
  tripContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 35,
    marginVertical: 35,
    marginTop: 12,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 }, // Offset of the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 2, // Blur radius of the shadow
    elevation: 3, // Android elevation (affects shadow appearance)
  },
  tripItem: {
    backgroundColor: 'transparent', // transparent background color
    padding: 10,
    borderRadius: 10,
  },
  separatorContainer: {
    alignItems: 'center', // Center the separator horizontally
  },
  separator: {
    borderBottomColor: '#434343',
    borderBottomWidth: 1,
    width: '95%', // Adjust the width to make the separator shorter
    marginBottom: 3,
    marginTop: 3,
  },
  separator2: {
    borderBottomColor: '#434343',
    borderBottomWidth: 1,
    width: '82%', // Adjust the width to make the separator shorter
    marginBottom: 3,
    marginTop: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5, // Add some bottom margin for spacing
  },
  summary: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 35,
    marginVertical: 35,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: '#434343',
    fontSize: 10,
    fontFamily: 'AnonymousPro-Bold',
  },
  summaryText: {
    color: '#434343',
    fontSize: 16,
    fontFamily: 'AnonymousPro-Bold',
  },
  TripTitle: {
    padding: 2,
    marginHorizontal: 35,
  },
  TripTitleText: {
    color: '#434343',
    fontSize: 20,
    fontFamily: 'AnonymousPro-Bold',
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
});

export default HistoryPage;
