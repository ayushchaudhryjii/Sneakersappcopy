import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BankAccountsList = ({navigation}) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBankId, setSelectedBankId] = useState(null);

  useEffect(() => {
    fetchBankData();
  }, []);

  const fetchBankData = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      console.log("Retrieved Token:", token);

      if (!token) {
        Alert.alert(
          "Error",
          "Authorization token not found. Please login again."
        );
        return;
      }

      const apiUrl = "https://sneakers-rough-frost-7777.fly.dev/banks";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Use Bearer token for authorization
      };

      // Fetch data from the API
      const response = await axios.get(apiUrl, { headers });
      const fetchedBanks = response.data.data.map((item) => ({
        id: item.attributes.id,
        bank_name: item.attributes.bank_name,
        ifsc: item.attributes.ifsc,
        account_number: item.attributes.account_number,
        account_holder_name: item.attributes.account_holder_name,
        account_type: item.attributes.account_type,
      }));
      setBanks(fetchedBanks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch data. Please try again."
      );
      setLoading(false);
    }
  };

  const handleSelectBank = (id) => {
    setSelectedBankId(id);
    Alert.alert("Selected Bank", `Bank ID ${id} is selected as default.`);
  };

  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bankItem,
        selectedBankId === item.id && styles.selectedBankItem,
      ]}
      onPress={() => handleSelectBank(item.id)}
    >
      <Text style={styles.bankName}>{item.bank_name}</Text>
      <Text>Account number: {item.account_number.replace(/.(?=.{4})/g, "X")}</Text>
      <Text>IFSC: {item.ifsc}</Text>
      {selectedBankId === item.id && <Text style={styles.selectedText}>✔ Default</Text>}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading bank accounts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payout Method</Text>
      <FlatList
        data={banks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBankItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No bank accounts found.</Text>}
      />
      <TouchableOpacity style={styles.addButton} 
      onPress={() => navigation.navigate("AddBankAccount")}
      >
        <Text style={styles.addButtonText}>+ ADD NEW PAYMENT METHOD</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1C1D21",
  },
  bankItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#929394",
    borderWidth: 1,
  },
  selectedBankItem: {
    borderColor: "#000",
    backgroundColor: "#e6e6e6",
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedText: {
    marginTop: 5,
    color: "green",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#929394",
    fontSize: 16,
    marginTop: 20,
  },
});

export default BankAccountsList;
