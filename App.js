import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Card,
  Title,
  Paragraph,
  List,
  Provider as PaperProvider,
} from 'react-native-paper';

/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; */
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen';
import BottomBar from './Screens/BottomBar';

const Stack = createStackNavigator();

// Création de la bottom navigation : on renvoie vers le fichier BottomBar.js (dans dossier Screens) qui contient la navbar
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


