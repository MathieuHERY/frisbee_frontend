import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen(props) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#7C4DFF'
        }}>
            <Text>
                HomeScreen
            </Text>
            <Button buttonStyle={{
                backgroundColor: "#009788"
            }}
                title="Go to MapScreen"
                type='solid'
                onPress={() => props.navigation.navigate('BottomBar')}
            />
        </View>
    )
}

export default HomeScreen;