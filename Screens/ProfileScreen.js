import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    console.log(props.newUser, 'token sur ProfileScreen')

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });



    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View

                style={styles.container}>

                <Avatar
                    rounded
                    size="xlarge"
                    source={require('../assets/marilene_circle.png')}
                    onPress={() => console.log('Appui sur photo profil')}
                />

                <Text h1 style={styles.h1Style}>Marilène</Text>

                <Text style={styles.ageDescription}>20 - 35 ans</Text>


                <View style={{ flexDirection: 'row'}}>
                <Chip
                    buttonStyle={styles.ChipFocus}
                    title="Basket-Ball"
                    titleStyle={styles.ChipFocusTitle}
                    type="outline"
                />
                <Chip
                    buttonStyle={styles.ChipFocus}
                    title="Yoga"
                    titleStyle={styles.ChipFocusTitle}
                    type="outline"
                />
                <Chip
                    buttonStyle={styles.ChipFocus}
                    title="Ping-Pong"
                    titleStyle={styles.ChipFocusTitle}
                    type="outline"
                />
                </View>


                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed non purus sit amet nisl vulputate condimentum sit amet nec mi. In in ex augue.
                </Text>

                <Text style={styles.description}> Mes disponibilités : </Text>


                <View style={{borderColor:'#dfe6e9', borderWidth:1, borderRadius:5, height:100, width:250, justifyContent: "center", alignItems: "center"}}>
                    
                <Text style={styles.disponibilités1}>
                    <EvilIcons
                        name="calendar"
                        size={24}
                        color="#838383"
                    />
                    Soir & Weekend
                </Text>

                <Text style={styles.disponibilités}>
                    <EvilIcons name="clock"
                        size={24}
                        color="#838383"
                    />
                    17h00 à 19h00
                </Text>
                </View>

            </View>
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
        marginRight:15,
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
});
