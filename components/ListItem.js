import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, CheckBox } from 'react-native'
// import Checkbox from 'expo-checkbox'

export default function ListItem({ item, changeItem, deleteItem }) {
  const change = (e) => changeItem(e, item)
  return (
    <View style={styles.itemBox}>
      <View style={styles.item}>
        <CheckBox value={item.checked} onValueChange={change} tintColors={{ true: '#CB96EE' }} />
        <Text style={[styles.title, item.checked ? styles.titleChecked : {}]}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item)}>
        <Image source={require('../assets/delete.png')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemBox: {
    marginBottom: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
    color: '#FFC67D',
  },
  titleChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.3,
  },
})
