import { View, Text } from 'react-native'
import React from 'react'
import RegularHeader from '../components/headers/RegularHeader'

export default function ButtonPreview({navigation}) {
  return (
    <>
      <RegularHeader navigation={navigation}></RegularHeader>
      <View>
        <Text>ButtonPreview</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

})