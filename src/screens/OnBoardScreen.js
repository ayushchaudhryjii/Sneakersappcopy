import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import Color from "../common/Color";
import StaticContent from "../common/StaticContent";
import Style from "../common/Style";
import CommonButton from "../components/CommonButton";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import CommonTextInput from "../components/CommonTextInput";
import * as ImagePicker from "expo-image-picker";
import { sentOTP } from "../utils/ApiHandler";

const OnBoardScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleSend = async () => {
    if(!mobileNo){
      Alert.alert("Please fill the mobile number")
      return;
    }
    try {
      const phone_number = `+91${mobileNo}`;
      const res = await sentOTP(phone_number);
    } catch (error) {}
  };

  const handleVerifyOtp = async () => {
    const phone_number = `+91${mobileNo}`; // Construct the phone number
    try {
      const response = await axios.post(
        "https://sneakers-rough-frost-7777.fly.dev/verify_otp",
        {
          phone_number,
          otp_code: code,
        }
      );

      console.log("OTP Verification Response:", response.data);
      setOtpVerified(true); // Set OTP verified state
      setError(""); // Clear any previous errors
      // Optionally, proceed to the next step in your app
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response ? error.response.data : error.message
      );
      setError("OTP is incorrect"); // Set error message for invalid OTP
    }
  };

  // Gallery access function

  const pickImageAsync = async () => {
    console.log("WORKING..........");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("result", result);
      setImageUri(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.BLACK_COLOR }}>
      <View
        style={{
          backgroundColor: Color.WHITE_COLOR,
          flex: 1.8 / 3,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text style={Style.ONBOARDSCREEN_TEXT0}>
          {StaticContent.SPLASH_TEXT}
        </Text>
        <Text style={Style.ONBOARDSCREEN_TEXT1}>
          {StaticContent.ONBOARDSCREEN_TEXT1}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Color.BLACK_COLOR,
          flex: 1.2 / 3,
          alignItems: "center",
        }}
      >
        <CommonButton
          title={StaticContent.ONBOARDSCREEN_TEXTFIELD1_TEXT}
          onPress={() => setModalVisible(true)}
        />
        <CommonButton
          title={StaticContent.ONBOARDSCREEN_TEXTFIELD2_TEXT}
          customStyle={Style.ONBOARDSCREEN_TEXTFIELD2}
          textStyle={Style.ONBOARDSCREEN_TEXT1}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>

      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={Style.modal_back_img}
              resizeMode="contain"
              source={require("../images/back.png")}
            />
          </TouchableOpacity>

          <Text style={Style.modalText}>{StaticContent.MODAL_TEXT1}</Text>
          <Text style={Style.modalText1}>{StaticContent.MODAL_TEXT2}</Text>

          <View style={{ flexDirection: "row", paddingTop: RFValue(25) }}>
            <View
              style={{
                width: "20%",
                height: RFValue(45),
                backgroundColor: Color.GREY_COLOR,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Color.BLACK_COLOR,
                  fontSize: RFValue(15),
                  fontWeight: "600",
                }}
              >
                +91
              </Text>
            </View>
            <TextInput
              style={{
                width: "58%",
                height: RFValue(45),
                borderColor: Color.GREY_COLOR,
                borderWidth: 0.5,
                color: Color.WHITE_COLOR,
                justifyContent: "center",
                alignItems: "center",
                fontSize: RFValue(15),
                fontWeight: "400",
                paddingLeft: RFValue(10),
                borderWidth: 1,
                borderColor: Color.WHITE_COLOR,
              }}
              value={mobileNo}
              onChangeText={setMobileNo}
              placeholder={"Mobile Number"}
              keyboardType="numeric"
              placeholderTextColor={Color.WHITE_COLOR}
            />
            <TouchableOpacity
              style={{
                width: "20%",
                height: RFValue(45),
                backgroundColor: Color.BUTTON_COLOR,
                marginLeft: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
              onPress={handleSend} // Call handleSend on press
            >
              <Text
                style={{
                  color: Color.BLACK_COLOR,
                  fontSize: RFValue(15),
                  fontWeight: "600",
                }}
              >
                SEND
              </Text>
            </TouchableOpacity>
          </View>

          <View
          // style={Style.ONBOARDSCREEN_TEXTFIELD4}
          >
            <TextInput
              style={Style.ONBOARDSCREEN_TEXT4}
              placeholder={StaticContent.MODAL_TEXT4}
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              placeholderTextColor={Color.WHITE_COLOR}
            />
          </View>
          {error ? (
            <Text style={{ color: "red", fontSize: RFValue(15) }}>
              Plz enter validate otp
            </Text>
          ) : null}

          <CommonButton
            title={StaticContent.MODAL_TEXT3}
            // onPress={() => setProfilePopUp(true)}
            onPress={otpVerified ? () => setProfilePopUp(true) : handleVerifyOtp} // Verify OTP if not verified
            // onPress={() => [
            //   setModalVisible(!modalVisible),
            //   setProfilePopUp(true),
            // ]}
            customStyle={Style.ONBOARDSCREEN_TEXTFIELD3}
          />
        </View>
      </Modal>
      <Modal transparent={true} visible={profilePopUp}>
        <View style={styles.modalView}>
          <View style={{ textAlign: "center" }}>
            <Text style={{ color: Color.WHITE_COLOR }}>Create Profile</Text>
          </View>

          <View
            style={{
              height: RFValue(120),
              width: "100%",
              backgroundColor: Color.BLACK_COLOR,
              flexDirection: "row",
              alignItems: "center",
              gap: RFValue(20),
            }}
          >
            <View>
              <Image
                source={imageUri ? imageUri : require("../images/user.png")}
                style={{
                  height: RFValue(90),
                  width: RFValue(90),
                  borderRadius: RFValue(50),
                  borderColor: Color.WHITE_COLOR,
                  borderWidth: RFValue(2),
                  tintColor: !imageUri && Color.WHITE_COLOR,
                }}
              />
            </View>
            {/* <TextInput style={{height:RFValue(90),width:RFValue(90),borderRadius:RFValue(50),borderColor:Color.WHITE_COLOR,borderWidth:RFValue(2)}}
            /> */}
            <TouchableOpacity
              style={{
                borderWidth: RFValue(1),
                borderColor: Color.GREY_COLOR,
                width: RFValue(100),
                height: RFValue(25),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => pickImageAsync()}
            >
              <Text style={{ color: Color.WHITE_COLOR }}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <CommonTextInput
            label={"First Name"}
            placeHolder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
          />
          <CommonTextInput
            label={"Last Name"}
            placeHolder={"Last Name"}
            value={lastName}
            onChangeText={setLastName}
          />
          <CommonTextInput
            label={"Email"}
            placeHolder={"Email"}
            value={email}
            onChangeText={setEmail}
          />
          <CommonTextInput
            label={"Phone Number"}
            placeHolder={"Phone Number"}
            value={phone}
            onChangeText={setPhone}
          />
          <CommonButton
            title={"SAVE"}
            onPress={() => [
              setProfilePopUp(false),
              setModalVisible(!modalVisible),
              navigation.navigate("HomeScreen"),
            ]}
            customStyle={Style.ONBOARDSCREEN_TEXTFIELD3}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalView: {
    marginTop: 100,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    width: "auto",
    height: 710,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OnBoardScreen;
