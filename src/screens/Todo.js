import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodo, updateTodo } from '../redux/reducers';

const Todo = ({navigation}) => {
  const dispatch = useDispatch();
  
  const tasks = useSelector(state => state.todos.todos);

  const handleCheckboxChange = (item) => {
    const todo = { id: item.id, title: item.title, date: item.date, description: item.description, done: !item.done };
    dispatch(updateTodo(todo));
  }
  const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const toDate = (value) => {
    const date = new Date(value);
    return date;
  }
  const item_todo = ({item}) => (
    <TouchableOpacity onPress={() => {
      dispatch(selectTodo(item.id));
      navigation.navigate('Details')
      }}>
      <View style={styles.itemcontainer}> 
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}>#{item.id}</Text>
            <Text style={styles.text}>{dateFormatter.format(toDate(item.date))}</Text>
          </View>       
          <Text style={styles.textTitle}>{item.title}</Text>
          <Checkbox
            value={item.done}
            onValueChange={() => handleCheckboxChange(item)}/>
        </View>                
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList 
          data={tasks}
          renderItem={item_todo}
          keyExtractor={item => item.id} 
          showsVerticalScrollIndicator={false}       
        /> 
      <TouchableOpacity onPress={() => {
        dispatch(selectTodo(null));
        navigation.navigate('Details')
        }}>
        <View style={styles.buttonAdd}>
          <Icon name='add-circle' size={50} color='#000' />
        </View>       
      </TouchableOpacity>
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  }, 
  itemcontainer:{
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    padding: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text:{
    fontSize: 16,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  textTitle:{
    fontSize: 19,
    fontWeight: '700',
    marginLeft: 60,
    width: 150
  },
  buttonAdd:{
    alignItems: 'flex-end',
  }
})