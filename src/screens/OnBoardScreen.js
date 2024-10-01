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

const OnBoardScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState();
  const [mobileNo , setMobileNo]= useState();
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Image style={Style.modal_back_img}resizeMode='contain' source={require('../images/back.png')}/>
          <Text style={Style.modalText}>{StaticContent.MODAL_TEXT1}</Text>
          <Text style={Style.modalText1}>{StaticContent.MODAL_TEXT2}</Text>

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
          onPress={() => setModalVisible(!modalVisible)}
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
