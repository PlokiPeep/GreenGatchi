import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';


function LoadingPage({ navigation }) {

  return (
    <ImageBackground
      source={require('./assets/backgrounds/LoadingPage.png')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}>
      <View style={styles.centered}>
        <Text style={styles.text}>Green</Text>
        <Text style={styles.text}>Gotchi</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#096E32',
    fontSize: 50,
    fontFamily: 'AnonymousPro-Bold',
  },
});

export default LoadingPage;