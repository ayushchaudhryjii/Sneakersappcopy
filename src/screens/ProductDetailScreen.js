import { ScrollView, Text, View, TouchableOpacity, Image , StyleSheet } from "react-native";
import React from "react";
import Style from "../common/Style";
import { RFValue } from "react-native-responsive-fontsize";
import Color from "../common/Color";
import { usePortfolio } from './PorfolioContext';


const ProductDetailScreen = ({ route, navigation }) => {
  const { addItemToPortfolio, addItemToWishlist } = usePortfolio(); // Access addItemToPortfolio and addItemToWishlist
  const detailData = route.params?.pass;
  // const { addItemToPortfolio } = usePortfolio(); // Access addItemToPortfolio from context
  // const detailData = route.params?.pass;

  const handleBuyNow = () => {
    if (addItemToPortfolio) {
      addItemToPortfolio(detailData); // Add item to the portfolio only
      navigation.navigate("PortfolioScreen"); // Navigate to PortfolioScreen
    } else {
      console.error("addItemToPortfolio is undefined");
    }
  };

  const handleAddToWishList = () => {
    if (addItemToWishlist) {
      addItemToWishlist(detailData); // Add item to the wishlist only
      navigation.navigate("WishListScreen"); // Navigate to WishListScreen
    } else {
      console.error("addItemToWishlist is undefined");
    }
  };

  // const handleBuyNow = () => {
  //   if (addItemToPortfolio) {
  //     addItemToPortfolio(detailData); // Add item to the portfolio
  //     navigation.navigate("PortfolioScreen"); // Navigate to PortfolioScreen
  //   } else {
  //     console.error("addItemToPortfolio is undefined");
  //   }
  // };

  // const handleAddToWishList = () => {
  //   // Add to portfolio context and navigate to wishlist
  //   addItemToPortfolio(detailData);
  //   navigation.navigate("WishListScreen");
  // };

  // const handleAddToWishList = () => {
  //   // Navigate to another screen with selected data
  //   navigation.navigate("ProfileScreen", {
  //     image: detailData.attributes.image?.url || "../images/i5.png",
  //     name: detailData.attributes.name,
  //     brand: detailData.attributes.brand,
  //     mrp: detailData.attributes.highest_bid,
  //   });
  // };




// import { ScrollView, StyleSheet, Text, View , TouchableOpacity,Image } from "react-native";
// import React from "react";
// import Style from "../common/Style";
// import { RFValue } from "react-native-responsive-fontsize";
// import Color from "../common/Color";
// import { usePortfolio } from '../path/to/PortfolioContext';


// const ProductDetailScreen = ({ route, navigation }) => {
//   const { addItemToPortfolio } = usePortfolio();
//   let detailData = route.params?.pass;

//   const handleBuyNow = () => {
//     addItemToPortfolio(detailData); // Add the item to the portfolio
//     navigation.navigate("PortfolioScreen"); // Navigate to PortfolioScreen
//   };

// const ProductDetailScreen = ({ route , navigation }) => {
//   let detailData = route.params?.pass;
//   console.log("detailData", detailData.attributes.name);

//   const handleBuyNow = () => {
//     addItemToPortfolio(detailData); // Add the item to the portfolio
//     navigation.navigate("PortfolioScreen"); // Navigate to PortfolioScreen
//   };
  return (
    <ScrollView style={{backgroundColor:Color.WHITE_COLOR}}>
      <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",margin:RFValue(15)}}>
      <TouchableOpacity onPress={() =>  navigation.navigate("HomeScreen") }>
            <Image
              style={Style.modal_back_img1}
              resizeMode="contain"
              source={require("../images/LeftNavBar.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddToWishList}>
            <Image
              style={Style.modal_back_img1}
              resizeMode="contain"
              source={require("../images/add-line.png")}
            />
          </TouchableOpacity>
      
       
      </View>
      <View style={{ marginHorizontal :RFValue(15),gap:RFValue(5)}}>
        <Text style={{fontSize:RFValue(25), fontWeight:"600"}}>{detailData.attributes.name}</Text>
        <Text style={{fontSize:RFValue(18), fontWeight:"400" , color:Color.TEXT_COLOR_PRODUCT}}>{detailData.attributes.city}</Text>
        <View>
          
        </View>
        <View style={{alignItems:"center"}}>
        <Image
            source={{
              uri: detailData.attributes.image
                ? detailData.attributes?.image.url
                : require("../images/i5.png"),
            }}
            resizeMode="cover"
            style={{ height: RFValue(200), width:RFValue(250) }}
          />

        </View>
       
      </View>

      <View style={{flexDirection:"row" , gap:RFValue(20),marginHorizontal:RFValue(15),justifyContent:"space-between"}}>
        <View style={{backgroundColor:Color.LIGHT_GREY , flexDirection:"row",height:RFValue(100),width:RFValue(140),justifyContent:"center",alignItems:"center",gap:RFValue(10)}}>
          <View style={{gap:RFValue(7)}}>
            <Text style={{fontSize:RFValue(18),fontWeight:"600"}}>Rs {detailData.attributes.lowest_bid}</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500",color:Color.TEXT_COLOR_PRODUCT}}>Lowest Ask</Text>

          </View>
          <View>
          <Image
              style={Style.modal_back_img1}
              resizeMode="contain"
              source={require("../images/DownTick.png")}
            />

          </View>



        </View>
        <View style={{backgroundColor:Color.LIGHT_GREY , flexDirection:"row",height:RFValue(100),width:RFValue(140),justifyContent:"center",alignItems:"center",gap:RFValue(10)}}>
          <View style={{gap:RFValue(7)}}>
            <Text style={{fontSize:RFValue(18),fontWeight:"600"}}>Rs {detailData.attributes.highest_bid}</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500",color:Color.TEXT_COLOR_PRODUCT}}>Highest Bid</Text>

          </View>
          <View>
          <Image
              style={Style.modal_back_img1}
              resizeMode="contain"
              source={require("../images/UpTick.png")}
            />

          </View>
          <View>


          </View>



        </View>
      </View>

      <View style={{margin:RFValue(15), gap:RFValue(20)}}>
        <View>
          <Text style={{fontSize:RFValue(22), fontWeight:"600" , color:Color.BLACK_COLOR}}>Product Details</Text>

        </View>
        <View style={{gap:RFValue(10)}}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>Product type</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.product_type}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>Colorway</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.colorway}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>Brand</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.brand}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>Silhouette</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.silhouette}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>SKU</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.sku}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.TEXT_COLOR_PRODUCT}}>Release year</Text>
            <Text  style={{fontSize:RFValue(17), fontWeight:"500" , color:Color.BLACK_COLOR}}>{detailData.attributes.release_year}</Text>
          </View>

        </View>
        <View style={{gap:RFValue(10)}}>
          <Text style={{fontSize:RFValue(20), fontWeight:"600" , color:Color.TEXT_COLOR_PRODUCT}}>Description</Text>
          <Text style={{fontSize:RFValue(16), fontWeight:"400" , color:Color.BLACK_COLOR}}>{detailData.attributes.description}</Text>

        </View>
      </View>

      <View>
        <TouchableOpacity onPress={handleBuyNow}
        style={{marginLeft:RFValue(20),marginBottom:RFValue(20),borderColor:Color.BLACK_COLOR,borderWidth:RFValue(1),height:RFValue(30),width:"30%",borderRadius:RFValue(5),backgroundColor:Color.BUTTON_COLOR,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:RFValue(15),fontWeight:"500"}}>Buy Now</Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
 