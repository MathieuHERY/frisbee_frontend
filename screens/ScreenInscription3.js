import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'


export default function ScreenInscription3(props) {


  const [signUpFirstname, setSignUpFirstname] = useState('')
  const [signUpDescription, setSignUpDescription] = useState("")
  const [signUpAge, setSignUpAge] = useState("")

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'En semaine', value: 'En semaine' },
    { label: 'Le weekend', value: 'Le weekend' },
    { label: 'Tous les jours', value: 'Tous les jours' },
  ]);


  //bouton inscription
  var handleSubmitSignup = async () => {

    const data = await fetch("192.168.1.7..9:3000/sign-up", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `Firstname=${signUpFirstname}&Description=${signUpDescription}&Age=${signUpAge}`
    })

    const body = await data.json()

  }

  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }



  return (
    <View style={styles.container}>

<Icon
        raised
        name='ios-arrow-back'
        type='ionicon'
        color='#7C4DFF'
        onPress={() => props.navigation.navigate('ScreenInscription2')}
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
        onChangeText={(e) => setSignUpAge(e)}

      />


      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginBottom: 10 }}>Dispo de : </Text>

        <Input
          containerStyle={{ width: '30%' }}
          placeholder='08h00'
          onChangeText={(signUpDescription) => setSignUpDescription(signUpDescription)}
          value={signUpDescription}
          textInput={{ color: "#eb4d4b" }}

        />

        <Text style={{ marginBottom: 10 }}>à : </Text>
        <Input
          containerStyle={{ width: '30%' }}
          placeholder='10h00'
          onChangeText={(signUpDescription) => setSignUpDescription(signUpDescription)}
          value={signUpDescription}
          textInput={{ color: "#eb4d4b" }}

        />
      </View>



      <Button
        buttonStyle={{ marginTop: 25, backgroundColor: "#00CEC9" }}
        title="Suivant"
        onPress={() => { handleSubmitSignup(); /* props.navigation.navigate('ScreenInscription4') */; HandleClickchangeStep() }}
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