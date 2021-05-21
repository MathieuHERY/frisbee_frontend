import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" ;

// screens
/* import HomeScreen from './Screens/HomeScreen'; */
import BottomBar from './Screens/BottomBar';

// navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SendFrisbee from "./Screens/SendFrisbee"
import UsersScreen from "./Screens/UsersScreen"
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import newUser from './reducers/newUser'
const store = createStore(combineReducers({newUser}))


/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; */
import { Ionicons } from '@expo/vector-icons';


// Création de la bottom navigation : on renvoie vers le fichier BottomBar.js (dans dossier Screens) qui contient la navbar
export default function App() {
  return (
<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
       {/*  <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="SendFrisbee" component={SendFrisbee} />
          <Stack.Screen name="UsersScreen" component={UsersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

     
    
  );
}


