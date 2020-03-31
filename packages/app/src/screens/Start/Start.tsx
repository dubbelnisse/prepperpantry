import React from 'react'
import { StyleSheet, View } from 'react-native'
import Login from '../Login/Login'

export default function Start() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
})
