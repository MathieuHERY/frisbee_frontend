import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { BottomBar } from './BottomBar';




function ScreenInscription4(props) {


  const [signUpUserPicture, setSignUpUserPicture] = useState('')



  var handleSubmitSignup = async () => {

    var saveUser = async newUser => {
      props.newUser(newUser)

      const data = await fetch("http://172.16.190.10:3000/sign-up", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `UserPicture=${newUser.setSignUpUserPicture}`
      })

      const body = await data.json()

    }

    /* 
      var HandleClickchangeStep = () => {
        props.HandleClickParentchangeStep()
      } */


    return (
      <View style={styles.container}>

        <Icon
          raised
          name='ios-arrow-back'
          type='ionicon'
          color='#7C4DFF'
          onPress={() => { props.navigation.navigate('ScreenInscription3') }}
          size={20}
        />

        <Text h3 style={{ marginBottom: 40, fontSize: 25, width: "60%" }}>Une petite photo finish et on est parti ? </Text>

        <Text h3 style={{ marginBottom: 40 }}>Ô miroir, mon beau miroir ... </Text>


        <Avatar

          size="xlarge"
          rounded
          // source={{   uri: '', }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          onChangeText={(e) => setSignUpUserPicture(e)}
        />

        <Text style={{ marginBottom: 100, color: "#7C4DFF", textDecorationLine: 'underline' }}>Ajouter votre plus belle photo ! </Text>



        <Button
          title="Finito"
          buttonStyle={{ marginBottom: 25, backgroundColor: "#00CEC9" }}
          onPress={() => { handleSubmitSignup(); props.navigation.navigate('BottomBar', { screen: "ACCUEIL" }); { saveUser(newUser) } }}
        >
        </Button>


        {/* <Text style={{ color: "#7C4DFF" }}
          onPress={() => { props.navigation.navigate('BottomBar', { screen: "ACCUEIL" }), { saveUser(newUser) } }}>Non, ça ira, je ne veux pas me montrer ... </Text> */}

        <Text style={{ color: "#7C4DFF" }}>Non, ça ira, je ne veux pas me montrer ... </Text>

      </View>

    );
  }
}


// css 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//dispatch
function mapDispatchToProps(dispatch) {
  return {
    newUser: function (newUser) {
      dispatch({
        type: 'newUser',
        newUser: newUser
      })
    }
  }
}

//state
function mapStateToProps(state) {
  return { Email: state.signUpEmail, Password: state.signUpPassword, Firstname: state.signUpFirstname, Age: state.signUpAge, Description: state.signUpDescription, token: state.token, 
    FavoritesSports: state.FavoritesSports, SportsHabits: state.SportsHabits, SportsHours: state.SportsHours }
}


//exportation
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenInscription4)