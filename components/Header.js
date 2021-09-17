import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#FD6E6E' }]}>To</Text>
      <Text style={[styles.text, { color: '#FFC67D' }]}>do</Text>
      <Text style={[styles.text, { color: '#36E2BE' }]}> li</Text>
      <Text style={[styles.text, { color: '#CB96EE' }]}>st</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    marginVertical: 40,
  },
})
