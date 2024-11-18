import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Style from "../common/Style";
import Color from "../common/Color";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native";

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE_COLOR }}>
      <View
        style={{ margin: RFValue(15), flexDirection: "row", gap: RFValue(15) }}
      >
        <View>
          <Image
            source={require("../images/user.png")}
            style={[Style.profile_img1, { tintColor: Color.BLACK_COLOR }]}
          />
        </View>
        <View style={{ gap: RFValue(3), justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: RFValue(20), fontWeight: "600" }}>
              Ayush Chaudhary
            </Text>
            <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: RFValue(13),
                fontWeight: "500",
                color: Color.TEXT_COLOR_PRODUCT,
              }}
            >
              ayushchaudhary0303@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: RFValue(20),
          marginHorizontal: RFValue(15),
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: Color.LIGHT_GREY,
            height: RFValue(110),
            width: RFValue(140),
            justifyContent: "center",
            gap: RFValue(10),
          }}
        >
          <View style={{ gap: RFValue(7),paddingLeft:RFValue(10) }}>
            <Text style={{ fontSize: RFValue(18), fontWeight: "600" }}>
              Selling : 12
            </Text>
            <Text style={{ fontSize: RFValue(18), fontWeight: "600" }}>
              Sold     :  6
            </Text>
          </View>
          <View style={{flexDirection:"row", gap:RFValue(10),paddingLeft:RFValue(10)}}>
            <Text style={{ fontSize: RFValue(18), fontWeight: "500",color:Color.TEXT_COLOR_PRODUCT }}>On Sale</Text>
            <Image
              style={Style.modal_back_img2}
              resizeMode="contain"
              source={require("../images/rightarrow.png")}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.LIGHT_GREY,
            height: RFValue(110),
            width: RFValue(140),
            justifyContent: "center",
            gap: RFValue(10),
          }}
        >
          <View style={{ gap: RFValue(7),paddingLeft:RFValue(10) }}>
            <Text style={{ fontSize: RFValue(18), fontWeight: "600" }}>
              Winning :  2
            </Text>
            <Text style={{ fontSize: RFValue(18), fontWeight: "600" }}>
              Outbid    :  6
            </Text>
          </View>
          <View style={{flexDirection:"row", gap:RFValue(10),paddingLeft:RFValue(10)}}>
            <Text style={{ fontSize: RFValue(18), fontWeight: "500",color:Color.TEXT_COLOR_PRODUCT }}>On Target</Text>
            <Image
              style={Style.modal_back_img2}
              resizeMode="contain"
              source={require("../images/rightarrow.png")}
            />
          </View>
        </View>
        
      </View>
      <View style={{margin:RFValue(15)}}>
        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",borderColor:Color.BLACK_COLOR,borderBottomWidth:RFValue(1),borderTopWidth:RFValue(1),paddingVertical:RFValue(12)}}>
          <View style={{gap:RFValue(5)}}>
            <Text style={{fontSize:RFValue(17),fontWeight:"600", color:Color.BLACK_COLOR}}>Buying</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500", color:Color.TEXT_COLOR_PRODUCT
            }}>Active Bids,In Progress,Orders</Text>
          </View>
          <View>
          <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />

          </View>
        </TouchableOpacity>
        <TouchableOpacity 
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Color.BLACK_COLOR,
    borderBottomWidth: RFValue(1),
    paddingVertical: RFValue(12),
  }}
  onPress={() => navigation.navigate("WishListScreen")} // Correctly wrap in a function
>
  <View style={{ gap: RFValue(5) }}>
    <Text style={{ fontSize: RFValue(17), fontWeight: "600", color: Color.BLACK_COLOR }}>
      WishList
    </Text>
    <Text style={{ fontSize: RFValue(15), fontWeight: "500", color: Color.TEXT_COLOR_PRODUCT }}>
      Add your favorite Sneakers
    </Text>
  </View>
</TouchableOpacity>

        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",borderColor:Color.BLACK_COLOR,borderBottomWidth:RFValue(1),paddingVertical:RFValue(12)}}>
          <View style={{gap:RFValue(5)}}>
            <Text style={{fontSize:RFValue(17),fontWeight:"600", color:Color.BLACK_COLOR}}>Selling</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500", color:Color.TEXT_COLOR_PRODUCT
            }}>Active Asks,Sales,History</Text>
          </View>
          <View>
          <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />

          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",borderColor:Color.BLACK_COLOR,borderBottomWidth:RFValue(1),paddingVertical:RFValue(12)}}>
          <View style={{gap:RFValue(5)}}>
            <Text style={{fontSize:RFValue(17),fontWeight:"600", color:Color.BLACK_COLOR}}>Following</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500", color:Color.TEXT_COLOR_PRODUCT
            }}>Product you’re watching</Text>
          </View>
          <View>
          <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />

          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",borderColor:Color.BLACK_COLOR,borderBottomWidth:RFValue(1),paddingVertical:RFValue(12)}}>
          <View style={{gap:RFValue(5)}}>
            <Text style={{fontSize:RFValue(17),fontWeight:"600", color:Color.BLACK_COLOR}}>Address</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500", color:Color.TEXT_COLOR_PRODUCT
            }}>Billing address,Shipping address</Text>
          </View>
          <View>
          <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />

          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",borderColor:Color.BLACK_COLOR,borderBottomWidth:RFValue(1),paddingVertical:RFValue(12)}}>
          <View style={{gap:RFValue(5)}}>
            <Text style={{fontSize:RFValue(17),fontWeight:"600", color:Color.BLACK_COLOR}}>Payout method</Text>
            <Text style={{fontSize:RFValue(15),fontWeight:"500", color:Color.TEXT_COLOR_PRODUCT
            }}>Payout Account details</Text>
          </View>
          <View>
          <Image
              source={require("../images/rightarrow.png")}
              style={{ height: RFValue(30), width: RFValue(30) }}
            />

          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;





// import React, { useEffect, useState } from "react";
// import { View, Text, ActivityIndicator,Image } from "react-native";
// import { getProfileAPI } from "../utils/ApiHandler"; // Import the function to fetch profile
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ProfileScreen = ({ route }) => {
//   const { image, name, brand, mrp } = route.params || {}
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken");
//         if (token) {
//           const response = await getProfileAPI(token);
//           console.log("responsePRP", response);
//           setProfile(response.data);
//         } else {
//           setError("No access token found");
//         }
//       } catch (error) {
//         setError("Error fetching profile");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   if (!profile) {
//     return (
//       <View>
//         <Text>No profile data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//     <View>
//       <Text>Profile Information</Text>
//       <Text>
//         Name: {profile.data.attributes.first_name}{" "}
//         {profile.data.attributes.last_name}
//       </Text>
//       <Text>Email: {profile.data.attributes.email}</Text>
//       <Text>Email: {profile.data.attributes.phone_number}</Text>
//     </View>
//     <View>
//       {image && (
//         <Image
//           source={{ uri: image }}
//           resizeMode="cover"
//           // style={styles.image}
//         />
//       )}
//       {name && <Text>{name}</Text>}
//       {brand && <Text>Brand: {brand}</Text>}
//       {mrp && <Text>MRP: Rs {mrp}</Text>}
//     </View>
   
//     </View>
    
//   );
// };

// export default ProfileScreen;


