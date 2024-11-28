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
import Loader from "../components/Loader";
import Style from "../common/Style";

import {
  fetchBrandListAPI,
  fetchSizeListAPI,
  fetchReleaseYearListAPI,
  searchProductAPI,
} from "../utils/ApiHandler";

const HomeScreen = ({ navigation }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [releaseYears, setReleaseYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedReleaseYear, setSelectedReleaseYear] = useState("");

  // Fetching initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedBrand, selectedSize, selectedReleaseYear, query]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const brandData = await fetchBrandListAPI();
      setBrands(brandData?.data || []);
      const sizeData = await fetchSizeListAPI();
      setSizes(sizeData?.data || []);
      const yearData = await fetchReleaseYearListAPI();
      setReleaseYears(yearData?.data || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    console.log("Searching with filters:", {
      query,
      selectedBrand,
      selectedSize,
      selectedReleaseYear,
    });
    setLoading(true);
    try {
      const searchData = await searchProductAPI({
        query: query,
        brand: selectedBrand || "",
        size: selectedSize || "",
        release_year: selectedReleaseYear || "",
      });
      console.log("searchData:", searchData.data);
      setSearchResults(searchData?.data?.data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (type, value) => {
    if (type === "Brand") {
      setSelectedBrand(value);
    } else if (type === "Size") {
      setSelectedSize(value);
    } else if (type === "Release Year") {
      setSelectedReleaseYear(value);
    }

    setFilterModal(false);
    setListModal(false);
  };

  const closeModal = () => {
    setFilterModal(false);
    setListModal(false);
  };

  const openFilterModal = (type) => {
    setFilterType(type);
    setListModal(true);
  };

  const appliedFilters = [
    selectedBrand,
    selectedSize,
    selectedReleaseYear,
  ].filter(Boolean).length;

  // Function to determine if the filter is selected (for styling)
  const isSelected = (type, value) => {
    if (type === "Brand" && value === selectedBrand) return true;
    if (type === "Size" && value === selectedSize) return true;
    if (type === "Release Year" && value === selectedReleaseYear) return true;
    return false;
  };

  const renderList = ({ item }) => {

    const sizes = item.attributes.sizes || []; // Ensure sizes array is defined
    const mrp = sizes.length > 0 ? sizes[0].mrp : "N/A";
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
          ₹ {mrp}
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
    const displayText =
      filterType === "Size"
        ? item.attributes.size_number
        : item.attributes.name;
    const selected = isSelected(filterType, displayText); // Check if it's selected
    return (
      <TouchableOpacity onPress={() => applyFilter(filterType, displayText)}>
        <View style={Style.listItem}>
          <Text
            style={[
              Style.listText,
              selected && { color: "red" }, // Change text color to red when selected
            ]}
          >
            {displayText}
          </Text>
          <Image
            source={require("../images/back.png")}
            style={Style.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Style.contain}>
      <View style={Style.search_icon_view}>
        <View style={Style.iocn_view}>
          <Image
            source={require("../images/search.png")}
            style={Style.seach_icon}
          />
        </View>

        <TextInput
          placeholder="Search products by name ..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            handleSearch(); // trigger search on text change
          }}
          onSubmitEditing={() => handleSearch()} // trigger search on submit as well
          style={{ width: "100%", height: RFValue(45) }}
        />
      </View>
      <View style={Style.home_header_viee}>
        <Text style={Style.home_header_txt}>Market</Text>
        <TouchableOpacity
          style={Style.filter_btn_view}
          onPress={() => setFilterModal(true)}
        >
          <Text style={Style.filter_btn_txt}>Filter ({appliedFilters})</Text>
        </TouchableOpacity>
      </View>

      {loading && <Loader />}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderList}
        />
      ) : (
        <View style={Style.common_container}>
          <Text style={Style.ONBOARDSCREEN_TEXT1}>Data not found</Text>
        </View>
      )}

      <Modal transparent={true} visible={filterModal}>
        <View style={Style.modalView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setFilterModal(!filterModal)}>
              <Image
                style={Style.modal_back_img}
                resizeMode="contain"
                source={require("../images/back.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedBrand("");
                setSelectedSize("");
                setSelectedReleaseYear("");
                setFilterModal(false);
                handleSearch();
              }}
              style={[{ backgroundColor: Color.WHITE_COLOR }]}
            >
              <Text style={[Style.code_txt, { padding: 3 }]}>
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>

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
