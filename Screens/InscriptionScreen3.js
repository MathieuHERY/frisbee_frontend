import { StyleSheet, View, TextBase, ScrollView  } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FAB, Icon, Overlay, CheckBox, Text, Button, Image, Card, Chip } from 'react-native-elements';

//fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
  Montserrat_300Light,
} from '@expo-google-fonts/montserrat';


export default function InscriptionScreen3(props) {


  //fonts
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
  });

  const [signUpFavoritesSports, setSignUpFavoritesSports] = useState([])
  const [footballSelected, setFootballSelected] = useState(false);
  const [basketballSelected, setBasketballSelected] = useState(false);
  const [volleyballSelected, setVolleyballSelected] = useState(false);
  const [PingPongSelected, setPingPongSelected] = useState(false);
  const [runningSelected, setRunningSelected] = useState(false);
  const [yogaSelected, setYogaSelected]= useState(false);
  const [workoutSelected, setWorkoutSelected] = useState(false);
  const [listErrorsSignup, setErrorsSignup] = useState([])

  const handleFootball = () => {
    if(!footballSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Football']);
        setFootballSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Football"));
        setFootballSelected(false);
    }    
}

const handleBasketBall = () => {
    if(!basketballSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Basket-Ball']);
        setBasketballSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Basket-Ball"));
        setBasketballSelected(false);
    }    
}

const handleVolleyBall = () => {
    if(!volleyballSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Volley-Ball']);
        setVolleyballSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Volley-Ball"));
        setVolleyballSelected(false);
    }    
}

const handlePingPong = () => {
    if(!PingPongSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Ping-Pong']);
        setPingPongSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Ping-Pong"));
        setPingPongSelected(false);
    }    
}

const handleYoga = () => {
    if(!yogaSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Yoga']);
        setYogaSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Yoga"));
        setYogaSelected(false);
    }    
}

const handleRunning = () => {
    if(!runningSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Running']);
        setRunningSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Running"));
        setRunningSelected(false);
    }    
}

const handleWorkout = () => {
    if(!workoutSelected){
        setSignUpFavoritesSports([...signUpFavoritesSports,'Work-Out']);
        setWorkoutSelected(true);
    } else {
        setSignUpFavoritesSports(signUpFavoritesSports.filter(e => e != "Work-Out"));
        setWorkoutSelected(false);
    }    
}

  //message d'erreur
  var ErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<Text style={{ marginBottom: 20, color: "#ff4757" }}>{error}</Text>)
  })

  console.log (signUpFavoritesSports)

  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }

  var GoToNextStepSignUp = (signUpAge, signUpDescription) => {
    console.log(signUpAge, signUpDescription)

    if (signUpFavoritesSports) {

    console.log('je passe dans la condition');

    let user = {sport:signUpFavoritesSports
    };
    console.log(user);


    HandleClickchangeStep(); 
    
  }
  }
  

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
     <ScrollView>
     <View style={styles.iconBack}>
    <Icon
        raised
        name='ios-arrow-back'
        type='ionicon'
        color='#7C4DFF'
        onPress={() => props.navigation.navigate('InscriptionScreen2')}
        size={30}
      />
    </View>
    <View style={styles.content}>
    <Text h3 style={{marginBottom: 20, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center' }}>Dis-nous, quelles sont tes activités préférées ? </Text>
    </View>
                        <View style={styles.checkboxContainer}>
                            <View>
                                <CheckBox containerStyle={styles.checkbox}
                                   onPress={() => { handleFootball() }}
                                    title='Football'
                                    checkedIcon='check-square' textStyle={styles.checkboxText}
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={footballSelected}
                                />
                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handleBasketBall() }}
                                    title='Basket-Ball' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={basketballSelected}
                                />
                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handleVolleyBall() }}
                                    title='Volley-Ball' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={volleyballSelected}
                                />
                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handlePingPong() }}
                                    title='Ping-Pong' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={PingPongSelected}
                                />
                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handleRunning()}}
                                    title='Running' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={runningSelected}
                                />
                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handleYoga() }}
                                    title='Yoga' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={yogaSelected}
                                />

                                <CheckBox containerStyle={styles.checkbox}
                                    onPress={() => { handleWorkout()}}
                                    title='Work-Out' textStyle={styles.checkboxText}
                                    checkedIcon='check-square'
                                    checkedColor='#7C4DFF'
                                    uncheckedIcon='square-o'
                                    checked={workoutSelected}
                                />
                            </View>
                            <View style={{alignItems:'center'}}>
                            <Button
      buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17, width:150, marginTop:20}}
        title="Suivant"
        onPress={() => {GoToNextStepSignUp(signUpFavoritesSports)}}
        titleStyle={{
          fontFamily: 'Nunito_400Regular',
          marginLeft: 15,
          marginRight: 15   
      }}
      >
      </Button>
      </View>
                        </View>
                    </ScrollView>
                    </View>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    iconBack:{
        marginTop: 50,
        marginRight: 300,
      },
      content:{
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
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

});