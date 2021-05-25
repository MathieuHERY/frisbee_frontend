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

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });


    const [user, setUser] = useState([]);


    useEffect(() => {

        const user = async function () {

            const data = await fetch('http://172.16.190.9:3000/user');
            const body = await data.json(); // Réponse du back transformé au format Json - tableau de tous les utilisateurs
            console.log(body.result);
            setUser(body.userData); //récupère tous les users

        };
        user()

    }, []);

    console.log('log usersList', user)
    var userData = user.filter(user => user.token === props.userToken); // je veux que tu me ressorte l'utilisateur avec mon token, token de la personne qui vient de se connecter)
    console.log(props.userToken);




    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView>

                <View style={styles.container}>

                    {
                        userData.map((user, i) => (
                            <View key={i}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>

                                    <Icon
                                        raised
                                        name='logOff'
                                        type='ionicon'
                                        color='#7C4DFF'
                                        onPress={() => props.navigation.navigate('SignInUpScreen')}
                                        size={30}
                                    />


                                    <Avatar
                                        rounded
                                        size="xlarge"
                                        source={{ uri: user.UserPicture }} // À Dynamiser
                                    />

                                    <Text h1 style={styles.h1Style}>{user.Firstname}</Text>

                                    <Text style={styles.ageDescription}>{user.Age}</Text>


                                    <Text style={{ justifyContent: "center", alignItems: "center", color: "#7C4DFF", /* backgroundColor: "#7C4DFF", */ marginTop: 20 }}>{user.FavoritesSports}</Text>



                                    <Text style={styles.description}>{user.Description}
                                    </Text>

                                    <Text style={styles.description}> Mes disponibilités : </Text>


                                    <View style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 100, width: 250, justifyContent: "center", alignItems: "center" }}>

                                        <Text style={styles.disponibilités1}>
                                            <EvilIcons
                                                name="calendar"
                                                size={24}
                                                color="#838383"
                                            />
                                            {user.SportsHabits}
                                        </Text>

                                        <Text style={styles.disponibilités}>
                                            <EvilIcons name="clock"
                                                size={24}
                                                color="#838383"
                                            />
                                            {user.SportsHours}
                                        </Text>
                                    </View>
                                </View></View>
                        ))

                    }

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>

                    </View>

                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return { newUser: state.newUser, userToken: state.userToken }
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
        fontSize: 30,
        fontFamily: 'Montserrat_300Light',
        marginBottom: 10,
        marginTop: 15,
    },
    ageDescription: {
        fontSize: 20,
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

