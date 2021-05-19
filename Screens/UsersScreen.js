import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Badge, ListItem, Icon, Input, Button, Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const users = [
    {
        FirstName: 'Mathieu',
        Age: '20-35 ans',
        FavoritesSports: ['Football', 'Running'],
        SportsHabits: 'Soir & week-end',
        SportsHours: '17h à 19h',
        UserPicture: require('../assets/mathieu_circle.png'),
        UserLatitude: '37.78825',
        UserLongitude: '-122.4324',
    },
    {
        FirstName: 'Marilène',
        Age: '20-35 ans',
        FavoritesSports: 'Running',
        SportsHabits: 'Tous les jours',
        SportsHours: '10h à 15h',
        UserPicture: require('../assets/marilene_circle.png'),
        UserLatitude: '37.78825',
        UserLongitude: '-122.4324',
    },
    {
        FirstName: 'Axelle',
        Age: '20-35 ans',
        FavoritesSports: 'Yoga',
        SportsHabits: 'Weekend',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/axelle_circle.png'),
        UserLatitude: '37.78825',
        UserLongitude: '-122.4324',
    },
];


function UsersScreen() {

    const [usersFiltered, setUsersFiltered] = useState([]);

    useEffect(async () => {

        var rawResponse = await fetch('http://172.16.190.9:3000/users');
        var response = await rawResponse.json();
        // setUsersFiltered();

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
                    style={{ fontSize: '15' }}
                />
                <Button
                    title="Filtrer"
                    type="solid"
                    buttonStyle={{ backgroundColor: "#7C4DFF", marginLeft: 10, marginTop: 10, paddingLeft: 30, paddingRight: 30 }}
                    onPress={() => console.log('Appui sur filtrer')}
                // onPress={()=>console.log(text)} // À DÉCOMMENTER QUAND JE METTRAI LE FILTRE EN PLACE
                />
            </View>

            <Text style={{ textAlign: 'center' }}>
                Les sportifs autour de vous
            </Text>

            {
                users.map((user, i) => (
                    <Card containerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

                        <Avatar
                            rounded
                            size="xlarge"
                            source={users[i].UserPicture}
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
                            title='Envoyer un FRISBEE'
                            type='solid'
                            style={{ color: '#00cec9' }}
                            icon={
                                <Icon
                                    name="user"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            }
                        />

                        {/* // onPress={() => {
                        //     fetch('http://172.16.190.9.:3000/users', {
                        //         method: 'POST',
                        //         body: data 
                        //     })
                        // }
                        // }
                        // /> */}

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


export default UsersScreen;