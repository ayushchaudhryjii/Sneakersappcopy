import { View, Text , Image, SafeAreaView, StatusBar } from 'react-native'
import React, {useEffect}from 'react'
import Color from '../common/Color'
import StaticContent from '../common/StaticContent'
import Style from '../common/Style'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate("OnBoardScreen")

    },2000)
   
    
  
}, [1]);
  return (
    <SafeAreaView style={Style.CONTAINER}>
        <StatusBar barStyle={'light-content'}/>
      <Image source={require('../images/logo.png')} style={Style.SPLASH_LOGO}/>
      <View style={{position:"absolute",bottom:230}}>
      <Text style={Style.SPLASH_TEXT}>{StaticContent.SPLASH_TEXT}</Text>
      </View>
    

    </SafeAreaView>
  )
  
}

export default SplashScreen