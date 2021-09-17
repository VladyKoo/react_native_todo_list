import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from './components/Header'
import List from './components/List'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      <List />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
})
