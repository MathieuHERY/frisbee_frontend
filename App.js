import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" ;

// screens
import ScreenInscription1 from "./screens/ScreenInscription1";
import ScreenInscription2 from "./screens/ScreenInscription2";
import ScreenInscription3 from "./screens/ScreenInscription3";
import ScreenInscription4 from "./screens/ScreenInscription4";

// navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// redux
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';


export default function App() {
  return (

    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="ScreenInscription1" component={ScreenInscription1} />
          <Stack.Screen name="ScreenInscription2" component={ScreenInscription2} />
          <Stack.Screen name="ScreenInscription3" component={ScreenInscription3} />
          <Stack.Screen name="ScreenInscription4" component={ScreenInscription4} />
        </Stack.Navigator>
      </NavigationContainer>
     
    
  );
}


