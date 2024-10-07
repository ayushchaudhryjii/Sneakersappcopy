import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Color from "../common/Color"
import { RFValue } from 'react-native-responsive-fontsize'

const CommonTextInput = ({label , value, onChangeText,placeHolder}) => {
  return (
    <View style={{marginVertical:RFValue(10)}}>
      <Text style={{fontSize:RFValue(15),color:Color.WHITE_COLOR,marginBottom:RFValue(3)}}>{label}</Text>
      <TextInput style={{borderWidth:0.3,borderColor:Color.GREY_COLOR,paddingHorizontal:RFValue(10),height:RFValue(40)}}
      placeholder={placeHolder}
      onChangeText={onChangeText}
      value={value}/>
    </View>
  )
}

export default CommonTextInput