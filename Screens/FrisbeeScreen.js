import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay } from 'react-native-elements';
// import {connect} from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
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
        Firstname: 'Olivier',
        Age: '20-35 ans',
        SportsHabits: 'Stade Léo Lagrange, 69002 Lyon',
        FavoritesSports: 'Basketball',
        SportsHours: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/olivier.jpeg'),

    },
    {
        Firstname: 'Ophélia',
        Age: '20-35 ans',
        FavoritesSports: 'Volleyball',
        SportsHabits: 'Stade Léo Lagrange, 69002 Lyon',
        SportsHours: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/ophelia.jpeg'),
        UserLatitude: 48.87525174619298, // Arc de Triomphe, Paris
        UserLongitude: 2.295082113019037,
    },
    {
        Firstname: 'Cantin',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Stade Léo Lagrange, 69002 Lyon',
        SportsHours: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/cantin.jpeg'),
        UserLatitude: 48.85955520827693, // Tour Eiffel, Paris
        UserLongitude: 2.294136285652365,
    },
    {
        Firstname: 'Hermann',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'tade Léo Lagrange, 69002 Lyon',
        SportsHours: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/hermann.jpeg'),
        UserLatitude: 48.86195579255304, // Musée du Louvre, Paris
        UserLongitude: 2.337396640165934,
    },
];

function FrisbeeScreen() {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    return (

        <ScrollView style={{ marginTop: 40 }}>

            <Text style={styles.title}>
                Mes FRISBEE
            </Text>


            {/* LOOP ON EACH USER FROM DB */}
            {
                // usersList.map((user, i) => (
                    users.map((user, i) => (
                    <View key={i}>
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                <Avatar
                                    rounded
                                    size="xlarge"
                                    source={users[i].UserPicture}
                                    onPress={() => console.log('Appui sur photo profil')}

                                />
                            </View>

                            {/* DISPLAY EACH USER */}
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text h1 style={styles.h1Style}>
                                        {user.Firstname}
                                    </Text>

                                    <Text style={styles.ageDescription}>
                                        {user.Age}
                                    </Text>
                                </View>

                                <View>
                                    <Chip
                                        buttonStyle={styles.ChipFocus}
                                        title={user.FavoritesSports}
                                        titleStyle={styles.ChipFocusTitle}
                                        type="outline"
                                    />

                                    <Text style={styles.description}>
                                        <EvilIcons
                                            name="calendar"
                                            size={24}
                                            color="#838383"
                                        />
                                        {user.SportsHabits}
                                    </Text>

                                    <Text style={styles.description}>
                                        <EvilIcons name="clock"
                                            size={24}
                                            color="#838383"
                                        />
                                        {user.SportsHours}
                                    </Text>

                                </View>

                                <Button
                                    title="Réponds à l'invit'"
                                    buttonStyle={styles.buttonFrisbee}
                                    titleStyle={styles.buttonTextStyleFrisbee}
                                    icon={
                                        <Feather name="disc"
                                            size={18}
                                            color="#ffffff"
                                        />
                                    }
                                    onPress={() => console.log('Appui sur FRISBEE')}
                                />

                            </View>
                        </View>
                    </View>
                ))
            }

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    ChipFocus: {
        backgroundColor: '#F3F3F3',
        marginBottom: 5,
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
        width: vw(25),
    },
    ChipFocusTitle: {
        color: '#7C4DFF',
        fontFamily: 'Nunito_400Regular'
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
        marginRight: 10,
        marginBottom: 5
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
    buttonFrisbee: {
        backgroundColor: "#00CEC9",
        borderRadius: 17,
        width: vw(47),
        marginTop: 10,
    },
    buttonTextStyleFrisbee: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 15,
    },
    fabFilters: {
        position: 'absolute',
        fontSize: 10,
        margin: 16,
        // right: 100,
        bottom: 10,
        backgroundColor: '#FFFFFF80',
    },
});


export default FrisbeeScreen;