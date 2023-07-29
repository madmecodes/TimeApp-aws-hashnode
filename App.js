import { StyleSheet } from 'react-native'
import React, { useEffect }  from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import store from './screens/stopwatch/redux/store';
import { Provider } from 'react-redux';
import MainScreen from './screens/stopwatch/MainScreen';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
//MODIFUCATION TO BE NEEDED IN CARD.JS TO PERSIST TIME_ELAPSED IN REALTIME
let persistor=persistStore(store)
const App = () => {
  //Splash screen 
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  //....
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer independent={true}>
    {/* Main screen */}
    <MainScreen/>
    {/* Main screen end */}
    </NavigationContainer>
    </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})