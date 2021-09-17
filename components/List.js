import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native'
import ListItem from './ListItem'

export default function List() {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  const changeItem = (value, item) => {
    setList((prewList) => {
      return prewList.map((el) => {
        if (el.id === item.id) {
          return { ...el, checked: value }
        } else return el
      })
    })
  }
  const deleteItem = (item) => {
    setList((prewList) => {
      return prewList.filter((el) => el.id !== item.id)
    })
  }
  const addItem = () => {
    if (!input.trim()) return
    setList((prewList) => {
      return [
        ...prewList,
        {
          id: Math.random().toString(),
          title: input,
          checked: false,
          description: '',
        },
      ]
    })
    setInput('')
  }
  const renderItem = (item) => {
    return <ListItem item={item} changeItem={changeItem} deleteItem={deleteItem}></ListItem>
  }
  return (
    <View>
      <View style={styles.itemBox}>
        <TextInput
          placeholder='New todo'
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addItem}
          placeholderTextColor='#FFC67D'
          style={styles.input}
        />
        <TouchableOpacity onPress={addItem}>
          <Image source={require('../assets/add.png')} />
        </TouchableOpacity>
      </View>
      {list.length ? (
        <View>
          <View style={styles.list}>
            <FlatList
              data={list}
              renderItem={({ item }) => {
                if (!item.checked) return renderItem(item)
              }}
              keyExtractor={(item) => item.id}></FlatList>
          </View>
          <FlatList
            data={list}
            renderItem={({ item }) => {
              if (item.checked) return renderItem(item)
            }}
            keyExtractor={(item) => item.id}></FlatList>
        </View>
      ) : (
        <Text style={{ textAlign: 'center' }}>No todo</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  newItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemBox: {
    marginBottom: 30,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CB96EE',
    width: '80%',
    paddingHorizontal: 5,
    fontSize: 25,
    color: '#FFC67D',
  },
  list: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: 'black' },
})
