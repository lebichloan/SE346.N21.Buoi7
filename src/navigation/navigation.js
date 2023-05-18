import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Todo from '../screens/Todo';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TodoList"
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="TodoList" component={Todo}/>
        <Stack.Screen name="Details" component={Details}/>
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
