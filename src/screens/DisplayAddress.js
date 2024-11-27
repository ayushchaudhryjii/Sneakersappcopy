import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const DisplayAddress = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Track selected address

  const fetchAddresses = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (!authToken) {
        Alert.alert("Error", "User is not authenticated");
        return;
      }

      const response = await fetch(
        "https://sneakers-rough-frost-7777.fly.dev/addresses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setAddresses(responseData.data);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Failed to fetch addresses"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Something went wrong while fetching addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id); // Mark the address as selected
    const selectedAddress = addresses.find((item) => item.id === id);

    // Show alert with selected address details
    Alert.alert(
      "Address Selected",
      `Selected Address:\n${selectedAddress.attributes.address_line}, ${selectedAddress.attributes.city}, ${selectedAddress.attributes.state} - ${selectedAddress.attributes.pin_code}`
    );
  };

  const renderAddressItem = ({ item }) => {
    const { attributes } = item;
    const { pin_code, city, state, address_line } = attributes;

    

    return (
      <View
        style={[
          styles.addressItem,
          selectedAddressId === item.id && styles.selectedAddressItem, // Highlight selected address
        ]}
      >
        <Text style={styles.name}>
          {attributes.user.data.attributes.first_name}{" "}
          {attributes.user.data.attributes.last_name}
        </Text>
        <Text style={styles.address}>{address_line}</Text>
        <Text style={styles.cityState}>
          {city}, {state} - {pin_code}
        </Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleSelectAddress(item.id)} // Handle selection
        >
          <Text style={styles.selectButtonText}>
            {selectedAddressId === item.id ? "✔ Default Address" : "Select as Default"}
          </Text>
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateAddress")}
      >
        <Text style={styles.addButtonText}>+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loading: {
    textAlign: "center",
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
  },
  addressItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  selectedAddressItem: {
    borderColor: "#000",
    backgroundColor: "#f5f5f5",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  cityState: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: "#1C1D21",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#1C1D21",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DisplayAddress;
