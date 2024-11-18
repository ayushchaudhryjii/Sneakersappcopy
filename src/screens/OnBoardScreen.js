import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../common/Color";
import StaticContent from "../common/StaticContent";
import Style from "../common/Style";
import CommonButton from "../components/CommonButton";
import CommonTextInput from "../components/CommonTextInput";
import * as ImagePicker from "expo-image-picker";
import { Snackbar } from "react-native-paper";
import {
  sendOtpAPI,
  verifyOtpAPI,
  createProfileAPI,
} from "../utils/ApiHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();
// const redirectUri = WebBrowser.makeRedirectUri();
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});

console.log(redirectUri);
console.log(WebBrowser); // Check if the method exists

const OnBoardScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [access_token, setAccess_token] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId:
  //     "341353636251-9rs418oaa3kju31kj7p2b37rei9jc6d4.apps.googleusercontent.com",
  //   webClientId:
  //     "771816981075-cpudtrj0p7n5r50vfbsr64nd3raih6dv.apps.googleusercontent.com",
  //   redirectUri: AuthSession.makeRedirectUri({
  //     useProxy: true,
  //   }),
  // });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "341353636251-9rs418oaa3kju31kj7p2b37rei9jc6d4.apps.googleusercontent.com",
    webClientId:
      "771816981075-cpudtrj0p7n5r50vfbsr64nd3raih6dv.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const { accessToken } = authentication;
      getUserInfo(accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  const handleSendOtp = async () => {
    if (!mobileNo) {
      alert("Please enter your mobile number.");
      showSnackbar("Please enter your mobile number.");
      return;
    }
    if (mobileNo.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      showSnackbar("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendOtpAPI(`+91${mobileNo}`);
      if (response?.status === 200) {
        alert("OTP sent successfully.");
        showSnackbar("OTP sent successfully.");
      } else {
        alert("Failed to send OTP.");
        showSnackbar("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      showSnackbar("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    if (code.trim().length === 0) {
      showSnackbar("Please enter the OTP.");
      setLoading(false);
      return;
    }

    const mobileno = `+91${mobileNo}`;
    try {
      const response = await verifyOtpAPI(mobileno, code);
      console.log("handleVerifyOtpDAATATA", response.data.token);
      if (response?.status === 200) {
        alert("OTP verified successfully.");
        setAccess_token(response.data.token);
        await AsyncStorage.setItem("authToken", response.data.token);
        showSnackbar("OTP verified successfully.");
        setLoading(false);
        setProfilePopUp(true);
      } else {
        setLoading(false);
        alert("Failed to verify OTP.");
        showSnackbar("Failed to verify OTP.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying OTP:", error);
      showSnackbar("Error verifying OTP. Please try again.");
    }
  };

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !email || !imageUri) {
      alert("Please fill out all required fields.");
      showSnackbar("Please fill out all required fields.");
      return;
    }

    const profileData = {
      firstName,
      lastName,
      email,
      mobileNo,
      imageUri,
    };
    let accessToken = await AsyncStorage.getItem("authToken");
    console.log("access_token", access_token);
    try {
      const response = await createProfileAPI(profileData, access_token);
      if (response?.status === 200) {
        alert("Profile created successfully.");
        showSnackbar("Profile created successfully.");
        setProfilePopUp(false);
        setModalVisible(false);
        navigation.navigate("HomeScreen");
      } else {
        alert("Failed to create profile.");
        showSnackbar("Failed to create profile.");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
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
      {JSON.stringify(userInfo) && <Text>{JSON.stringify(userInfo)}</Text>}
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
          // onPress={() => setProfilePopUp(true)}
        />
        <CommonButton
          title={StaticContent.ONBOARDSCREEN_TEXTFIELD2_TEXT}
          customStyle={Style.ONBOARDSCREEN_TEXTFIELD2}
          textStyle={Style.ONBOARDSCREEN_TEXT1}
          onPress={() => navigation.navigate("HomeScreen")}
          // onPress={() => promptAsync()}
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
          {/* {error ? <Text style={Style.error_txt}>{error}</Text> : null} */}

          <CommonButton
            title={StaticContent.MODAL_TEXT3}
            onPress={
              otpVerified ? () => setProfilePopUp(true) : handleVerifyOtp
            }
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
            value={mobileNo}
            editable={false}
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
      {/* Loader */}
      {loading && (
        <View style={Style.loader}>
          <ActivityIndicator size="large" color={Color.THEME_COLOR} />
        </View>
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color={Color.WHITE_COLOR}
          style={Style.loader}
        />
      )}
    </SafeAreaView>
  );
};

export default OnBoardScreen;
