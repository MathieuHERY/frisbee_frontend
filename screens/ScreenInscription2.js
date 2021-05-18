import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet ,View, Text, KeyboardAvoidingView} from 'react-native';
import { Button, Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';



export default function ScreenInscription2(props) {

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
});


  const [signUpFirstname, setSignUpFirstname] = useState('')
  const [signUpAge, setSignUpAge] = useState("")
  const [signUpDescription, setSignUpDescription] = useState("")


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: '18 - 25 ans', value: '18 - 25 ans' },
    { label: '26 - 35 ans', value: '26 - 35 ans' },
    { label: '36 - 45 ans', value: '36 - 45 ans' },
    { label: '46 - 55 ans', value: '46 - 55 ans' },
  ]);


  //bouton inscription
  var handleSubmitSignup = async () => {

    const data = await fetch("http://192.168.1.67:3000/sign-up", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `Firstname=${signUpFirstname}&Age=${signUpAge}&Description=${signUpDescription}`
    })

    const body = await data.json()

  }

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
        onPress={() => props.navigation.navigate('ScreenInscription1')}
        size={20}
      />

    <Text h3 style={{marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light' }}>Allez, parlez nous un peu de vous ... </Text>

    <Input
        containerStyle={{ marginBottom: 5, width: '70%' }}
        placeholder='Ton email'
        onChangeText={(e) => setSignUpEmail(e)}
        style={{fontFamily: 'Nunito_400Regular', fontSize: 17}}
      />

      <Input
        containerStyle={{ marginBottom: 5, width: '70%' }}
        placeholder='Ton mot de passe'
        onChangeText={(e) => setSignUpPassword(e)}
        secureTextEntry={true}
        style={{fontFamily: 'Nunito_400Regular', fontSize: 17}}
        />

      <Input
        containerStyle={{ width: '70%', marginBottom: 20 }}
        placeholder='Ton prénom'
        onChangeText={(e) => setSignUpFirstname(e)}
        style={{fontFamily: 'Nunito_400Regular', fontSize: 17}}
      />


      <Text>Toujours aussi jeune, hein : </Text>
      <DropDownPicker
        style={{ fontFamily: 'Nunito_400Regular', fontSize: 15, margin: 50, marginTop: 20, width: '70%'}}

        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Sélectionnez votre tranche d'âge"
        onChangeText={(e) => setSignUpAge(e)}

      />

<KeyboardAvoidingView   
     behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <Text style={{ fontFamily: 'Nunito_400Regular', margin: 30, marginTop: 10, width: '70%' }}>Vendez-nous du rêve : </Text>
      <Input
        containerStyle={{ marginBottom: 50, width: '90%' }}
        placeholder='Décrivez-vous en quelques mots ...'
        onChangeText={(e) => setSignUpDescription(e)} 
        value={signUpDescription}
        textInput={{ color: "#eb4d4b" }}      
      />

</KeyboardAvoidingView>




      <Button
      buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17}}
        title="Suivant"
        onPress={() => { handleSubmitSignup(); /* props.navigation.navigate('ScreenInscription3') */ HandleClickchangeStep()}}
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

