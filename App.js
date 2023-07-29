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
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
import { withAuthenticator } from '@aws-amplify/ui-react-native';
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

//export default App
export default withAuthenticator(App);

const styles = StyleSheet.create({})