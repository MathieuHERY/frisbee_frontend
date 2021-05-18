import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Card, Badge, ListItem, Icon, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const users = [
    {
        name: 'Mathieu',
        age: '20-35 ans',
        avatar: require('../assets/mathieu_circle.png'),
        sport: 'football',
        availability: 'Soir & week-end',
        hourMeeting: '17h à 19h'
    },
    {
        name: 'Marilène',
        age: '20-35 ans',
        avatar: require('../assets/marilene_circle.png'),
        sport: 'Running',
        availability: 'Soir & week-end',
        hourMeeting: '17h à 19h'
    },
];


function UsersScreen() {
    const [text, setText] = useState('');

    return (

        <ScrollView style={{ marginTop: 40 }}>

            <Text style={{ textAlign: 'center' }}>
                Les sportifs autour de vous
            </Text>

            {/* La création d'une card en dur */}
                <Card style={styles.container}>
                    <View style={{ flex: 1}} >
                        <Card.Image
                            style={{ width: '35%', height: 100, marginBottom: 10 }}
                            source={users[0].avatar}
                        />
                    </View>

                    <View style={{ flex: 1}}>
                        <Text>
                            Mathieu
                        </Text>

                        <Text>
                            20 - 35 ans
                        </Text>

                        <Badge status='success' value='Football' />
                        <Text>
                            <Icon
                                type="fontawesome"
                                name='calendar'
                                size={24}
                                color='#838383'
                            />
                        Soir & week-end
                        </Text>

                        <Text>
                            <Icon
                                FontAwesome name='calendar'
                                size={24}
                                color='#838383'
                            />
                        17h à 19 h
                        </Text>

                        <Button
                            title='Envoyer un FRISBEE'
                            type= 'solid'
                            style={{ color: '#00cec9' }}
                            icon={
                                <Icon
                                    name="user"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            }
                        />
                    </View>

                </Card>


            {/* CARD À DYNAMISER */}
            <Card containerStyle={{ padding: 0 }} >
                {
                    users.map((user, i) =>
                        <ListItem key={i} />)
                }

                <Card.Image
                    style={{ width: '100%', height: 170, marginBottom: 10 }}
                    source={users.avatar}
                />

                <Button
                    title='Envoyer un FRISBEE'
                    style={{ color: '#00CEC9' }}
                    icon={
                        <Icon
                            name="user"
                            size={20}
                            color="#FFFFFF"
                        />
                    }
                />

            </Card>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default UsersScreen;