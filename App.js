import { StyleSheet } from 'react-native'
import React, { useEffect }  from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import store from './screens/stopwatch/redux/store';
import { Provider } from 'react-redux';
import Mainstopwatch from './screens/stopwatch/Mainstopwatch';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
let persistor=persistStore(store)
const App = () => {
  
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
 
    <NavigationContainer independent={true}>
      
      <Mainstopwatch/>
    </NavigationContainer>
    </PersistGate>
    {/* <StatusBar barStyle="light-content" /> */}
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})