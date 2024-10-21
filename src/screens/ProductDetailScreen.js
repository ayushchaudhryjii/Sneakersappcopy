import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductDetailScreen = ({ route }) => {
  let detailData = route.params?.pass;
  console.log("detailData", detailData.attributes.name);
  return (
    <View>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
