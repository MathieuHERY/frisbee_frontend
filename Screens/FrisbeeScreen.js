import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button, Avatar, Chip, Overlay, ButtonGroup, Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const Frisbee = [
    {
        Firstname: 'Olivier',
        CreationDate : 'le 11/05/2020',
        Address: 'Stade Léo Lagrange, 69002 Lyon',
        Sport: 'Basketball',
        isAccepted : null,
        DateMeeting: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/olivier.jpeg'),

    },
    {
        Firstname: 'Ophélia',
        CreationDate : 'le 11/05/2020',
        Address: 'Stade Léo Lagrange, 69002 Lyon',
        Sport: 'Basketball',
        isAccepted : false,
        DateMeeting: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/ophelia.jpeg'),
    },
    {
        Firstname: 'Cantin',
        CreationDate : 'le 11/05/2020',
        Address: 'Stade Léo Lagrange, 69002 Lyon',
        Sport: 'Basketball',
        isAccepted : null,
        DateMeeting: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/cantin.jpeg'),

    },
    {
        Firstname: 'Hermann',
        CreationDate : 'le 11/05/2020',
        Address: 'Stade Léo Lagrange, 69002 Lyon',
        Sport: 'Basketball',
        isAccepted : true,
        DateMeeting: 'Samedi 22 mai à 15 h',
        UserPicture: require('../assets/hermann.jpeg'),
    },
];

const buttons = ['Reçus', 'Envoyés']

function FrisbeeScreen() {

const [frisbeeList, setFrisbeeList] = useState([])

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    useEffect(() => {
        async function getAllFrisbee() {
            var request = await fetch(`http://172.16.188.137:3000/frisbee`);
            var response = await request.json();
            setFrisbeeList(response.frisbeeData)
        };
        getAllFrisbee();
    }, []);


var ReceivedFrisbee = Frisbee.map (function(item, i)
{
    return (
        <Card containerStyle={{borderWidth:0.1, borderRadius:10, borderColor:'#D1CFCF'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 30, marginLeft: 10, justifyContent:'center' }}>
                                <Avatar
                                    size="large"
                                    rounded
                                    source={{uri:item.UserPicture}
                                    }
                                />

                            </View>
                            <View style={{ marginRight: 5, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text h1 style={styles.h1Style}>
                                        {item.Firstname}
                                </Text>
                                    <Text style={styles.date}>
                                    {item.CreationDate}
                                </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text h1 style={styles.h1Style}>
                                        <Chip
                                            buttonStyle={styles.ChipFocus}
                                            title={item.Sport}
                                            titleStyle={styles.ChipFocusTitle}
                                            type="outline"
                                        />
                                    </Text>
                                    {(item.isAccepted === null) &&
                                         <Text style={styles.answerPending}>
                                            EN ATTENTE
                                         </Text>
                                    }
                                    {(item.isAccepted === true) &&
                                         <Text style={styles.answerAccepted}>
                                            ACCEPTÉ
                                         </Text>
                                    }
                                    {(item.isAccepted === false) &&
                                         <Text style={styles.answerRejected}>
                                            DECLINÉ
                                         </Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="clock"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13 }}>
                                    {item.DateMeeting}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom:5, marginTop:5}}>
                                <EvilIcons name="location"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13, flexWrap: 'wrap' }}>
                                    {item.Address}</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                {(item.isAccepted === null) &&
                                <Button
                                        title="Réponds à l'invitation"
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
}
                                    </View>
                            </View>
                        </View>
                    </Card>
    )
})

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 40 }}>

                <Text style={styles.title}>
                    Mes FRISBEE
            </Text>

                <View style={styles.buttonGroup}>
                    <ButtonGroup
                        buttons={buttons}
                        containerStyle={{ height: 40 }}
                        buttonContainerStyle={{ backgroundColor: '#F1F1F1' }}
                        textStyle={{ color: '#000' }}
                    />
                </View>
                <View>
                    {ReceivedFrisbee}
                    </View>
                    </ScrollView>
                </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
        /* flexDirection: 'row', */
    },
    ChipFocus: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 5,
        borderColor: '#7C4DFF',
        borderWidth: 1.5,
        maxWidth: 80,
        height: 35,
    },
    ChipFocusTitle: {
        color: '#7C4DFF',
        fontFamily: 'Nunito_400Regular',
        fontSize: 12,
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
        marginRight: 40,
        marginBottom: 5
    },
    date: {
        fontSize: 10,
        fontFamily: 'Montserrat_300Light',
        marginBottom: 5,
    },
    answerPending: {
        fontSize: 14,

        fontFamily: 'Nunito_400Regular',
        color:'#FF8933',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerAccepted: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color:'#00CE52',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerRejected: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color:'#FF4757',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
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
        width: 180,
        marginTop: 10,
    },
    buttonTextStyleFrisbee: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 14,
        marginLeft:5,
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
    },
});


export default FrisbeeScreen;