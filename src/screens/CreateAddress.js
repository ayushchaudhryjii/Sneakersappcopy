import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAddress = ({navigation}) => {
  const [address, setAddress] = useState({
    pin_code: '',
    city: '',
    state: '',
    address_line: '',
    phone_number: '',
  });

  const handleInputChange = (key, value) => {
    setAddress({ ...address, [key]: value });
  };

  const submitAddress = async () => {
    try {
      // Retrieve the authToken from AsyncStorage
      const authToken = await AsyncStorage.getItem('authToken');

      if (!authToken) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const response = await fetch('https://sneakers-rough-frost-7777.fly.dev/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`, // Add authToken to headers
        },
        body: JSON.stringify({ address }),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Address added successfully!');
        navigation.navigate("DisplayAddress");
        console.log(responseData);
      } else {
        console.log(responseData);
        Alert.alert(responseData.message );
        console.log(responseData);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pin Code:</Text>
      <TextInput
        style={styles.input}
        value={address.pin_code}
        onChangeText={(text) => handleInputChange('pin_code', text)}
        keyboardType="numeric"
        placeholder="Enter Pin Code"
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={address.city}
        onChangeText={(text) => handleInputChange('city', text)}
        placeholder="Enter City"
      />

      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        value={address.state}
        onChangeText={(text) => handleInputChange('state', text)}
        placeholder="Enter State"
      />

      <Text style={styles.label}>Address Line:</Text>
      <TextInput
        style={styles.input}
        value={address.address_line}
        onChangeText={(text) => handleInputChange('address_line', text)}
        placeholder="Enter Address Line"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={address.phone_number}
        onChangeText={(text) => handleInputChange('phone_number', text)}
        keyboardType="phone-pad"
        placeholder="Enter Phone Number"
      />

      <TouchableOpacity style={styles.button} onPress={submitAddress}>
        <Text style={styles.buttonText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1C1D21',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAddress;
