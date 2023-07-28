import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Addactivity from './Addactivity'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
// import Stopwatch from './Stopwatch';
import { NavigationContainer } from '@react-navigation/native';
import Editactivity from './EDIT_ACTIVITY/Editactivity';
import BottomTab from '../nav/BottomTab';

const Stack = createStackNavigator();
 
// MAIN SCREEN IS CALLING BOTTOM_NAV_BAR ADD_ACTIVITY EDIT_ACTIVITY

const MainScreen = () => {
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

export default MainScreen

const styles = StyleSheet.create({})