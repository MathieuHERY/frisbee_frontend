import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, Icon, Overlay, CheckBox, Text, Button, Image, Card, Chip, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';

//local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [sportItemPOI, setSportItemPOI] = useState("");

    const [userPosition, setUserPosition] = useState([])
    const [focusInfo, setfocusInfo] = useState([])

    //--------------------------------------------------------------------------------------------------

    const [addPOI, setAddPOI] = useState(false); //ajouter un lieu sur la map 
    const [listPOI, setListPOI] = useState([]); //sauvegarder les coordonnées des nouveaux POI
    const [titrePOI, setTitrePOI] = useState(""); //overlay
    const [adressPOI, setAdressPOI] = useState(""); //overlay
    const [descPOI, setDescPOI] = useState(""); //overlay
    const [isVisibleAddPOI, setIsVisibleAddPOI] = useState(false); //overlay
    const [tempPOI, setTempPOI] = useState([]);

    const [signUpSportsHabits, setSignUpSportsHabits] = useState("")

    const [placeName, setPlaceName] = useState("")
    const [placeAdress, setPlaceAdress] = useState("")
    const [placeSport, setPlaceSport] = useState("")
    const [placeDescription, setPlaceDescription] = useState("")
    const [placeLatitude, setPlaceLatitude] = useState("")
    const [placeLongitude, setPlaceLongitude] = useState("")
    const [placePicture, setPlacePicture] = useState("")


    var selectPOI = (e) => {
        if (addPOI) {
            setAddPOI(false);
            setIsVisibleAddPOI(true);
            setTempPOI({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
        }
    }

    //Mettez en place une mécanique permettant de récupérer les coordonnées du clic sur la map afin de sauvegarder les coordonnés dans un nouvel état nommé listPOI. 
  /*   var handleSubmit = () => {
        var copyListPOI = [...listPOI, { longitude: tempPOI.longitude, latitude: tempPOI.latitude, titre: titrePOI, adresse: adressPOI, description: descPOI, sportItem: sportItemPOI }];

        AsyncStorage.setItem("POI", JSON.stringify(copyListPOI));
        setListPOI(copyListPOI)

        setIsVisibleAddPOI(false);
        setTempPOI();
        setDescPOI();
        setTitrePOI();
    } */

    var addPinMap = async () => {
    
          const data = await fetch("http://172.16.190.5:3000/newplace", {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${placeName}&adress=${placeAdress}&sport=${placeSport}&description=${placeDescription}&latitude=${placeLatitude}
                    &longitude=${placeLongitude}&picture=${placePicture}`
          })
    
          const body = await data.json()
    
        }
      

    //Exploitez les valeurs contenues dans l’état listPOI pour générer des marqueurs de couleur bleu sur la map.
    var markerPOI = listPOI.map((POI, i) => {
        //showsUserLocation(true);
        return <Marker key={i} pinColor="blue" coordinate={{ latitude: POI.placeLatitude, longitude: POI.placeLongitude }}
            name={POI.setPlaceName}
            adress={POI.setPlaceAdress}
            description={POI.setPlaceDescription}
            sport={POI.setPlaceSport}
        />
    });

    //Exploitez l’état addPOI pour ajouter le marqueur uniquement si l’utilisateur a cliqué sur le bouton “Add POI”.
    var isDisabled = false;
    if (addPOI) {
        isDisabled = true;
    }

    //-----------------------------------------------------------------------------

    var OpenFilterSport = () => {
        setVisibleFilterOverlay(true)
    }

    var onPressMarker = (e, id, Pins) => {
        setvisibleFocusPinOverlay(true)
        setfocusInfo([...focusInfo, Pins])
    }
    console.log(focusInfo, "Log sur MapScreen focusinfo")

    /* Get user Location  */

    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [listPoint, setListPoint] = useState([])

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
            };
            // var request = await fetch(`http://192.168.1.67:3000/places`);
            var request = await fetch(`http://172.16.190.5:3000/places`);
            var response = await request.json();
            console.log(response);
            setListPoint(response.PinsData)
        };
        askPermissions();
    }, [listPOI]);

    const list = listPoint.map((info, i) => {
        return(
            <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/footballPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />
        )
    })

    /* console.log(listPoint) */

    if (footballFilter) {
        var filterResultFootball = listPoint.filter(item => item.sport === 'Football')
        var footballFacilities = filterResultFootball.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/footballPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }
    if (basketballFilter) {
        var filterResultBasketBall = listPoint.filter(item => item.sport === 'Basket-Ball')
        var basketballFacilities = filterResultBasketBall.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/basketBallPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }
    if (volleyballFilter) {
        var filterResultVolleyBall = listPoint.filter(item => item.sport === 'Volley-Ball')
        var volleyballFacilities = filterResultVolleyBall.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/volleyballPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }

    if (PingPongFilter) {
        var filterResultPingPong = listPoint.filter(item => item.sport === 'Ping-Pong')
        var pingPongFacilities = filterResultPingPong.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/pingPongPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }
    if (runningFilter) {
        var filterResultRunning = listPoint.filter(item => item.sport === 'Running')
        var runningFacilities = filterResultRunning.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/runningPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }
    if (yogaFilter) {
        var filterResultYoga = listPoint.filter(item => item.sport === 'Yoga')
        var YogaFacilities = filterResultYoga.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/yogaPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }
    if (workoutFilter) {
        var filterResultWorkOut = listPoint.filter(item => item.sport === 'Work-out')
        var workoutFacilities = filterResultWorkOut.map(function (info, i) {
            return (
                <Marker
                    key={info._id}
                    coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    image={require('../assets/Markers/workoutPin.png')}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    onPress={e => onPressMarker(e, info.id, { id: info._id, title: info.name, address: info.address, sport: info.sport, description: info.description, image: info.picture })}
                />)
        }
        )
    }

    var overlayFocus = focusInfo.map(function (item, i) {
        return (
            <Card containerStyle={styles.focusPin}>
                <Card.Image source={{ uri: item.image }} />
                <Text style={{ marginTop: 30, marginBottom: 15, textAlign: 'center', fontFamily: 'Nunito_400Regular', fontSize: 30 }}>
                    {item.title}
                </Text>
                <Card.Divider style={{ marginBottom: 20 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
                    <Chip buttonStyle={styles.ChipFocus} title='Custom Badge' titleStyle={styles.ChipFocusTitle} type="outline" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                    <Ionicons name="location-sharp" size={20} color="#838383" />
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 15 }}>
                        {item.address}</Text>
                </View>

                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat_300Light', fontSize: 18 }}>
                    {item.description}</Text>
            </Card>
        )
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
                    onBackdropPress={() => { setvisibleFocusPinOverlay(false), setfocusInfo([]) }}
                >
                    <ScrollView>
                        <View>
                            <Icon
                                iconStyle={styles.iconCloseOverlay}
                                name='close'
                                size={30}
                                type='Ionicons'
                                color='#FF4757'
                                onPress={() => { setvisibleFocusPinOverlay(false), setfocusInfo([]) }} />
                        </View>
                        <View style={styles.overlay}>
                            {overlayFocus}
                            <View style={styles.button}>
                                <Button
                                    title="Fermer"
                                    buttonStyle={styles.overlayButton}
                                    onPress={() => { setvisibleFocusPinOverlay(false), setfocusInfo([]) }}
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
                                    onPress={() => { setPingPongFilter(!PingPongFilter) }}
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


                {/* overlay new POI  */}

                <Overlay
                    isVisible={isVisibleAddPOI}
                    fullScreen={true}
                    onBackdropPress={() => { setIsVisibleAddPOI(false) }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <View style={styles.containerAddPOI}>
                        <Icon
                            iconStyle={styles.iconCloseOverlay}
                            name='close'
                            size={30}
                            type='Ionicons'
                            color='#FF4757'
                            onPress={() => { setIsVisibleAddPOI(false) }}
                        />

                        <Image
                            //  source={{ uri: image }}
                            style={{ width: 250, height: 150, marginTop: 20 }}
                        />
                        <Text style={{ fontFamily: 'Nunito_400Regular', color: "#7C4DFF", textDecorationLine: 'underline', marginTop: 10 }}>Importez une photo</Text>

                        <Input
                            containerStyle={{ marginBottom: 15, marginTop: 25, width: '90%' }}
                            placeholder='Nom du lieu'
                            onChangeText={(val) => setPlaceName(val)}
                            textInput={{ color: "#eb4d4b" }}
                            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}

                        />

                        <RNPickerSelect style={pickerStyle}
                            placeholder={{ label: "Quel sport peut-on pratiquer", value: null }}
                            onValueChange={(value) => setPlaceSport(value)}
                            items={[
                                { label: 'Football', value: 'Football' },
                                { label: 'Basket-Ball', value: 'Basket-Ball' },
                                { label: 'Volley-Ball', value: 'Volley-Ball' },
                                { label: 'Ping-Pong', value: 'Ping-Pong' },
                                { label: 'Yoga', value: 'Yoga' },
                                { label: 'Running', value: 'Running' },
                                { label: 'Work-Out', value: 'Work-Out' },
                            ]}
                        />

                        <Input
                            containerStyle={{ marginBottom: 25, width: '90%' }}
                            placeholder='Adresse complète du lieu'
                            onChangeText={(val) => setPlaceAdress(val)}
                            textInput={{ color: "#eb4d4b" }}
                            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}

                        />

                        <Input
                            containerStyle={{ marginBottom: 25, width: '90%' }}
                            placeholder='Décrivez nous ce lieu'
                            onChangeText={(val) => setPlaceDescription(val)}
                            textInput={{ color: "#eb4d4b" }}
                            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}

                        />

                        <Button
                            title="Ajouter ce lieu sur la carte"
                            buttonStyle={{ backgroundColor: "#7C4DFF", titleStyle: 'Nunito_400Regular', borderRadius: 5 }}
                            onPress={() => addPinMap()}
                            type="solid"
                            titleStyle={{
                                fontFamily: 'Nunito_400Regular',
                                marginLeft: 15,
                                marginRight: 15
                            }}
                        />
                    </View>
                </Overlay>

                {/*         Render Map View with Markers */}

                <MapView
                    style={styles.map}
                    onPress={(e) => { selectPOI(e) }} //ajoute un pins sur la map via un clique en récupérant les coordonnées
                    region={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    {markerPOI}

                    <Marker
                        coordinate={{ latitude: currentLatitude, longitude: currentLongitude }} image={require('../assets/Markers/userMarker.png')}
                    />
                    {list}
                    {workoutFacilities}
                    {footballFacilities}
                    {basketballFacilities}
                    {volleyballFacilities}
                    {pingPongFacilities}
                    {YogaFacilities}
                    {runningFacilities}
                </MapView>


                {/* Boutons */}

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
                        // disabled={isDisabled} //inverse le bouton
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
                        onPress={() => /* console.log('Pressed'), */ { setAddPOI(true) }} //passer l'état addPOI à true lorsque l'on clique sur le bouton
                    />



                </View>
            </View>
        );
    }
    console.log(filtersSelected)
}



const styles = StyleSheet.create({
    containerAddPOI: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        fontFamily: 'Nunito_400Regular',
        alignItems: "center"
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
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
        borderColor: '#7C4DFF',
        borderWidth: 2,

    },
    ChipFocusTitle: {

        color: '#7C4DFF',
        fontFamily: 'Nunito_400Regular'

    },

});

const pickerStyle = {
    inputIOS: {
      fontSize:15,
        color: '#7C4DFF',
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#white',
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        color: '#7C4DFF',
      },
    inputAndroid: {
      fontSize:15,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
  };


