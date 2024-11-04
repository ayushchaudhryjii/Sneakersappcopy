import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import Color from "../common/Color";
import StaticContent from "../common/StaticContent";
import Style from "../common/Style";
import CommonButton from "../components/CommonButton";
import CommonTextInput from "../components/CommonTextInput";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { sendOtpRequest, verifyOtpRequest,createProfileRequest  } from "../redux/actions/authAction";
import { Snackbar } from "react-native-paper";
import { SEND_OTP_SUCCESS, VERIFY_OTP_SUCCESS } from "../redux/ActionType";

const OnBoardScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null); // Save token


  const dispatch = useDispatch();
  const otpData = useSelector((state) => state.auth?.otpData);

  console.log("otpData",otpData)
const access_token = useSelector((state) => state.auth?.accessToken);
  
  console.log("otpData",otpData,access_token)


  const handleSendOtp = async () => {
    let mobileno = `+91${mobileNo}`;
    if (mobileNo.length === 10) {
      try {
        const response = await dispatch(sendOtpRequest(mobileno));
        console.log("response",response.payload)
        if (response.type === SEND_OTP_SUCCESS) {
          showSnackbar("OTP sent successfully.");
          alert("OTP sent successfully.")
        } else {
          showSnackbar(response.payload || "Failed to send OTP.");
          alert(response.payload || "Failed to send OTP.")
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        showSnackbar("Failed to send OTP. Please try again.");
      }
    } else {
      showSnackbar("Please enter a valid 10-digit mobile number.");
    }
  };
  

  const handleVerifyOtp = async () => {
    if (code.length > 0) {
      try {
        let mobileno = `+91${mobileNo}`;
        const response = await dispatch(verifyOtpRequest(mobileno, code))
        console.log("response",response);
        setOtpVerified(true);
        setProfilePopUp(true);
//         if (response.type === VERIFY_OTP_SUCCESS) {
//           setOtpVerified(true);
//           setProfilePopUp(true);
//           showSnackbar("OTP verified successfully.");
// alert("OTP verified successfully.")
//         } else {
//           showSnackbar(response.payload || "OTP verification failed.");
//         }
      } catch (error) {
        setError("Error verifying OTP. Please try again.");
      }
    } else {
      setError("Please enter the OTP.");
    }
  };

  const handleSaveProfile = async () => {
    const profileData = {
        firstName,
        lastName,
        email,
        mobileNo, // Mobile number can also be included
        imageUri, // Image URI if you want to send the image
    };

    const token = access_token; // Assuming otpData9999 contains the token from the Redux state

    try {
        const response = await dispatch(createProfileRequest(profileData, token));
        if (response) {
            showSnackbar("Profile created successfully.");
            alert("Profile created successfully.")
            setProfilePopUp(false);
            navigation.navigate("HomeScreen");
        }
    } catch (error) {
        showSnackbar("Failed to create profile.");
    }
};

  

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  // Gallery access function
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaView style={Style.commom_container}>
      <View style={Style.first_view}>
        <Text style={Style.ONBOARDSCREEN_TEXT0}>
          {StaticContent.SPLASH_TEXT}
        </Text>
        <Text style={Style.ONBOARDSCREEN_TEXT1}>
          {StaticContent.ONBOARDSCREEN_TEXT1}
        </Text>
      </View>

      <View style={Style.second_view}>
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

      {/* OTP Modal */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={Style.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={Style.modal_back_img}
              resizeMode="contain"
              source={require("../images/back.png")}
            />
          </TouchableOpacity>

          <Text style={Style.modalText}>{StaticContent.MODAL_TEXT1}</Text>
          <Text style={Style.modalText1}>{StaticContent.MODAL_TEXT2}</Text>

          <View style={Style.num_btn_view}>
            <View style={Style.num_btn_in_view}>
              <Text style={Style.code_txt}>+91</Text>
            </View>
            <TextInput
              style={Style.phnnum_input}
              value={mobileNo}
              onChangeText={setMobileNo}
              placeholder={"Mobile Number"}
              keyboardType="numeric"
              placeholderTextColor={Color.WHITE_COLOR}
            />
            <TouchableOpacity
              style={Style.sent_btn}
              onPress={() => handleSendOtp()}
            >
              <Text style={Style.send_txt}>SEND</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              style={Style.ONBOARDSCREEN_TEXT4}
              placeholder={StaticContent.MODAL_TEXT4}
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              placeholderTextColor={Color.WHITE_COLOR}
            />
          </View>
          {error ? <Text style={Style.error_txt}>{error}</Text> : null}

          <CommonButton
            title={StaticContent.MODAL_TEXT3}
            onPress={otpVerified ? () => setProfilePopUp(true) : handleVerifyOtp}
            customStyle={Style.ONBOARDSCREEN_TEXTFIELD3}
          />
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal transparent={true} visible={profilePopUp}>
        <View style={Style.modalView}>
          <View style={{ textAlign: "center" }}>
            <Text style={{ color: Color.WHITE_COLOR }}>Create Profile</Text>
          </View>

          <View style={Style.profile_view}>
            <View>
              <Image
                source={
                  imageUri ? { uri: imageUri } : require("../images/user.png")
                }
                style={[
                  Style.profile_img,
                  { tintColor: !imageUri && Color.WHITE_COLOR },
                ]}
              />
            </View>

            <TouchableOpacity
              style={Style.upload_btn}
              onPress={() => pickImageAsync()}
            >
              <Text style={Style.upload_btn_txt}>Upload Photo</Text>
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
            value={mobileNo} // Pre-filling mobile number
            editable={false} // Disable editing
          />
          <CommonButton
            title={"SAVE"}
            onPress={() => [
              setProfilePopUp(false),
              setModalVisible(!modalVisible),
              handleSaveProfile(),
            ]}
            customStyle={Style.ONBOARDSCREEN_TEXTFIELD3}
          />
        </View>
      </Modal>

      {/* Snackbar for message display */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default OnBoardScreen;
