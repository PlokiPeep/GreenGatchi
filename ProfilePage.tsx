import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import IconButton from './Button';

import { handleAddButton, handleHomeButton, handleProfileButton, handleStatsButton, handleWaterButton } from './buttonHandler';

function ProfilePage({ navigation }) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [bio, setBio] = useState<any>(null);

  const UserInfo = {
    name: 'Isabelle Hunter',
    username: 'z5358929@ad.unsw.edu.au',
    opalAccount: 'XXXX XXXX XXXX 0528',
    pronouns: 'she/her',
  };

  const Bio = '1st year Med Sci student at UNSW';

  useState(() => {
    setUserInfo(UserInfo);
    setBio(Bio);
  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/backgrounds/Sky_green.png')}
        style={styles.background}>
        <View style={styles.profileContainer}>
          <Image source={require('./assets/img/user.png')} style={styles.profileImage} />
        </View>

        {userInfo && (
          <View style={styles.aboutContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Name</Text>
              <Text style={styles.name}>{userInfo.name}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.username}>Email</Text>
              <Text style={styles.username}>{userInfo.username}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.opalAccount}>Card Number</Text>
              <Text style={styles.opalAccount}>{userInfo.opalAccount}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.pronouns}>Pronouns</Text>
              <Text style={styles.pronouns}>{userInfo.pronouns}</Text>
            </View>
          </View>
        )}

        {bio && (
          <View style={styles.bioContainer}>
            <Text style={styles.bioTitle}>About You</Text>
            <Text style={styles.bioText}>{bio}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Share with Friends')}>
            <Text style={styles.buttonText}>Share with Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Edit Profile')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          {/* navigate to login page when logout */}
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('LoginPage')}> 
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <IconButton iconName="add-outline" onPress={() => navigation.navigate('NewTripPage')} />
        <IconButton iconName="checkmark-outline" onPress={() => navigation.navigate('ConfirmTripPage')} />
        <IconButton iconName="home-outline" onPress={() => navigation.navigate('HomePage')} />
        <IconButton iconName="stats-chart-outline" onPress={() => navigation.navigate('HistoryPage')} />
        <IconButton iconName="person-outline" onPress={() => navigation.navigate('ProfilePage')} style={styles.currentNav} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B191B', // background colour
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
  profileContainer: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderColor: '#434343',
    borderWidth: 4,
  },
  profileImage: {
    transform: [{ scale: 0.7 }],
    alignSelf: 'center',
    marginTop: 0,
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  aboutContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  bioContainer: {
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  username: {
    fontSize: 18,
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  opalAccount: {
    fontSize: 16,
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  pronouns: {
    fontSize: 16,
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  bioTitle: {
    fontSize: 20,
    color: '#434343',
    marginBottom: 10,
    fontFamily: 'AnonymousPro-Bold',
  },
  bioText: {
    fontSize: 16,
    color: '#434343',
    fontFamily: 'AnonymousPro-Bold',
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 10,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#89C07D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#434343',
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:  '100%',
  },
});

export default ProfilePage;