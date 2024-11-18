import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Color from '../common/Color';
import { RFValue } from 'react-native-responsive-fontsize';

const SneakPeakScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch blogs data from the API
  useEffect(() => {
    fetch('https://sneakers-rough-frost-7777.fly.dev/blogs')
      .then(response => response.json())
      .then(data => {
        setBlogs(data.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, []);

  const renderBlogItem = ({ item }) => {
    const { body, site, created_at, image } = item.attributes;

    return (
      <View style={{ marginHorizontal: RFValue(18), marginBottom: RFValue(10) , gap:RFValue(12)}}>
        <View style={{marginTop:RFValue(20)}}>
          <Image 
            source={{ uri: image.url }} 
            resizeMode="cover" 
            style={{ height: RFValue(150), width: '100%' }} 
          />
        </View>
        <View>
          <Text style={{ fontSize: RFValue(14), fontWeight: '600' }}>{body}</Text>
        </View>
        <View style={{flexDirection:"row",gap:RFValue(16)}}>
          <Text style={{ fontSize: RFValue(13), fontWeight: '500' , color:Color.THEME_COLOR}}>{created_at}</Text>
          <Text style={{ fontSize: RFValue(13), fontWeight: '500' , color:Color.THEME_COLOR}}>{site}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    // Show loading indicator if data is still being fetched
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.WHITE_COLOR }}>
        <ActivityIndicator size="large" color={Color.PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE_COLOR }}>
      <FlatList 
        data={blogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default SneakPeakScreen;
