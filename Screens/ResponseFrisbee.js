import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay, Card } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { ModalDatePicker } from "react-native-material-date-picker";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


const users = [
    {
        Firstname: 'Axelle',
        Age: '20-35 ans',
        FavoritesSports: 'Ping-pong',
        SportsHabits: 'Week-end',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/axelle_circle.png'),
        UserLatitude: 45.75892606750682,  // Place Belcour, Lyon 2
        UserLongitude: 4.832001892099143,
    },
    {
        Firstname: 'Mathieu',
        Age: '20-35 ans',
        FavoritesSports: ['Running', 'Football'],
        SportsHabits: 'Soir & week-end',
        SportsHours: '17h à 19h',
        UserPicture: require('../assets/mathieu_circle.png'),
        UserLatitude: 45.760030349116455, // Carrefour La Part Dieu, Lyon 3
        UserLongitude: 4.856242322951902,
    },
]

function ResponseFrisbee(props) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

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


                    {/* VIEW ON A SPECIFIC USER */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <View style={{ marginRight: 30, marginLeft: 10, justifyContent: 'center' }}> */}
                        <Avatar
                            size="xlarge"
                            rounded
                            // source={{uri:item.UserPicture}
                            source={users[0].UserPicture}
                        // }
                        />

                        {/* </View> */}
                        {/* <View style={{ marginRight: 5 }}> */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text h1 style={styles.h1Style}>
                                {/* {item.Firstname} */}
                                Axelle
                                </Text>

                            <Text style={styles.description}>
                                {/* {item.Age} */}
                                Age
                                </Text>

                            <Card containerStyle={{ borderWidth: 0.1, borderRadius: 10, borderColor: '#D1CFCF' }}>
                                <Text style={styles.description}>
                                    {/* {item.Description} */}
                                        Hey salut Mathieu, j’ai vu que tu faisais aussi du basket. Ca te dit un p’tit basket samedi pro ? J’ai un bon niveau et j’ai un ballon.
                                        À samedi p-ê !
                                        Marilène
                                    </Text>
                            </Card>


                            {/* </View> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text h1 style={styles.h1Style}>
                                    <Chip
                                        buttonStyle={styles.ChipFocus}
                                        // title={item.Sport}
                                        title="Sport"
                                        titleStyle={styles.ChipFocusTitle}
                                        type="outline"
                                    />
                                </Text>
                                {/* {(item.isAccepted === null) &&
                                         <Text style={styles.answerPending}>
                                            EN ATTENTE
                                         </Text>
                                    }
                                    {(item.isAccepted === true) &&
                                         <Text style={styles.answerAccepted}>
                                            ACCEPTÉ
                                         </Text>
                                    }
                                    {(item.isAccepted === false) &&
                                         <Text style={styles.answerRejected}>
                                            DECLINÉ
                                         </Text>
                                    } */}
                            </View>

                            <View >
                                <View style={{ flexDirection: 'row' }}>
                                    <EvilIcons
                                        name="calendar"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, marginBottom: 20 }}>
                                        {/* {item.DateMeeting} */}
                                    Date du FRISBEE
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <EvilIcons name="clock"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, marginBottom: 20 }}>
                                        {/* {item.DateMeeting} */}
                                    Heure du FRISBEE
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, marginTop: 5, marginBottom: 20 }}>
                                    <EvilIcons name="location"
                                        size={24}
                                        color="#838383"
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, flexWrap: 'wrap' }}>
                                        {/* {item.Address} */}
                                    Lieu pour faire du sport
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View>


                    {/* BUTTONS ACCEPTER / DÉCLINER */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View>
                            {/* {(item.isAccepted === null) && */}
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
                                // onPress={() => console.log('Appui sur FRISBEE')}
                                onPress={() => props.navigation.navigate('BottomBar', { screen: "FRISBEE" })}
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
                                // onPress={() => console.log('Appui sur FRISBEE')}
                                onPress={() => props.navigation.navigate('BottomBar', { screen: "FRISBEE" })}
                            />

                        </View>

                        {/* } */}
                    </View>

                </ScrollView>
            </View>
        )
    }
}


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
        maxWidth: 80,
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
    answerPending: {
        fontSize: 14,

        fontFamily: 'Nunito_400Regular',
        color: '#FF8933',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerAccepted: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#00CE52',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerRejected: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#FF4757',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
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

export default ResponseFrisbee;