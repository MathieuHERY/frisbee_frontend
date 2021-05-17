import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Badge, ListItem, Button, Icon } from 'react-native-elements';

const users = [
    {
       name: 'Mathieu',
       age: '20-35 ans',
       avatar: require('../assets/mathieu_circle.png'),
       availability: 'Soir & week-end',
       hourMeeting: '17h à 19h'
    },
    {
        name: 'Marilène',
        age: '20-35 ans',
        avatar: require('../assets/marilene_circle.png'),
        availability: 'Soir & week-end',
        hourMeeting: '17h à 19h'
     },
   ]
   

function UsersScreen() {
    return (

        <ScrollView style={{ marginTop: 25 }}>

            <Text>
                Les sportifs autour de vous
            </Text>
            
            <Card>
					<Card.Image
						style={{ width: '100%', height: 170, marginBottom: 10 }}
						source={users[0].avatar}
					/>
					<Badge status='success' value='Football' />

				</Card>

        </ScrollView>
    )
}

export default UsersScreen;