import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper'

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
    color='#000000'
    label="Filtres"
    icon="plus"
    onPress={() => console.log('Pressed')}
  />
   <FAB
    style={styles.fab2}
    small
    label="Ajouter"
    color='#000000'
    icon="plus"
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
        margin: 16,
        right: 20,
        bottom: 10,
        backgroundColor:'#FFFFFF',
        borderRadius:10
      },
      fab2: {
        position: 'absolute',
        margin: 16,
        left: 20,
        bottom: 10,
        backgroundColor:'#FFFFFF',
        borderRadius:10
      },
  });
  