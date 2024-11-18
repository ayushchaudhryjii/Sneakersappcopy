// src/screens/PortfolioScreen.js
import { View, Text, Image, FlatList , TouchableOpacity } from 'react-native';
import React from 'react';
import Color from '../common/Color';
import { RFValue } from 'react-native-responsive-fontsize';
import { usePortfolio } from './PorfolioContext';

const PortfolioScreen = ({ navigation }) => {
  const { portfolioItems } = usePortfolio(); // Access portfolioItems from context

  const renderPortfolioItem = ({ item }) => (
    <View
      style={{
        marginHorizontal: RFValue(15),
        borderBottomWidth: 0.5,
        borderBottomColor: Color.BLACK_COLOR,
        flexDirection: "row",
        height: 100,
      }}
    >
      <View style={{ width: "20%", justifyContent: "center" }}>
        <Image
          source={{ uri: item.attributes.image.url }}
          resizeMode="contain"
          style={{ height: RFValue(60), width: RFValue(60) }}
        />
      </View>
      <View
        style={{
          width: "55%",
          justifyContent: "center",
          paddingLeft: RFValue(10),
          gap: RFValue(10),
        }}
      >
        <Text style={{ color: "#1C1D21AD", fontSize: 14, fontWeight: "bold" }}>
          {item.attributes.name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {item.attributes.brand}
        </Text>
      </View>
      <View style={{ width: "25%", justifyContent: "center" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Rs {item.attributes.lowest_bid}
        </Text>
        <Text style={{ color: "#1C1D21AD", fontSize: 13, fontWeight: "bold" }}>
          Lowest
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <View style={{ height: "50%", width: "100%", backgroundColor: Color.BLACK_COLOR, justifyContent: "center", alignItems: "center", gap: RFValue(20) }}>
        <Text style={{ color: Color.PORTFOLIO_COLOR, fontSize: RFValue(20), fontWeight: "500" }}>Total value</Text>
        <Text style={{ color: Color.WHITE_COLOR, fontSize: RFValue(30), fontWeight: "500" }}>Rs 190,000</Text>
        <TouchableOpacity
          style={{
            borderColor: Color.PORTFOLIO_COLOR,
            borderWidth: RFValue(1),
            width: "40%",
            height: RFValue(40),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: RFValue(10)
          }}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Image source={require("../images/addline.png")} style={{ width: RFValue(20), height: RFValue(20) }} />
          <Text style={{ color: Color.WHITE_COLOR, fontSize: RFValue(14), fontWeight: "500" }}>ADD SNEAKERS</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height:RFValue(55), width: "100%", backgroundColor: Color.WHITE_COLOR,padding:RFValue(15) }}>
        <Text  style={{ color: Color.BLACK_COLOR, fontSize: RFValue(20), fontWeight: "500" }}>Your Shoe-Rack</Text>
      </View>

      {/* Display Portfolio Items with FlatList */}
      <View style={{ height: "50%", width: "100%", backgroundColor: Color.WHITE_COLOR }}>
        <FlatList
          data={portfolioItems}
          renderItem={renderPortfolioItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: RFValue(20) }}
        />
      </View>
    </View>
  );
};

export default PortfolioScreen;
