import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button, Avatar, Chip, Overlay, Card } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
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

function FrisbeeScreen(props) {

const [allFrisbees, setAllFrisbees] = useState([])
const [radioButtonValue, setRadioButtonValue] = useState(0)

var radio_props = [
    {label: 'Reçus', value: 0 },
    {label: 'Envoyés', value: 1 }
  ];

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    useEffect(() => {
        async function getAllFrisbee() {
            var userInfoRequest = await fetch(`http://192.168.1.63:3000/allfrisbees`);
            var userInfoResponse = await userInfoRequest.json();
            console.log(userInfoResponse)
            var FrisbeeFiltered;
            if (radioButtonValue.value === 0) {
               FrisbeeFiltered =  userInfoResponse.frisbees.filter(item => item.userInvited.token === props.userToken)
            } else {
                FrisbeeFiltered =  userInfoResponse.frisbees.filter(item => item.userCreator.token === props.userToken)
            }
            setAllFrisbees(FrisbeeFiltered)
        };
        getAllFrisbee();
    }, [radioButtonValue]);

    var GotoFrisbeeResponseScreen = (item) => {
        var frisbee = item
        props.frisbeeData(frisbee)
        props.navigation.navigate('ResponseFrisbee')
    }


var frisbeeListSent = allFrisbees.map (function(item, i)
{
var optionsDate = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return (
        <Card key={item._id} containerStyle={{borderWidth:0.1, borderRadius:10, borderColor:'#D1CFCF', flexShrink:1}}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 30, marginLeft: 10, justifyContent:'center' }}>
                                <Avatar
                                    size="large"
                                    rounded
                                    source={{uri:item.userInvited.UserPicture}
                                    }
                                />

                            </View>
                            <View style={{ marginRight: 5, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text h1 style={styles.h1Style}>
                                        {item.userInvited.Firstname}
                                </Text>
                                    <Text style={styles.date}>
                                    {new Date(item.CreatedDate).toLocaleDateString("fr-FR")}
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
                                    {(item.isAccepted === 'null') &&
                                         <Text style={styles.answerPending}>
                                            EN ATTENTE
                                         </Text>
                                    }
                                    {(item.isAccepted === 'true') &&
                                         <Text style={styles.answerAccepted}>
                                            ACCEPTÉ
                                         </Text>
                                    }
                                    {(item.isAccepted === 'false') &&
                                         <Text style={styles.answerRejected}>
                                            DECLINÉ
                                         </Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="calendar"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13 }}>
                                    {new Date(item.DateMeeting).toLocaleDateString("fr-FR", optionsDate)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="clock"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13 }}>
                                    {item.HoursMeeting}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom:5, marginTop:5}}>
                                <EvilIcons name="location"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'left', fontFamily: 'Montserrat_300Light', fontSize: 13, flex:1}}>
                                    {item.AddressMeeting}</Text>
                                </View>
                    </View>
                </View>
            </Card>
        )
    })

var frisbeeListReceived = allFrisbees.map (function(item, i)
{
var optionsDate = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

    return (
        <Card key={item._id} containerStyle={{borderWidth:0.1, borderRadius:10, borderColor:'#D1CFCF', flexShrink:1}}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 30, marginLeft: 10, justifyContent:'center' }}>
                                <Avatar
                                    size="large"
                                    rounded
                                    source={{uri:item.userCreator.UserPicture}
                                    }
                                />

                            </View>
                            <View style={{ marginRight: 5, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text h1 style={styles.h1Style}>
                                        {item.userCreator.Firstname}
                                </Text>
                                    <Text style={styles.date}>
                                    {new Date(item.CreatedDate).toLocaleDateString("fr-FR")}
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
                                    {(item.isAccepted === 'null') &&
                                         <Text style={styles.answerPending}>
                                            EN ATTENTE
                                         </Text>
                                    }
                                    {(item.isAccepted === 'true') &&
                                         <Text style={styles.answerAccepted}>
                                            ACCEPTÉ
                                         </Text>
                                    }
                                    {(item.isAccepted === 'false') &&
                                         <Text style={styles.answerRejected}>
                                             DECLINÉ
                                         </Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="calendar"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13 }}>
                                    {new Date(item.DateMeeting).toLocaleDateString("fr-FR", optionsDate)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="clock"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 13 }}>
                                    {item.HoursMeeting}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom:5, marginTop:5}}>
                                <EvilIcons name="location"
                                                size={24}
                                                color="#838383"
                                            />
                                    <Text style={{ textAlign: 'left', fontFamily: 'Montserrat_300Light', fontSize: 13, flex:1}}>
                                    {item.AddressMeeting}</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                {(item.isAccepted === 'null') &&
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
                                    onPress={() => GotoFrisbeeResponseScreen(item)}
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
                <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={false}
                buttonColor={'#7C4DFF'}
                selectedButtonColor={'#7C4DFF'}
                animation={true}
                onPress={(value) => {setRadioButtonValue({value:value})}}
/>
                </View>
                <View>
                    {radioButtonValue.value === 0 ? (frisbeeListReceived) : (frisbeeListSent) }
                    </View>
                    </ScrollView>
                </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      frisbeeData : function (frisbee) {
        dispatch({ type: 'getFrisbeeData', frisbee : frisbee })
      }
    }
  };

function mapStateToProps(state) {
    return { userToken: state.userToken }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FrisbeeScreen);


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
        color: '#FF8933',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerAccepted: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#00CE52',
        marginBottom: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    answerRejected: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#FF4757',
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
        marginLeft: 5,
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

