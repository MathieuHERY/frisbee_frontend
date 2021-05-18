import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

export default function MapScreen(props) {
    return (
        <View style={styles.container}>
      <MapView 
      style={styles.map}
       Region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} 
      >
        
        </MapView>
        <View style={{flexDirection:'row'}}>
        <FAB
    style={styles.fab1}
    small
    color='#FFFFFF'
    title="Filtres" titleStyle={{color:'#000000'}}
    icon={
        <Icon
        Ionicons name="filter-list"
          size={20}
          color="black"
        />
      }
    onPress={() => console.log('Pressed')}
  />
   <FAB
    style={styles.fab2}
    small
    color='#FFFFFF'
    title="Ajouter" titleStyle={{color:'#000000'}}
    icon={
        <Icon
          Entypo name="location-pin"
          size={20}
          color="black"
        />
      }
    onPress={() => console.log('Pressed')}
  />
  </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   /*    backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center', */
    },
    map: {
        flex:1
      },
      fab1: {
        position: 'absolute',
        fontSize:10,
        margin: 16,
        right: 40,
        bottom: 10,
        backgroundColor:'#FFFFFF',
      },
      fab2: {
        position: 'absolute',
        margin: 16,
        left: 40,
        bottom: 10,
        backgroundColor:'#FFFFFF',
      },
  });
  