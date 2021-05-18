import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon, Overlay, CheckBox, Text, Button, Image } from 'react-native-elements';
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

    const [visibleAddLocationOverlay, setVisibleAddLocationOverlay] = useState(false);

    /* Filter sports overlay  */

    const [visibleFilterOverlay, setVisibleFilterOverlay] = useState(false);
    const [footballFilter, setFootballFilter] = useState(true);
    const [basketballFilter, setBasketballFilter] = useState(true);
    const [volleyballFilter, setVolleyballFilter] = useState(true);
    const [PingPongFilter, setPingPongFilter] = useState(true);
    const [runningFilter, setRunningFilter] = useState(true);
    const [yogaFilter, setYogaFilter] = useState(true);
    const [workoutFilter, setWorkoutFilter] = useState(true);

    var OpenFilterSport = () => {
        setVisibleFilterOverlay(true)
    }

    /* Get user Location  */

    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();

    useEffect(() => {
        async function askPermissions() {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        setCurrentLatitude(location.coords.latitude)
                        setCurrentLongitude(location.coords.longitude)
                    }
                );
            }
        };
        askPermissions();
    }, []);
    /* List of sports facilities  */

    const [listPoint, setListPoint] = useState([{ latitude: 45.77110395105471, longitude: 4.885508828899401, title: 'Football' },
    { latitude: 45.75894183984044, longitude: 4.84632232892967, title: 'Basket-Ball' },
    { latitude: 45.76531511693534, longitude: 4.850302872420629, title: 'Basket-Ball' },
    { latitude: 45.74338143926319, longitude: 4.856411368842694, title: 'Volley-Ball' },
    { latitude: 45.746525053057326, longitude: 4.8359916278657185, title: 'Ping-Pong' },
    { latitude: 45.77795794280737, longitude: 4.8530653036769715, title: 'Running' },
    { latitude: 45.76162177729573, longitude: 4.840675222803018, title: 'Yoga' },
    { latitude: 45.7857921497694, longitude: 4.887434281473106, title: 'Work-Out' }
    ])

    if (footballFilter) {
        var footballPoint = listPoint.filter(item => item.title === 'Football')
        var footballFacilities = footballPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/footballPin.png')}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}
                    />)
        }
        )
    }

    if (basketballFilter) {
        var basketballPoint = listPoint.filter(item => item.title === 'Basket-Ball')
        var basketballFacilities = basketballPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/basketBallPin.png')} 
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    if (volleyballFilter) {
        var volleyballPoint = listPoint.filter(item => item.title === 'Volley-Ball')
        var volleyballFacilities = volleyballPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/volleyballPin.png')} 
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    if (PingPongFilter) {
        var pingPongPoint = listPoint.filter(item => item.title === 'Ping-Pong')
        var pingPongFacilities = pingPongPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/pingPongPin.png')}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    if (runningFilter) {
        var runningPoint = listPoint.filter(item => item.title === 'Running')
        var runningFacilities = runningPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/runningPin.png')}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    if (yogaFilter) {
        var yogaPoint = listPoint.filter(item => item.title === 'Yoga')
        var YogaFacilities = yogaPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/yogaPin.png')}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    if (workoutFilter) {
        var workoutPoint = listPoint.filter(item => item.title === 'Work-Out')
        var workoutFacilities = workoutPoint.map(function (info, i) {
            return (
                <Marker
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }} 
                    title={info.title} 
                    image={require('../assets/Markers/workoutPin.png')}
                    anchor={{x: 0.5, y: 1}}
                    centerOffset={{x: 0.5, y: 1}}/>)
        }
        )
    }

    /* Render Front-end  */

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
                        fontFamily: 'Montserrat_300Light', fontSize: 30, textAlign: 'center', paddingTop: 30
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
                                checked={PingPongFilter}
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
                    region={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: currentLatitude, longitude: currentLongitude }} image={require('../assets/Markers/userMarker.png')}
                    />
                {workoutFacilities}
                {footballFacilities}
                {basketballFacilities}
                {volleyballFacilities}
                {pingPongFacilities}
                {YogaFacilities}
                {runningFacilities}

                </MapView>
                <View style={{ flexDirection: 'row' }}>
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
                    />
                    <FAB
                        style={styles.fabAddLocation}
                        small
                        color='#FFFFFF80'
                        title="Ajouter" titleStyle={{ color: '#000000', fontFamily: 'Nunito_400Regular' }}
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
        backgroundColor: '#FFFFFF80',
    },
    fabAddLocation: {
        position: 'absolute',
        margin: 16,
        left: 40,
        bottom: 10,
        backgroundColor: '#FFFFFF80',
    },
    iconCloseOverlay: {
        marginTop: 20,
        marginLeft: 300,
    },
    overlay: {
        flex: 1,
        paddingTop: 20,
    },
    checkboxContainer: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#FFFFFF'
    },
    checkbox: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
    },
    checkboxText: {
        fontSize: 18,
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
    },
});
