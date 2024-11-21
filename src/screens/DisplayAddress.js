import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect

const DisplayAddress = ({navigation}) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      // Retrieve the authToken from AsyncStorage
      const authToken = await AsyncStorage.getItem('authToken');

      if (!authToken) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      // Fetch addresses from the API
      const response = await fetch('https://sneakers-rough-frost-7777.fly.dev/addresses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`, // Add authToken to headers
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        setAddresses(responseData.data);
      } else {
        Alert.alert('Error', responseData.message || 'Failed to fetch addresses');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while fetching addresses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses(); // Re-fetch addresses when the screen is focused
    }, [])
  );

  const renderAddressItem = ({ item }) => {
    const { attributes } = item;
    const { pin_code, city, state, address_line } = attributes;

    return (
      <View style={styles.addressItem}>
        <Text style={styles.name}>{attributes.user.data.attributes.first_name} {attributes.user.data.attributes.last_name}</Text>
        <Text style={styles.address}>{address_line}</Text>
        <Text style={styles.cityState}>
          {city}, {state} - {pin_code}
        </Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select as Default</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Address</Text>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : addresses.length === 0 ? (
        <Text style={styles.emptyMessage}>No addresses found.</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddressItem}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateAddress")}>
        <Text style={styles.addButtonText}>+ Add New Address</Text>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
  addressItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
  cityState: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#1C1D21',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#1C1D21',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisplayAddress;
