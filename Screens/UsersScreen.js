import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Badge, ListItem, Icon, Input, Button, Avatar } from 'react-native-elements';
import {connect} from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';



const users = [
    {
        FirstName: 'Mathieu',
        Age: '20-35 ans',
        FavoritesSports: ['Football', 'Running'],
        SportsHabits: 'Soir & week-end',
        SportsHours: '17h à 19h',
        UserPicture: require('../assets/mathieu_circle.png'),
        UserLatitude: 45.612702572114344,
        UserLongitude: 5.1561502826745675,
    },
    {
        FirstName: 'Marilène',
        Age: '20-35 ans',
        FavoritesSports: 'Running',
        SportsHabits: 'Tous les jours',
        SportsHours: '10h à 15h',
        UserPicture: require('../assets/marilene_circle.png'),
        UserLatitude: 45.74331694361425,
        UserLongitude: 4.820524695285364,
    },
    {
        FirstName: 'Axelle',
        Age: '20-35 ans',
        FavoritesSports: 'Yoga',
        SportsHabits: 'Weekend',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/axelle_circle.png'),
        UserLatitude: 45.75625192925815,
        UserLongitude: 4.833841439222393,
    },
    {
        FirstName: 'Sandara',
        Age: '20-35 ans',
        FavoritesSports: 'Yoga',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/sandara_circle.png'),
        UserLatitude: 45.7770178075458,
        UserLongitude: 4.853280793708863,
    },
];

const myLatitude = 45.75945278353232;
const myLongitude = 4.855654313440548;


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
            
            const myIdFromBack = usersResponse.map(function(id, i) {
                if (myUserId == usersResponse.id) {
                    console.log(usersResponse.latitude, 'ma latitude');
                    console.log(usersReponse.longitude, 'ma longitude');
                    return (usersResponse.latitude, usersReponse.longitude)
                }
            })

            
            // const rawLocationFromBack = await fetch('http://172.16.190.9:3000/my-location');
            // const responseLocation = await rawLocationFromBack.json(); // Réponse du back transformé au format Json
            // console.log(responseLocation, 'Ma longitude et ma latitude');


            // const usersFromDB = response.usersData.map((userFiltered, i) {
            //     return (name: usersData.FirstName, age: usersData.Age) // Je dois indiquer les informations que je veux afficher à l'écran
            // }
            // )
        };
        usersAroundMe()

    }, []);

    return (

        <ScrollView style={{ marginTop: 40 }}>

            <View style={{ flexDirection: 'row' }}>
                <Input
                    onChangeText={(value) => setText(value)}
                    value=''
                    // value={text} // À DÉCOMMENTER QUAND JE METTRAI LE FILTRE EN PLACE
                    placeholder='Rechercher par sports'
                    containerStyle={{ marginTop: 5, marginBottom: 5, marginLeft: 10, width: "60%" }}
                    style={{ fontFamily: 'Nunito_400Regular', fontSize: 15 }}
                />
                <Button
                    title="Filtrer"
                    buttonStyle={{ backgroundColor: "#7C4DFF", borderRadius: 17, marginLeft: 10, marginTop: 10, paddingLeft: 30, paddingRight: 30, fontFamily: 'Nunito_400Regular' }}
                    onPress={() => console.log('Appui sur filtrer')}
                />


            </View>

            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 30, paddingTop: 20, }}>
                Les sportifs autour
                de vous
            </Text>

            

            {/* LOOP ON CARD TO BE DYNAMISED */}
            {
                users.map((user, i) => (
                    <Card containerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

                        <Avatar
                            rounded
                            size="xlarge"
                            source={users[i].UserPicture}
                            onPress={() => console.log('Appui sur photo profil')}
                        />


                        <Text>
                            {user.FirstName}
                        </Text>

                        <Text>
                            {user.Age}
                        </Text>

                        <Badge status='success' value={user.FavoritesSports} />
                        <Text>
                            <Icon
                                type="fontawesome"
                                name='calendar'
                                size={24}
                                color='#838383'
                            />
                            {user.SportsHabits}
                        </Text>

                        <Text>
                            <Icon
                                FontAwesome name='calendar'
                                size={24}
                                color='#838383'
                            />
                            {user.SportsHours}
                        </Text>

                        <Button
                            title='Envoie-lui un FRISBEE'

                            style={{ backgroundColor: "#00CEC9", marginBottom: 70, titleStyle: 'Montserrat_300Light', borderRadius: 17 }}
                            icon={
                                <Icon
                                    name="user"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            }
                            onPress={() => console.log('Appui sur FRISBEE')}
                        />

                    </Card>
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
});


function mapStateToProps(state) {
    return { myUserId: state.userId }
   }
    
export default connect(
mapStateToProps,
null
)(UsersScreen);
