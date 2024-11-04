import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Color from "../common/Color";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsRequest } from "../redux/actions/authAction";
import Loader from "../components/Loader";
import Style from "../common/Style";
import StaticContent from "../common/StaticContent";
import { fetchBrandsRequest } from "../redux/actions/brandAction";

const HomeScreen = ({ navigation }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [listModal, setListModal] = useState(false);

  const dispatch = useDispatch();

  const {
    loading = false,
    products = [],
    error = null,
  } = useSelector((state) => state.products || []);

  const brand = useSelector((state) => state.brand || []);
  console.log("brand", brand.brand);

  useEffect(() => {
    dispatch(fetchProductsRequest());
    const brands = dispatch(fetchBrandsRequest());
    console.log(brands, "brands");
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const renderList = ({ item, index }) => {
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

  const renderBrandList = ({ item, index }) => {
    console.log("Brands item:", item);
    return (
      <View>
        <Text
          style={{ color: Color.WHITE_COLOR, fontSize: 14, fontWeight: "bold" }}
        >
          {item.attributes.name}
        </Text>
      </View>
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
          margin: RFValue(18),
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
        <TouchableOpacity
          style={{
            borderColor: Color.BLACK_COLOR,
            borderWidth: 1,
            height: RFValue(30),
            width: RFValue(80),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: RFValue(4),
          }}
          onPress={() => setFilterModal(true)}
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
        </TouchableOpacity>
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

      <Modal transparent={true} visible={filterModal}>
        <View style={Style.modalView}>
          <TouchableOpacity onPress={() => setFilterModal(!filterModal)}>
            <Image
              style={Style.modal_back_img}
              resizeMode="contain"
              source={require("../images/back.png")}
            />
          </TouchableOpacity>
          <Text style={Style.modalText}>Fliter</Text>
          <TouchableOpacity
            onPress={() => [setFilterModal(false), setListModal(true)]}
          >
            <Text style={Style.modalText}>Brand</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [setFilterModal(false), setListModal(true)]}
          >
            <Text style={Style.modalText}>Size</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [setFilterModal(false), setListModal(true)]}
          >
            <Text style={Style.modalText}>Rlease Year</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal transparent={true} visible={listModal}>
        <View style={Style.modalView}>
          <TouchableOpacity onPress={() => setListModal(!listModal)}>
            <Image
              style={Style.modal_back_img}
              resizeMode="contain"
              source={require("../images/back.png")}
            />
          </TouchableOpacity>
          <Text style={Style.modalText}>Fliter</Text>

          {brand.brand.data ? (
            <FlatList
              data={brand.brand.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderBrandList}
            />
          ) : (
            <Text>No brand found</Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
