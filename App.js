import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" ;

// screens
import ScreenInscription1 from "./screens/ScreenInscription1";
import ScreenInscription2 from "./screens/ScreenInscription2";
import ScreenInscription3 from "./screens/ScreenInscription3";
import ScreenInscription4 from "./screens/ScreenInscription4";
import HomeScreen from './Screens/HomeScreen';
import BottomBar from './Screens/BottomBar';


// navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// redux
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';


/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; */
import { Ionicons } from '@expo/vector-icons';



const Stack = createStackNavigator();

// Création de la bottom navigation : on renvoie vers le fichier BottomBar.js (dans dossier Screens) qui contient la navbar
export default function App() {
  return (

    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="ScreenInscription1" component={ScreenInscription1} />
          <Stack.Screen name="ScreenInscription2" component={ScreenInscription2} />
          <Stack.Screen name="ScreenInscription3" component={ScreenInscription3} />
          <Stack.Screen name="ScreenInscription4" component={ScreenInscription4} />
        </Stack.Navigator>
      </NavigationContainer>
     
    
  );
}


