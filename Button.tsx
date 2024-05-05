import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

interface ButtonProps extends TouchableOpacityProps {
  iconName: string; // Name of the icon
  onPress: () => void;
}

const IconButton: React.FC<ButtonProps> = ({ iconName, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      <Icon name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
}

const BUTTON_SIZE = 50; // Adjust button size as needed

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2, // Make it a circle
    backgroundColor: '#1B191B', // Light green color
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5, // Add margin for spacing between buttons
  },
});

export default IconButton;
