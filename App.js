import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" ;

// screens
import HomeScreen from './Screens/HomeScreen';
import BottomBar from './Screens/BottomBar';
import SignInUpScreen from "./Screens/SignInUpScreen"
import InscriptionScreen1 from './Screens/InscriptionScreen1';
import InscriptionScreen2 from './Screens/InscriptionScreen2';
import InscriptionScreen3 from './Screens/InscriptionScreen3';
import InscriptionScreen4 from './Screens/InscriptionScreen4';
import InscriptionScreen5 from './Screens/InscriptionScreen5';


// navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SendFrisbee from "./Screens/SendFrisbee";
import UsersScreen from "./Screens/UsersScreen";
import ResponseFrisbee from "./Screens/ResponseFrisbee";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import newUser from './reducers/newUser';
import userToken from './reducers/token_reducer';
import frisbee from './reducers/frisbees';
import resultAnswer from './reducers/answerFrisbee';
import userInvited from './reducers/userInvited';
const store = createStore(combineReducers({newUser, userToken, frisbee,resultAnswer, userInvited})) // Added


/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; */
import { Ionicons } from '@expo/vector-icons';


// Création de la bottom navigation : on renvoie vers le fichier BottomBar.js (dans dossier Screens) qui contient la navbar
export default function App() {
  return (
<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="SendFrisbee" component={SendFrisbee} />
          <Stack.Screen name="UsersScreen" component={UsersScreen} />
          <Stack.Screen name="ResponseFrisbee" component={ResponseFrisbee} />
          <Stack.Screen name="SignInUpScreen" component={SignInUpScreen} />
          <Stack.Screen name="InscriptionScreen1" component={InscriptionScreen1} />
          <Stack.Screen name="InscriptionScreen2" component={InscriptionScreen2} />
          <Stack.Screen name="InscriptionScreen3" component={InscriptionScreen3} />
          <Stack.Screen name="InscriptionScreen4" component={InscriptionScreen4} />
          <Stack.Screen name="InscriptionScreen5" component={InscriptionScreen5} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

     
    
  );
}


