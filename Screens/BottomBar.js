import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from './MapScreen';
import UsersScreen from './UsersScreen';
import FrisbeeScreen from './FrisbeeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomBar(props) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {

            if (route.name == 'Accueil') {
              return <FontAwesome name='home' size={25} color={color} />;

            } else if (route.name == 'Users') {
              return <FontAwesome name='users' size={25} color={color} />;

            } else if (route.name == 'FRISBEE') {
              return <Ionicons name='disc-outline' size={25} color={color} />;

            } else if (route.name == 'Mon profil') {
              return <FontAwesome name='user-o' size={25} color={color} />;
            }

          },
          })}
        tabBarOptions={{
          activeTintColor: '#00CEC9',
          inactiveTintColor: '#83898D',
          style: {
            backgroundColor: '#F3F3F3',
          }
        }}
      >
        <Tab.Screen name="Accueil" component={MapScreen} />
        <Tab.Screen name="Users" component={UsersScreen} />
        <Tab.Screen name="FRISBEE" component={FrisbeeScreen} />
        <Tab.Screen name="Mon profil" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }