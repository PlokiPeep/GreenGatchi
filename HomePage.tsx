import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconButton from './Button';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {getData, saveData} from './storage';

import { useFocusEffect } from '@react-navigation/native';



import { handleAddButton, handleHomeButton, handleProfileButton, handleStatsButton, handleWaterButton } from './buttonHandler';

function HomePage({ navigation }) {
  const [credits, setCredits] = useState(0);  // Start with zero, will update after loading
  const [levelProgress, setLevelProgress] = useState(0.8);
  const [treeLevel, setTreeLevel] = useState(3);
  const [stage, setStage] = useState(3);

  useFocusEffect(() => {
    // Load credits from AsyncStorage
    const loadCredits = async () => {
      const savedCredits = await getData('currentCredit');
      setCredits(savedCredits);
    };

    loadCredits();
  });

  useEffect(() => {
    if (levelProgress > 0.9 && levelProgress <= 1) {
      setLevelProgress(1);
      setTreeLevel(prevTreeLevel => prevTreeLevel + 1);
      setStage(prevStage => prevStage + 1);
      setTimeout(() => {
        setLevelProgress(0); // Reset level progress after a short delay
      }, 300);
    }
  }, [levelProgress]);


  const waterTree = async () => {
    if (credits >= 20 ) {
      const updatedCredits = credits - 20;
      await setCredits(updatedCredits);
      saveData('currentCredit', updatedCredits);
      setLevelProgress(prevProgress => prevProgress + 0.1);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/backgrounds/HomePage.png')}
        style={styles.background}>
        <View style={styles.introContainer}>
          <Text style={styles.nametext}>Hi Bella</Text>
        </View>
        <View style={styles.introContainer}>
          <Text style={styles.credittext}>Credits: {credits.toFixed(2)}</Text>
        </View>
        <View style={styles.treeContainer}>
          <TouchableOpacity onPress={waterTree} style={styles.waterTreeContainer}>
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          {stage === 1 && (
            <ImageBackground
              source={require('./assets/img/stage1.png')}
              style={{ width: 50, height: 50, marginTop: 200 }}
            />
          )}
          {stage === 2 && (
            <ImageBackground
              source={require('./assets/img/stage2.png')}
              style={{ width: 50, height: 50, marginTop: 180 }}
            />
          )}
          {stage === 3 && (
            <ImageBackground
              source={require('./assets/img/stage3.png')}
              style={{ width: 100, height: 100, marginTop: 150 }}
            />
          )}
          {stage === 4 && (
            <ImageBackground
              source={require('./assets/img/stage4.png')}
              style={{ width: 200, height: 200, marginTop: 50 }}
            />
          )}
          {stage === 5 && (
            <ImageBackground
              source={require('./assets/img/stage5.png')}
              style={{ width: 250, height: 250, marginBottom: 30 }}
            />
          )}
        </View>
        <View style={styles.groundContainer}>
          <Text style={styles.textLevel}>Tree Level: {treeLevel}</Text>
          <Progress.Bar progress={levelProgress} width={320} height={10} borderColor="#434343" borderWidth={2} color="#FF88B9" unfilledColor="#D9D9D9"/>
        </View>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <IconButton iconName="add-outline" onPress={() => navigation.navigate('NewTripPage')} />
        <IconButton iconName="checkmark-outline" onPress={() => navigation.navigate('ConfirmTripPage')} />
        <IconButton iconName="home-outline" onPress={() => navigation.navigate('HomePage')} style={styles.currentNav}/>
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
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' to keep aspect ratio
  },
  introContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  treeContainer: {
    marginTop: 20,
    height: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waterTreeContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginVertical: 20,
  },
  groundContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    backgroundColor: '#1B191B',
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
  text: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 20,
  },
  nametext: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 30,
  },
  credittext: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 20,
  },
  textLevel: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 20,
    color: '#fff',
    textShadowColor: '#000', // Shadow color (usually the opposite of text color)
    textShadowOffset: { width: 1, height: 1 }, // Offset of the shadow
    textShadowRadius: 2, // Blur radius of the shadow
  }
});

export default HomePage;