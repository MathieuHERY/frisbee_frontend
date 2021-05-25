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
import * as ImagePicker from 'expo-image-picker';

function InscriptionScreen5(props) {


  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
  });

  const [signUpUserPicture, setSignUpUserPicture] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState('')
  const [userConnected, setUserConnected] = useState([])
  const [userToken, setUserToken] = useState('')
  const [image, setImage] = useState(null);
  const [StatusGranted, setStatusGranted] = useState(false);


  /*   Save user without picture */
  var saveUserWithoutPic = async function () {
    var SignupWithoutPic = await fetch("http://192.168.1.63:3000/sign-up", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `Email=${props.newUser.email}&Firstname=${props.newUser.firstname}&Password=${props.newUser.password}&Age=${props.newUser.age}&Description=${props.newUser.description}&FavoritesSports=${props.newUser.sport}&SportsHabits=${props.newUser.habits}&SportsHours=${`${props.newUser.hoursStart}-${props.newUser.hoursEnd}`}&UserPicture=null&UserLatitude=0&UserLongitude=0`
    })
    var response = await SignupWithoutPic.json()
    
    if (response.result) {
      setIsLogin(true)
      setUserConnected(response.saveUser)
      setUserToken(response.saveUser.token)
      let user = {token : response.saveUser.token}
      props.UserInfo(user)
      props.navigation.navigate('BottomBar', { screen: "ACCUEIL" })
      // console.log('token utilisateur sans photo', response.token)
      // props.getTokenFromUser(userToken) // Dispatch the token into the reducer
    } else {
      setIsLogin(false);
      setErrorSignUp(response.error)
    }
  }

  /* SelectPicture Call */

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Désolé, nous devons avoir accès à tes photos si tu souhaites ajouter une photo de profil");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  /* Send Picture to back-end to upload to Cloudinary and save user into DB */

  var saveUserWithPic = async function () {

    var data = new FormData();
    data.append('picture', {
      uri: image,
      type: 'image/jpeg',
      name: 'user_photo.jpeg',
    });

    var request = await fetch("http://192.168.1.63:3000/upload-user-picture", {
      method: 'post',
      body: data
    });

    var response = await request.json()

    if (response.imageSaved) {

      var SignupWithPic = await fetch("http://192.168.1.63:3000/sign-up", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Email=${props.newUser.email}&Firstname=${props.newUser.firstname}&Password=${props.newUser.password}&Age=${props.newUser.age}&Description=${props.newUser.description}&FavoritesSports=${props.newUser.sport}&SportsHabits=${props.newUser.habits}&SportsHours=${`${props.newUser.hoursStart}-${props.newUser.hoursEnd}`}&UserPicture=${response.url}&UserLatitude=0&UserLongitude=0`
      })

      var responseSignUp = await SignupWithPic.json()
      if (responseSignUp.result) {
        console.log(responseSignUp.result)
        setIsLogin(true)
        setUserConnected(responseSignUp.saveUser)
        setUserToken(responseSignUp.saveUser.token)
        let user = {token : responseSignUp.saveUser.token}
        props.UserInfo(user)
        props.navigation.navigate('BottomBar', { screen: "ACCUEIL" })
        // props.getTokenFromUser(userToken) // Dispatch the token into the reducer
        // console.log('log user token', response.token)
        // console.log(userToken, 'token utilisateur avec photo');
      } else {
        setIsLogin(false);
        SetErrorSignUp(responseSignUp.error)
      }
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
        <Text h3 style={{ marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Une petite photo finish et on est parti ?</Text>
        <Text style={{ marginBottom: 40, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Ô miroir, mon beau miroir ...</Text>

        {image ? (<Avatar
          rounded
          size="xlarge"
          source={{
            uri:
              image,
          }}
        />) : (<MaterialIcons name="add-a-photo" size={100} color="#dfe6e9" onPress={openImagePickerAsync} />)}

        {image ? (<Text style={{ marginBottom: 80, marginTop: 20, color: "#7C4DFF", textDecorationLine: 'underline' }}
          onPress={openImagePickerAsync}>Pas satisfait ? Changes donc de photo ! </Text>) : (<Text style={{ marginBottom: 80, marginTop: 20, color: "#7C4DFF", textDecorationLine: 'underline' }}
            onPress={openImagePickerAsync}>Ajouter votre plus belle photo ! </Text>)}


        {image ? (
          <Button
            title="Finito"
            buttonStyle={{ marginBottom: 25, backgroundColor: "#00CEC9", borderRadius: 17, }}
            onPress={() => {saveUserWithPic()}}
            titleStyle={{
              fontFamily: 'Nunito_400Regular',
              marginLeft: 15,
              marginRight: 15
            }}
          >
          </Button>) : (

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
          </Button>)}

      </View>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UserInfo: function (user) {
      console.log(user);
      dispatch({ type: 'GetUserInfoConnected', newUser : user })
    }
  }
};

function mapStateToProps(state) {
  return { newUser: state.newUser }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionScreen5);


// css 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  iconBack: {
    marginTop: 50,
    marginRight: 300,
  },
});