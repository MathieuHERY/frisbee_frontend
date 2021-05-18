import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon, Overlay, CheckBox, Text, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
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

export default function MapScreen(props) {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Nunito_400Regular,
    });

    const [visibleFilterOverlay, setVisibleFilterOverlay] = useState(false);
    const [visibleAddLocationOverlay, setVisibleAddLocationOverlay] = useState(false);

    /* Filter overlay  */

    const [footballFilter, setFootballFilter] = useState(true);
    const [basketballFilter, setBasketballFilter] = useState(true);
    const [volleyballFilter, setVolleyballFilter] = useState(true);
    const [PingPong, setPingPong] = useState(true);
    const [runningFilter, setRunningFilter] = useState(true);
    const [yogaFilter, setYogaFilter] = useState(true);
    const [workoutFilter, setWorkoutFilter] = useState(true);

    var OpenFilterSport = () => {
        setVisibleFilterOverlay(true)
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Overlay
                    isVisible={visibleFilterOverlay}
                    fullScreen={true}
                    onBackdropPress={() => { setVisibleFilterOverlay(false) }}
                >
                    <View>
                        <Icon
                            iconStyle={styles.iconCloseOverlay}
                            name='close'
                            size={30}
                            type='Ionicons'
                            color='#FF4757'
                            onPress={() => { setVisibleFilterOverlay(false) }} />
                    </View>
                    <Text style={{
                        fontFamily: 'Montserrat_300Light', fontSize: 30, textAlign: 'center', paddingTop: 50
                    }}>Les terrains de jeu
            autour de moi</Text>
                    <View style={styles.overlay}>
                        <View>
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setFootballFilter(!footballFilter) }}
                                title='Football'
                                checkedIcon='check-square' textStyle={styles.checkboxText}
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={footballFilter}
                            />
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setBasketballFilter(!basketballFilter) }}
                                title='Basket-Ball' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={basketballFilter}
                            />
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setVolleyballFilter(!volleyballFilter) }}
                                title='Volley-Ball' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={volleyballFilter}
                            />
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setPingPong(!PingPong) }}
                                title='Ping-Pong' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={PingPong}
                            />
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setRunningFilter(!runningFilter) }}
                                title='Running' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={runningFilter}
                            />
                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setYogaFilter(!yogaFilter) }}
                                title='Yoga' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={yogaFilter}
                            />

                            <CheckBox containerStyle={styles.checkbox}
                                onPress={() => { setWorkoutFilter(!workoutFilter) }}
                                title='Work-Out' textStyle={styles.checkboxText}
                                checkedIcon='check-square'
                                checkedColor='#7C4DFF'
                                uncheckedIcon='square-o'
                                checked={workoutFilter}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Appliquer les filtres"
                                buttonStyle={styles.overlayButton}
                                onPress={() => { setVisibleFilterOverlay(false) }} 
                            />
                        </View>
                    </View>
                </Overlay>
                <MapView
                    style={styles.map}
                    Region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                </MapView>
                <View style={{ flexDirection: 'row' }}>
                    <FAB
                        style={styles.fabFilters}
                        small
                        color='#FFFFFF'
                        title="Filtres" titleStyle={{ color: '#000000' }}
                        icon={
                            <Icon
                                Ionicons name="filter-list"
                                size={20}
                                color="black"
                            />
                        }
                        onPress={() => { setVisibleFilterOverlay(true) }}
                    />
                    <FAB
                        style={styles.fabAddLocation}
                        small
                        color='#FFFFFF'
                        title="Ajouter" titleStyle={{ color: '#000000' }}
                        icon={
                            <Icon
                                Entypo name="location-pin"
                                size={20}
                                color="black"
                            />
                        }
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    },
    fabFilters: {
        position: 'absolute',
        fontSize: 10,
        margin: 16,
        right: 40,
        bottom: 10,
        backgroundColor: '#FFFFFF',
    },
    fabAddLocation: {
        position: 'absolute',
        margin: 16,
        left: 40,
        bottom: 10,
        backgroundColor: '#FFFFFF',
    },
    iconCloseOverlay: {
        marginTop: 20,
        marginLeft: 300,
    },
    overlay: {
        flex: 1,
        paddingTop: 40,
    },
    checkboxContainer: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    checkbox: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
    },
    checkboxText: {
        fontSize: 20,
        fontFamily: 'Nunito_400Regular'
    },
    overlayButton: {
        backgroundColor: '#7C4DFF',
        width: 250,
        borderRadius: 5,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    }



});
