import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Input, Button, Avatar, Chip, FAB, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
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
    {
        Firstname: 'Marilène',
        Age: '20-35 ans',
        FavoritesSports: 'Running',
        SportsHabits: 'Tous les jours',
        SportsHours: '10h à 15h',
        UserPicture: require('../assets/marilene_circle.png'),
        UserLatitude: 45.74226375921547, // Décathlon Confluence, Lyon 2
        UserLongitude: 4.81562665542188,
    },
    {
        Firstname: 'Sandara',
        Age: '20-35 ans',
        FavoritesSports: 'Yoga',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/sandara_circle.png'),
        UserLatitude: 45.77585598433732, // Parc de la Tête d'Or, Lyon
        UserLongitude: 4.85408305845722,
    },
    {
        Firstname: 'Olivier',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/olivier.jpeg'),
        UserLatitude: 45.77585598433732, // Parc de la Tête d'Or, Lyon
        UserLongitude: 4.85408305845722,
    },
    {
        Firstname: 'Ophélia',
        Age: '20-35 ans',
        FavoritesSports: ['Volleyball', 'Football'],
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/ophelia.jpeg'),
        UserLatitude: 48.87525174619298, // Arc de Triomphe, Paris
        UserLongitude: 2.295082113019037,
    },
    {
        Firstname: 'Cantin',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/cantin.jpeg'),
        UserLatitude: 48.85955520827693, // Tour Eiffel, Paris
        UserLongitude: 2.294136285652365,
    },
    {
        Firstname: 'Hermann',
        Age: '20-35 ans',
        FavoritesSports: 'Basketball',
        SportsHabits: 'Tous les jours',
        SportsHours: '9h à 20h',
        UserPicture: require('../assets/hermann.jpeg'),
        UserLatitude: 48.86195579255304, // Musée du Louvre, Paris
        UserLongitude: 2.337396640165934,
    },
];

// Adresse de la Capsule
const myLatitude = 45.7594378131077;
const myLongitude = 4.855718686456417;

// Un ID existant dans MongoDB
const idFromReduceur = '60a77616e8f40f1e2389f682';


function UsersScreen(props) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    const [usersList, setUsersList] = useState([]);
    const [visibleOverlay, setVisibleOverlay] = useState(false);
    const [focusUser, setFocusUser] = useState([]);
    const [allUsersWithoutMe, setAllUsersWithoutMe] = useState([]);

    var onPressAvatar = (e, id) => {
        setVisibleOverlay(true)
        setFocusUser([...focusUser])
    }
    // console.log(focusUser, "Log sur MapScreen focusUser");
    // console.log(props.newUser, "tout l'objet avec token sur UserScreen");
    // console.log(props.newUser.token, 'token sur UserScreen');


    // USERS FILTERED 
    useEffect(() => {

        const usersAroundMe = async function () {

            const usersRawResponse = await fetch('http://172.16.190.7:3000/users-filtered'); // Appel à la route
            const usersResponse = await usersRawResponse.json(); // Réponse du back transformé au format Json
            // console.log(usersResponse.usersData, 'Tous les users du Back'); // Je récupère un tableau avec tous les users
            console.log('log de usersResponse', usersResponse);
            setUsersList(usersResponse.usersData);

        };
        usersAroundMe()

    }, []);


    console.log('log usersList', usersList)
    var usersListFiltered = usersList.filter(user => user.token != props.newUser.token);
    console.log(props.newUser.token, 'token sur UserScreen');

    return (

        <ScrollView style={{ marginTop: 40 }}>

            <Text style={styles.title}>
                Fais du sport avec...
            </Text>


            {/* LOOP ON EACH USER FROM DB */}
            {
                usersListFiltered.map((user, i) => (
                    // usersList.map((user, i) => (
                    // users.map((user, i) => (
                    <View key={i}>
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                <Avatar
                                    rounded
                                    size="xlarge"
                                    source={{ uri: user.UserPicture }}
                                    // onPress={() => console.log('Appui sur photo profil')}
                                    onPress={e => onPressAvatar(e, { firstname: user.Firstname, age: user.Age, description: user.Description, sports: user.FavoritesSports, habits: user.SportsHabits, hours: user.SportsHours, picture: user.UserPicture })}
                                />
                            </View>


                            {/* OVERLAY: VIEW ON A SPECIFIC USER */}
                            <Overlay
                                isVisible={visibleOverlay}
                                fullScreen={true}
                                onBackdropPress={() => { setVisibleOverlay(false), setFocusUser([]) }}
                            >
                                <ScrollView>
                                    <View>
                                        <Icon
                                            iconStyle={styles.iconCloseOverlay}
                                            name='close'
                                            size={30}
                                            type='Ionicons'
                                            color='#FF4757'
                                            onPress={() => { setVisibleOverlay(false), setFocusUser([]) }}
                                        />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                                        <Avatar
                                            rounded
                                            size="xlarge"
                                            source={{ uri: user.UserPicture }}
                                        />

                                        <Text h1 style={styles.h1StyleOverlay}>
                                            {user.Firstname}
                                        </Text>

                                        <Text style={styles.ageDescriptionOverlay}>
                                            {user.Age}
                                        </Text>

                                        <Chip
                                            buttonStyle={styles.ChipFocus}
                                            title={user.FavoritesSports}
                                            titleStyle={styles.ChipFocusTitle}
                                            type="outline"
                                        />

                                        <Text style={styles.description}>
                                            {user.Description}
                                        </Text>

                                        <View>
                                            <Text style={styles.description}>
                                                {user.Firstname} est disponible :
                                            </Text>

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

                                            <Button
                                                title='Lance un FRISBEE'
                                                buttonStyle={styles.buttonFrisbeeOverlay}
                                                titleStyle={styles.buttonTextStyleFrisbee}
                                                icon={
                                                    <Feather name="disc"
                                                        size={18}
                                                        color="#ffffff"
                                                    />
                                                }
                                                // onPress={() => console.log('Appui sur FRISBEE')}
                                                onPress={() => props.navigation.navigate('SendFrisbee')}
                                            />


                                        </View>
                                    </View>
                                </ScrollView>
                            </Overlay>


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
                                    title='Lance un FRISBEE'
                                    buttonStyle={styles.buttonFrisbee}
                                    titleStyle={styles.buttonTextStyleFrisbee}
                                    icon={
                                        <Feather name="disc"
                                            size={18}
                                            color="#ffffff"
                                        />
                                    }
                                    onPress={() => props.navigation.navigate('SendFrisbee')}
                                />

                            </View>
                        </View>
                    </View>
                ))
            }

            {/* FILTRES BUTTON */}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
                    onPress={() => { setVisibleFilterOverlay(true) }}
                // onPress={() => console.log('Appui sur filtrer')}
                />
            </View> */}

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
    iconCloseOverlay: {
        marginTop: 20,
        marginLeft: 300,
    },
    buttonFrisbeeOverlay: {
        backgroundColor: "#00CEC9",
        borderRadius: 17,
        width: vw(47),
        marginTop: 20,
    },
    h1StyleOverlay: {
        fontSize: 20,
        fontFamily: 'Montserrat_300Light',
        // marginRight: 10,
        // marginBottom: 5
    },
    ageDescriptionOverlay: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
    },
});

function mapStateToProps(state) {
    return { newUser: state.newUser }
}

export default connect(
    mapStateToProps,
    null
)(UsersScreen);
