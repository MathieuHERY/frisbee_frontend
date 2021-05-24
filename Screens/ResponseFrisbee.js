import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';


export default function ResponseFrisbee() {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (

    )
}
