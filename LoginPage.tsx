import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation/native';

import { getInitialData, greenGotchiAPI } from './opalerHandler';
import { saveData } from './storage';

function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [Info, setInfo] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const userInfoFromApi = await getInitialData(email, password);

      setInfo(userInfoFromApi);

      // save all the data in local storage
      saveData('firstName', userInfoFromApi?.firstName)
      saveData('lastName', userInfoFromApi?.lastName)
      saveData('cardNumber', userInfoFromApi?.cardNumber)
      saveData('email', userInfoFromApi?.email)
      saveData('totalC02', userInfoFromApi?.totalCO2)
      saveData('currentCredit', userInfoFromApi?.currentCredit)
      saveData('totalSaved', userInfoFromApi?.totalSaved)
      saveData('treeLevel', userInfoFromApi?.treeLevel)
      saveData('treePercentage', userInfoFromApi?.treePercentage)
      saveData('username', email)
      saveData('password', password)

      navigation.navigate('LoadingPage');

      //call GreenGotchi api to upload data on s3
      const greenGotchi = await greenGotchiAPI(userInfoFromApi?.cardNumber, userInfoFromApi, null, null)
      console.log(greenGotchi)

      setTimeout(function() {
        navigation.navigate('HomePage')
    }, 1000);
      //go to main page
    } catch (error) {
      console.error('Error getting user info:', error);
      setInfo(null);
    }
};

  return (
    <ImageBackground
      source={require('./assets/backgrounds/HomePage.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% opacity white background
    marginHorizontal: 40,
    marginVertical: 100,
    borderRadius: 40,
    borderColor: '#434343',
    borderWidth: 2,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' to keep aspect ratio
  },
  title: {
    fontSize: 24,
    fontFamily: 'AnonymousPro-Bold',
    marginBottom: 20,
    color: '#434343',
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: '#434343',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EAFED6',
    
  },
  button: {
    backgroundColor: '#89C07D',
    width: '50%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#434343',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 }, // Offset of the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 2, // Blur radius of the shadow
    elevation: 3, // Android elevation (affects shadow appearance)
  },
  buttonText: {
    color: '#434343',
    fontSize: 16,
    fontFamily: 'AnonymousPro-Bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginPage;