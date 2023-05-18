import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addTodo, updateTodo } from '../redux/reducers';

const Details = ({navigation}) => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(state => state.todos.selectedTodo);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [checked, setChecked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if(selectedTodo == null){
      const randomId = Math.floor(Math.random() * 90000) + 10000;
      const todo = { id: randomId, title: title, date: date.toISOString(), description: description, done: checked };
      dispatch(addTodo(todo));   
    }
    else {
      const todo = { id: selectedTodo.id, title: title, date: date.toISOString(), description: description, done: checked };
      dispatch(updateTodo(todo));
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (selectedTodo !== null) {
      setTitle(selectedTodo.title);
      const DateFormat = new Date(selectedTodo.date);
      setDate(DateFormat);
      setDescription(selectedTodo.description);
      setChecked(selectedTodo.done);
    }
  }, [selectedTodo]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; 
    setDate(currentDate);
    setShowDatePicker(false);
  };
  const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
  return (
    <View style={styles.container}>
      <Text> Title </Text>
      <TextInput 
        value={title}
        style={styles.inputcontainer}
        onChangeText={(txt) => setTitle(txt)}
        />
      <Text> Description </Text>
      <TextInput style={styles.inputcontainer} 
        value={description}
        onChangeText={(txt) => setDescription(txt)}/> 
      <Text> Time </Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputcontainer}>{dateFormatter.format(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
         <DateTimePicker
         value={date}
         mode='date'
         onChange={handleDateChange}
         />
      )}    
      <View style={styles.checkdoneContainer}>
        <Text>Mark as done: </Text>
        <Checkbox
            value={checked}
            onValueChange={setChecked}/>
      </View>
      <Button title='Save' onPress={handleSave}/>

    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    }, 
    inputcontainer:{
        backgroundColor:'white',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal:10,
        marginVertical: 5
    },
    checkdoneContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginVertical: 20
    },
})