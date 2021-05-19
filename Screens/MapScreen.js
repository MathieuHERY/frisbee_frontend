import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, Icon, Overlay, CheckBox, Text, Button, Image, Card, Chip } from 'react-native-elements';
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
    const [visibleFocusPinOverlay, setvisibleFocusPinOverlay] = useState(false);

    /* Filter checkbox sports overlay  */

    const [visibleFilterOverlay, setVisibleFilterOverlay] = useState(false);
    const [footballFilter, setFootballFilter] = useState(true);
    const [basketballFilter, setBasketballFilter] = useState(true);
    const [volleyballFilter, setVolleyballFilter] = useState(true);
    const [PingPongFilter, setPingPongFilter] = useState(true);
    const [runningFilter, setRunningFilter] = useState(true);
    const [yogaFilter, setYogaFilter] = useState(true);
    const [workoutFilter, setWorkoutFilter] = useState(true);

    const [userPosition, setUserPosition] = useState([])

    var OpenFilterSport = () => {
        setVisibleFilterOverlay(true)
    }

    var onPressMarker = (e, id) => {
        setvisibleFocusPinOverlay(true)
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
                        setUserPosition([...userPosition, { lat: location.coords.latitude, lon: location.coords.longitude }])
                    }
                );
            }
        };
        askPermissions();
    }, []);


    /* List of sports facilities  */

    const [listPoint, setListPoint] = useState([{ id: "1", latitude: 45.77110395105471, longitude: 4.885508828899401, sport: ['Football'] },
    { id: "2", latitude: 45.75894183984044, longitude: 4.84632232892967, sport: ['Basket-Ball'] },
    { id: "3", latitude: 45.76531511693534, longitude: 4.850302872420629, sport: ['Basket-Ball'] },
    { id: "4", latitude: 45.74338143926319, longitude: 4.856411368842694, sport: ['Volley-Ball'] },
    { id: "5", latitude: 45.746525053057326, longitude: 4.8359916278657185, sport: ['Ping-Pong'] },
    { id: "6", latitude: 45.77795794280737, longitude: 4.8530653036769715, sport: ['Running'] },
    { id: "7", latitude: 45.76162177729573, longitude: 4.840675222803018, sport: ['Yoga'] },
    { id: "8", latitude: 45.7857921497694, longitude: 4.887434281473106, sport: ['Work-Out'] }
    ])

    const [filterResultFootball, setFilterResultFootball] = useState([])
    const [filterResultBasketBall, setFilterResultBasketBall] = useState([])
    const [filterResultVolleyBall, setFilterResultVolleyBall] = useState([])
    const [filterResultPingPong, setfilterResultPingPong] = useState([])
    const [filterResultRunning, setFilterResultRunning] = useState([])
    const [filterResultYoga, setFilterResultYoga] = useState([])
    const [filterResultWorkOut, setFilterResultWorkOut] = useState([])


    useEffect(() => {
        if (footballFilter) {
            let footballFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Football') {
                        footballFiltered.push(listPoint[i])
                    }
                }
            }
            setFilterResultFootball(footballFiltered)
        } else {
            setFilterResultFootball([])
        };
        ;
    }, [footballFilter])

    useEffect(() => {
        if (basketballFilter) {
            let basketFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Basket-Ball') {
                        basketFiltered.push(listPoint[i])
                    }
                };
            }
            setFilterResultBasketBall(basketFiltered)
        } else {
            setFilterResultBasketBall([])
        }
        ;
    }, [basketballFilter])

    useEffect(() => {
        if (volleyballFilter) {
            let volleyballFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Volley-Ball') {
                        volleyballFiltered.push(listPoint[i])
                    }
                };
            }
            setFilterResultVolleyBall(volleyballFiltered)
        } else {
            setFilterResultVolleyBall([])
        }
        ;
    }, [volleyballFilter])

    useEffect(() => {
        if (PingPongFilter) {
            let pingPongFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Ping-Pong') {
                        pingPongFiltered.push(listPoint[i])
                    }
                };
            }
            setfilterResultPingPong(pingPongFiltered)
        } else {
            setfilterResultPingPong([])
        }
        ;
    }, [PingPongFilter])

    useEffect(() => {
        if (runningFilter) {
            let runningFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Running') {
                        runningFiltered.push(listPoint[i])
                    }
                };
            }
            setFilterResultRunning(runningFiltered)
        } else {
            setFilterResultRunning([])
        }
        ;
    }, [runningFilter])

    useEffect(() => {
        if (yogaFilter) {
            let yogaFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Yoga') {
                        yogaFiltered.push(listPoint[i])
                    }
                };
            }
            setFilterResultYoga(yogaFiltered)
        } else {
            setFilterResultYoga([])
        }
        ;
    }, [yogaFilter])

    useEffect(() => {
        if (workoutFilter) {
            let workoutFiltered = [];
            for (let i = 0; i < listPoint.length; i++) {
                for (let y = 0; y < listPoint[i].sport.length; y++) {
                    if (listPoint[i].sport[y] === 'Work-Out') {
                        workoutFiltered.push(listPoint[i])
                    }
                };
            }
            setFilterResultWorkOut(workoutFiltered)
        } else {
            setFilterResultWorkOut([])
        }
        ;
    }, [workoutFilter])


    var footballFacilities = filterResultFootball.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/footballPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)}
            />)
    }
    )

    var basketballFacilities = filterResultBasketBall.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/basketBallPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)} />)
    }
    )

    var volleyballFacilities = filterResultVolleyBall.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/volleyballPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)} />)
    }
    )

    var pingPongFacilities = filterResultPingPong.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/pingPongPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)}
            />)
    }
    )

    var runningFacilities = filterResultPingPong.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/runningPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)} />)
    }
    )

    var YogaFacilities = filterResultYoga.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/yogaPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)} />)
    }
    )

    var workoutFacilities = filterResultWorkOut.map(function (info, i) {
        return (
            <Marker
                key={info.id}
                coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                image={require('../assets/Markers/workoutPin.png')}
                anchor={{ x: 0.5, y: 1 }}
                centerOffset={{ x: 0.5, y: 1 }}
                onPress={e => onPressMarker(e, info.id)} />)
    }
    )

    /* Render Front-end  */

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>

                {/*         Focus Pin overlay */}

                <Overlay
                    isVisible={visibleFocusPinOverlay}
                    fullScreen={true}
                    onBackdropPress={() => { setvisibleFocusPinOverlay(false) }}
                >
                    <ScrollView>
                        <View>
                            <Icon
                                iconStyle={styles.iconCloseOverlay}
                                name='close'
                                size={30}
                                type='Ionicons'
                                color='#FF4757'
                                onPress={() => { setvisibleFocusPinOverlay(false) }} />
                        </View>
                        <View style={styles.overlay}>
                            <Card containerStyle={styles.focusPin}>
                                <Card.Image source={require('../assets/image_stade_Football.jpg')} />
                                <Text style={{ marginTop: 30, marginBottom: 15, textAlign: 'center', fontFamily: 'Nunito_400Regular', fontSize: 30 }}>
                                    Stade de la Viabert
                            </Text>
                            <Card.Divider style={{marginBottom: 20}}/>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
                                    <Chip buttonStyle={styles.ChipFocus} title='Custom Badge' titleStyle={styles.ChipFocusTitle} type="outline" />
                                    <Chip buttonStyle={styles.ChipFocus} title='Custom Badge' titleStyle={styles.ChipFocusTitle} type="outline" />
                                    <Chip buttonStyle={styles.ChipFocus} title='Custom Badge' titleStyle={styles.ChipFocusTitle} type="outline" />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                                    <Ionicons name="location-sharp" size={20} color="#838383" />
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15 }}>
                                        169 Rue Anatole France, 69100 Villeurbanne</Text>
                                </View>

                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 18 }}>
                                    Un terrain ouvert aux amoureux du ballon rond et tout ceux qui aiment le sport en général.  Cependant, la vétusté du terrain contraste avec les locaux rénové il y a quelques années. </Text>
                            </Card>
                            <View style={styles.button}>
                                <Button
                                    title="Fermer"
                                    buttonStyle={styles.overlayButton}
                                    onPress={() => { setvisibleFocusPinOverlay(false) }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Overlay>


                {/*         Filter sports overlay */}

                <Overlay
                    isVisible={visibleFilterOverlay}
                    fullScreen={true}
                    onBackdropPress={() => { setVisibleFilterOverlay(false) }}
                >
                    <ScrollView>
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
                                    onPress={() => { setPingPongFilter(!pingPongFiltered) }}
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
                    </ScrollView>
                </Overlay>

                {/*         Render Map View with Markers */}

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
    focusPin: {
        flex: 1,
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0
    },
    ChipFocus: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderColor:'#7C4DFF',
        borderWidth:2,
        
    }, 
    ChipFocusTitle: {

    color: '#7C4DFF', 
    fontFamily: 'Nunito_400Regular'
        
    }
});
