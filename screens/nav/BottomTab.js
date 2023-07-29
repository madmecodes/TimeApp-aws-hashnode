import { StyleSheet,TouchableOpacity,Text,Pressable,Alert } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stats from '../Stats'
import Todo from '../Todo'
import Stopwatch from '../stopwatch/Stopwatch';
import Table from '../Table'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import { useAuthenticator } from '@aws-amplify/ui-react-native';
// import Mainstopwatch from '../screens/Mainstopwatch';


const Tab = createBottomTabNavigator();

const BottomTab = () => {
    //SIGN_OUT
// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = context => [context.user]

// ... Other imports and code ...

function SignOutButton() {
    const { user, signOut } = useAuthenticator(userSelector);
  
    // Create a Promise function that resolves with the user's username
    const getUsernamePromise = () => {
      return new Promise((resolve) => {
        if (user && user.username) {
          resolve(user.username);
        } else {
          // If the user or username is not available, resolve with null or an appropriate value
          resolve(null);
        }
      });
    };
  
    // Function to handle sign out
    const handleSignOut = async () => {
      // Get the username using the Promise function
      const username = await getUsernamePromise();
      console.log("Username:", username); // This will log the username to the console
  // Show confirmation dialog
  Alert.alert(
    `Are you sure you want to log out as "${username}"?`,
    'Press "OK" to confirm.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // Perform the sign out if the user confirms
          signOut();
        },
      },
    ],
    { cancelable: false } // Prevents tapping outside the dialog to cancel
  );

    };
    return (
        <Pressable onPress={handleSignOut} style={{marginRight:10,backgroundColor:'#23395d',padding:5,borderRadius:100}}>
          <Text style={{padding:3,fontSize:16,color:'#dadada'}}>
            sign out
          </Text>
        </Pressable>
      );
    }
    
    // ... Rest of the code ...
//.....
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarInactiveTintColor: '#858EA9',
            tabBarActiveTintColor: '#fff',

            tabBarStyle: { backgroundColor: '#051C37', height: 60, margin: 0, padding: 0 },
            tabBarItemStyle: { borderRadius: 100, height: 50, marginHorizontal: 20, marginVertical: 5 },

            tabBarActiveBackgroundColor: '#0075FF',
            // tabBarInactiveBackgroundColor:"#D9D9D9",
            headerStyle: { backgroundColor: '#051C37' },
            headerTintColor: '#fff',



        }}>

            <Tab.Screen name="Stopwatch" component={Stopwatch}
                options={{
                    tabBarIcon: ({ focused }, color, size) => (
                        <Entypo name="stopwatch" size={28} color={color} style={{ color: focused ? '#fff' : '#858EA9', fontSize: focused ? 30 : 28 }}></Entypo>
                    ),
                    headerRight: () => (
                        <SignOutButton/>
                      )
                }} />
            <Tab.Screen name="Todo" component={Todo}
                options={{
                    tabBarIcon: ({ focused }, color, size) => (
                        <Feather name="check-circle" size={28} color={color} style={{ color: focused ? '#fff' : '#858EA9', fontSize: focused ? 30 : 28 }}></Feather>
                    )
                }}
            />
            <Tab.Screen name="Table" component={Table}
                options={{
                    title: 'Today-Table',
                    tabBarIcon: ({ focused }, color, size) => (
                        <AntDesign name="table" size={28} color={color} style={{ color: focused ? '#fff' : '#858EA9', fontSize: focused ? 30 : 28 }}></AntDesign>
                    )
                }}
            />

            <Tab.Screen name="Stats" component={Stats}
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ focused }, color, size) => (

                        <Octicons name="graph" style={{ color: focused ? '#fff' : '#858EA9', fontSize: focused ? 30 : 28 }}></Octicons>

                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})