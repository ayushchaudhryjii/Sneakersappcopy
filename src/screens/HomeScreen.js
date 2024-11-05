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
  ActivityIndicator,
} from "react-native";
import Color from "../common/Color";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsRequest } from "../redux/actions/authAction";
import Loader from "../components/Loader";
import Style from "../common/Style";
import {
  fetchBrandsRequest,
  fetchSizesRequest,
  fetchReleaseYearsRequest,
  searchProductRequest,
} from "../redux/actions/filterAction";

const HomeScreen = ({ navigation }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const {
    loading = false,
    products = [],
    error = null,
  } = useSelector((state) => state.products || {});

  const { brands, sizes, releaseYears, searchResults } = useSelector(
    (state) => state.filter
  );
  console.log("searchResults", searchResults);

  useEffect(() => {
    dispatch(fetchProductsRequest());
    dispatch(fetchBrandsRequest());
    dispatch(fetchSizesRequest());
    dispatch(fetchReleaseYearsRequest());
  }, [dispatch]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === "") {
      // If search input is empty, fetch the full product list
      dispatch(fetchProductsRequest());
    } else {
      // Otherwise, perform search
      dispatch(searchProductRequest(text));
    }
  };
  
  const openFilterModal = (type) => {
    setFilterType(type);
    setListModal(true);
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
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

  const renderFilterList = ({ item }) => {
    return (
      <View style={Style.listItem}>
        <Text style={Style.listText}>
          {item.attributes?.name || item.attributes?.size_number}
        </Text>
        <Image source={require("../images/back.png")} style={Style.arrowIcon} />
      </View>
    );
  };

  return (
    <SafeAreaView style={Style.contain}>
      <View style={Style.home_header_viee}>
        <Text style={Style.home_header_txt}>Market</Text>
        <TouchableOpacity
          style={Style.filter_btn_view}
          onPress={() => setFilterModal(true)}
        >
          <Text style={Style.filter_btn_txt}>Filter (0)</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.search_icon_view}>
        <View style={Style.iocn_view}>
          <Image
            source={require("../images/search.png")}
            style={Style.seach_icon}
          />
        </View>

        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={handleSearch} 
          // onChangeText={(text) => setQuery(text)} 
          onSubmitEditing={() => handleSearch(query)} 
          style={{
            width: "100%",
          }}
        />
      </View>

      {loading && <Loader />}

      {error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <FlatList
        data={
          searchResults?.data?.length > 0 ? searchResults.data : products.data
        }
          // data={searchResults.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderList}
        />
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
          <Text style={Style.modalText}>Filter</Text>
          <TouchableOpacity
            onPress={() => openFilterModal("Brand")}
            style={Style.listItem}
          >
            <Text style={Style.modalText}>Brand</Text>
            <Image
              source={require("../images/back.png")}
              style={Style.arrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openFilterModal("Size")}
            style={Style.listItem}
          >
            <Text style={Style.modalText}>Size</Text>
            <Image
              source={require("../images/back.png")}
              style={Style.arrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openFilterModal("Release Year")}
            style={Style.listItem}
          >
            <Text style={Style.modalText}>Release Year</Text>
            <Image
              source={require("../images/back.png")}
              style={Style.arrowIcon}
            />
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
          <Text style={Style.modalText}>{filterType}</Text>
          <FlatList
            data={
              filterType === "Brand"
                ? brands.data
                : filterType === "Size"
                ? sizes.data
                : filterType === "Release Year"
                ? releaseYears.data
                : []
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFilterList}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
