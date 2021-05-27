import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// importation des screens d'inscription
import SignInUpScreen from './SignInUpScreen';
import InscriptionScreen1 from './InscriptionScreen1';
import InscriptionScreen2 from './InscriptionScreen2';
import InscriptionScreen3 from './InscriptionScreen3';
import InscriptionScreen4 from './InscriptionScreen4';
import InscriptionScreen5 from './InscriptionScreen5';
import BottomBar from './BottomBar';

//Redux
import { connect } from 'react-redux';

function HomeScreen(props) {

    const [signupStep, setSignupStep] = useState(1);
    const [isLogin, setIsLogin] = useState(false);

    //page suivante = +1
    var HandleClickchangeStep = () => {
        setSignupStep(signupStep + 1)
    }

    //terminer inscription direction la map
    var HandleClickGoToMapScreen = () => {
        setIsLogin(true)
    }

    //connexion = direction la map
    if (isLogin) {
        return (
            <SignInUpScreen HandleClickParentGoToMapScreen={HandleClickGoToMapScreen} navigation={props.navigation} />
        )
    }

    //inscription = steps
    if (signupStep === 1) {
        return (
            <SignInUpScreen HandleClickParentGoToMapScreen={HandleClickGoToMapScreen} HandleClickParentchangeStep={HandleClickchangeStep} navigation={props.navigation} />
        )
    } else if (signupStep === 2) {
        return (
            <InscriptionScreen1 HandleClickParentchangeStep={HandleClickchangeStep} />
        )
    } else if (signupStep === 3) {
        return (
            <InscriptionScreen2 HandleClickParentchangeStep={HandleClickchangeStep} />
        )
    } else if (signupStep === 4) {
        return (
            <InscriptionScreen3 HandleClickParentchangeStep={HandleClickchangeStep} />
        )
    } else if (signupStep === 5) {
        return (
            <InscriptionScreen4 HandleClickParentchangeStep={HandleClickchangeStep} />
        )
    } else if (signupStep === 6) {
        return (
            <InscriptionScreen5 HandleClickParentchangeStep={HandleClickchangeStep} navigation={props.navigation} />
        );
    };
};

function mapStateToProps(state) {
    return { newUser : state.newUser }
}

export default connect(
    mapStateToProps,
    null
)(HomeScreen);