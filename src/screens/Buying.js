// src/screens/PortfolioScreen.js
import { View, Text, Image, FlatList , TouchableOpacity , StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Color from '../common/Color';
import { RFValue } from 'react-native-responsive-fontsize';
import { usePortfolio } from './PorfolioContext';

const Buying = ({ navigation }) => {
  const { portfolioItems } = usePortfolio(); // Access portfolioItems from context


  const renderPortfolioItem = ({ item }) => (
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

 

//   const renderPortfolioItem = ({ item }) => (
//     <View
//       style={{
//         marginHorizontal: RFValue(15),
//         borderBottomWidth: 0.5,
//         borderBottomColor: Color.BLACK_COLOR,
//         flexDirection: "row",
//         height: 100,
//       }}
//     >
//       <View style={{ width: "20%", justifyContent: "center" }}>
//         <Image
//           source={{ uri: item.attributes.image.url }}
//           resizeMode="contain"
//           style={{ height: RFValue(60), width: RFValue(60) }}
//         />
//       </View>
//       <View
//         style={{
//           width: "55%",
//           justifyContent: "center",
//           paddingLeft: RFValue(10),
//           gap: RFValue(10),
//         }}
//       >
//         <Text style={{ color: "#1C1D21AD", fontSize: 14, fontWeight: "bold" }}>
//           {item.attributes.name}
//         </Text>
//         <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//           {item.attributes.brand}
//         </Text>
//       </View>
//       <View style={{ width: "25%", justifyContent: "center" }}>
//         <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//           Rs {item.attributes.mrp}
//         </Text>
//         <Text style={{ color: "#1C1D21AD", fontSize: 13, fontWeight: "bold" }}>
//           Lowest
//         </Text>
//       </View>
//     </View>
//   );

  return (
    <ScrollView>
      <View style={{ height:RFValue(50), width: "100%", backgroundColor: Color.WHITE_COLOR,padding:RFValue(10) }}>
        <Text  style={{ color: Color.BLACK_COLOR, fontSize: RFValue(20), fontWeight: "500" }}>Your Buying List</Text>
      </View>

      {/* Display Portfolio Items with FlatList */}
      <View style={{ height: "100%", width: "100%", backgroundColor: Color.WHITE_COLOR }}>
        <FlatList
          data={portfolioItems}
          renderItem={renderPortfolioItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ScrollView>
  );
};

export default Buying;

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
  
