import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'

//fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
  Montserrat_300Light,
} from '@expo-google-fonts/montserrat';




function ScreenInscription3(props) {


  //fonts
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
  });



  const [signUpFavoritesSports, setSignUpFavoritesSports] = useState('')
  const [signUpSportsHabits, setSignUpSportsHabits] = useState("")
  const [signUpSportsHours1, setSignUpSportsHours1] = useState("")
  const [signUpSportsHours2, setSignUpSportsHours2] = useState("")
  const [listErrorsSignup, setErrorsSignup] = useState([])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'En semaine', value: 'En semaine' },
    { label: 'Le weekend', value: 'Le weekend' },
    { label: 'Tous les jours', value: 'Tous les jours' },
  ]);


  //bouton inscription
  var handleSubmitSignup = async () => {

    var saveUser = async newUser => {
      props.newUser(newUser)

      const data = await fetch("http://172.16.190.10:3000/sign-up", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `FavoritesSports=${newUser.signUpFavoritesSports}&SportsHabits=${newUser.signUpSportsHabits}&SportsHours=${newUser.signUpSportsHours1&newUser.signUpSportsHours2}`
      })

    }

    const body = await data.json()

    if (body.result == true) {
      props.addToken(body.token)
      /* props.navigation.navigate('ScreenInscription4') */
      HandleClickchangeStep()
    } else {
      setErrorsSignup(body.error)
      setUserExists(true)
    }
  }

  //message d'erreur
  var ErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<Text style={{ marginBottom: 20, color: "#ff4757" }}>{error}</Text>)
  })


  //navigation
  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>

        <Icon
          raised
          name='ios-arrow-back'
          type='ionicon'
          color='#7C4DFF'
          onPress={() => { props.navigation.navigate('ScreenInscription2') }}
          size={20}
        />

        <Text h3 style={{ marginBottom: 40, fontSize: 25, width: "60%" }}>Quelles sont vos habitudes sportives ? </Text>


        <Text style={{ marginBottom: 30 }}>Vos sports favoris : </Text>
        <View style={{ flexDirection: "row" }}>

          <Icon
            raised
            name='basketball-outline'
            type='ionicon'
            color='#7C4DFF'
            onPress={() => console.log("Basketball")}
            size={50}
          />

          <Icon
            raised
            name='ios-football'
            type='ionicon'
            color='#7C4DFF'
            onPress={() => console.log("Basketball")}
            size={50}
            style={{ marginBottom: 10 }}
          />




        </View>

        <Text style={{ marginBottom: 10 }}>Vous faites du sport plutôt : </Text>
        <DropDownPicker
          style={{ margin: 50, marginTop: 20, width: '70%' }}

          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Sélectionnez vos préférences"
          onChangeText={(e) => setSignUpSportsHabits(e)}
        />


        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginBottom: 10 }}>Dispo de : </Text>

          <Input
            containerStyle={{ width: '30%' }}
            placeholder='08h00'
            onChangeText={(e) => setSignUpSportsHours1(e)}
            //value={signUpDescription}
            textInput={{ color: "#eb4d4b" }}

          />

          <Text style={{ marginBottom: 10 }}>à : </Text>
          <Input
            containerStyle={{ width: '30%' }}
            placeholder='10h00'
            onChangeText={(e) => setSignUpSportsHours2(e)}
           // value={signUpDescription}
            textInput={{ color: "#eb4d4b" }}

          />
        </View>

        {ErrorsSignup}

        <Button
          buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17 }}
          title="Suivant"
          onPress={() => { handleSubmitSignup(); { saveUser(newUser) } }}
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


//css
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
  return { Email: state.signUpEmail, Password: state.signUpPassword, Firstname: state.signUpFirstname, Age: state.signUpAge, Description: state.signUpDescription, token: state.token }
}


//exportation
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenInscription3)