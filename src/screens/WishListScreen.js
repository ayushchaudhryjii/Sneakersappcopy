import React from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import { usePortfolio } from "./PorfolioContext";
import { RFValue } from "react-native-responsive-fontsize";
import Color from "../common/Color";

const WishListScreen = () => {
  const { wishlistItems } = usePortfolio(); // Access wishlistItems

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.attributes.image?.url || "../images/i5.png" }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.attributes.name}</Text>
        <Text style={styles.itemBrand}>{item.attributes.brand}</Text>
        <Text style={styles.itemPrice}>Rs {item.attributes.highest_bid}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE_COLOR,
  },
  listContent: {
    padding: RFValue(10),
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: Color.LIGHT_GREY,
    marginBottom: RFValue(10),
    padding: RFValue(10),
    borderRadius: RFValue(8),
  },
  itemImage: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(8),
  },
  itemDetails: {
    marginLeft: RFValue(10),
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: Color.BLACK_COLOR,
  },
  itemBrand: {
    fontSize: RFValue(15),
    fontWeight: "500",
    color: Color.TEXT_COLOR_PRODUCT,
  },
  itemPrice: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: Color.PRIMARY_COLOR,
  },
});
