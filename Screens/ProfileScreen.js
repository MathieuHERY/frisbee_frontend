import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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



function ProfileScreen(props) {

    console.log('userprofile', props.newUser)

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });


    const [user, setUser] = useState([]);


    useEffect(() => {

        const user = async function () {

            const data = await fetch('http://172.16.188.162:3000/user');
            const body = await data.json(); // Réponse du back transformé au format Json - tableau de tous les utilisateurs
            // console.log(body.result);
            setUser(body.userData); //récupère tous les users

        };
        user()

    }, []);

    console.log('log usersList', user)
    var userData = user.filter(user => user.token === props.userToken); // je veux que tu me ressorte l'utilisateur avec mon token, token de la personne qui vient de se connecter)
    console.log('token dans ProfileScreen', props.userToken);


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>


                            <Avatar
                                rounded
                                size="xlarge"
                                source={{ uri: props.newUser.UserPicture }} // À Dynamiser
                            />

                            <Text h1 style={styles.h1Style}>{props.newUser.Firstname}</Text>

                            <Text style={styles.ageDescription}>{props.newUser.Age}</Text>

                            <Text style={styles.description}>{props.newUser.Description}
                            </Text>

                            <Text style={styles.description}> Mes disponibilités : </Text>


                            <View style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 100, width: 250, justifyContent: "center", alignItems: "center", marginBottom: 150 }}>

                                <Text style={styles.disponibilités1}>
                                    <EvilIcons
                                        name="calendar"
                                        size={24}
                                        color="#838383"
                                    />
                                    {props.newUser.SportsHabits}
                                </Text>

                                <Text style={styles.disponibilités}>
                                    <EvilIcons name="clock"
                                        size={24}
                                        color="#838383"
                                    />
                                    {props.newUser.SportsHours}
                                </Text>

                            

                            </View>

                            <Icon
                                        raised
                                        name='ios-log-out-outline'
                                        type='ionicon'
                                        color='#7C4DFF'
                                        onPress={() => props.navigation.navigate('SignInUpScreen')}
                                        size={30}
                                       
                                    />


                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return { newUser: state.newUser }
}

export default connect(
    mapStateToProps,
    null
)(ProfileScreen);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    h1Style: {
        fontSize: 25,
        fontFamily: 'Montserrat_300Light',
        marginBottom: 10,
        marginTop: 15,
    },
    ageDescription: {
        fontSize: 18,
        fontFamily: 'Montserrat_300Light',
    },
    ChipFocus: {
        backgroundColor: '#7C4DFF',
        marginBottom: 20,
        marginTop: 30,
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
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
        marginTop: 30,
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
});

