import React, { useState, useEffect } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function List() {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function get() {
      const store = await getData()
      setList(store)
    }
    get()
  }, [])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@list', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@list')
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
      console.log(e)
      return []
    }
  }
  const updateList = (value) => {
    setList(value)
    storeData(value)
  }
  const changeItem = (value, item) => {
    const newList = list.map((el) => {
      if (el.id === item.id) {
        return { ...el, checked: value }
      } else return el
    })
    updateList(newList)
  }
  const deleteItem = (item) => {
    const newList = list.filter((el) => el.id !== item.id)
    updateList(newList)
  }
  const addItem = () => {
    if (!input.trim()) return
    const newList = [
      ...list,
      {
        id: Math.random().toString(),
        title: input,
        checked: false,
        description: '',
      },
    ]
    updateList(newList)
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
