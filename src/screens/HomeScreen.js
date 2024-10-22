import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Color from "../common/Color";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsRequest,
} from "../redux/actions/authAction";
import Loader from "../components/Loader";

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  
  const {
    loading = false,
    products = [],
    error = null,
  } = useSelector((state) => state.products || []);

  console.log(" loading, products, error", loading, products, error);


  useEffect(() => {
    const data = dispatch(fetchProductsRequest()); 
    console.log(data, "data");
  }, [dispatch]);

  if (loading) {
    return <Loader/>; 
}



  const renderList = ({ item, index }) => {
    console.log("Rendering item:", item);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.id);
          navigation.navigate("ProductDetailScreen", { pass: item });
        }}
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
            source={{
              uri: item.attributes.image
                ? item.attributes?.image.url
                : require("../images/i5.png"),
            }}
            resizeMode="contain"
            style={{ height: RFValue(60), width: RFValue(60) }}
          />
        </View>
        <View
          style={{
            width: "60%",
            justifyContent: "center",
            paddingLeft: RFValue(10),
            gap: RFValue(10),
          }}
        >
          <Text
            style={{ color: "#1C1D21AD", fontSize: 14, fontWeight: "bold" }}
          >
            {item.attributes.name}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.attributes.brand}
          </Text>
        </View>
        <View style={{ width: "20%", justifyContent: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Rs {item.attributes.mrp}
          </Text>
          <Text
            style={{ color: "#1C1D21AD", fontSize: 13, fontWeight: "bold" }}
          >
            {item.priceText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE_COLOR }}>
       <View
        style={{
          borderColor: Color.BLACK_COLOR,
          borderWidth: 0.5,
          backgroundColor: "#F6F6F6",
          height: RFValue(45),
          marginHorizontal: RFValue(15),
          flexDirection: "row",
          margin: RFValue(18)
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "15%",
          }}
        >
          <Image
            source={require("../images/search.png")}
            style={{ height: RFValue(18), width: RFValue(18) }}
          />
        </View>
        <View style={{ justifyContent: "center", width: "85%" }}>
          <Text style={{ color: Color.BLACK_COLOR, fontSize: RFValue(15) }}>
            Search by name, brand etc
          </Text>
        </View>
      </View>
      <View
        style={{
          height: RFValue(45),
          marginHorizontal: RFValue(15),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: RFValue(20),
            fontWeight: "600",
            color: Color.BLACK_COLOR,
          }}
        >
          Market
        </Text>
        <View
          style={{
            borderColor: Color.BLACK_COLOR,
            borderWidth: 1,
            height: RFValue(30),
            width: RFValue(80),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: RFValue(4),
          }}
        >
          <Text
            style={{
              color: Color.BLACK_COLOR,
              fontSize: RFValue(15),
              fontWeight: "bold",
            }}
          >
            Filter (0)
          </Text>
        </View>
      </View>

      {products.data ? (
        <FlatList
          data={products.data} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderList}
        />
      ) : (
        <Text>No products found</Text>
      )} 
    </SafeAreaView>
  );
};

export default HomeScreen;

