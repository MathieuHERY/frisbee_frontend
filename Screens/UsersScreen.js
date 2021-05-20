import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FAB, Card, Badge, ListItem, Icon, Input, Button, Avatar, Chip } from 'react-native-elements';
// import {connect} from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
/* import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'; */


const users = [
    {
        FirstName: 'Mathieu',
        Age: '20-35 ans',
        FavoritesSports: 'Running',
        SportsHabits: 'Soir & week-end',
        SportsHours: '17h à 19h',
        UserPicture: require('../assets/mathieu_circle.png'),
        UserLatitude: 45.760030349116455, // Carrefour La Part Dieu, Lyon 3
        UserLongitude: 4.856242322951902,
    },
    {
        FirstName: 'Marilène',
        Age: '20-35 ans',
        FavoritesSports: 'Running',
        SportsHabits: 'Tous les jours',
        SportsHours: '10h à 15h',
        UserPicture: require('../assets/marilene_circle.png'),
        UserLatitude: 45.74226375921547, // Décathlon Confluence, Lyon 2
        UserLongitude: 4.81562665542188,
    },
    {
        FirstName: 'Axelle',
        Age: '20-35 ans',
        FavoritesSports: 'Football',
        SportsHabits: 'Weekend',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/axelle_circle.png'),
        UserLatitude: 45.75892606750682,  // Place Belcour, Lyon 2
        UserLongitude: 4.832001892099143,
    },
    {
        FirstName: 'Sandara',
        Age: '20-35 ans',
        FavoritesSports: 'Yoga',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/sandara_circle.png'),
        UserLatitude: 45.77585598433732, // Parc de la Tête d'Or, Lyon
        UserLongitude: 4.85408305845722,
    },
    {
        FirstName: 'Olivier',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        /* UserPicture: require(/* '../assets/olivier.jpeg' )*/
        UserLatitude: 45.77585598433732, // Parc de la Tête d'Or, Lyon
        UserLongitude: 4.85408305845722,
    },
    {
        FirstName: 'Ophélia',
        Age: '20-35 ans',
        FavoritesSports: 'Volleyball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/ophelia.jpeg'),
        UserLatitude: 48.87525174619298, // Arc de Triomphe, Paris
        UserLongitude: 2.295082113019037,
    },
    {
        FirstName: 'Cantin',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
       /*  UserPicture: require('../assets/cantin.jpeg'), */
        UserLatitude: 48.85955520827693, // Tour Eiffel, Paris
        UserLongitude: 2.294136285652365,
    },
    {
        FirstName: 'Hermann',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        /* UserPicture: require('../assets/hermann.jpeg'), */
        UserLatitude: 48.86195579255304, // Musée du Louvre, Paris
        UserLongitude: 2.337396640165934,
    },

];

// Adresse de la Capsule
const myLatitude = 45.7594378131077;
const myLongitude = 4.855718686456417;


function UsersScreen() {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    // USERS FILTERED
    useEffect(() => {

        async function usersAroundMe(props) {

            const usersRawResponse = await fetch('http://172.16.190.9:3000/users'); // Appel à la route
            const usersResponse = await usersRawResponse.json(); // Réponse du back transformé au format Json
            console.log(usersResponse, 'Tous les users du Back'); // Je suis censée récupérer un tableau

            console.log(myUserId, "Mon ID lors de l'inscription");

            // Je compare l'ID du réduceur avec mon ID
            // S'il y a correspondance = je recupère ma latitude et ma longitude
            // Et je compare ma latitude + la longitude avec celle des users
            // Je mappe le tableau de tous les users
            const myIdFromBack = usersResponse.map(function (id, i) {
                if (myUserId == usersResponse.id) {
                    console.log(usersResponse.latitude, 'ma latitude');
                    console.log(usersReponse.longitude, 'ma longitude');
                    return (usersResponse.latitude, usersReponse.longitude)
                }
            })

            // const usersFromDB = response.usersData.map((userFiltered, i) {
            //     return (name: usersData.FirstName, age: usersData.Age) // Je dois indiquer les informations que je veux afficher à l'écran
            // }
            // )
        };
        usersAroundMe()

    }, []);

    return (

        <ScrollView style={{ marginTop: 40 }}>

            <Text style={styles.title}>
                Fais du sport avec...
            </Text>


            {/* LOOP ON CARD TO BE DYNAMISED */}
            {
                users.map((user, i) => (
                    <View>
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                <Avatar
                                    rounded
                                    size="xlarge"
                                    // style={{marginLeft: 10}}
                                    source={users[i].UserPicture}
                                    onPress={() => console.log('Appui sur photo profil')}
                                />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text h1 style={styles.h1Style}>
                                        {user.FirstName}
                                    </Text>

                                    <Text style={styles.ageDescription}>
                                        {user.Age}
                                    </Text>
                                </View>

                                <View>
                                    <Chip buttonStyle={styles.ChipFocus} title={user.FavoritesSports} titleStyle={styles.ChipFocusTitle} type="outline" />

                                    <Text style={styles.description}>
                                        <Icon
                                            FontAwesome name='calendar'
                                            size={24}
                                            color='#838383'
                                        />
                                        {user.SportsHabits}
                                    </Text>

                                    <Text style={styles.description}>
                                        <Icon
                                            FontAwesome name='calendar'
                                            size={24}
                                            color='#838383'
                                        />
                                        {user.SportsHours}
                                    </Text>

                                </View>

                                <Button
                                    title='Lance un FRISBEE'
                                    buttonStyle={styles.buttonFrisbee}
                                    titleStyle={styles.buttonTextStyleFrisbee}
                                    icon={
                                        <Icon
                                            FontAwesome name="user"
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                    }
                                    onPress={() => console.log('Appui sur FRISBEE')}
                                />

                            </View>
                        </View>
                    </View>
                ))
            }

            <FAB
                style={styles.fabFilters}
                small
                color='#FFFFFF80'
                title="Filtres" titleStyle={{ color: '#000000', fontFamily: 'Nunito_400Regular' }}
                icon={
                    <Icon
                        Ionicons name="filter-list"
                        size={20}
                        color="black"
                    />
                }
                // onPress={() => { setVisibleFilterOverlay(true) }}
                onPress={() => console.log('Appui sur filtrer')}
            />

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
        /* width: vw(25), */
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
    },
    ageDescription: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        textAlign: 'right',
    },
    buttonFrisbee: {
        backgroundColor: "#00CEC9",
        borderRadius: 17,
       /*  width: vw(47), */
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
        right: 40,
        bottom: 10,
        backgroundColor: '#FFFFFF80',
    },
});

// REDUX À METTRE EN PLACE
// function mapStateToProps(state) {
//     return { myUserId: state.userId }
//    }

// export default connect(
// mapStateToProps,
// null
// )(UsersScreen);

export default UsersScreen;
