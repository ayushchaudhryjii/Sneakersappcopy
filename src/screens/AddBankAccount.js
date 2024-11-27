import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddBankAccount = ({ navigation }) => {
  const [formData, setFormData] = useState({
    bank_name: "",
    ifsc: "",
    account_type: "",
    account_number: "",
    confirm_account_number: "",
    account_holder_name: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.bank_name ||
      !formData.ifsc ||
      !formData.account_type ||
      !formData.account_number ||
      !formData.confirm_account_number ||
      !formData.account_holder_name
    ) {
      Alert.alert("Plz fill all fields", "All fields are required.");
      return;
    }

    if (formData.account_number !== formData.confirm_account_number) {
      Alert.alert("Error", "Account numbers do not match.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "Authorization token not found. Please login again.");
        return;
      }

      const apiUrl = "https://sneakers-rough-frost-7777.fly.dev/banks";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      };

      const response = await axios.post(apiUrl, { bank: formData }, { headers });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Bank details added successfully.");
        setFormData({
          bank_name: "",
          ifsc: "",
          account_type: "",
          account_number: "",
          confirm_account_number: "",
          account_holder_name: "",
        });
        navigation.goBack(); // Navigate back to the list
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Network error. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Bank Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={formData.bank_name}
        onChangeText={(value) => handleInputChange("bank_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="IFSC"
        value={formData.ifsc}
        onChangeText={(value) => handleInputChange("ifsc", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Type (Savings/Current)"
        value={formData.account_type}
        onChangeText={(value) => handleInputChange("account_type", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Holder's Name"
        value={formData.account_holder_name}
        onChangeText={(value) => handleInputChange("account_holder_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Account Number"
        value={formData.account_number}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange("account_number", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Bank Account Number"
        value={formData.confirm_account_number}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange("confirm_account_number", value)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Bank Account</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#929394",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
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
});

export default AddBankAccount;
