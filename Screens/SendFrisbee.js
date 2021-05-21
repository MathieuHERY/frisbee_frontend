import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
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



function SendFrisbee(props) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    const [message, setMessage] = useState("");
    const [sport, setSport] = useState("");
    const [date, setDate] = useState("");
    const [lieu, setLieu] = useState("");
    const [begin, setBegin] = useState("");
    const [end, setEnd] = useState("");

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
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
                            onPress={() => props.navigation.navigate('UsersScreen')}
                            size={30}
                        />
                    </View>

                    <Avatar
                        rounded
                        size="xlarge"
                        source={require('../assets/axelle_circle.png')}
                        onPress={() => console.log('Appui sur photo profil')}
                    />

                    <Text h1 style={styles.h1Style}>Envoyer un Frisbee à Axelle</Text>

                    <Text style={styles.ageDescription}>Votre message</Text>

                    <View>
                        <TextInput style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 100, width: 300, marginTop: 15, padding: 10 }}
                            editable
                            multiline
                            numberOfLines={6}
                            maxLength={200}
                            onChangeText={(value) => setMessage(value)}
                            placeholder="Il faut bien se lancer un jour ..."
                        />
                    </View>


                    <View style={{
                        borderColor: '#7C4DFF',
                        borderWidth: 2,
                        borderRadius: 17,
                        marginTop: 20,
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

                    <View style={{
                        borderColor: '#7C4DFF',
                        backgroundColor: "#7C4DFF",
                        borderWidth: 2,
                        borderRadius: 17,
                        marginTop: 20,
                    }}>
                        <View style={{ alignSelf: 'stretch' }}>
                            <ModalDatePicker
                                button={<Text style={{ color: "#ffffff", fontFamily: "Nunito_400Regular", padding: 10 }}> Sélectionnez une date </Text>}
                                locale="tr"
                                onSelect={(date) => console.log(date)}
                                isHideOnSelect={true}
                                initialDate={new Date()}
                                onValueChange={(value) => setDate(value)}
                            /* language={require('./locales/en.json')}. # Your localization file */
                            />
                        </View>

                    </View>



                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            borderColor: '#7C4DFF',
                            borderWidth: 2,
                            borderRadius: 17,
                            marginTop: 20,
                        }}>
                            <RNPickerSelect style={pickerStyle}
                                placeholder={{ label: "Horaire de début", value: null }}
                                onValueChange={(value) => setBegin(value)}
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

                        <View style={{
                            borderColor: '#7C4DFF',
                            borderWidth: 2,
                            borderRadius: 17,
                            marginTop: 20,
                            marginLeft: 15
                        }}>
                            <RNPickerSelect style={pickerStyle}
                                placeholder={{ label: "Horaire de fin", value: null }}
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

                    <View>
                        <TextInput style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 30, width: 300, marginTop: 25, padding: 10, marginBottom: 15 }}
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
                    buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17, marginTop: 20 }}
                    title="Envoyer un FRISBEE"
                    /* onPress={() => { GoToNextStepSignUp(signUpFavoritesSports) }} */
                    titleStyle={{
                        fontFamily: 'Nunito_400Regular',
                        marginLeft: 15,
                        marginRight: 15
                    }}
                >
                </Button>

            </View>
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
        marginBottom: 10,
        marginTop: 15,
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
    },
});

const pickerStyle = {
    inputIOS: {
        color: '#7C4DFF',
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#white',
        borderRadius: 17,
    },
    placeholder: {
        color: '#7C4DFF',
    },
    inputAndroid: {
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
};

export default SendFrisbee;