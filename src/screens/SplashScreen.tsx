import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style={{flex:1,justifyContent: 'center', backgroundColor: '#0000FF'}}>
        <ActivityIndicator size="large" color="#FFFFFFFF" />
    </View>
  )
}