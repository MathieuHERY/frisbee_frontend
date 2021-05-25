import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
  Montserrat_300Light,
} from '@expo-google-fonts/montserrat';



function InscriptionScreen1(props) {

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
  });

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpFirstname, setSignUpFirstname] = useState('')


  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }

  var GoToNextStepSignUp = (signUpEmail, signUpFirstname, signUpPassword) => {

    if (signUpEmail && signUpFirstname && signUpPassword) {

      let user = { email: signUpEmail, password: signUpPassword, firstname: signUpFirstname };
      console.log(signUpEmail);

      props.UserFirstInfo(user)

      HandleClickchangeStep();
    }
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.iconBack}>

          <Icon
            raised
            name='ios-arrow-back'
            type='ionicon'
            color='#7C4DFF'
            onPress={() => props.navigation.navigate('SignInUpScreen')}
            size={30}
          />
        </View>

        <View style={styles.content}>

          <Text h3 style={{ marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Promis la prochaine fois on se rappelera de toi !</Text>

          <Input
            containerStyle={{ marginBottom: 20, width: '70%' }}
            placeholder='Ton email'
            onChangeText={(e) => setSignUpEmail(e)}
            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}
          />

          <Input
            containerStyle={{ marginBottom: 20, width: '70%' }}
            placeholder='Ton mot de passe'
            onChangeText={(e) => setSignUpPassword(e)}
            secureTextEntry={true}
            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}
          />

          <Input
            containerStyle={{ width: '70%', marginBottom: 20 }}
            placeholder='Ton prénom'
            onChangeText={(e) => setSignUpFirstname(e)}
            style={{ fontFamily: 'Nunito_400Regular', fontSize: 17 }}
          />

          <Button
            buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17, marginTop: 20 }}
            title="Suivant"
            onPress={() => { GoToNextStepSignUp(signUpEmail, signUpFirstname, signUpPassword) }}
            titleStyle={{
              fontFamily: 'Nunito_400Regular',
              marginLeft: 15,
              marginRight: 15
            }}
          >
          </Button>
        </View>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    UserFirstInfo: function (user) {
      console.log(user);
      dispatch({ type: 'addInfoFirstStep', newUser: user })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InscriptionScreen1);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconBack: {
    marginTop: 50,
    marginRight: 300,
  },
  content: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


