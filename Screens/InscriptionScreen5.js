import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements'
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomBar } from './BottomBar';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';

function InscriptionScreen5(props) {

  console.log(props.newUser)

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
});

  const [signUpUserPicture, setSignUpUserPicture] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState('')
  const [userConnected, setUserConnected] = useState([])
  const [userToken, setUserToken] = useState('')

/*   Save user without picture */

   var saveUserWithoutPic = async function () {
      var SignupWithoutPic = await fetch("http://172.16.188.145:3000/sign-up", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Email=${props.newUser.email}&Firstname=${props.newUser.firstname}&Password=${props.newUser.password}&Age=${props.newUser.age}&Description${props.newUser.description}&FavoritesSports=${props.newUser.sport}&SportsHabits=${props.newUser.habits}&SportsHours=${`${props.newUser.hoursStart}-${props.newUser.hoursEnd}`}`
      })
      var response = await SignupWithoutPic.json()
      if (response.result) {
        setIsLogin(true)
        setUserConnected(response.saveUser)
        setUserToken(response.token)
        props.navigation.navigate('BottomBar', { screen: "ACCUEIL" })

      } else {
        setIsLogin(false);
        SetErrorSignUp(response.error)
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
        onPress={() => props.navigation.navigate('InscriptionScreen4')}
        size={30}
      />
</View>
<Text h3 style={{marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center' }}>Une petite photo finish et on est parti ?</Text>
<Text style={{marginBottom: 40, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center'}}>Ô miroir, mon beau miroir ...</Text>

<MaterialIcons name="add-a-photo" size={100} color="#dfe6e9" onPress={() => console.log("Works!")} />

        <Text style={{ marginBottom: 80, marginTop:20, color: "#7C4DFF", textDecorationLine: 'underline' }}>Ajouter votre plus belle photo ! </Text>



        <Button
          title="Finito"
          buttonStyle={{ marginBottom: 25, backgroundColor: "#00CEC9", borderRadius: 17, }}
          onPress={() => { /* handleSubmitSignup();  */props.navigation.navigate('BottomBar', { screen: "ACCUEIL" }); }}
          titleStyle={{
            fontFamily: 'Nunito_400Regular',
            marginLeft: 15,
            marginRight: 15  
          }}
        >
        </Button>


       {/*  <Text style={{ color: "#7C4DFF" }}
          onPress={() => { props.navigation.navigate('BottomBar', { screen: "ACCUEIL" }), {saveUser(newUser)} }}>Non, ça ira, je ne veux pas me montrer ... </Text> */}

<Button
          title="Non ça ira, pas de photo"
          buttonStyle={{ marginBottom: 25, backgroundColor: "#00CEC9", borderRadius: 17, }}
          onPress={() => saveUserWithoutPic()}
          titleStyle={{
            fontFamily: 'Nunito_400Regular',
            marginLeft: 15,
            marginRight: 15  
          }}
        >
        </Button>

      </View>

    );
  }
}

function mapStateToProps(state) {
  return { newUser : state.newUser}
 }

export default connect(
  mapStateToProps,
  null
)(InscriptionScreen5);


// css 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  iconBack:{
    marginTop: 50,
    marginRight: 300,
  },
});