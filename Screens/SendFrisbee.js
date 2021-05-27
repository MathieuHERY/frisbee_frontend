import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';


function SendFrisbee(props) {

    const [message, setMessage] = useState("");
    const [sport, setSport] = useState("");
    const [date, setDate] = useState(new Date())
    const [lieu, setLieu] = useState("");
    const [begin, setBegin] = useState("");
    const [end, setEnd] = useState("");


    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    console.log("log props.newUser", props.newUser)
    console.log('log de props.userInvited', props.userInvited);

    var submitFrisbee = async function () {
        var frisbeeData = await fetch("http://192.168.1.7:3000/send-frisbee", {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `userCreator=${props.newUser._id}&userInvited=${props.userInvited.id}&AddressMeeting=${lieu}&Message=${message}&Sport=${sport}&DateMeeting=${date}&HoursMeeting=${`${begin} à ${end}`}`
        })

        var response = await frisbeeData.json()
        if (response.result)
        {
            props.navigation.navigate('BottomBar', { screen: "FRISBEES" })
        }
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView>
                <View
                    style={styles.container}>

                    {/* <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}> */}


                    <View style={styles.iconBack}>
                        <Icon
                            raised
                            name='ios-arrow-back'
                            type='ionicon'
                            color='#7C4DFF'
                            onPress={() => props.navigation.navigate('BottomBar', { screen: "SPORTIFS" })}
                            size={30}
                        />
                    </View>

                    <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: props.userInvited.userPicture }}
                        onPress={() => console.log('Appui sur photo profil')}
                    />

                    <Text h1 style={styles.h1Style}>Lance un FRISBEE</Text>
                    <Text h1 style={styles.h1StyleBis}>à {props.userInvited.Firstname}</Text>

                    <Text style={styles.ageDescription}>Ton message :</Text>

                    <View>
                        <TextInput style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 100, width: 270, marginTop: 15, padding: 10 }}
                            editable
                            multiline
                            numberOfLines={6}
                            maxLength={200}
                            onChangeText={(value) => setMessage(value)}
                            placeholder="Il faut bien se lancer un jour ..."
                        />
                    </View>


                    <View style={{
                        borderColor: '#dfe6e9',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 20,
                        width: 270,
                        color: "#838383"
                    }}>
                        <RNPickerSelect style={pickerStyle}
                            placeholder={{ label: "Sélectionnez le sport", value: null }}
                            onValueChange={(value) => setSport(value)}
                            items={[
                                { label: 'Football', value: 'Football' },
                                { label: 'Basket-Ball', value: 'Basket-Ball' },
                                { label: 'Volley-Ball', value: 'Volley-Ball' },
                                { label: 'Ping-Pong', value: 'Ping-Pong' },
                                { label: 'Yoga', value: 'Yoga' },
                                { label: 'Running', value: 'Running' },
                                { label: 'Work-Out', value: 'Work-Out' },
                            ]}
                        />
                    </View>
{/* 
                    <View style={{
                        borderColor: '#dfe6e9',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 20,
                        width: 270
                    }}> */}
                    <Text style={styles.ageDescription}>Date du FRISBEE :</Text>
                      
                            <DatePicker
                                style={{ width: 270, marginTop: 20, }}
                                locale={'fr'}
                                date={date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={date}
                                maxDate="2022-01-01"
                                confirmBtnText="Valider"
                                cancelBtnText="Annuler"
                                customStyles={{

                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 50,
                                        borderRadius: 5,
                                        borderColor: '#dfe6e9',
                                    }
                                }}
                                onDateChange={(date) => setDate(date)}
                            />
                     {/*    </View>
 */}

<Text style={styles.ageDescription}>Horaire du FRISBEE :</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            borderColor: '#dfe6e9',
                            borderWidth: 1,
                            borderRadius: 5,
                            marginTop: 20,
                            width: 130
                        }}>
                            <RNPickerSelect style={pickerStyle}
                                placeholder={{ label: "Début", value: null }}
                                onValueChange={(value) => setBegin(value)}
                                items={[
                                    { label: '00h', value: '00h' },
                                    { label: '01h', value: '01h' },
                                    { label: '02h', value: '02h' },
                                    { label: '03h', value: '03h' },
                                    { label: '04h', value: '04h' },
                                    { label: '05h', value: '05h' },
                                    { label: '06h', value: '06h' },
                                    { label: '07h', value: '07h' },
                                    { label: '08h', value: '08h' },
                                    { label: '09h', value: '09h' },
                                    { label: '10h', value: '10h' },
                                    { label: '11h', value: '11h' },
                                    { label: '12h', value: '12h' },
                                    { label: '13h', value: '13h' },
                                    { label: '14h', value: '14h' },
                                    { label: '15h', value: '15h' },
                                    { label: '16h', value: '16h' },
                                    { label: '17h', value: '17h' },
                                    { label: '18h', value: '18h' },
                                    { label: '19h', value: '19h' },
                                    { label: '20h', value: '20h' },
                                    { label: '21h', value: '21h' },
                                    { label: '22h', value: '22h' },
                                    { label: '23h', value: '23h' },
                                ]}
                            />
                        </View>

                        <View style={{
                            borderColor: '#dfe6e9',
                            borderWidth: 1,
                            borderRadius: 5,
                            marginTop: 20,
                            marginLeft: 15,
                            width: 130
                        }}>
                            <RNPickerSelect style={pickerStyle}
                                placeholder={{ label: "Fin", value: null, fontSize: 7 }}
                                onValueChange={(value) => setEnd(value)}
                                items={[
                                    { label: '00h', value: '00h' },
                                    { label: '01h', value: '01h' },
                                    { label: '02h', value: '02h' },
                                    { label: '03h', value: '03h' },
                                    { label: '04h', value: '04h' },
                                    { label: '05h', value: '05h' },
                                    { label: '06h', value: '07h' },
                                    { label: '08h', value: '08h' },
                                    { label: '09h', value: '09h' },
                                    { label: '10h', value: '10h' },
                                    { label: '11h', value: '11h' },
                                    { label: '12h', value: '12h' },
                                    { label: '13h', value: '13h' },
                                    { label: '14h', value: '14h' },
                                    { label: '15h', value: '15h' },
                                    { label: '16h', value: '16h' },
                                    { label: '17h', value: '17h' },
                                    { label: '18h', value: '18h' },
                                    { label: '19h', value: '19h' },
                                    { label: '20h', value: '20h' },
                                    { label: '21h', value: '21h' },
                                    { label: '22h', value: '22h' },
                                    { label: '23h', value: '23h' },
                                ]}
                            />
                        </View>

                    </View>
                    <Text style={styles.ageDescription}>Lieu du rendez-vous :</Text>
                    <View>
                        <TextInput style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 80, width: 270, marginTop: 25, padding: 10, marginBottom: 15 }}
                            editable
                            multiline
                            numberOfLines={6}
                            maxLength={200}
                            onChangeText={(value) => setLieu(value)}
                            placeholder="Indiquez le lieu du rendez-vous"
                        />
                    </View>

                    {/*  </KeyboardAvoidingView> */}

                    <Button
                        buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17, marginTop: 20, marginBottom: 150 }}
                        title="Envoyer un FRISBEE"
                        titleStyle={{
                            fontFamily: 'Nunito_400Regular',
                            marginLeft: 15,
                            marginRight: 15
                        }}
                        onPress={() => submitFrisbee()}

                    >
                    </Button>
                    

                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    h1Style: {
        fontSize: 30,
        fontFamily: 'Montserrat_300Light',
        marginTop: 15,
    },
    h1StyleBis: {
        fontSize: 30,
        fontFamily: 'Montserrat_300Light',
        marginBottom: 10,
    },
    ageDescription: {
        fontSize: 17,
        fontFamily: 'Montserrat_300Light',
        marginTop: 15,
    },
    ChipFocus: {
        backgroundColor: '#7C4DFF',
        marginBottom: 20,
        marginTop: 30,
        borderColor: '#7C4DFF',
        borderWidth: 1,
        marginRight: 15,
    },
    ChipFocusTitle: {
        color: '#ffffff',
        fontFamily: 'Nunito_400Regular'
    },
    description: {
        fontSize: 17,
        fontFamily: 'Montserrat_300Light',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        marginBottom: 10,
        textAlign: 'justify',
    },
    disponibilités1: {
        fontSize: 17,
        fontFamily: 'Montserrat_300Light',
        marginLeft: 30,
        marginRight: 30,
        /* marginTop: 10, */
        textAlign: 'justify',
        marginBottom: 10,
    },
    disponibilités: {
        fontSize: 17,
        fontFamily: 'Montserrat_300Light',
        marginLeft: 30,
        marginRight: 30,
        /* marginTop: 10, */
        textAlign: 'justify',
        /* marginBottom: 10, */
    },
    iconBack: {
        marginRight: 300,
        marginTop: 40
    },
});

const pickerStyle = {
    inputIOS: {
        color: '#838383',
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#white',
        borderRadius: 17,
    },
    placeholder: {
        color: '#838383',
    },
    inputAndroid: {
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
};

function mapStateToProps(state) {
    return {
        userInvited: state.userInvited, newUser: state.newUser
    }
}

export default connect(
    mapStateToProps,
    null
)(SendFrisbee);
