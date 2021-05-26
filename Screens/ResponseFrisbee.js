import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay, Card } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


function ResponseFrisbee(props) {

    var frisbeeToAnswer = props.frisbee;
    var optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });


    var frisbeeAccepted = async (frisbeeId) => {
        var submitAcceptedAnswer = await fetch('http://192.168.1.63:3000/accept-frisbee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'  },
        body: `_id=${frisbeeId}&isAccepted=true`
      })
      var responseFromDB = await submitAcceptedAnswer.json();

      if (responseFromDB.result) {
        props.sendAnswerFrisbee(!props.resultAnswer)
        props.navigation.navigate('BottomBar', { screen: "FRISBEE" })
      }
    }

    var frisbeeRejected = async (frisbeeId) => {
        var submitRejectedAnswer = await fetch('http://192.168.1.63:3000/reject-frisbee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'  },
            body: `_id=${frisbeeId}&isAccepted=false`
          })
          var responseFromDB = await submitRejectedAnswer.json();
    
          if (responseFromDB.result) {
            props.sendAnswerFrisbee(!props.resultAnswer)
            props.navigation.navigate('BottomBar', { screen: "FRISBEE" })
          }
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 20 }}>

                    {/* BACK ICON */}
                    <View style={styles.iconBack}>
                        <Icon
                            raised
                            name='ios-arrow-back'
                            type='ionicon'
                            color='#7C4DFF'
                            onPress={() => props.navigation.navigate('BottomBar', { screen: "FRISBEE" })}
                            size={30}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={{ uri: frisbeeToAnswer.userCreator.UserPicture }}
                        />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text h1 style={styles.h1Style}>
                                {frisbeeToAnswer.userCreator.Firstname}
                            </Text>

                            <Text style={styles.description}>
                                {frisbeeToAnswer.userCreator.Age}
                            </Text>

                            <Card containerStyle={{ borderWidth: 0.1, borderRadius: 10, borderColor: '#D1CFCF' }}>
                                <Text style={styles.description}>
                                    {frisbeeToAnswer.Message}
                                </Text>
                            </Card>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text h1 style={styles.h1Style}>
                                    <Chip
                                        buttonStyle={styles.ChipFocus}
                                        title={frisbeeToAnswer.Sport}
                                        titleStyle={styles.ChipFocusTitle}
                                        type="outline"
                                    />
                                </Text>
                            </View>
                            <View >
                                <View style={{ flexDirection: 'row' }}>
                                    <EvilIcons
                                        name="calendar"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, marginBottom: 20 }}>
                                        {new Date(frisbeeToAnswer.DateMeeting).toLocaleDateString("fr-FR", optionsDate)}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <EvilIcons name="clock"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, marginBottom: 20 }}>
                                        {frisbeeToAnswer.HoursMeeting}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, marginTop: 5, marginBottom: 20 }}>
                                    <EvilIcons name="location"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, flexWrap: 'wrap' }}>
                                        {frisbeeToAnswer.AddressMeeting}
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View>

                    {/* BUTTONS ACCEPTER / DÉCLINER */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View>
                            <Button
                                title="Accepter"
                                buttonStyle={styles.buttonFrisbeeAccepted}
                                titleStyle={styles.buttonTextStyleFrisbee}
                                icon={
                                    <Feather name="disc"
                                        size={18}
                                        color="#ffffff"
                                    />
                                }
                                onPress={() => frisbeeAccepted(frisbeeToAnswer._id)}
                            />

                        </View>

                        <View>
                            <Button
                                title="Décliner"
                                buttonStyle={styles.buttonFrisbeeDeclined}
                                titleStyle={styles.buttonTextStyleFrisbee}
                                icon={
                                    <Feather name="disc" // !!!! ICÔNE À AJUSTER !!!!
                                        size={18}
                                        color="#ffffff"
                                    />
                                }
                                onPress={() => frisbeeRejected(frisbeeToAnswer._id)}
                            />

                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      sendAnswerFrisbee : function (answerFrisbee) {
          console.log('sendAnswerFrisbee dans réponse :', answerFrisbee)
        dispatch({ type: 'SubmitAnswerFrisbee', resultAnswer : answerFrisbee })
      }
    }
  };

function mapStateToProps(state) {
    return { frisbee: state.frisbee, resultAnswer : state.resultAnswer }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResponseFrisbee);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
        /* flexDirection: 'row', */
    },
    ChipFocus: {
        backgroundColor: '#FFFFFF',
        marginBottom: 5,
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
        height: 35,
        marginBottom: 5,
    },
    ChipFocusTitle: {
        color: '#7C4DFF',
        fontFamily: 'Nunito_400Regular',
        fontSize: 12,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Montserrat_300Light',
        fontSize: 30,
        paddingTop: 20,
        marginBottom: 30,
        marginTop: 10,
    },
    h1Style: {
        fontSize: 20,
        fontFamily: 'Montserrat_300Light',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 20,
    },
    date: {
        fontSize: 10,
        fontFamily: 'Montserrat_300Light',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        textAlign: 'justify',
    },
    ageDescription: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        textAlign: 'right',
    },
    buttonFrisbeeAccepted: {
        backgroundColor: "#00CEC9",
        borderRadius: 17,
        width: vw(30),
        marginRight: 5,
    },
    buttonFrisbeeDeclined: {
        backgroundColor: "#FF4757",
        borderRadius: 17,
        width: vw(30),
        marginLeft: 5,
    },
    buttonTextStyleFrisbee: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 14,
        marginLeft: 5,
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
    },
    iconCloseOverlay: {
        marginTop: 20,
        marginLeft: 300,
    },
});
