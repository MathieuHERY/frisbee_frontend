import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Input, Button, Avatar, Chip, Overlay, Card, Badge } from 'react-native-elements';
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


function UsersScreen(props) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    const [usersList, setUsersList] = useState([]);
    const [visibleOverlay, setVisibleOverlay] = useState(false);
    const [focusUser, setFocusUser] = useState([]);

    var onPressAvatar = (e, id, user) => {
        setVisibleOverlay(true)
        setFocusUser([...focusUser, user]) // doit vider le tableau et ajouter uniquement sur celui que l'on a cliqué
    }
    // console.log(focusUser, "Log sur MapScreen focusUser");
    // console.log(props.userToken, "tout l'objet avec token sur UserScreen");
    // console.log(props.userToken.token, 'token sur UserScreen');


    // USERS FILTERED 
    useEffect(() => {

        const usersAroundMe = async function () {

            const usersRawResponse = await fetch('http://172.16.190.9:3000/users-filtered'); // Appel à la route
            const usersResponse = await usersRawResponse.json(); // Réponse du back transformé au format Json
            // console.log(usersResponse.usersData, 'Tous les users du Back'); // Je récupère un tableau avec tous les users
            /* console.log('log de usersResponse', usersResponse); */
            setUsersList(usersResponse.usersData); //récupère tous les users

        };
        usersAroundMe()

    }, []);

    // console.log('log usersList', usersList)
    var usersListFiltered = usersList.filter(user => user.token != props.newUser.token); // Retourne tous les utilisateurs sauf moi

    var sendFrisbee = (e, id, user) => { //user est l'argument, donc doit être la même que dans le dispatch
        props.sendFrisbee(user) //dispatch
    }

    
    
    {/* OVERLAY: PRESS ON AVATAR = VIEW ON A SPECIFIC USER */ }
    var userOverlay = focusUser.map(function (user, i) {
        return (
            <View key={i} style={styles.containerOverlay}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
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
                    <View style={{flexDirection:'row', flexWrap:'wrap', width:300, alignItems:'center', justifyContent:'center', marginTop:15}}>
                    {user.FavoritesSports.map(function (sport, i) {
                        return (
                    <Chip
                        buttonStyle={styles.ChipFocus}
                        title={sport}
                        titleStyle={styles.ChipFocusTitle}
                        type="outline"
                    />
                        )})}

                    </View>

                    <Text style={styles.userDescriptionOverlay}>
                        {user.Description}
                    </Text>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text h2 style={styles.h2StyleOverlay}>
                            {user.Firstname} est disponible :
                                </Text>

                        <Card containerStyle={{ borderWidth: 0.1, borderRadius: 10, borderColor: '#D1CFCF', marginBottom: 10 }}>

                            <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30 }}>
                                <EvilIcons name="calendar"
                                    size={24}
                                    color="#838383"
                                />
                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15 }}>
                                    {user.SportsHabits}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, marginTop: 5, marginLeft: 30 }}>
                                <EvilIcons name="clock"
                                    size={24}
                                    color="#838383"
                                />
                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15, flexWrap: 'wrap' }}>
                                    {user.SportsHours}</Text>
                            </View>

                        </Card>

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
                            onPress={() => { props.navigation.navigate('SendFrisbee'), setVisibleOverlay(false), setFocusUser([]) }}
                        />

                    </View>
                </View>
            </View>
        )
    }
    )
    console.log('log de focusUser', focusUser);


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        return (

            <View style={styles.container}>
                <ScrollView style={{ marginTop: 40 }}>

                    <Text style={styles.title}>
                        Fais du sport avec...
                    </Text>


                    {/* LOOP ON EACH USER FROM DB */}
                    {
                        usersListFiltered.map((user, i) => (
                            // usersList.map((user, i) => (
                            // users.map((user, i) => (

                            <Card key={user._id} containerStyle={{ borderWidth: 0.1, borderRadius: 10, borderColor: '#D1CFCF' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 30, marginLeft: 10, justifyContent: 'center' }}>
                                        <Avatar
                                            size="large"
                                            rounded
                                            source={{ uri: user.UserPicture }}
                                            // onPress={() => console.log('Appui sur photo profil')}
                                            onPress={e => onPressAvatar(e, user._id, { Firstname: user.Firstname, Age: user.Age, Description: user.Description, FavoritesSports: user.FavoritesSports, SportsHabits: user.SportsHabits, SportsHours : user.SportsHours, UserPicture: user.UserPicture })
                                            }
                                        />


                                        {/* OVERLAY: PRESS ON AVATAR = VIEW ON A SPECIFIC USER */}
                                        <Overlay
                                            isVisible={visibleOverlay}
                                            fullScreen={true}
                                            onBackdropPress={() => { setVisibleOverlay(false), setFocusUser([]) }}
                                        >
                                            <View style={styles.container}>
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

                                                    {userOverlay}

                                                </ScrollView>
                                            </View>
                                        </Overlay>

                                    </View>
                                    <View style={{ marginRight: 5, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text h1 style={styles.h1Style}>
                                                {user.Firstname}
                                            </Text>

                                            <Text style={styles.ageDescription}>
                                                {user.Age}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: 230, marginTop: 5, marginBottom: 5 }}>
                                            <Text h1 style={styles.h1Style}>

                                                {user.FavoritesSports.map(function (sport, i) {

                                                    return (
                                                        <Badge
                                                            badgeStyle={styles.SportBadge}
                                                            value={sport}
                                                            textStyle={styles.ChipFocusTitle}
                                                            type="outline"
                                                        />
                                                    )

                                                })}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <EvilIcons name="calendar"
                                                size={24}
                                                color="#838383"
                                            />
                                            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15 }}>
                                                {user.SportsHabits}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, marginTop: 5 }}>
                                            <EvilIcons name="clock"
                                                size={24}
                                                color="#838383"
                                            />
                                            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15, flexWrap: 'wrap' }}>
                                                {user.SportsHours}</Text>
                                        </View>

                                        <View style={{ alignItems: 'center' }}>
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
                                                // onPress={() => { props.navigation.navigate('SendFrisbee'), setVisibleOverlay(false), setFocusUser([]) }}
                                                onPress={e => sendFrisbee(e, user._id, { id: user._id, Firstname: user.Firstname, userPicture: user.UserPicture, token: user.token }, props.navigation.navigate('SendFrisbee'))}

                                            />
                                        </View>

                                    </View>
                                </View>
                            </Card>
                        ))
                    }

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    ChipFocus: {
        backgroundColor: '#FFF',
        marginBottom: 5,
        marginTop: 5,
        marginRight:5,
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
        width: vw(20),
    },
    SportBadge: {
        backgroundColor: '#FFF',
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
        marginRight: 3,
        marginBottom: 3,
    },
    ChipFocusTitle: {
        fontSize: 10,
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
        fontSize: 22,
        fontFamily: 'Montserrat_300Light',
        marginRight: 10,
        marginBottom: 5
    },
    userDescriptionOverlay: {
        fontSize: 17,
        fontFamily: 'Montserrat_300Light',
        textAlign: 'justify',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 15,
        marginBottom: 10,
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
        marginLeft: 5,
    },
    containerOverlay: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 25,
        fontFamily: 'Montserrat_300Light',
        // marginRight: 10,
        marginBottom: 10,
        marginTop: 15,
    },
    h2StyleOverlay: {
        fontSize: 15,
        fontFamily: 'Montserrat_300Light',
    },
    ageDescriptionOverlay: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
    },
    availabilityOverlay: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        marginLeft: 50,
        marginRight: 50,
    }
});


function mapDispatchToProps(dispatch) {
    return {
        sendFrisbee: function (user) {
            console.log('log dans le Dispatch', user);
            dispatch({ type: 'getUserInvitedInfo', userInvited: user })
        }
    }
}

function mapStateToProps(state) {
    return { newUser: state.newUser }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersScreen);



  