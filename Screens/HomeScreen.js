/* import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
  
// screens
import ScreenInscription1 from "./ScreenInscription1";
import ScreenInscription2 from "./ScreenInscription2";
import ScreenInscription3 from "./ScreenInscription3";
import ScreenInscription4 from "./ScreenInscription4";
import BottomBar from './BottomBar';

function HomeScreen(props) {

    const [signupStep, setSignupStep] = useState(1)

    var HandleClickchangeStep = () => {
        setSignupStep(signupStep+1)
    }

    if (signupStep===1) {
        return (
            <ScreenInscription1 HandleClickParentchangeStep = {HandleClickchangeStep}/>
        )
    } else if (signupStep===2) {
    return (
        <ScreenInscription2 HandleClickParentchangeStep = {HandleClickchangeStep}/>
    )
    } else if (signupStep===3) {
    return (
        <ScreenInscription3 HandleClickParentchangeStep = {HandleClickchangeStep}/>
    )
    } else if (signupStep===4) {
        return (
            <ScreenInscription4 HandleClickParentchangeStep = {HandleClickchangeStep} navigation={props.navigation}/>
        )
}
}

export default HomeScreen; */