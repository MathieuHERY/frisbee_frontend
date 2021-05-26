
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createPortal } from 'react-dom';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';


function SignInUpScreen(props) {


  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
});

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignup, setErrorsSignup] = useState([])


  var handleSubmitSignin = async () => {

    const data = await fetch("http://172.16.188.156:3000/sign-in", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `Email=${signUpEmail}&Password=${signUpPassword}`
    })

    const body = await data.json()
    console.log(body.result)

    if (body.result == true) {
      setUserExists(true)
      props.addToken(body.token)
      //HandleClickGoToMapScreen();
      props.navigation.navigate('BottomBar', { screen: "ACCUEIL" })
      
    } else {
      setErrorsSignup(body.error)
    }
  }

  //navigation 
  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }
  
  var HandleClickGoToMapScreen = () => {
    props.HandleClickParentGoToMapScreen()
  }

  // if (userExists) {
  //   HandleClickGoToMapScreen()
  // }
  

  var ErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<Text style={{ marginBottom: 20, color: "#ff4757" }}>{error}</Text>)
  })


  if (!fontsLoaded) {
    return <AppLoading />;
} else {
  return (
    
    <View style={styles.container}>

      

      <Text h3 style={{fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center' }}>Bonjour, </Text>
      <Text h3 style={{ marginBottom: 60, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center'}}>on se connaît déjà ?</Text>


      <Input
        containerStyle={{ marginBottom: 15, width: '70%'}}
        placeholder='Ton email'
        onChangeText={(e) => setSignUpEmail(e)}
        style={{fontFamily: 'Nunito_400Regular', fontSize: 17}}
      />

      <Input
        containerStyle={{ marginBottom: 1, width: '70%' }}
        placeholder='Ton mot de passe'
        onChangeText={(e) => setSignUpPassword(e)}
        secureTextEntry={true}
        style={{fontFamily: 'Nunito_400Regular', fontSize: 17}}
      />

    <Text style={{color: "#838383", marginBottom: 35, textDecorationLine: 'underline', fontFamily: 'Nunito_400Regular', fontSize: 13}}>Oops ... mot de passe (encore) oublie ?</Text>


      {ErrorsSignup}

      {/* sign-in */}
      <Button
        buttonStyle={{ backgroundColor: "#00CEC9", marginBottom: 70, titleStyle: 'Montserrat_300Light', borderRadius: 17  }}
        title="Se connecter"
        onPress={() => { handleSubmitSignin() }}
        titleStyle={{
          fontFamily: 'Nunito_400Regular',
          marginLeft: 15,
          marginRight: 15   
      }}
      >
      </Button>

      {/* sign-up */}
      <Text style={{ marginBottom: 15, fontFamily: 'Nunito_400Regular', fontSize: 15 }}>Vous n'avez pas de compte ?</Text>
      <Button
        buttonStyle={{ backgroundColor: "#7C4DFF", borderRadius: 17 }}
        title="Je m'inscris !"
        onPress={() => { HandleClickchangeStep() }}
        titleStyle={{
          fontFamily: 'Nunito_400Regular',  
          marginLeft: 15,
          marginRight: 15        
      }}
      >
      </Button>

    </View>
  );
}}

function mapDispatchToProps(dispatch) { //récupération du token pour la connexion 
  return {
    addToken: function (token) {
      console.log(token);
      dispatch({ type: 'getUserToken', userToken : token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
