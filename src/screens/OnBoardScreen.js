import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import React, { useState } from "react";
import Color from "../common/Color";
import StaticContent from "../common/StaticContent";
import Style from "../common/Style";
import CommonButton from "../components/CommonButton";
import { RFValue } from "react-native-responsive-fontsize";
import CommonTextInput from "../components/CommonTextInput";

const OnBoardScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState();
  const [mobileNo , setMobileNo]= useState();
  const [profilePopUp , setProfilePopUp]=useState(false);
  const [firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
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

      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <Image style={Style.modal_back_img}resizeMode='contain' source={require('../images/back.png')}/>
          <Text style={Style.modalText}>{StaticContent.MODAL_TEXT1}</Text>
          <Text style={Style.modalText1}>{StaticContent.MODAL_TEXT2}</Text>

          <View style={{flexDirection:"row"}}>
            <View style={{width:"20%",height:RFValue(40),backgroundColor:Color.GREY_COLOR,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:Color.BLACK_COLOR}}>+91</Text>
            </View>
            <TextInput style={{width:"58%", height:RFValue(40),borderColor:Color.GREY_COLOR,borderWidth:0.5,color:Color.WHITE_COLOR,justifyContent:"center",alignItems:"center"}}
            placeholder={"Mobile Number"} placeholderTextColor={Color.WHITE_COLOR}
            />
            <TouchableOpacity style={{width:"18%",height:RFValue(40),backgroundColor:Color.THEME_COLOR,borderColor:Color.GREY_COLOR,borderWidth:0.5,marginLeft:8,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:Color.BLACK_COLOR}}>SEND</Text>


            </TouchableOpacity>

           

          </View>

          <View style={Style.Number_TextField}>
          <TextInput
              style={Style.ONBOARDSCREEN_TEXT5}
              placeholder={StaticContent.MODAL_TEXT5}
              value={mobileNo}
              onChangeText={setMobileNo}
              keyboardType="numeric"
            />
               <CommonButton
          title={StaticContent.MODAL_TEXT6}
          onPress={() => setModalVisible(!modalVisible)}
          customStyle={Style.ONBOARDSCREEN_TEXTFIELD5}
          />

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
            />
          </View>

          <CommonButton
          title={StaticContent.MODAL_TEXT3}
          onPress={() => [setModalVisible(!modalVisible),setProfilePopUp(true)]}
          customStyle={Style.ONBOARDSCREEN_TEXTFIELD3}
          />
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={profilePopUp}
        >
          <View style={styles.modalView}>
            <Text style={{color:Color.WHITE_COLOR}}>Create Profile</Text>
            <CommonTextInput
            label={"First Name"}
            placeHolder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
            />
              <CommonTextInput
            label={"First Name"}
            placeHolder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
            />
              <CommonTextInput
            label={"First Name"}
            placeHolder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
            />
              <CommonTextInput
            label={"First Name"}
            placeHolder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
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
