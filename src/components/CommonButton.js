import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Style from '../common/Style';


const CommonButton = ({ title, onPress, customStyle, textStyle }) => {
  return (
   
    <TouchableOpacity 
      style={[Style.ONBOARDSCREEN_TEXTFIELD1, customStyle]} 
      onPress={onPress} 
    >
      
      <Text style={[Style.ONBOARDSCREEN_TEXT1, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',  
    padding: 10,  
    borderRadius: 5,  
    alignItems: 'center',  
  },
  text: {
    color: '#fff',  
    fontSize: 16,  
  }
});

export default CommonButton;