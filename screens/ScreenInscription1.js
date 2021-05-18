import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Button, Input, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createPortal } from 'react-dom';


export default function ScreenInscription1(props) {


  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignup, setErrorsSignup] = useState([])


      var handleSubmitSignup = async () => {
    
        const data = await fetch("http://172.16.188.152:3000/sign-up", { 
          method: 'POST', 
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
          body: `Email=${signUpEmail}&Password=${signUpPassword}` 
        })
    
        const body = await data.json()
    
        if(body.result == true){ 
          setUserExists(true)
          props.addToken(body.token) 
        } else {
          setErrorsSignup(body.error) 
        }
      }

      var HandleClickchangeStep = () => {
        props.HandleClickParentchangeStep()
      }

      var ErrorsSignup = listErrorsSignup.map((error,i) => {
        return(<Text style={{ marginBottom: 20, color: "#ff4757"}}>{error}</Text>)
      })

    return (
      <View style={styles.container}>

    <Text h3 style={{ marginBottom: 60, fontSize: 25, width: "60%"}}>On ne se connaît pas encore il me semble </Text>


<Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      placeholder='Ton email'
      onChangeText={(e) => setSignUpEmail(e)}
      />

<Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      placeholder='Ton mot de passe'
      onChangeText={(e) => setSignUpPassword(e)}
      secureTextEntry={true}
      />

     {ErrorsSignup}

<Button
    buttonStyle={{backgroundColor: "#00CEC9"}}
    title="Je m'inscris !"
    onPress={() => {handleSubmitSignup(); /* props.navigation.navigate('ScreenInscription2') */; HandleClickchangeStep()}}
    >
</Button>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  