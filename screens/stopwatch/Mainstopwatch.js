import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Addactivity from './Addactivity'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
// import Stopwatch from './Stopwatch';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '../../nav/BottomTab'
import Editactivity from './EDIT_ACTIVITY/Editactivity';

const Stack = createStackNavigator();
 
const Mainstopwatch = () => {
  return (
 <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName='STOPWATCH' screenOptions={{
        headerStyle:{backgroundColor:"#051C37"}, headerTintColor:'#fff',
        animationEnabled: false
    }} >
    <Stack.Screen name="back"  component={BottomTab} options={{headerShown:false}} />
    <Stack.Screen name="Add-Activity" component={Addactivity}  />
    <Stack.Screen name="Edit-Activity" component={Editactivity}  />
  </Stack.Navigator>
 </NavigationContainer>
  )
}

export default Mainstopwatch

const styles = StyleSheet.create({})